var idgroup='';
var substatus='';
var myuser='';
var tabType='';
var global_tab_wo='';
var global_filter_wo='';

function get_id_group(){
    myuser=localStorage.getItem('user');
	 $.ajax({
        type: "POST",
        url:glo_url+"initial.php",
        data:{'cek':'getidgroup','username':localStorage.getItem('user')},
        crossDomain:true,
        cache:false,
        async:false,
        // dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            // closeLoading();
            idgroup=data;  
            console.log("USER : "+cek_user());
        }
    })
}

function cek_user(){
    if(idgroup=='GROUP181120033150')
        return 'admin';
    else if(idgroup=='GROUP181120025602')
        return 'spvmtn';
    else if(idgroup=='GROUP200926105919')
        return 'purch';
    else if(idgroup=='GROUP200927074425')
        return 'mgrarea';
    else if(idgroup=='GROUP201103104941')
        return 'tech';
    else if(idgroup=='GROUP211201015252')
        return 'mgrmtn';
    else if(idgroup=='GROUP211201085307')
        return 'spvarea';
}

function get_worktrade_id(){
    var result='';
    $.ajax({
        type: "POST",
        url:glo_url+"initial.php",
        data:{'cek':'getworktradeid','username':localStorage.getItem('user')},
        crossDomain:true,
        cache:false,
        async:false,
        // dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            result=data;
        }
    })
    return result;   
}

function get_employee_id(){
    var result='';
    $.ajax({
        type: "POST",
        url:glo_url+"initial.php",
        data:{'cek':'getemployeeid','username':localStorage.getItem('user')},
        crossDomain:true,
        cache:false,
        async:false,
        // dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            result=data;
        }
    })
    return result;   
}

function get_user_dept(){
    var result='';
    $.ajax({
        type: "POST",
        url:glo_url+"initial.php",
        data:{'cek':'getemployeeid','username':localStorage.getItem('user')},
        crossDomain:true,
        cache:false,
        async:false,
        // dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            result=data;
        }
    })
    return result;   
}

function list_crea(){
    list_wo_tab('created');
    $("#creaTab").removeClass("bg-warning").addClass("amber-900");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");

}
function list_conf(){
    list_wo_tab('confirm');
    $("#confTab").removeClass("bg-warning").addClass("amber-900");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");
}
function list_plan(){
    list_wo_tab('plan');
    $("#planTab").removeClass("bg-warning").addClass("amber-900");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");
}
function list_acce(){
    list_wo_tab('accept');
    $("#acceTab").removeClass("bg-warning").addClass("amber-900");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");
}
function list_exec(){
    list_wo_tab('exec');
    $("#execTab").removeClass("bg-warning").addClass("amber-900");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");
}
function list_jfin(){
    list_wo_tab('jfin');
    $("#jfinTab").removeClass("bg-warning").addClass("amber-900");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");
}
function list_clos(){
    list_wo_tab('closed');
    $("#closTab").removeClass("bg-warning").addClass("amber-900");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");
}
function list_all(){
    list_wo_tab('allstate');
    $("#allTab").removeClass("bg-warning").addClass("amber-900");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");
}
function list_done(){
    list_wo_tab('done');
    $("#doneTab").removeClass("bg-warning").addClass("amber-900");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");
    $("#revTab").removeClass("amber-900").addClass("bg-warning");

}
function list_rev(){
    list_wo_tab('revise');
    $("#revTab").removeClass("bg-warning").addClass("amber-900");
    $("#confTab").removeClass("amber-900").addClass("bg-warning");
    $("#planTab").removeClass("amber-900").addClass("bg-warning");
    $("#acceTab").removeClass("amber-900").addClass("bg-warning");
    $("#execTab").removeClass("amber-900").addClass("bg-warning");
    $("#jfinTab").removeClass("amber-900").addClass("bg-warning");
    $("#closTab").removeClass("amber-900").addClass("bg-warning");
    $("#allTab").removeClass("amber-900").addClass("bg-warning");
    $("#doneTab").removeClass("amber-900").addClass("bg-warning");
    $("#creaTab").removeClass("amber-900").addClass("bg-warning");

}

function cekWoTab(){
    if(cek_user()=='admin'){
        list_wo_tab('created');
    }
    else if(cek_user()=='spvmtn'){
        list_wo_tab('confirm');
    }
    else if(cek_user()=='purch'){
        list_wo_tab('plan');
    }
    else if(cek_user()=='mgrarea'){
        list_wo_tab('allstate');
    }
    else if(cek_user()=='tech'){
        list_wo_tab('exec');
    }
    else if(cek_user()=='mgrmtn'){
        list_wo_tab('allstate');
    }
    else if(cek_user()=='spvarea'){
        list_wo_tab('allstate');
    }

}



function list_wo_tab(tab){
    // console.log('Global Perevntive : '+global_preventive);
    global_tab_wo=tab;
    tabType=tab;
    preventiveCheck='wo';
    $("#the_head").text("Work Order");
    $("#addAssetButton").show();
    $("#backButton").hide();
    $("#searchAssetButton").show();


    $("#data_content").empty();
    $('#cam_inv').show();
    $('#back').hide();
    $('#save').hide();
    // console.log('USER : '+cek_user());
    // console.log('worktradeid : '+get_worktrade_id())
    console.log('employee : '+get_employee_id());
    var assetid = assetid;
    $.ajax({
        type: "POST",
        url:glo_url+"wo.php",
        data:{'userPermit':cek_user(),'global_preventive':global_preventive,'statuswo':tab,'global_filter_wo':global_filter_wo,'worktradeid':get_worktrade_id(),'username':localStorage.getItem('user')},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            $("#data_content").append(data);
            countTabStatus();
            $("#revTab").hide();
            if(cek_user()=='admin'){
                $("#allTab").hide();
                $("#creaTab").removeClass("bg-warning").addClass("amber-900");
            }
            else if(cek_user()=='spvmtn'){
                $("#creaTab").hide();
                $("#allTab").hide();
                // $("#closTab").hide();
                // $("#doneTab").hide();
                $("#confTab").removeClass("bg-warning").addClass("amber-900");
            }
            else if(cek_user()=='purch'){
                $("#tablistwo").hide();
                $("#revTab").hide();
            }
            else if(cek_user()=='mgrarea'){
                $("#confTab").hide();
                $("#planTab").hide();
                $("#acceTab").hide();
                $("#execTab").hide();
                $("#jfinTab").hide();
                $("#closTab").hide();
                $("#doneTab").hide();
                $("#revTab").hide();
                $("#allTab").removeClass("bg-warning").addClass("amber-900");
            }
            else if(cek_user()=='tech'){
                $("#allTab").hide();
                $("#confTab").hide();
                $("#planTab").hide();
                $("#creaTab").hide();
                $("#doneTab").hide();
                $("#execTab").removeClass("bg-warning").addClass("amber-900");
            }
            else if(cek_user()=='mgrmtn'){
                $("#creaTab").hide();
                $("#confTab").hide();
                $("#acceTab").hide();
                $("#jfinTab").hide();
                $("#doneTab").hide();
                $("#revTab").hide();
                $("#allTab").removeClass("bg-warning").addClass("amber-900");
            }
            else if(cek_user()=='spvarea'){
                $("#confTab").hide();
                $("#planTab").hide();
                $("#acceTab").hide();
                $("#execTab").hide();
                $("#creaTab").hide();
                $("#closTab").hide();
                $("#jfinTab").hide();
                $("#allTab").removeClass("bg-warning").addClass("amber-900");
            }
        }
    })
}

function approve_wo(woid){
    Swal.fire({
      title: 'Are you sure want to approve this WO?',
      // text: "You won't be able to revert this!",
      // icon: 'warning',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Approve it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // console.log(woid);
        var mySelect=getWorkSubStatus(woid);
        Swal.fire(
          {
              title:'Select Sub Status',
              input:'select',
              inputOptions:mySelect,
              // inputPlaceholder: 'Select ',
              showCancelButton: true
          }
        ).then(function(result){
            substatus=result.value;
            $.ajax({
                type: "POST",
                url:glo_url+"form_request.php",
                data:{'form':'editwo','woid':woid,'isApprove':'yesApproved'},
                crossDomain:true,
                cache:false,
                async:false,
                beforeSend: function(){
                    loading('Please wait...');
                },
                success:function(data){
                    closeLoading();
                    $("#data_content").empty();
                    $("#data_content").append(data);
                    $('#formDownEdit').hide();
                    deleteCauseList();
                    deleteSparepartList();
                    getdropDownSpare("xxx");
                    initArr();
                }
            })
        })

      }
    })   
}

function cancel_wo(woid){
    Swal.fire({
      title: 'Cancel this WO?',
      text: "Input your reason",
      input: 'text',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Yes, Cancel it!'
    }).then((result) => {
      if (result.isConfirmed) {
        cancelUpdate(woid,result.value);
      }
    })   
}

function cancelUpdate(woid,causecancel){
     $.ajax({
        type: "POST",
        url:glo_url+"wo_status.php",
        data:{'action':'substatuscancel','woid':woid,'causecancel':causecancel},
        crossDomain:true,
        cache:false,
        async:false,
        // dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            if(data=='Success'){
                Swal.fire(
                  'Canceled!',
                  'Your WO has been canceled',
                  'success'
                )
                update_state_wo(woid);    
            }
            else{
                Swal.fire(
                  'Canceled!',
                  'Your WO Failed to cancel, try again',
                  'error'
                )
            }
                
        }
    })
}

function approveUpdate(woid){
     $.ajax({
        type: "POST",
        url:glo_url+"wo_status.php",
        data:{'action':'substatusapprove','woid':woid,'substatus':substatus},
        crossDomain:true,
        cache:false,
        async:false,
        // dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            if(data=='Success'){
                Swal.fire(
                  'Saved!',
                  'Your WO has been Saved',
                  'success'
                )
                update_state_wo(woid);    
            }
            else{
                Swal.fire(
                  'Canceled!',
                  'Your WO Failed to cancel, try again',
                  'error'
                )
            }
                
        }
    })
}

function getWorkSubStatus(woid){
     var result={};
     result['']='-';
     $.ajax({
        type: "POST",
        url:glo_url+"wo_status.php",
        data:{'action':'getsubstatus','woid':woid},
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

function show3d(setPage){
    global_page='threed';
    $("#the_head").text("3D Object");
    $("#addAssetButton").hide();
    $("#searchAssetButton").hide();
    $('#the_head').show();
    $('#settingButton').show()
    if(setPage!=''){
        $("#backButton").show();   
    }
    else{
        $("#backButton").hide();
    }
    $("#data_content").empty();
    $.ajax({
            type: "POST",
            url:glo_url+"threeD.php",
            data:{'url':glo_url,'setPage':setPage},
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
}

function showDocument(setPage){
    global_page='threed';
    $("#the_head").text("Document");
    $("#addAssetButton").hide();
    $("#searchAssetButton").hide();
    $('#the_head').show();
    $('#settingButton').show()
    if(setPage!=''){
        $("#backButton").show();   
    }
    else{
        $("#backButton").hide();
    }
    $("#data_content").empty();
    $.ajax({
            type: "POST",
            url:glo_url+"document.php",
            data:{'url':glo_url},
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
}

function getFileData(link){
    var fileUrl=glo_url.replace("wo/","Sisoft/")+link;
    var filename = fileUrl.substring(fileUrl.lastIndexOf('/')+1);
    // alert(filename);
    var fileTransfer = new FileTransfer();
    var path = cordova.file.externalRootDirectory + 'Download/';
     fileTransfer.download(
        fileUrl,
        path + filename,
        function(theFile) {
            Swal.fire(
                  'Download Success',
                  "download complete: " + theFile.toURI(),
                  'success'
            )
        },
        function(error) {              
            Swal.fire(
                  'Download Failed',
                  'Error to download file',
                  'error'
            )
        }
    );
}

function inspection(area){
    Swal.fire({
      title: 'Inspection for '+area,
      text: "Input your result",
      input: 'text',
      showCancelButton: false,
      showDenyButton: true,
      confirmButtonColor: '#3085d6',
      denyButtonColor: '#d33',
      confirmButtonText: 'Yes, Send it!'
    }).then((result) => {
      if (result.isConfirmed) {
        // cancelUpdate(woid,result.value);
      }
    })   
}

function getFormSparepart(){
   $('#formUpEdit').hide(500);
   $('#formDownEdit').show(500);
}

function getFormManpower(){
   $('#formUpEdit').hide(500);
   $('#formManpowerEdit').show(500);
}

function getFormWo(){
   $('#formUpEdit').show(500);
   $('#formDownEdit').hide(500);
   $('#formManpowerEdit').hide(500);    
}

function addManPowerEvent(woid){
     var employee_man=$('#empname').val();
     var work_load=$('#wload').val();
     console.log('EMPLOYEE : '+employee_man);
     console.log('Work Load : '+work_load);
     $.ajax({
        type: "POST",
        url:glo_url+"update_stage.php",
        data:{'update':'addManPower','woid':woid,'employee_man':employee_man,'work_load':work_load},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            console.log('HASIL : '+data);
            $('#manpowerContent').empty();
            refreshManPower(woid);
        }
    })
}

function delManPowerEvent(woid,employee_man,start){
     $.ajax({
        type: "POST",
        url:glo_url+"update_stage.php",
        data:{'update':'delManPower','woid':woid,'employee_man':employee_man,'start':start},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            console.log('HASIL : '+data);
            $('#manpowerContent').empty();
            refreshManPower(woid);
        }
    })
}

function refreshManPower(woid){
    $.ajax({
        type: "POST",
        url:glo_url+"update_stage.php",
        data:{'update':'refreshManPower','woid':woid},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            // console.log(data);
            $('#manpowerContent').append(data);
        }
    })
}

function changeStatusManpower(){
    if($('#wstate').val()=='WS000020'){
            $('#manpowerField').show();
    }
    else{
        $('#manpowerField').hide();
    }
}

function pushnotif(){
    // myuser=localStorage.getItem('user');
     $.ajax({
        type: "POST",
        url:glo_url+"pushnotif.php",
        data:{'url':glo_url},
        crossDomain:true,
        cache:false,
        async:false,
        // dataType:'json',
        beforeSend: function(){
               // loading('Please wait...');
            
        },
        success:function(data){
            alert("message SEND");
        }
    })
}

function myNotifSignal(notifMessage){
    console.log("NOTIFKU : "+JSON.stringify(notifMessage.notification));
    console.log("BODY : "+JSON.stringify(notifMessage.notification.body));
    console.log("TITLE : "+JSON.stringify(notifMessage.notification.title));
    // var arrMessage=JSON.parse(notifMessage);
    // console.log("JSONARR : "+arrMessage);
}

function countTabStatus(){
    // console.log('GLOBAL FILTER COUNT : '+global_filter_wo);
    $.ajax({
        type: "POST",
        url:glo_url+"wo_extra.php",
        data:{'choose':'countTabStatus','global_preventive':global_preventive,'global_filter_wo':global_filter_wo,'username':localStorage.getItem('user'),'userPermit':cek_user()},
        dataType:'json',
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            // console.log('Jumlah Array : '+JSON.stringify(data));
            var sig_created=JSON.stringify(data.created);
            var sig_confirm=JSON.stringify(data.confirm);
            var sig_plan=JSON.stringify(data.plan);
            var sig_accept=JSON.stringify(data.accept);
            var sig_exec=JSON.stringify(data.exec);
            var sig_jfin=JSON.stringify(data.jfin);
            var sig_done=JSON.stringify(data.done);
            var sig_all=JSON.stringify(data.all);
            var sig_rev=JSON.stringify(data.revise);

            $('#creaTab').attr('data-badge',sig_created);
            $('#confTab').attr('data-badge',sig_confirm);
            $('#planTab').attr('data-badge',sig_plan);
            $('#acceTab').attr('data-badge',sig_accept);
            $('#execTab').attr('data-badge',sig_exec);
            $('#jfinTab').attr('data-badge',sig_jfin);
            $('#doneTab').attr('data-badge',sig_done);
            $('#allTab').attr('data-badge',sig_all);
            $('#revTab').attr('data-badge',sig_rev);

            $('#closTab').removeClass('badge-notif');
            $('#allTab').removeClass('badge-notif');
            
            if(sig_created==0){
                $('#creaTab').removeClass('badge-notif');
            }
            else if(sig_confirm==0){
                $('#confTab').removeClass('badge-notif');   
            }
            else if(sig_plan==0){
                $('#planTab').removeClass('badge-notif');   
            }
            else if(sig_accept==0){
                $('#acceTab').removeClass('badge-notif');   
            }
            else if(sig_exec==0){
                $('#execTab').removeClass('badge-notif');   
            }
            else if(sig_jfin==0){
                $('#jfinTab').removeClass('badge-notif');   
            }
            else if(sig_done==0){
                $('#doneTab').removeClass('badge-notif');   
            }
            else if(sig_rev==0){
                $('#revTab').removeClass('badge-notif');   
            }

            // $('#creaTab').removeClass('badge-notif');//WS000001
            // $('#confTab').removeClass('badge-notif');//WS000010 
            // $('#planTab').removeClass('badge-notif');//WS000012
            // $('#acceTab').removeClass('badge-notif');//WS000020 
            // $('#execTab').removeClass('badge-notif');//WS000019
            // $('#jfinTab').removeClass('badge-notif');//WS000023
            // $('#doneTab').removeClass('badge-notif');//WS000025 
            if(cek_user()=='spvmtn'){
                $('#creaTab').removeClass('badge-notif');//WS000001
                $('#acceTab').removeClass('badge-notif');//WS000020 
                // $('#execTab').removeClass('badge-notif');//WS000019
                $('#doneTab').removeClass('badge-notif');//WS000025 
            }
            else if(cek_user()=='mgrarea'){
                $('#confTab').removeClass('badge-notif');//WS000010 
                $('#planTab').removeClass('badge-notif');//WS000012
                $('#acceTab').removeClass('badge-notif');//WS000020 
                $('#execTab').removeClass('badge-notif');//WS000019
                $('#jfinTab').removeClass('badge-notif');//WS000023
                $('#doneTab').removeClass('badge-notif');//WS000025 
            }
            else if(cek_user()=='tech'){
                $('#creaTab').removeClass('badge-notif');//WS000001
                $('#confTab').removeClass('badge-notif');//WS000010 
                $('#planTab').removeClass('badge-notif');//WS000012
                $('#jfinTab').removeClass('badge-notif');//WS000023
                $('#doneTab').removeClass('badge-notif');//WS000025 
            }
            else if(cek_user()=='mgrmtn'){
                $('#allTab').addClass('badge-notif');
            }
            else if(cek_user()=='purch'){

            }
            else if(cek_user()=='spvarea'){
                $('#creaTab').removeClass('badge-notif');//WS000001
                $('#confTab').removeClass('badge-notif');//WS000010 
                $('#planTab').removeClass('badge-notif');//WS000012
                $('#acceTab').removeClass('badge-notif');//WS000020 
                $('#execTab').removeClass('badge-notif');//WS000019
                $('#jfinTab').removeClass('badge-notif');//WS000023
            }
            
        }
    })
}

function filterTime(){
    var contentFilter='';
    $.ajax({
        type: "POST",
        url:glo_url+"wo_extra.php",
        data:{'choose':'filter_wo','global_filter_wo':global_filter_wo},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            
        },
        success:function(data){
            contentFilter=data;
        }
    })
    Swal.fire({
        title: 'Choose Filter PM',
        html: contentFilter,
        focusConfirm: false,
        showCancelButton: true,
        preConfirm: () => {
            if(document.getElementById('day').checked)
                global_filter_wo='day';
            else if(document.getElementById('week').checked)
                global_filter_wo='week';
            else if(document.getElementById('month').checked)
                global_filter_wo='month';
            else if(document.getElementById('year1').checked)
                global_filter_wo='year1';
            else if(document.getElementById('year2').checked)
                global_filter_wo='year2';
            else if(document.getElementById('year3').checked)
                global_filter_wo='year3';
            else if(document.getElementById('year4').checked)
                global_filter_wo='year4';
            else if(document.getElementById('year5').checked)
                global_filter_wo='year5';
            else if(document.getElementById('backlog').checked)
                global_filter_wo='backlog';
            
            console.log('GLOBAL TAB : '+global_tab_wo);
            console.log('GLOBAL FILTER : '+global_filter_wo);

            if(global_tab_wo=='created')
                list_crea();
            else if(global_tab_wo=='confirm')
                list_conf();
            else if(global_tab_wo=='plan')
                list_plan();
            else if(global_tab_wo=='accept')
                list_acce();
            else if(global_tab_wo=='exec')
                list_exec();
            else if(global_tab_wo=='jfin')
                list_jfin();
            else if(global_tab_wo=='closed')
                list_clos();
            else if(global_tab_wo=='allstate')
                list_all();
            else if(global_tab_wo=='done')
                list_done();
            else if(global_tab_wo=='revise')
                list_rev();

        }
    });
}

function getAccess(){
    var result;
    $.ajax({
        type: "POST",
        url:glo_url+"initial.php",
        data:{'cek':'getAccess','username':localStorage.getItem('user')},
        dataType:'json',
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            
        },
        success:function(data){
            result=data;
        }
    })
    return result;   
}