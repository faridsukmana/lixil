
//Mulai baru code daily Checkist/Inpection
var asset_cam='';

function pageDailyCheck(){
    $("#the_head").text("Daily Checklist");
    $("#detail_asset_window").hide();
    $("#addAssetButton").hide();
    $("#backButton").hide();
    $("#searchAssetButton").hide();

    $('#data_content').empty();
    get_asset_page('dailyCheck');   
}

var valueStep=[];
function manualSearch(){
    alertStepConfirm(1,'');
    valueStep=['','',''];
}

function alertStepConfirm(step){
    if(step==1){
        var mySelect=getDepartment();
        Swal.fire({
          title: 'Search Asset',
          text: "Choose Department",
          input: 'select',
          inputValue:valueStep[step],
          inputOptions:mySelect,
          showCancelButton: true,
          showDenyButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Next'
        }).then((result) => {
          if (result.isConfirmed) {
            valueStep[step]=result.value;
            alertStepConfirm(2);
          }
        })       
    }
    else if(step==2){
        Swal.fire({
          title: 'Search Asset',
          text: "Input part name of Asset",
          input: 'text',
          inputValue:valueStep[step],
          showCancelButton: true,
          showDenyButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Next',
          cancelButtonText: 'Back'
        }).then((result) => {
          if (result.isConfirmed) {
            valueStep[step]=result.value;
            alertStepConfirm(3);
          }
          else{
            alertStepConfirm(1);
          }
        }) 
    }
    else if(step==3){
        var mySelect2=getAssetData(valueStep[1],valueStep[2]);
        Swal.fire({
          title: 'Search Asset',
          text: "Choose Asset",
          input: 'select',
          inputOptions:mySelect2,
          showCancelButton: true,
          showDenyButton: false,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Search',
          cancelButtonText: 'Back'
        }).then((result) => {
          if (result.isConfirmed) {
            valueStep[step]=result.value;
            asset_cam=result.value;
            form_checklist_asset(result.value);
          }
          else{
            alertStepConfirm(2);
          }
        }) 
    }
}

function getDepartment(){
     var result={};
     // result['']='-';
     $.ajax({
        type: "POST",
        url:glo_url+"data_extra.php",
        data:{'action':'getDepartment'},
        crossDomain:true,
        cache:false,
        async:false,
        dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            for(var key in data){
                result[key]=data[key];
            }
        }
    })
     return result;
}

function getAssetData(dept,assetName){
     var result={};
     // result['']='-';
     $.ajax({
        type: "POST",
        url:glo_url+"data_extra.php",
        data:{'action':'getAsset','dept':dept,'assetName':assetName},
        crossDomain:true,
        cache:false,
        async:false,
        dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            for(var key in data){
                result[key]=data[key];
            }
        }
    })
     return result;
}

function form_checklist_asset(asset){
    $('#cam_inv').hide();
    $('#back').show();
    $('#save').show(); 
    var user = localStorage.getItem('user');
    var dataString = {'id':'no', 'asset':asset,'user':user, cekUser:cek_user()};  
    //--------Hapus id list WO--------------
    $("#data_content").empty();
    $.ajax({
        type: "POST",
        url:glo_url+"form_checklist.php",
        data:dataString,
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

function reset(count,defVal){
    $('#containerA_'+count).css({'font-size':'11px','display': 'inline-block'});
    $('#containerB_'+count).css({'font-size':'11px','display': 'none'});
    $('#list_'+count).val(defVal);
}

function Accept_Yes(count){
    // $('#'+container).empty();
    //var containerB=container.replace('containerA','containerB');
    $('#containerA_'+count).css({'font-size':'11px','display': 'none'});
    $('#containerB_'+count).css({'font-size':'11px','display': 'inline-block'});

}

function Accept_No(count){
    Swal.fire({
      title: 'Reject this item?',
      text: "Input your reason",
      input: 'text',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        $('#list_'+count).val(result.value);
        $('#containerA_'+count).css({'font-size':'11px','display': 'none'});
        $('#containerB_'+count).css({'font-size':'11px','display': 'inline-block'});
      }
    })   
}

function change_to_disapprove(id,user,date,asset){
    if(id==''){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: 'Cannot be changed to <b>DISAPPROVED</b> because did not have form!'
        })
    }
    else{
        Swal.fire({
          title: 'Confirmation',
          html:'Are you sure want to <b>DISAPPROVE</b> this Form?',
          icon: 'warning',
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#d33',
          confirmButtonText: 'Yes',
          denyButtonText:'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            var dataString = {'id':id,'action':'disapproveChecklist','user':user,'date':date};  
            // $("#data_content").empty();
            $.ajax({
                type: "POST",
                url:glo_url+"data_extra.php",
                data:dataString,
                crossDomain:true,
                cache:false,
                async:false,
                beforeSend: function(){
                    
                },
                success:function(data){
                    Swal.fire({
                      icon: 'success',
                      title: 'SUCCESS',
                      html: 'Your <b>DISAPPROVED</b> is Success!'
                    });
                    form_checklist_asset(asset);
                }
            })
          }
        })    
    }  
}

function change_to_approve(id,user,date,asset){
    if(id==''){
        Swal.fire({
          icon: 'error',
          title: 'Error',
          html: 'Cannot be changed to <b>APPROVED</b> because did not have form!'
        })
    }
    else{
        Swal.fire({
          title: 'Confirmation',
          html:'Are you sure want to <b>APPROVE</b> this Form?',
          icon: 'warning',
          showCancelButton: false,
          showDenyButton: true,
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#d33',
          confirmButtonText: 'Yes',
          denyButtonText:'Cancel'
        }).then((result) => {
          if (result.isConfirmed) {
            var dataString = {'action':'approveChecklist','id':id, 'user':user,'date':date};  
            // $("#data_content").empty();
            $.ajax({
                type: "POST",
                url:glo_url+"data_extra.php",
                data:dataString,
                crossDomain:true,
                cache:false,
                async:false,
                beforeSend: function(){
                    
                },
                success:function(data){
                    Swal.fire({
                      icon: 'success',
                      title: 'SUCCESS',
                      html: 'Your <b>APPROVED</b> is Success!'
                    });
                    form_checklist_asset(asset);
                }
            })
          }
        })    
    }
       
}

function current_status(status){
  if(status=='approve'){
    Swal.fire({
      icon: 'info',
      title: 'STATUS',
      html: 'Your Status is already <b>APPROVED</b>!'
    })
  }
  else{
    Swal.fire({
      icon: 'info',
      title: 'STATUS',
      html: 'Your Status is already <b>DISAPPROVED</b>!'
    })
  }
}

//===========Tombol Back============//
function backCL(){
    $("#data_content").empty();
    pageDailyCheck();
}

//==========Tombol Save ===============//
function saveCL(){
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
    var type = $('#type').val();
    var user = localStorage.getItem('user');
    var dataHis = {'id_checklist':id_checklist, 'id_value':id_value, 'id_history':id_history, 'type':type,'user':user}; //alert(id_checklist);
    
    $.ajax({
        type: "POST",
        url:glo_url+"update_daily_checklist.php",
        data:dataHis,
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            if(asset_cam==''){
                form_checklist(id_history,'no');
            }else{
                form_checklist_asset(asset_cam);
            }
            Swal.fire(
                  'Saved!',
                  'Your checklist has been updated',
                  'success' 
            )
        }
    })
    
}

function clickScan(){
    // form_checklist_asset('AS000012');
    // asset_cam='AS000012';
    // Swal.fire(
    //               'MAINTENANCE!',
    //               'This function is under MAINTENANCE',
    //               'info' 
    // )

    $("#data_content").empty();
        window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    
        //Handle Errors
        if(err) {
            // $("#data_content").empty();
            pageDailyCheck();
        };
        
        //Do something with the data.
        var id = result;
        asset_cam=id;
        form_checklist_asset(id);
          
        
    });
}

//Detail history inspection
function pageHistory(varpass){ 
    $("#the_head").text("History Inspection");
    $("#detail_asset_window").hide();
    $("#addAssetButton").hide();
    $("#backButton").hide();
    $("#searchAssetButton").hide();

    $('#data_content').empty();
    //get_asset_page('historyInspection');  
	
	//======Mendefinisikan id baru di dalam id data content
	$('#data_content').append('<div id="data_content_option"></div><div id="data_content_append"></div>');
	
	$.ajax({
        type: 'POST',
		url:glo_url+"get_page.php",
		data:{'page':'historyInspectionOption'},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
			
        },
        success:function(data){
            $("#data_content_option").append(data);
			if(varpass!=''){
				$('#his_asset').val(varpass);
			}
			$('#his_asset').select2();
			//Ketika data_content_option on change
			$('#his_asset').on('change',function(){
				$('#data_content_append').empty();
				var opAsset = $('#his_asset').val();
				pageHistory(opAsset);
			})
        }
    })
	
	get_full_calender(varpass);
}

function get_full_calender(varpass){ //alert(varpass);
	let today = new Date().toISOString().slice(0, 10);
	$('#data_content_append').fullCalendar({
		header: {
			left: 'prev,next today',
			center: 'title',
			right: 'month,agendaWeek,agendaDay,listWeek'
		},
		defaultDate: today,
		navLinks: true, // can click day/week names to navigate views
		displayEventTime: false,
		//weekNumbers: true,
		weekNumbersWithinDays: true,
		weekNumberCalculation: 'ISO',
		textColor: 'white',

		editable: true,
		eventLimit: true, 
		height : 500,
		events: {
			type: 'POST',
			url:glo_url+"get_page.php",
			data:{'page':'historyInspection','assetid':varpass},
			error: function() {
				$('#script-warning').show();
			}
		},
		eventTextColor: 'white',
		eventRender: function(event, element) {
			$(element).find('.fc-time').remove();
		},
		eventClick: function(info) {
			//alert(info.AssetID+' '+info.date);
			$("#data_content").empty();
			var user = localStorage.getItem('user');
			var dataString = {'id':'no','asset':info.AssetID, 'infoDate':info.date ,'user':user, cekUser:cek_user()}; 
			 $.ajax({
				type: "POST",
				url:glo_url+"form_checklist.php",
				data:dataString,
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
	});
}