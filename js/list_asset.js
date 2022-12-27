
var numbAsset=0;
var currentPage=1;
var filter='DP000001';

$("#refresh").click(function(){
    getAsset();
});




function getAsset(numb){
    checkDetailAsset=false;
    global_asset='';
    $("#the_head").text("List Asset");
    $('#list_asset_window').show();
    $('#detail_asset_window').hide();
    $("#cam_inv").show();
    $("#refresh").show();
    $("#back").hide();
    $("#data_content").empty();
    $.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':'asset','assetid':'allx111','numb':numb,'filter':filter},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            $("#data_content").append(data);
            $('#filterAsset').change(function(){
                filter=$('#filterAsset').val();
                getAsset(numb);
            })
        }
    })
}

function getRight(){
    // alert(numbAsset+" - "+currentPage);
    var modulo=numbAsset%6;
    var numbPage=numbAsset-modulo;
    if(currentPage<=numbPage){
        currentPage++;
        getAsset(currentPage);
    }
}

function getLeft(){
    if(currentPage>=2){
        currentPage--;
        getAsset(currentPage);
        
    }
}

function detailAsset(assetid){
    //$('#sub_header_wo').show();
    $("#the_head").text("Detail");
    $('#list_asset_window').hide();
    $('#detail_asset_window').show();

    $("#cam_inv").hide();
    $("#back").show();
    $("#refresh").hide();
    $("#data_content").empty();
   
    $("#addAssetButton").hide();
    $("#backButton").show();
    $("#searchAssetButton").hide();

    $.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':'asset','assetid':assetid},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            //loading('Please wait...');
        },
        success:function(data){
            //closeLoading();
            $("#data_content").append(data);
        }
    })

    $('#list_info').show();
    $('#list_wo').hide();
    $('#list_pm').hide();
    $('#list_part').hide();
    $('#list_report').hide();

    $("#tabinfo").removeClass("orange-800").addClass("orange-500");
    $("#tabwo").removeClass("orange-800").addClass("orange-800");
    $("#tabpm").removeClass("orange-800").addClass("orange-800");
    $("#tabpart").removeClass("orange-800").addClass("orange-800");
    $("#tabreport").removeClass("orange-800").addClass("orange-800");

    $("#tabinfo").click(function(){
        $('#list_info').show();
        $('#list_wo').hide();
        $('#list_pm').hide();
        $('#list_part').hide();
        $('#list_report').hide();
        $("#tabinfo").removeClass("orange-800").addClass("orange-500");
        $("#tabwo").removeClass("orange-800").addClass("orange-800");
        $("#tabpm").removeClass("orange-800").addClass("orange-800");
        $("#tabpart").removeClass("orange-800").addClass("orange-800");
        $("#tabreport").removeClass("orange-800").addClass("orange-800");           
    });
    
    $("#tabwo").click(function(){
        $('#list_info').hide();
        $('#list_wo').show();
        $('#list_pm').hide();
        $('#list_part').hide();
        $('#list_report').hide();
        $("#tabinfo").removeClass("orange-800").addClass("orange-800");
        $("#tabwo").removeClass("orange-800").addClass("orange-500");
        $("#tabpm").removeClass("orange-800").addClass("orange-800");
        $("#tabpart").removeClass("orange-800").addClass("orange-800");
        $("#tabreport").removeClass("orange-800").addClass("orange-800");           
    });
    
    $("#tabpm").click(function(){
        $('#list_info').hide();
        $('#list_wo').hide();
        $('#list_pm').show();
        $('#list_part').hide();
        $('#list_report').hide();
        $("#tabinfo").removeClass("orange-800").addClass("orange-800");
        $("#tabwo").removeClass("orange-800").addClass("orange-800");
        $("#tabpm").removeClass("orange-800").addClass("orange-500");
        $("#tabpart").removeClass("orange-800").addClass("orange-800");
        $("#tabreport").removeClass("orange-800").addClass("orange-800");           
    });
    
    $("#tabpart").click(function(){
        $('#list_info').hide();
        $('#list_wo').hide();
        $('#list_pm').hide();
        $('#list_part').show();
        $('#list_report').hide();
        $("#tabinfo").removeClass("orange-800").addClass("orange-800");
        $("#tabwo").removeClass("orange-800").addClass("orange-800");
        $("#tabpm").removeClass("orange-800").addClass("orange-800");
        $("#tabpart").removeClass("orange-800").addClass("orange-500");
        $("#tabreport").removeClass("orange-800").addClass("orange-800");           
    });
    
    $("#tabreport").click(function(){
        $('#list_info').hide();
        $('#list_wo').hide();
        $('#list_pm').hide();
        $('#list_part').hide();
        $('#list_report').show();
        $("#tabinfo").removeClass("orange-800").addClass("orange-800");
        $("#tabwo").removeClass("orange-800").addClass("orange-800");
        $("#tabpm").removeClass("orange-800").addClass("orange-800");
        $("#tabpart").removeClass("orange-800").addClass("orange-800");
        $("#tabreport").removeClass("orange-800").addClass("orange-500");        
    });

    $('#editButton').click(function(){
        global_asset=assetid;
        checkDetailAsset=true;
        $('#data_content').empty();
        $.ajax({
            type: "POST",
            url:glo_url+"edit_asset.php",
            data:{'form':'asset'},
            crossDomain:true,
            cache:false,
            async:false,
            beforeSend: function(){
                loading('Please wait...');
            },
            success:function(data){
                closeLoading();
                // console.log("query : "+data);
                $("#data_content").append(data);
                editALert(data,assetid);
            }
        })
    });

}

$('#editButton').click(function(){
        $('#data_content').empty();
        $.ajax({
            type: "POST",
            url:glo_url+"edit_asset.php",
            data:{'form':'asset'},
            crossDomain:true,
            cache:false,
            async:false,
            beforeSend: function(){
                loading('Please wait...');
            },
            success:function(data){
                closeLoading();
                $("#data_content").append(data);
                editALert(data,assetid);
            }
        })
    });

function editALert(data,assetid){
    var indexShow=[2,3,6,9,8,7,11,12,13,14,15,16,17,18,21];
    
    var combEdit='<div class="list shadow padding radius white border-red"><strong>Choose item to edit<strong></br><select id="combEdit">'
    for(i=0;i<indexShow.length;i++){
        var myval=$("#edit"+indexShow[i]).find('label').text();
        combEdit+='<option value="#edit'+indexShow[i]+'">'+myval+'</option>';
    }
    combEdit+='</select><br><div class="item"></div></div>';
    $("#data_content").empty();
    $("#data_content").append(combEdit);
    $("#data_content").append(data);
    var i;
    var numb="#edit";
    var index="#asset";

    for(i=0;i<=22;i++){
        numb="#edit"+i;
        $(numb).hide();
    }

    var combVal=$('#combEdit').children("option:selected").val();
    hideEdit(combVal);

    $('#combEdit').change(function(){
        combVal=$('#combEdit').children("option:selected").val();
        hideEdit(combVal);
    });
    
    $('#buttonSaveEdit').click(function(){
        var temp= combVal.replace('edit','editasset');
        var reCrash=combVal.replace('#','');
        var value='';
        if(temp=='#editasset21'){
            value=myImage;
            //alert(value);
        }
        else{
            value=$(temp).val();
        }
        

      Swal.fire({
      title: 'Are you sure want to edit this Asset?',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        $.ajax({
            type: "POST",
            url:glo_url+"edit_asset.php",
            data:{'form':'edit_asset','idupd':reCrash,'idAsset':assetid,'value':value},
            crossDomain:true,
            cache:false,
            async:false,
            beforeSend: function(){
                loading('Please wait...');
                //alert(reCrash);
            },
            success:function(data){
                closeLoading();
                detailAsset(assetid);
                if(data=='Success'){
                    Swal.fire(
                      'Success!',
                      'Your asset is updated !',
                      'success'
                    )
                }
                else{
                    Swal.fire(
                      'Error',
                      'Your asset Failed to update, try again',
                      'error'
                    )
                }
            }
        })
      }
  })
        

    });

    $('#buttonNoEdit').click(function(){
        detailAsset(assetid);
    });
}



function hideEdit(valEdit){
    for(i=0;i<=22;i++){
        numb="#edit"+i;
        $(numb).hide();
    }
    $(valEdit).show();
}


function browseAsset(assetid){
    $("#data_content").empty();
    $.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':'findasset','assetid':assetid},
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

function countAsset(){
    $.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':'countasset'},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            numbAsset=data;
        }
    })
}

$("#cam_inv").click(function(){
    /*scanner plugin*/
    browseAsset("AS000944");
    // $("#data_content").empty();
    // cordova.plugins.barcodeScanner.scan(
    //     function(result){ 
    //         if(!result.cancelled){
    //             var id = result.text; 
    //             browseAsset(id);        
    //         }
    //         else{
    //             alert("You have cancelled scan");	
    //         }
    //     },
    //     function(error){
    //             alert("Scanning failed: "+error);
    //     }
    // )
})

$("#scanSearchButton").click(function(){
    browseAsset("AS000944");
    closeAlert();
});

function getChart(title,value){
    $(".my-progress-bar").circularProgress({
        line_width: 10,
        color: "#ccc",
        starting_position: 0, // 12.00 o' clock position, 25 stands for 3.00 o'clock (clock-wise)
        percent: 0, // percent starts from
        percentage: true,
        text: title
    }).circularProgress('animate', value, 2000);
} 

function getCheckList(idasset){
    $('#the_head').text('Check List');
    $("#addAssetButton").hide();
    $("#backButton").show();
    $("#searchAssetButton").hide();
    $('#the_head').show();
    $('#settingButton').show();
    $('#data_content').empty();
    global_asset=idasset;
    checkDetailAsset=true;
    var myJson;
    $('#data_content').empty();
        $.ajax({
            type: "POST",
            url:glo_url+"edit_asset.php",
            data:{'form':'checklist', 'idAsset':idasset},
            crossDomain:true,
            dataType:'json',
            cache:false,
            async:false,
            beforeSend: function(){
                loading('Please wait...');
            },
            success:function(data){
                closeLoading();
                $("#data_content").append(data.content);
                myJson=data; 
            }
        })
        var new_arr=JSON.parse(myJson.arr_value);
        var checkLength=new_arr.length;
        for(var i=0;i<checkLength;i++){
            $('#myCheck'+i).hide();
        }
        $('#chooseCheck').change(function(){
            var mycheckVal=$('#chooseCheck').val();
            for(var i=0;i<checkLength;i++){
                var checkValue=$('#myCheck'+i).find('label').text();
                if(checkValue.startsWith(mycheckVal)){
                    $('#myCheck'+i).show();
                }
                else{
                    $('#myCheck'+i).hide();
                }
            }
        })
        
        $("#checkButton").click(function(){    
            //console.log(new_arr);
            var i=0, arr_input={};arr_note={};
            for(i=0;i<new_arr.length;i++){
                arr_input[new_arr[i]]=$('#'+new_arr[i]).val();
                arr_note[new_arr[i]]=$('#input_'+new_arr[i]).val();
            }
            //console.log(arr_note);
            //var new_json=JSON.stringify(arr_input);
            //myJson.arr_value=new_json;
            //console.log(myJson.arr_value);

            $.ajax({
                type: "POST",
                url:glo_url+"edit_asset.php",
                data:{'form':'checklistUpdate', 'idAsset':idasset,'arr_input':arr_input,'arr_note':arr_note,'id_history':myJson.id_history},
                crossDomain:true,
                cache:false,
                async:false,
                beforeSend: function(){
                    loading('Please wait...');
                },
                success:function(data){
                    closeLoading();
                    //console.log(data);
                    alert(data);
                    detailAsset(idasset);
                    
                }
            })
            
        })
    
}