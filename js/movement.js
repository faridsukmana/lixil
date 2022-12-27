// $(document).ready(function(){
//     //get_Data();
//     get_center();
//     get_wo();
//     getContent();
    
// });

function getContent(){
    $("#content1").empty();
    getStateMovement();
    $("#content1").show();
    $("#content2").hide();
    $("#content3").hide();
}

$("#add").click(function(){
    $("#content1").hide();
    $("#content2").show();
    $("#content3").hide();

    $('#cam_inv').show();
    $('#back').hide();
    $('#mylist').hide();
})

$('#back').on('click',function(){
    $('#cam_inv').hide();
    $('#back').hide();
    $('#mylist').show();
    $("#content1").show();
    $("#content2").hide();
    $("#content3").hide();
})

$('#button_move_cancel').on('click',function(){
    $('#cam_inv').hide();
    $('#back').hide();
    $('#mylist').show();
    $("#content1").show();
    $("#content2").hide();
    $("#content3").hide();
})

$('#refresh').on('click',function(){
	$("#content1").empty();
	getContent();
})

function getStateMovement(){
    if(!getAccess().includes('Inventory')){
        Swal.fire(
          'Access Denied !',
          'Your account cannot Access this function',
          'error'
        )
    }
    else{
        inventCheck='movement';
        $('#data_content').empty();
        $('#addAssetButton').show();
        $('#searchAssetButton').show();
        $('#backButton').hide();
        $.ajax({
            type: "POST",
            url:glo_url+"get_inventory.php",
            data:{'inv_page':'movement'},
            crossDomain:true,
            cache:false,
            beforeSend: function(){
                loading('Please wait...');
            },
            success:function(datahtml){
                closeLoading();
                $("#data_content").append(datahtml);
            }
        })
    }    
}

function update_state_movement(topupid){
    $('#data_content').empty();
    $('#addAssetButton').hide();
    $('#searchAssetButton').hide();
    $('#backButton').show();

    $.ajax({
        type: "POST",
        url:glo_url+"get_inventory.php",
        data:{'inv_page':'detailmovement','topupid':topupid},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            $("#data_content").append(data);
        }
    })
}

function resetForm(){
    $("#item_id").val("");
    $("#date_topup").val("");
    $("#center_name").prop('selectedIndex',0);
    $("#wo_name").prop('selectedIndex',0);
    $("#number_stock").val("");
    $("#remark_1").val("");
    $("#remark_2").val("");
}


$("#button_move").click(function(){
    var item_id=$("#item_id").val();
    var date_topup=$("#date_topup").val();
    var center_name=$("#center_name").children("option:selected").val();
    var wo_name=$("#wo_name").children("option:selected").val();
    var number_stock=$("#number_stock").val();
    var remark_1=$("#remark_1").val();
    var remark_2=$("#remark_2").val();
    var take_by=localStorage.getItem('user');
   // $("#number_po").val("Test "+vendor_id);

    $.ajax({
        type: "POST",
        url:glo_url+"insert_movement.php",
        data:{'invent':'insert','item_id':item_id, 'date_topup':date_topup, 'center_name':center_name, 
        'wo_name':wo_name, 'number_stock':number_stock, 'remark_1':remark_1, 'remark_2':remark_2, 'take_by':take_by},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(datahtml){
            closeLoading();
            resetForm();
            getContent();
            alert(datahtml);
        },
        error:function(datahtml){
            closeLoading();
            alert(datahtml);
        }
    })
});

function getFormAddMove(){
    arrPart={};
    $("#data_content").empty();
    $.ajax({
        type:'POST',
        url:glo_url+"insert_movement.php",
        data:{'invent':'getForm'},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){
            loading();
        },
        success:function(data){
            
            $("#data_content").append(data);
            //getShowWOForm();
            closeLoading();
        }
    })
    getdropDownSpare("xxx");
    addSparePartInventoryMove();
    deleteSparePartInventMove();
}

var arrPart={};
function addSparePartInventoryMove(){
    $('#buttonAddSpInvent').click(function(){
        if($('#spc').val()!='---'){
            var getSP=$('#sp').val();
            var getLabel=jQuery('#sp option:selected').text();
            $('#listSP').append('<li><div class="row"><div class="col-80 padding">'+getLabel+'</div><div class="col-10 padding"><span class="text-small green radius padding icon ion-edit" id="editLi" class="MyeditSpanValue"><a hidden>xxxPartIDxxx'+getSP+'</a></span></div><div class="col-10 padding"><span class="text-small red radius padding icon ion-close" id="removeLi" class="MySpanValue"><a hidden>xxxPartIDxxx'+getSP+'</a></span></div></div></li>');
            arrPart[getSP]={};
        }
    })
    deleteSparePartInventMove();
}

function deleteSparePartInventMove(){
    //alert('Test');
    $('#listSP').on('click','#removeLi',function(e){
        var temp=$(this).closest('li').text();
        var part=temp.split('xxxPartIDxxx');
        delete arrPart[part[1]];
        var liVal=$(this).closest('li').remove();
        e.stopImmediatePropagation();
    })
    
    $('#listSP').on('click','#editLi',function(e){
        var temp=$(this).closest('li').text();
        var part=temp.split('xxxPartIDxxx');
        popUpFormMove(part[0],part[1]);
        e.stopImmediatePropagation();
    })
}


function getPartScanMove(){
    window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    
        //Handle Errors
        if(err) {
            
        };
        
        //Do something with the data.

    part_id=result;
    console.log(part_id);
    $.ajax({
        type:'POST',
        url:glo_url+"insert_movement.php",
        data:{'invent':'getPartScan','part_id':part_id},
        crossDomain:true,
        //dataType: 'JSON',
        cache:false,
        async:false,
        beforeSend:function(){
            loading();
        },
        success:function(data){
            console.log(data);
            $('#listSP').append('<li><div class="row"><div class="col-80 padding">'+data+'</div><div class="col-10 padding"><span class="text-small green radius padding icon ion-edit" id="editLi" class="MyeditSpanValue"></span></div><div class="col-10 padding"><span class="text-small red radius padding icon ion-close" id="removeLi" class="MySpanValue"><a hidden>xxxPartIDxxx'+part_id+'</a></span></div></div></li>');
            arrPart[part_id]={};
            closeLoading();
        }
    })
    });
    deleteSparePartInventMove();
}

function getInventPartMove(){
    console.log(arrPart);
    var datastring=JSON.stringify(arrPart);
    $.ajax({
        type:'POST',
        url:glo_url+"insert_movement.php",
        data:{'invent':'insert_data','arrPart':datastring},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){

        },
        success:function(data){
            alert(data);
            //console.log(data);           
        }
    })
}

function popUpFormMove(label,sp){
    console.log(arrPart)
    var popUpContent='';
    var center_name=arrPart[sp]['center_name'];
    var wo_name=arrPart[sp]['wo_name'];
    var take_by=arrPart[sp]['take_by'];
    var number_stock=arrPart[sp]['number_stock'];
    var remark_1=arrPart[sp]['remark_1'];
    var remark_2=arrPart[sp]['remark_2'];
    $.ajax({
        type:'POST',
        url:glo_url+"insert_movement.php",
        data:{'invent':'popupTopUp','center_name':center_name,'wo_name':wo_name,'take_by':take_by,'number_stock':number_stock,'remark_1':remark_1,'remark_2':remark_2},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){

        },
        success:function(data){
            popUpContent=data;
            
        }
    })
    
    alert({
      title:label,
      message:popUpContent,
      class:'red',
      buttons:[
        {
          label: 'Save',
          class:'text-white',
          onclick:function(){
            var center_name=$("#center_name").children("option:selected").val();
            var wo_name=$("#wo_name").children("option:selected").val();
            var number_stock=$("#number_stock").val();
            var remark_1=$("#remark_1").val();
            var remark_2=$("#remark_2").val();
            var take_by=localStorage.getItem('user');
            arrPart[sp]['center_name']=center_name;
            arrPart[sp]['wo_name']=wo_name;
            arrPart[sp]['number_stock']=number_stock;
            arrPart[sp]['remark_1']=remark_1;
            arrPart[sp]['remark_2']=remark_2;
            arrPart[sp]['take_by']=take_by;
            closeAlert();
          }
        },
        {
          label:'Cancel',
          class:'text-white',
          onclick:function(){
              closeAlert();
          }
        }
      ]
    });
}

$("#cam_inv").click(function(){
    /*scanner plugin*/
    cordova.plugins.barcodeScanner.scan(
        function(result){ 
            if(!result.cancelled){
                alert("We got a barcode\n" +
                "Result: " + result.text );
                $("#item_id").val(result.text);
                get_item(result.text);
                
            }
            else{
                alert("You have cancelled scan");	
            }
        },
        function(error){
                alert("Scanning failed: "+error);
        }
    )
});

// function get_Data(){
//     var mydata='SA00050';
//     get_item(mydata);
// }

function get_item(myitem){
	$.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':myitem},
		//dataType: 'JSON',
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            //loading('Please waitkuuuuu...');
        },
        success:function(data){
            closeLoading();
            $("#item_name").val(data);
        },
		error:function (data){
			closeLoading();
			alert('Errorrr');
		}
    })
}

function get_center(){
	$.ajax({
        type: "POST",
        url:glo_url+"get_center.php",
        data:{'data':'true'},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(datahtml){
            closeLoading();
            $("#center_name").append(datahtml);
            //$("#item_id").val(datahtml);
        }
    })
}

function get_wo(){
	$.ajax({
        type: "POST",
        url:glo_url+"get_list_wo.php",
        data:{'data':'true'},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(datahtml){
            closeLoading();
            $("#wo_name").append(datahtml);
            //$("#item_id").val(datahtml);
        }
    })
}

// $("#center_name").change(function(){
//     var selectedVendor=$(this).children("option:selected").val();
//     alert("Kamu Pilih "+selectedVendor);
// })


function addJM(){
    $('#data_content').empty();
     $.ajax({
            type: "POST",
            url:glo_url+"get_inventory.php",
            data:{'inv_page':'contentSearch'},
            crossDomain:true,
            cache:false,
            beforeSend: function(){
                loading('Please wait...');
            },
            success:function(datahtml){
                closeLoading();
                $("#data_content").append(datahtml);
                $('#search_input').select2();
                var method='';
                $('#search_non_qr').click(function(){
                    method='nonqr';
                    var item=$('#search_input').val();
                    var date=$('#date_input').val();
                    console.log(date);
                    $("#data_content").empty();

                    $('#addAssetButton').show();
                    $('#searchAssetButton').show();
                    $('#backButton').hide();
                    $.ajax({
                        type: "POST",
                        url:glo_url+"get_inventory.php",
                        data:{'inv_page':'addmovement','woid':item,'date':date},
                        crossDomain:true,
                        cache:false,
                        beforeSend: function(){
                            loading('Please wait...');
                        },
                        success:function(datahtml){
                            closeLoading();
                            $("#data_content").append(datahtml);
                        }
                    })

                });
            }
    })

}

function searchJM(){
    $('#data_content').empty();
    var temp='';
    var content='';

    content='<div class="padding">'+temp+'<div class="item border-amber yellow-100 padding"><h5 style="text-align: center;">Search</h5><div class="form-group"></br><input type="text" class="form-control" id="search_input" placeholder="type id or name of asset" aria-describedby="search_input"></br><button type="button" class="btn btn-primary btn-lg btn-block" id="search_non_qr">Search</button></div></div>';
    
    $('#data_content').append(content);

    var method='';
    $('#search_non_qr').click(function(){
        method='nonqr';
        var item=$('#search_input').val();
        $("#data_content").empty();

        $('#addAssetButton').show();
        $('#searchAssetButton').show();
        $('#backButton').hide();
        $.ajax({
            type: "POST",
            url:glo_url+"get_inventory.php",
            data:{'inv_page':'movement','select':'addwo','woid':item},
            crossDomain:true,
            cache:false,
            beforeSend: function(){
                loading('Please wait...');
            },
            success:function(datahtml){
                closeLoading();
                $("#data_content").append(datahtml);
            }
        })

    });
}

function alertQuantity(itemid) {
    Swal.fire({
      title: 'Update Quantity',
      text: "Insert new Quantity",
      input: 'text',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value!=''){
            $("#spanQuan_"+itemid).text(result.value);
        }
      }
    }) 
}
function alertRemark(itemid) {
    Swal.fire({
      title: 'Remark',
      text: "Insert Remark",
      input: 'text',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value!=''){
            $("#spanRem_"+itemid).text(result.value);
        }
      }
    }) 
}
function sendMessageEmail(woid,arrwoid,date){
    var arrItem=arrwoid.split("|");
    Swal.fire({
      title: 'Send Message',
      text: "Are you sure to send this to email ?",
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
            console.log(woid);
            var username=localStorage.getItem('user');
            var email='';
            $.ajax({
                type: "POST",
                url:glo_url+"get_inventory.php",
                data:{'inv_page':'getEmail','username':username},
                crossDomain:true,
                cache:false,
                async:false,
                beforeSend: function(){
                },
                success:function(data){
                    var field=data.split('xxxEMAILxxx');
                    email=field[0];
                    email2=field[1];
                }
            })   
            console.log(email);
            // email='greskit.dev@gmail.com';
            var arrSpare={};
            for(var i=0;i<arrItem.length;i++){
                if($('#check_'+arrItem[i]).prop('checked')){
                    var remark=$('#spanRem_'+arrItem[i]).text();
                    if(remark=='Click here to fill'){
                        remark='';
                    }
                    arrSpare[arrItem[i]]=[$('#spanQuan_'+arrItem[i]).text(),remark];
                }
            }
            var jsonString=JSON.stringify(arrSpare);
            var datastring={'inv_page':'sendMessage','arrSpare':jsonString,'username':username,'account':email,'date':date,'woid':woid};
            $.ajax({
                type: "POST",
                url:glo_url+"get_inventory.php",
                data:datastring,
                crossDomain:true,
                cache:false,
                async:false,
                beforeSend: function(){
                },
                success:function(data){
                    var message=data;
                    var mailURL=glo_url.replace("wo/","Inventory/");
                    // console.log(message);
                    $.ajax({
                        type: 'POST',
                        url:mailURL+"function/content_menu/journal_movement/sendmail.php",
                        data: {'mail':'mail','account':email,'message':message,'worder':woid,'othaccount':email2},
                        crossDomain: true,
                        cache: false,
                        beforeSend: function(){
                        },
                        success:function(data){
                            Swal.fire(
                              'Success',
                              'Your message has been send to email : '+email,
                              'success'
                            )
                            refreshAddWO(woid,date);
                        }  
                    })
                }
            })
      }
    })   
}

function refreshAddWO(woid,date) {
    $.ajax({
        type: "POST",
        url:glo_url+"get_inventory.php",
        data:{'inv_page':'addmovement','woid':woid,'date':date},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            // loading('Please wait...');
        },
        success:function(datahtml){
            // closeLoading();
            $("#data_content").empty();
            $("#data_content").append(datahtml);
        }
    })   
}