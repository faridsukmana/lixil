// $(document).ready(function(){
//     get_vendor();
//     getContent();
// });

var inventCheck='';

function getStateTopup(){
    inventCheck='topup';
    $("#data_content").empty();
    $('#addAssetButton').show();
    $('#searchAssetButton').show();
    $('#backButton').hide();
    $.ajax({
        type: "POST",
        url:glo_url+"get_inventory.php",
        data:{'inv_page':'topup'},
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

function update_state_topup(topupid){
	$('#data_content').empty();
    $('#addAssetButton').hide();
    $('#searchAssetButton').hide();
    $('#backButton').show();
   
    $.ajax({
        type: "POST",
        url:glo_url+"get_inventory.php",
        data:{'inv_page':'detailtopup','topupid':topupid},
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
    $("#vendor_name").prop('selectedIndex',0);
    $("#number_po").val("");
    $("#price_topup").val("");
    $("#quantity_topup").val("");
}

$("#button_topup").click(function(){
    var item_id=$("#item_id").val();
    var date_topup=$("#date_topup").val();
    var vendor_id=$("#vendor_name").children("option:selected").val();
    var number_po=$("#number_po").val();
    var price_topup=$("#price_topup").val();
    var quantity_topup=$("#quantity_topup").val();
   // $("#number_po").val("Test "+vendor_id);

    $.ajax({
        type: "POST",
        url:glo_url+"insert_topup.php",
        data:{'item_id':item_id, 'date_topup':date_topup, 'vendor_id':vendor_id, 
        'number_po':number_po, 'price_topup':price_topup, 'quantity_topup':quantity_topup,'invent':'insert'},
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

function getFormAddTopUp(){
    arrPart={};
    $("#data_content").empty();
    $.ajax({
        type:'POST',
        url:glo_url+"insert_topup.php",
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
    // addSparePartInventory();
    // deleteSparePartInvent();
}

var arrPart={};

function popUpFormAndon(label,sp,woid){
    var popUpContent='';
    var xquanty=arrPart[sp]['quantity_topup'];
    Swal.fire({
      title: 'Update Quantity',
      text: "Current quantity is "+xquanty,
      input: 'text',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        if(result.value!=''){
            var stock=get_stock(sp);
            if(Number(stock)<Number(result.value)){
                 Swal.fire(
                  'Failed',
                  'Sorry, actual stock ('+stock+') less than your request stock',
                  'error'
                )
            }   
            else{ 
                var quantity_topup=result.value;
                arrPart[sp]['quantity_topup']=quantity_topup;
                $('#quantityAndon'+sp).text('Quantity : '+quantity_topup);
                allRefresh(woid,arrPart);
            }
        }
      }
    }) 
}


function popUpAddQuantity(textSP,valueSP,woid){
    var popUpContent='';
    $.ajax({
        type:'POST',
        url:glo_url+"andon.php",
        data:{'form':'popupAndon'},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){

        },
        success:function(data){
            popUpContent=data;
            
        }
    })
    Swal.fire({
      title: 'Quantity',
      text: "Input quantity this sparepart",
      input: 'text',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        var stock=get_stock(valueSP);
        // console.log("STOCK "+valueSP+" : "+stock);
        if(Number(stock)<Number(result.value)){
            Swal.fire(
                  'Failed',
                  'Sorry, actual stock ('+stock+') less than your request stock',
                  'error'
            )
        }
        else{
            fireEventSparePart(textSP,valueSP,result.value,woid);
        }
      }
    })   
}

function sparePartEvent(woid){
    if($('#spc').val()!='---'){
        var valueSP=$('#sp').val();
        var textSP=jQuery('#sp option:selected').text();
        if(valueSP=='---'){
            Swal.fire(
                  'Failed',
                  'Sorry Cannot add sparepart, please check again',
                  'error'
            )
        }
        else{
            if(valueSP in arrPart)
                Swal.fire(
                  'Failed',
                  'Your sparepart already in list',
                  'error'
                )
            else
                popUpAddQuantity(textSP,valueSP,woid);    
        }
        
    }
}

function fireEventSparePart(textSP,valueSP,quantity,woid){
    arrPart[valueSP]={};
    arrPart[valueSP]['quantity_topup']=quantity;
    // popUpFormAndon(textSP,valueSP);
     var deleteLink = $('<span style="color:red; position: absolute; right: 2px;"><i class="fas fa-times-circle fa-2x"></i></span>');
     var editLink=$('<span style="color:green; position: absolute; right: 30px;"><i class="fas fa-edit fa-2x"></i></span>');
     var inputBox=$('<br><strong id="quantityAndon'+valueSP+'">Quantity : '+arrPart[valueSP]['quantity_topup']+'</strong>')
     deleteLink.on('click', function(e) {
        e.preventDefault();
        $(this).parent().remove();
        delSparepartList(valueSP,woid);
      })
     editLink.on('click', function(e) {
        e.preventDefault();
        popUpFormAndon(textSP,valueSP,woid);
      })

    var entry = $('<li class="list-group-item">'+textSP+'</li>');
    var stock_en=$('<br><strong>Current Stock : '+get_stock(valueSP)+'</strong>')
    entry.append(inputBox);
    entry.append(editLink);
    entry.append(deleteLink);
    entry.append(stock_en);
    $('#listSP').append(entry);
    allRefresh(woid,arrPart);
}

function get_stock(itemid) {
    var stock=0;
    $.ajax({
        type:'POST',
        url:glo_url+"update_stage.php",
        data:{'update':'getStock','val_spc':itemid},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){
            
        },
        success:function(data){
            stock=data;
        }
    })
    return stock;
}


function addSparePartInventory(){
    $('#buttonAddSpInvent').click(function(){
        if($('#spc').val()!='---'){
            var getSP=$('#sp').val();
            var getLabel=jQuery('#sp option:selected').text();
            $('#listSP').append('<li><div class="row"><div class="col-80 padding">'+getLabel+'</div><div class="col-10 padding"><span class="text-small green radius padding icon ion-edit" id="editLi" class="MyeditSpanValue"><a hidden>xxxPartIDxxx'+getSP+'</a></span></div><div class="col-10 padding"><span class="text-small red radius padding icon ion-close" id="removeLi" class="MySpanValue"><a hidden>xxxPartIDxxx'+getSP+'</a></span></div></div></li>');
            arrPart[getSP]={};
        }
    })
    deleteSparePartInvent();
}

function deleteSparePartInvent(){
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
        popUpFormTopUp(part[0],part[1]);
        e.stopImmediatePropagation();
    })
}


function getPartScan(){
    window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    
        //Handle Errors
        if(err) {
            
        };
        
        //Do something with the data.

    part_id=result;
    console.log(part_id);
    $.ajax({
        type:'POST',
        url:glo_url+"insert_topup.php",
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
    deleteSparePartInvent();
}

function getInventPart(){
    console.log(arrPart);
    var datastring=JSON.stringify(arrPart);
    $.ajax({
        type:'POST',
        url:glo_url+"insert_topup.php",
        data:{'invent':'insert_data','arrPart':datastring},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){

        },
        success:function(data){
            alert(data);           
        }
    })
}

function popUpFormTopUp(label,sp){
    var popUpContent='';
    var xvendor=arrPart[sp]['vendor_id'];
    var xnumb=arrPart[sp]['numb_po'];
    var xprice=arrPart[sp]['price_topup'];
    var xquanty=arrPart[sp]['quantity_topup'];
    $.ajax({
        type:'POST',
        url:glo_url+"insert_topup.php",
        data:{'invent':'popupTopUp','vendor_id':xvendor,'numbpo':xnumb,'pricetopup':xprice,'quantitytopup':xquanty},
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
            var vendor_id=$("#vendor_name").children("option:selected").val();  
            var numb_po=$('#number_po').val();
            var price_topup=$('#price_topup').val();
            var quantity_topup=$('#quantity_topup').val();
            console.log(numb_po+','+price_topup+','+quantity_topup);
            arrPart[sp]['vendor_id']=vendor_id;
            arrPart[sp]['numb_po']=numb_po;
            arrPart[sp]['price_topup']=price_topup;
            arrPart[sp]['quantity_topup']=quantity_topup;
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
            //$("#show_echo").append(data);
            $("#item_name").val(data);
			// $("#item_id").val(data.itemid);
            // $("#item_name").val(data.itemname);
            //alert("SUKSESS");
        },
		error:function (data){
			closeLoading();
			alert('Errorrr');
		}
    })
}

function get_vendor(){
	$.ajax({
        type: "POST",
        url:glo_url+"get_vendor.php",
        data:{'data':'true'},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(datahtml){
            closeLoading();
            $("#vendor_name").append(datahtml);
            //$("#item_id").val(datahtml);
        }
    })
}

// $("#vendor_name").change(function(){
//     var selectedVendor=$(this).children("option:selected").val();
//     alert("Kamu Pilih "+selectedVendor);
// })

