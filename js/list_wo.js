// $(document).ready(function(){
// 	$("#data_content").empty();
// 	list_wo('');
// })
var preventiveCheck='';

$('#refresh').on('click',function(){
	$("#data_content").empty();
	list_wo('');
})

$('#back').on('click',function(){
	$("#refresh").show();
	$("#data_content").empty();
	var assetid='';
	assetid = $('#assetid').val();
	list_wo('');
})


function list_wo(assetid){
    preventiveCheck='wo';
    $("#the_head").text("Work Order");
    $("#addAssetButton").show();
    $("#backButton").hide();
    $("#searchAssetButton").show();


    $("#data_content").empty();
	$('#cam_inv').show();
	$('#back').hide();
	$('#save').hide();
	var assetid = assetid;
	$.ajax({
        type: "POST",
        url:glo_url+"wo.php",
        data:{'assetid':assetid,'wo':'wo'},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            $("#data_content").append(data);
        }
    })
     // tablistwo();
}

function update_state_wo(wo){
   // console.log("TESSSSSSSSSSSSSS");
    $("#the_head").text("Detail");
	$('#cam_inv').hide();

    $('#addAssetButton').hide();
    $('#searchAssetButton').hide();
    $('#backButton').show();
    var result="";
    var dataString = 'woid='+wo; 
     
    var user = localStorage.getItem('user');
    var dataString2 = {'woid':wo,'username':user,'userPermit':cek_user()};
    console.log('username :' + user);
    //--------Hapus id list WO--------------
    $("#data_content").empty();
    //--------Mendapatkan Update WO---------
    // $.ajax({
    //     type: "POST",
    //     //url:glo_url+"detail_wo.php",
    //     url:glo_url+"stage.php",
    //     data:dataString2,
    //     crossDomain:true,
    //     cache:false,
    //     async:false,
    //     beforeSend: function(){
    //         loading('Please wait...');
    //     },
    //     success:function(data){
    //         closeLoading();
    //         result+=data;
    //     }
    // })
    console.log('ADMIN : '+cek_user());
    $.ajax({
        type: "POST",
        url:glo_url+"detail_wo.php",
        //url:glo_url+"stage.php",
        data:dataString2,
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            //$("#data_content").append(data);
            result+=data;
            // console.log('DATA : '+data);
        }
    })
    result+="</br></br>";
    $("#data_content").append(result);
    // $('#editwobutton').hide();
    if(cek_user()=='level0'){
        $('#editwobutton').hide();
    }
}



//------ Update status WO --------------------
// function update_stage(wo_number){
//     alert('test');
//     var wo_state = $("#comb_state").val();
//     var dataString = 'wo='+wo_number+'&state='+wo_state;
//     //--------Hapus id combo box update--------------
//     $("#combo_up").remove();

//     $.ajax({
//         type: 'POST',
//         url:glo_url+"update_stage.php",
//         data:dataString,
//         dataType: 'JSON',
//         crossDomain:true,
//         cache:false,
//         async:false,
//         beforeSend:function(){
//             $('.loading').show();
//         },
//         success:function(data){
//             alert('Success update '+data.WorkOrderNo+' to '+data.WorkStatus);
//             //---Cek refresh id memanggil fungsi apa ---//
//             $("#data_content").empty();
//             list_wo('');
//             closeLoading();
//         }
//     })
// }


//========Ketika scan qr code diaktifkan------
$("#cam_inv").click(function(){
        /*scanner plugin*/
		$("#data_content").empty();
		cordova.plugins.barcodeScanner.scan(
            function(result){ 
                if(!result.cancelled){
                    var id = result.text; 
					$('#assetid').val(id);
                    list_wo(id);        
                }
                else{
                    alert("You have cancelled scan");	
                }
            },
            function(error){
                    alert("Scanning failed: "+error);
            }
		)
})

function changeStatusWo(){
    window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    
        //Handle Errors
        if(err) {
            if(preventiveCheck=='wo'){
                // list_wo_tab('');
                cekWoTab();
            }
            else if(preventiveCheck=='pm'){
                list_pm('');
            }
            return ;
        };
        
        //Do something with the data.
        var id = result;
        checkStatusWO(id);
        // alert({
        //     title:'Please photo or upload and change the state',
        //     message:myFormImage(),
        //     class:'red',
        //     buttons:[
        //       {
        //         label: 'YES',
        //         class:'text-white',
        //         onclick:function(){
        //           updateStatusWo(id);
        //           closeAlert();
        //         }
        //       },
        //       {
        //          label:'NO',
        //         class:'text-white',
        //         onclick:function(){
        //             closeAlert();
        //         }
        //       }
        //     ]
        //   });        
        
    });
}

function checkStatusWO(id){
    //preventiveCheck='wo';
    $("#the_head").text("WO Status");
    $("#addAssetButton").hide();
    $("#backButton").show();
    $("#searchAssetButton").hide();

    $("#data_content").empty();
    console.log('CHECK : '+preventiveCheck);
    $.ajax({
        type:'POST',
        url:glo_url+"update_stage.php",
        data:{'update':'getListWO','assetid':id, 'type':preventiveCheck},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){
            loading();
        },
        success:function(data){
            
            if(data!='xxxErrorxxx'){
                $("#data_content").append(data);
            }
            else{
                alert('The status of asset '+id+' is not REPAIR REQUEST or REPAIR');
            }
            closeLoading();
        }
    })
}

function getStatusAlert(){
    alert("No Form for this status");
}

function updateStatusWo(id){
    console.log('INI ID '+id);
    $.ajax({
        type: 'POST',
        url:glo_url+"update_stage.php",
        data:{'assetid':id,'update':'assetWOStatus','image_wo':myImage},
        crossDomain:true,
        cache:false,
        beforeSend:function(){
            //$('.loading').show();
        },
        success:function(data){
            console.log('dijalankan');
            console.log(data);
            alert(data);
            $("#data_content").empty();
            list_wo(id);
            closeLoading();
        }
    })   
}

// function getFormStatusUpdate(id){
//     $("#data_content").empty();
//     $.ajax({
//         type:'POST',
//         url:glo_url+"update_stage.php",
//         data:{'update':'getForm','woid':id},
//         crossDomain:true,
//         cache:false,
//         async:false,
//         beforeSend:function(){
//             loading();
//         },
//         success:function(data){
            
//             $("#data_content").append(data);
//             //getShowWOForm();
//             closeLoading();
//         }
//     })
//     // getdropDownSpare(id);
//     getSparePartClass2(id);
//     addSparePart(id);
//     getShowWOForm(id);
//     deleteSparePart(id);
// }

function getSparePartClass2(id){
    var val_spc=$('#spc').val();
    getSparePartWO2(val_spc);
    $('#spc').change(function(){
        val_spc=$('#spc').val();
        getSparePartWO2(val_spc);
    })
}

function getSparePartWO2(partClass){
    // console.log('VAL : '+partClass);
    $.ajax({
        type:'POST',
        url:glo_url+"update_stage.php",
        data:{'update':'getDropDownSpare2','val_spc':partClass},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){
            loading();
        },
        success:function(data){
            closeLoading();
            $('#sp').empty();
            $('#sp').append(data);
            $('#sp').select2();
        }
    })
}

// function getdropDownSpare(id){
//     var val_spc="---";
//     $('#sp').append('<option value="---">---</option>');
//     $('#spc').change(function(){
//         $('#sp').empty();
//         val_spc=$('#spc').val();
//         if(val_spc!='---'){
//             $.ajax({
//                 type:'POST',
//                 url:glo_url+"update_stage.php",
//                 data:{'update':'getDropDownSpare','val_spc':val_spc},
//                 crossDomain:true,
//                 dataType: 'JSON',
//                 cache:false,
//                 async:false,
//                 beforeSend:function(){
//                     loading();
//                 },
//                 success:function(data){
//                     closeLoading();
//                     // console.log("LENGTH : "+data);
//                     for(var i=0;i<data.length;i++){
//                        $('#sp').append('<option value="'+data[i].item_id+'">'+data[i].item_description+'</option>');
//                     }
//                 }
//             })
//         }
//         else{
//             $('#sp').append('<option value="---">---</option>');
//         }        
//     })
// }
function addSparePart(id){
    console.log("ADDDDD : ");
    $('#buttonAddSp').click(function(){
        if($('#spc').val()!='---'){
            var getSP=$('#sp').val();
            var getLabel=jQuery('#sp option:selected').text();
            $.ajax({
                type:'POST',
                url:glo_url+"update_stage.php",
                data:{'update':'addSparePart','woid':id,'itemspare':getSP},
                crossDomain:true,
                cache:false,
                async:false,
                beforeSend:function(){
                    //loading();
                },
                success:function(data){
                    
                    refreshSparePart(id);
                }
            })   
        }
    })
}

function refreshSparePart(id){
    $.ajax({
        type:'POST',
        url:glo_url+"update_stage.php",
        data:{'update':'refreshSparePart','woid':id},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){
            //loading();
        },
        success:function(data){
            $('#listSP').empty();
            $('#listSP').append(data);
        }
    })
    deleteSparePart(id);
}

function deleteSparePart(id){
    $('li').click(function(e){
        if( this !== e.target ) {
            var valBut=$(e.target).attr('value');
            if(jQuery.type(valBut)!=='undefined'){
                $.ajax({
                    type:'POST',
                    url:glo_url+"update_stage.php",
                    data:{'update':'deleteSparePart','woid':id,'itemspare':valBut},
                    crossDomain:true,
                    cache:false,
                    async:false,
                    beforeSend:function(){
                        //loading();
                    },
                    success:function(data){
                        refreshSparePart(id);
                    }
                })
            }
        }
    })
    
}

function getShowWOForm(id){
    // $('#formwo4').hide();
    // alert('test');
    var indexShow=[1,2,3,5,4,6];
    var i;
    var numb="#formwo";
    var index=-1;

    for(i=0;i<=6;i++){
        numb="#formwo"+i;
        $(numb).hide();
    }
    i=0;

    for(i=0;i<indexShow.length-2;i++){
        $('#formwo'+indexShow[i]).show();
        index++;    
    }
    //i=0;
    console.log('index : '+index);
    cekButtonWO(-1);
    $("#buttonNextWO").click(function(){
        if(index>=0&&index<=3){
            for(var j=0;j<=3;j++){
                $('#formwo'+indexShow[j]).hide();   
            }
            index++
            cekButtonWO(index);
            $('#formwo'+indexShow[index]).show();    
        }
        else{
            $('#formwo'+indexShow[index]).hide();
            index++
            cekButtonWO(index);
            $('#formwo'+indexShow[index]).show();
        }
        console.log("NOW : "+index);
                
    });
    
    $("#buttonBackWO").click(function(){
        if(index==4){
            $('#formwo'+indexShow[index]).hide();
            index--;
            cekButtonWO(-1);
            for(var j=0;j<=index;j++){
                $('#formwo'+indexShow[j]).show();   
            }
        }
        else{
            $('#formwo'+indexShow[index]).hide();
            index--
            cekButtonWO(index);
            $('#formwo'+indexShow[index]).show();
        }
        console.log("NOW : "+index);
    }); 

    function cekButtonWO(index){
        console.log('Index cek : '+index);
        var indexShow=[1,2,3,5,4,6];
        if(index<=0){
            $("#buttonBackWO").hide();
            $("#buttonSaveWO").hide();
        }
        else if(index>=indexShow.length-1){
            $("#buttonNextWO").hide();
            $("#buttonSaveWO").show();
        }
        else{
            $("#buttonBackWO").show();
            $("#buttonNextWO").show();
            $("#buttonSaveWO").hide();
        }
    }
    

    $("#buttonSaveWO").click(function(){
        var employee=$("#woid1").children("option:selected").val();
        var insStart=$("#woid2").val();
        var insEnd=$("#woid3").val();
        var insReport=$("#woid5").val();
        var dataString={'employee':employee,'insStart':insStart,'insEnd':insEnd,'image':myImage,'insReport':insReport,'update':'updateInspectionWO','woid':id};

        $.ajax({
            type:'POST',
            url:glo_url+"update_stage.php",
            data:dataString,
            crossDomain:true,
            cache:false,
            async:false,
            beforeSend:function(){
                loading();
            },
            success:function(data){
                
                //$("#data_content").append(data);
                if(preventiveCheck=='wo')
                    list_wo('');
                else if(preventiveCheck=='pm')
                    list_pm('');
                alert(data);
                closeLoading();
            }
        })  

    });
} 
//REPAIR WO

function getFormStatusRepair(id){
    $("#data_content").empty();
    $.ajax({
        type:'POST',
        url:glo_url+"update_stage.php",
        data:{'update':'getFormRepair','woid':id},
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
    deleteSparePartRe(id);
    getShowRWOForm(id);
}



function getShowRWOForm(id){
    // $('#formwo4').hide();
    // alert('test');
    var indexShow=[1,2,3,5,6,7,8,4,9];
    var i;
    var numb="#repairwo";
    var index=-1;

    for(i=0;i<=9;i++){
        numb="#repairwo"+i;
        $(numb).hide();
    }
    i=0;

    for(i=0;i<indexShow.length-2;i++){
        $('#repairwo'+indexShow[i]).show();
        index++;    
    }
    //i=0;
    console.log('index : '+index);
    cekButtonRWO(-1);
    $("#buttonNextRWO").click(function(){
        if(index>=0&&index<=6){
            for(var j=0;j<=6;j++){
                $('#repairwo'+indexShow[j]).hide();   
            }
            index++
            cekButtonRWO(index);
            $('#repairwo'+indexShow[index]).show();    
        }
        else{
            $('#repairwo'+indexShow[index]).hide();
            index++
            cekButtonRWO(index);
            $('#repairwo'+indexShow[index]).show();
        }
        console.log("NOW : "+index);
                
    });
    
    $("#buttonBackRWO").click(function(){
        if(index==7){
            $('#repairwo'+indexShow[index]).hide();
            index--;
            cekButtonRWO(-1);
            for(var j=0;j<=index;j++){
                $('#repairwo'+indexShow[j]).show();   
            }
        }
        else{
            $('#repairwo'+indexShow[index]).hide();
            index--
            cekButtonRWO(index);
            $('#repairwo'+indexShow[index]).show();
        }
        console.log("NOW : "+index);
    }); 

    $("#buttonSaveRWO").click(function(){
        var employee=$("#repairid1").children("option:selected").val();
        var repStart=$("#repairid2").val();
        var repEnd=$("#repairid3").val();
        var repReport=$("#repairid5").val();
        var repSteps=$("#repairid6").val();
        var repDamage=$("#repairid7").val();
        var repResult=$("#repairid8").val();
        var dataString={'employee':employee,'repStart':repStart,'repEnd':repEnd,'image':myImage,'repReport':repReport,'update':'updateReportWO','woid':id,'repSteps':repSteps,'repDamage':repDamage,'repResult':repResult};

        $.ajax({
            type:'POST',
            url:glo_url+"update_stage.php",
            data:dataString,
            crossDomain:true,
            cache:false,
            async:false,
            beforeSend:function(){
                loading();
            },
            success:function(data){
                
                //$("#data_content").append(data);
                list_wo('');
                alert(data);
                closeLoading();
            }
        })  

    });
} 

function cekButtonRWO(index){
    var indexShow=[1,2,3,5,6,7,8,4,9];
    if(index<=0){
        $("#buttonBackRWO").hide();
        $("#buttonSaveRWO").hide();
    }
    else if(index>=indexShow.length-1){
        $("#buttonNextRWO").hide();
        $("#buttonSaveRWO").show();
    }
    else{
        $("#buttonBackRWO").show();
        $("#buttonNextRWO").show();
        $("#buttonSaveRWO").hide();
    }
}


function refreshSparePartRe(id){
    $.ajax({
        type:'POST',
        url:glo_url+"update_stage.php",
        data:{'update':'refreshSparePartActual','woid':id},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){
            //loading();
        },
        success:function(data){
            $('#listSPRep').empty();
            $('#listSPRep').append(data);
        }
    })
    deleteSparePartRe(id);
}

function refreshSparePartPlanRe(id){
    $.ajax({
        type:'POST',
        url:glo_url+"update_stage.php",
        data:{'update':'refreshSparePartPlan','woid':id},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){
            //loading();
        },
        success:function(data){
            $('#listSP').empty();
            $('#listSP').append(data);
        }
    })
    deleteSparePartRe(id);
}

function deleteSparePartRe(id){
    $('li').click(function(e){
        if( this !== e.target ) {
            var valBut=$(e.target).attr('value');
            if(jQuery.type(valBut)!=='undefined'){
                //alert(valBut);
                if(valBut.includes('actual')){
                    var arrBut=valBut.split('_');
                    $.ajax({
                        type:'POST',
                        url:glo_url+"update_stage.php",
                        data:{'update':'deleteSparePartActual','woid':id,'itemspare':arrBut[1]},
                        crossDomain:true,
                        cache:false,
                        async:false,
                        beforeSend:function(){
                            //loading();
                        },
                        success:function(data){
                            refreshSparePartRe(id);
                            refreshSparePartPlanRe(id);
                        }
                    })
                }
                else{
                    $.ajax({
                        type:'POST',
                        url:glo_url+"update_stage.php",
                        data:{'update':'addSparePartActual','woid':id,'itemspare':valBut},
                        crossDomain:true,
                        cache:false,
                        async:false,
                        beforeSend:function(){
                            //loading();
                        },
                        success:function(data){
                            refreshSparePartRe(id);
                            refreshSparePartPlanRe(id);
                        }
                    })
                }
                
            }
        }
    })
    
}

function searchPreventive(){
    var template='<div class="form-group"><label for="asset1">Quantity</label><input type="input" class="form-control"  placeholder="Asset ID" id="search_Prev"></div>';

    alert({
      title:'Search WO by Asset',
      message:template,
      class:'bg-warning',
      buttons:[
        {
          label: 'Search',
          class:'text-white',
          onclick:function(){
            var sprev=$('#search_Prev').val();  
            closeAlert();
            checkStatusWO(sprev);
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

function editwo(woid){
    myImage='noimage';
    arrPart={};
    var myurl=glo_url.replace("page/wo/","");
    $("#the_head").text("Edit Work Order");
    $.ajax({
            type: "POST",
            url:glo_url+"form_request.php",
            data:{'form':'editwo','woid':woid,'userPermit':cek_user(),'tabType':tabType,'myurl':myurl},
            crossDomain:true,
            cache:false,
            async:false,
            beforeSend: function(){
                loading('Please wait...');
            },
            success:function(data){
                closeLoading();
                $('#data_content').empty();
                $('#data_content').append(data);
                $('#formDownEdit').hide();
                $('#formManpowerEdit').hide();
                deleteCauseList();
                deleteSparepartList();
                // getdropDownSpare("xxx");
                getSparePartClass2("xxx");
                initArr();

                // var deptId=$('#dept').val();
                // assetDrop(deptId);
                chooseDept();

                 hideFormAddWO();
                 readonly(woid);

                hideSubStatus();
                $('#wstate').change(function(){
                    hideSubStatus();   
                });


                hidePrNo();
                $('#wstatesub1').change(function(){
                    hidePrNo();   
                });
            }
    })
}


function editForm(){
    if(tabType=='revise'){
        $('#form_asset').show();
        $('#dept').attr('disabled',false);
        $('#assetno').attr('disabled',false);
        $('#requestby').attr('disabled',false);
        $('#wtype').attr('disabled',false);
        $('#currentState').attr('disabled',true);
        $('#problem').attr('disabled',false);
    }
}

function readonly(woid){
    var status='';
    $.ajax({
        type: "POST",
        url:glo_url+"wo_extra.php",
        data:{'choose':'getStatus','woid':woid},
        crossDomain:true,
        cache:false,
        async:false,
        // dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            status=data;
        }
    })

    if(cek_user()=='spvarea'){
        $('#failField').hide();
        $('#jobdescField').hide();
        $('#form_asset').hide();
        $('#wstatField').show();
        $('#assignto').attr('disabled',true);
        // $('#dept').attr('disabled',true);
        // $('#assetno').attr('disabled',true);
        // $('#requestby').attr('disabled',true);
        // $('#wtype').attr('disabled',true);
        $('#currentState').attr('disabled',true);
        // $('#problem').attr('disabled',true);
        $('#form_asset').show();
        // if(status=='WS000001'||status=='WS000010'){
        //           editForm();  
        // }
    }
    if(cek_user()=='mgrarea'){
        $('#failField').hide();
        $('#jobdescField').hide();
        $('#form_asset').hide();
        $('#wstatField').show();
        $('#dept').attr('disabled',true);
        $('#assetno').attr('disabled',true);
        $('#requestby').attr('disabled',true);
        $('#wtype').attr('disabled',true);
        $('#currentState').attr('disabled',true);
        $('#problem').attr('disabled',true);
    }
    else if(cek_user()=='spvmtn'){
        $('#form_asset').hide();
        $('#jobdescField').hide();
        $('#wstatField').show();
        $('#plstartField').hide();
        $('#plfinField').hide(); 
        $('#acstartField').hide();
        $('#acendField').hide();
        $('#wpriorField').hide();       
        $('#dept').attr('disabled',true);
        $('#reqsField').hide();
        $('#requField').hide();
        $('#assetno').attr('disabled',true);
        $('#requestby').attr('disabled',true);
        // $('#wtype').attr('disabled',true);
        $('#currentState').attr('disabled',true);
        $('#problem').attr('disabled',true);

        var curState=$('#currentState').val();
            // console.log("STAT : "+curState);
        $('#sparepartField').show();
        if(curState!='Created'&&curState!='Confirm'&&curState!='Planned')
            $('#manpowerField').show();
        else
            $('#manpowerField').hide();

        if(status=='WS000001'||status=='WS000010'){
              editForm();  
        }
    }
    else if(cek_user()=='mgrmtn'){
        $('#form_asset').hide();
        $('#jobdescField').hide();
        $('#wstatField').show();
        $('#plstartField').hide();
        $('#plfinField').hide(); 
        $('#acstartField').hide();
        $('#acendField').hide();
        $('#wpriorField').hide();       
        $('#dept').attr('disabled',true);
        $('#assetno').attr('disabled',true);
        $('#requestby').attr('disabled',true);
        $('#wtype').attr('disabled',true);
        $('#currentState').attr('disabled',true);
        $('#problem').attr('disabled',true);
        $('#failField').hide();
    }
    else if(cek_user()=='tech'){
        $('#sparepartField').show();
        $('#manpowerField').hide();
        $('#failField').hide();
        $('#wstatField').show();
        $('#plstartField').hide();
        $('#plfinField').hide(); 
        $('#acstartField').hide();
        $('#acendField').hide();
        $('#wpriorField').hide();
        $('#form_asset').hide();       
        $('#reqsField').hide();
        $('#requField').hide();
        $('#dept').attr('disabled',true);
        $('#assetno').attr('disabled',true);
        $('#requestby').attr('disabled',true);
        $('#wtype').attr('disabled',true);
        $('#currentState').attr('disabled',true);
        $('#problem').attr('disabled',true);
        $('#k3').attr('disabled',true);
        $('#cause').attr('disabled',true);
        $('#action').attr('disabled',true);
        $('#prevent').attr('disabled',true);
        $('#assignto').attr('disabled',true);
        
        if(status=='WS000001'||status=='WS000010'){
                  editForm();  
        }
    }
    else if(cek_user()=='admin'){
         $('#sparepartField').show();
        $('#manpowerField').show();
    }
}

function hideSubStatus(){
    if($('#wstate').val()=='WS000012'){
        $('.subStatus').show();
        if(cek_user()=='spvmtn')
            $('#manpowerField').hide();
        if($('#wstatesub1').val()==''){
            $('#wstatesub1').empty();
            $('#wstatesub2').empty();
            $('#wstatesub1').append("<option value='' selected>-</option><option value='SS000001'>MP PR Created</option>");
            $('#wstatesub2').append("<option value='' selected>-</option><option value='SS000004'>Spare Part PR Created</option>");
        }
    }
    else{
        $('.subStatus').hide();
        if(cek_user()=='spvmtn')
            $('#manpowerField').show();   
    }
}



function hidePrNo(){
    if($('#wstatesub1').val()=='SS000001'){
        $('#prnoItem').show();
    }
    else{
        $('#prnoItem').hide();   
    }
}

function initArr(){
    console.log('XXXX');
    $('#listSP li').each(function(){
        var quantity=$(this).find('.inputQuantityAndon').text().replace('Quantity : ','');
        var id=$(this).find('.inputQuantityAndon').attr('id').replace('quantityAndon','');
        // console.log('text : '+quantity);
        // console.log('id : '+id);
        arrPart[id]={};
        arrPart[id]['quantity_topup']=quantity;
    })
}

function deleteCauseList(){
     var allSubjectName = document.querySelectorAll(".sparepartDrop");
       for (var index = 0; index <allSubjectName.length; index++){
          allSubjectName[index].addEventListener("click", function(){
             this.classList.toggle("active");
          });
          allSubjectName[index].querySelector(".closeSparepart").addEventListener("click",
          function(){
             this.closest(".list-group-item").remove();
          });
       }
}

function deleteSparepartList(){
     var allSubjectName = document.querySelectorAll(".causeDrop");
       for (var index = 0; index <allSubjectName.length; index++){
          allSubjectName[index].addEventListener("click", function(){
             this.classList.toggle("active");
          });
          allSubjectName[index].querySelector(".closeCause").addEventListener("click",
          function(){
             this.closest(".list-group-item").remove();
          });
       }
}

//SPAREPART WO LIXIL
function editSparepartList(textSP,valueSP,woid){
    var quantity=$('#quantityAndon'+valueSP).text().replace('Quantity : ','');
    arrPart[valueSP]={};
    arrPart[valueSP]['quantity_topup']=quantity;
    popUpFormAndon(textSP,valueSP,woid);
}
function delSparepartList(valueSP,woid){
    delete arrPart[valueSP];
    allRefresh(woid,arrPart);
}
function allRefresh(woid,arrPart) {
    var datastring=JSON.stringify(arrPart);
    $.ajax({
        type:'POST',
        url:glo_url+"update_stage.php",
        data:{'update':'lixilRefreshSparePart','arrPart':datastring,'woid':woid},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend:function(){

        },
        success:function(data){
            if(data=='Success'){
                Swal.fire(
                  'Success',
                  'Success',
                  'success'
                )
            }
            else{
                Swal.fire(
                  'Failed',
                  'Failed',
                  'error'
                )
            }          
        }
    })
}


function update_detail_wo(woid){
    var requested = $('#requested').val();
    var requested_time = $('#requested_time').val();
    requested = requested+' '+requested_time+':00';
    var required = $('#required').val();
    var required_time = $('#required_time').val();
    required = required+' '+required_time+':00';
    var plan_start = $('#plan_start').val();
    var plan_start_time = $('#plan_start_time').val();
    plan_start = plan_start+' '+plan_start_time+':00';
    var plan_finish = $('#plan_finish').val();
    var plan_finish_time = $('#plan_finish_time').val();
    plan_finish = plan_finish+' '+plan_finish_time+':00';
    var act_start = $('#actual_start').val();
    var act_start_time = $('#actual_start_time').val();
    act_start = act_start+' '+act_start_time+':00';
    var act_end = $('#actual_end').val();
    var act_end_time = $('#actual_end_time').val();
    act_end = act_end+' '+act_end_time+':00';
    var requestby = $('#requestby').val();
    var wprior = $('#wprior').val();
    var wtype = $('#wtype').val();
    var dept = $('#dept').val();
    var wtrade = $('#wtrade').val();
    var wstate = $('#wstate').val();
    var problem = $('#problem').val();
    var k3 = $('#k3').val();
    var fail = $('#fail').val();
    var jobdesc = $('#jobdesc').val();
    var cause = $('#cause').val();
    var action = $('#action').val();
    var prevent = $('#prevent').val();
    var assignto=$('#assignto').val();
    var wstatesub1=$('#wstatesub1').val();
    var wstatesub2=$('#wstatesub2').val();
    var prno=$('#prno').val();

    var causeDescArray = [];
    $('#listCause li').each(function(){
        causeDescArray.push($(this).text());
    });

    var sparePartAndon=[];
    $('#listSP strong').each(function(){
        var andonID=this.id;
        if(this.id!=''){
            var newAndonID=andonID.replace('quantityAndon','');
            var quantityAndon=$(this).text().replace('Quantity : ','');
            sparePartAndon.push(newAndonID+','+quantityAndon);
        }
    });

    console.log('STATUS : '+wstate);    
        
    //alert (requested+' , '+required+' , '+plan_start+' , '+plan_finish+' , '+assetno+' , '+requestby+' , '+wprior+' , '+wtype+' , '+dept+' , '+wtrade+' , '+wstate+' , '+problem+' , '+k3+' , '+cause+' , '+action+' , '+prevent);
    var dataString = {'form':'updatewo','woid':woid,'requested':requested,'required':required,'plan_start':plan_start,'plan_finish':plan_finish,'act_start':act_start,'act_end':act_end,'requestby':requestby,'wprior':wprior,'wtype':wtype,'wtrade':wtrade,'dept':dept,'wstate':wstate,'problem':problem,'k3':k3,'cause':cause,'action':action,'prevent':prevent,'causeDesc':causeDescArray, 'sparepart':sparePartAndon, 'assignto':assignto,'image_asset':myImage,'wstatesub1':wstatesub1,'wstatesub2':wstatesub2,'prno':prno, 'fail':fail, 'jobdesc':jobdesc,'username':myuser};
    
    $.ajax({
        type: "POST",
        url:glo_url+"form_request.php",
        data:dataString,
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            if(data=='Success'){
                Swal.fire(
                  'Saved!',
                  'Your WO has been Updated',
                  'success'
                )
                update_state_wo(woid);    
            }
            else{
                Swal.fire(
                  'Canceled!',
                  'Your WO Failed to Updated',
                  'error'
                )
            }
            // approveUpdate(woid);
            update_state_wo(woid);
            // field_null();
        }
    })
}

function get_data_wo(){
    $.ajax({
        type: "POST",
        url:glo_url+"andon.php",
        data:{'form':'count_wo'},
        crossDomain:true,
        cache:false,
        async:false,
        dataType:'json',
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            drawChartPreventive(data);
        }
    })
}


function drawChartPreventive(data){
    var dataValue=[];
    var dataLabel=[];
    for (var prop in data) {
        dataValue.push(data[prop]);
        dataLabel.push(prop);
        // alert(prop + " is " + obj[prop]);
    }
    var ctx = document.getElementById('myPreventChart').getContext('2d');

    var data = {
        datasets: [{
            data: dataValue,
            backgroundColor: getRandomColor(dataValue.length),
        }],

        labels: dataLabel
    };

    var myDoughnutChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: { 
            plugins : {
                labels:{
                    render:'value',
                    arc: true,
                    position: 'border',
                    fontColor: '#fff',
                },
                legend: false

            }
        }
    });

}

 function getRandomColor(size) {
    arrColor=[];
    for(var j=0;j<size;j++){
        var letters = '0123456789ABCDEF'.split('');
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        arrColor.push(color);

        // var c1= Math.floor(Math.random() * 255);
        // var c2= Math.floor(Math.random() * 255);
        // var c3= Math.floor(Math.random() * 255);
        // var color='rgb(' + c1 + "," + c2 + "," + c3 + ')';
        // arrColor.push(color);
    }
        
        return arrColor;
}