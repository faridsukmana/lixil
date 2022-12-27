var form_list = false;

// $(document).ready(function(){
// 	$("#data_content").empty();
// 	list_pm('');
// })

$('#refresh').on('click',function(){
	$("#data_content").empty();
	list_pm('');
})

//===========Tombol Back============//
$('#back').on('click',function(){
	$("#data_content").empty();
	//========Jika tombol back pada form========
	if(!form_list){
		var assetid='';
		assetid = $('#assetid').val();
		list_pm(assetid);
	}
	//========Jika tombol back pada detail WO========
	else{
		var wo = $('#form').val();
		update_state_pm(wo);
		form_list = false;
	}
	
})

//==========Tombol Save ===============//
$('#save').on('click',function(){
	var total_list = $('#listcount').val();
	var list=new Array();
	var value=new Array();
	//alert($('#list_'+1).attr('name'));
	for(var i=0; i<total_list; i++){
		list[i]=$('#list_'+i).attr('name');
		value[i]=$('#list_'+i).val();
	}
	var id_checklist = JSON.stringify(list);
	var id_value = JSON.stringify(value);
	var id_history = $('#history').val();
	var dataHis = {'id_checklist':id_checklist, 'id_value':id_value, 'id_history':id_history};
	$.ajax({
        type: "POST",
        url:glo_url+"update_pm_checklist.php",
        data:dataHis,
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            alert(data);
        }
    })
})

//==============Form PM==================
$('#form').on('click',function(){
	get_form_data();
})

function get_form_data(){
	$('#form').hide();
	$('#save').show();
	var wo = $('#form').val();
	form_list = true;
	$("#data_content").empty();
	//alert(valid);
	$.ajax({
        type: "POST",
        url:glo_url+"form_pm.php",
        data:{'wo':wo},
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

//=============Daftar WO=================
function list_pm(assetid){
    // console.log("Test");
    preventiveCheck='pm';
    $("#the_head").text("PM");
    $("#addAssetButton").hide();
    $("#backButton").hide();
    $("#searchAssetButton").show();

    $("#data_content").empty();
	$('#cam_inv').show();
	$('#back').hide();
	$('#form').hide();
	$('#save').hide();
	var assetid = assetid;
	$.ajax({
        type: "POST",
        url:glo_url+"wo.php",
        data:{'assetid':assetid,'wo':'pm'},
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
}

//===============Detail WO=====================
// function update_state_pm(wo){
// 	$('#cam_inv').hide();
// 	$('#back').show();
// 	$('#form').val(wo);
// 	$('#form').show();
//     $('#save').hide();
//     var result="";
//     var dataString = 'woid='+wo;
//     var user = localStorage.getItem('user');
//     var dataString2 = {'wo':wo,'user':user}; 
//     //--------Hapus id list WO--------------
//     $("#data_content").empty();
//     //--------Mendapatkan Update WO---------
//     $.ajax({
//         type: "POST",
//         //url:glo_url+"detail_wo.php",
//         url:glo_url+"stage.php",
//         data:dataString2,
//         crossDomain:true,
//         cache:false,
//         async:false,
//         beforeSend: function(){
//             loading('Please wait...');
//         },
//         success:function(data){
//             closeLoading();
//             result+=data;
//         }
//     })
//     $.ajax({
//         type: "POST",
//         url:glo_url+"detail_wo.php",
//         //url:glo_url+"stage.php",
//         data:dataString,
//         crossDomain:true,
//         cache:false,
//         async:false,
//         beforeSend: function(){
//             loading('Please wait...');
//         },
//         success:function(data){
//             closeLoading();
//             //$("#data_content").append(data);
//             result+=data;
//         }
//     })
//     result+="</br></br>";
//     $("#data_content").append(result);
// }//------ Update status WO --------------------
function update_stage(wo_number){
    var wo_state = $("#comb_state").val();
    var dataString = 'wo='+wo_number+'&state='+wo_state;
    //--------Hapus id combo box update--------------
    $("#combo_up").remove();

    $.ajax({
        type: 'POST',
        url:glo_url+"update_stage.php",
        data:dataString,
        dataType: 'JSON',
        crossDomain:true,
        cache:false,
        beforeSend:function(){
            //loading();
        },
        success:function(data){
            
            //---Cek refresh id memanggil fungsi apa ---//
            $("#data_content").empty();
            if(preventiveCheck=='wo')
                list_wo('');
            else if(preventiveCheck=='pm')
                list_pm('');
            
            alert('Success update '+data.WorkOrderNo+' to '+data.WorkStatus);
                //closeLoading();
        }
    })
}




//========Ketika scan qr code diaktifkan------
$("#cam_inv").click(function(){
        /*scanner plugin*/
		$("#data_content").empty(); //list_pm('AS000019'); 
		cordova.plugins.barcodeScanner.scan(
            function(result){ 
                if(!result.cancelled){
                    var id = result.text; 
					$('#assetid').val(id);
                    list_pm(id);        
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