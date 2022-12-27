
var global_page='home';
var searchidf='searchbyasset';
var checkDetailAsset=false;
var global_asset;
var current_page="home";
var global_preventive;
// var dataNotif;




$(document).ready(function(){
    homePageLoad();
    console.log('DOM READY');

    get_id_group();
    cekNotifCount();
    // getNotifDate();
    // console.log('WorkTradeID : '+get_worktrade_id());
    // if(cek_user()=='admin'||cek_user()=='level3'){
    //     getNotifUser();
    // }
    // else{
    //     $('#notifBadge').hide();
    //     $('#notifButton').hide();
    // }
    // getNotifUser();
});


function loadBody(){
    
    // codePush.notifyApplicationReady();
    // codePush.checkForUpdate(function (update) {
    //     if(!update){
            $('#updBadge').hide();
            $('#updBadge1').hide();
    //     }
    //     else{
    //         $('#updBadge').show();
    //         $('#updBadge1').show();
    //     }
    // });
    // homePageLoad();
    // getNotifDate();
}

function cekNotifCount(){
    $.ajax({
        type: "POST",
        url:glo_url+"wo_extra.php",
        data:{'choose':'countWONotif','username':localStorage.getItem('user')},
        // dataType:'json',
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            // loading('Please wait...');
        },
        success:function(data){
            // closeLoading();
            // data=data+100;
            console.log('Jumlah Notif : '+data);
            // data=0;
            if(data!=0){
                $('#notifBadge').show();
                $('#notifButton').show();
            }                
            else{
                $('#notifBadge').hide();
                $('#notifButton').hide();
            }
        }
    })
}

function getNotifDate(){
    $.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':'cekDate'},
        dataType:'json',
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            var count=data.length;
            if(count!=0){
                $('#notifBadge').show();
                $('#notifButton').show();
                document.getElementById('notifBadge').innerHTML = count;
                myAlertCustom(count);
                //alert('There are '+count+' Newest WO that have change state')
                dataNotif=data;
                // console.log("MY NOTIF : "+dataNotif);
            }                
            else{
                $('#notifBadge').hide();
                $('#notifButton').hide();
            }
        }
    })
}

function getNotifUser(){
    console.log('USER : '+cek_user());
    $.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':'admin'},
        dataType:'json',
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            var count=data.length;
            if(count!=0){
                $('#notifBadge').show();
                $('#notifButton').show();
                document.getElementById('notifBadge').innerHTML = count;
                myAlertCustom(count);
                // console.log('MY NOTIFFFFF : '+count);
                dataNotif=data;
                localNotif(count);               

            }                
            else{
                $('#notifBadge').hide();
                $('#notifButton').hide();
            }
        }
    })
}

function localNotif(count){
    cordova.plugins.notification.local.schedule({
    title: 'Announcement',
    text:'There are '+count+' Newest WO',
    trigger: { in: 1, every: 'minute' }
    });
}

$('#notifButton').click(function(){
    $("#addAssetButton").hide();
    $("#backButton").show();
    $("#searchAssetButton").hide();
    $('#the_head').show();
    $('#settingButton').show();
    global_page="notif_page";
    $("#backButton").show();
    $("#the_head").text("Notifications");
    // console.log(dataNotif);
    $('#data_content').empty();
    // $.ajax({
    //     type: "POST",
    //     url:glo_url+"get_item.php",
    //     data:{'item':'findAssetDate','assetid' : dataNotif,'wo':'wo'},
    //     crossDomain:true,
    //     cache:false,
    //     async:false,
    //     beforeSend: function(){
    //         loading('Please wait...');
            
    //     },
    //     success:function(data){
    //         closeLoading();
    //         $('#data_content').append(data);
    //         notifContent();
    //     }
    // })
    $.ajax({
        type: "POST",
        url:glo_url+"wo_extra.php",
        data:{'choose':'woNotif','username':localStorage.getItem('user')},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
            
        },
        success:function(data){
            closeLoading();
            $('#data_content').append(data);
        }
    })
    // pushnotif();
});


function notifContent(){
    $('#list_wo').show();
    $('#list_pm').hide();
    preventiveCheck='wo';
    $("#notifwo").click(function(){
        $("#notifwo").removeClass("orange-800").addClass("white");
        $("#notifpm").removeClass("white").addClass("orange-800");
        $('#list_wo').show();
        $('#list_pm').hide();
        preventiveCheck='wo';
    });
    $("#notifpm").click(function(){
        $("#notifpm").removeClass("orange-800").addClass("white");
        $("#notifwo").removeClass("white").addClass("orange-800");
        $('#list_pm').show();
        $('#list_wo').hide();
        preventiveCheck='pm';
    });
}

function myAlertCustom(myVar){
    var content='';
    if(cek_user()=='admin'||cek_user()=='level3'){
        content=' WO that need approval';
    }
    Swal.fire({
      title: 'Announcement',
      text: 'There are '+myVar+content,
      // icon: 'info',
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      // cancelButtonColor: '#d33',
      confirmButtonText: 'Close'
    })   


    // alert({
    //     title:'Announcement',
    //     message:'There are '+myVar+' Newest WO that have change state',
    //     class:'red',
    //     buttons:[
    //       {
    //         label: 'OK',
    //         class:'text-white',
    //         onclick:function(){
    //           closeAlert();
    //         }
    //       },
    //       {
    //          label:'',
    //         class:'text-white',
    //         onclick:function(){
    //             closeAlert();
    //         }
    //       }
    //     ]
    //   });
}

function logout(){
     Swal.fire({
          title: 'Logout',
          text: "Are you sure want to logout ?",
          icon: 'warning',
          showCancelButton: true,
          showDenyButton: false,
          confirmButtonColor: '#3085d6',
          denyButtonColor: '#d33',
          confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem('user');
        window.location="index.html";
      }
    })   
        
}

$('#tab_home').click(function(){
    global_page='home';
    homePageLoad();
});
$('#tab_asset').click(function(){
    global_page='asset';
    assetPageLoad();
});
$('#tab_preventive').click(function(){
    global_page='preventive';
    preventivePageLoad();
});
$('#tab_inventory').click(function(){
    global_page='inventory';
    inventoryPageLoad();
});
$('#tab_profile').click(function(){
    logout();
    //drawChart();
    // getLocalAndon();
    global_page='profile';
    //profilePageLoad();
});

function assetTrigger(){
    $('#tab_asset')[0].click();
}

function andonTrigger(){
    getPageAndon();
}

function woTrigger(){
    $('#tab_preventive')[0].click();
    global_preventive='wo';
    cekWoTab();
}

function pmTrigger(){
    $('#tab_preventive')[0].click();
    global_preventive='pm';
    cekWoTab();
}

function topupTrigger(){
    $('#tab_inventory')[0].click();
    $("#data_content").empty();
    getStateTopup();
}

function movementTrigger(){
    if(!getAccess().includes('Inventory')){
        Swal.fire(
          'Access Denied !',
          'Your account cannot Access this function',
          'error'
        )
    }
    else{
        $('#tab_inventory')[0].click();
        // $("#data_content").empty();
        getStateMovement();
    }
}

function saveQrCode(base64encodedstring, assetid){
    $.ajax({
        type: "POST",
        url:glo_url+"save_qrcode.php",
        data:{'img_data':base64encodedstring, 'assetid':assetid},
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
}


// download QRCode
function screenshoot(textId,cekInsert){
    html2canvas($('#qrcode').get(0)).then(function (canvas) {
         var base64encodedstring = canvas.toDataURL("image/jpeg", 1);         
         if(cekInsert=='insert'){
            saveQrCode(base64encodedstring, textId);
         }
         $('#waButton').click(function(){
            window.plugins.socialsharing.shareViaWhatsApp('QR Code for Asset '+textId,base64encodedstring,'');
        })
        //alert(base64encodedstring);
        $('#emailButton').click(function(){
            window.plugins.socialsharing.shareViaEmail(
                '', // can contain HTML tags, but support on Android is rather limited:  http://stackoverflow.com/questions/15136480/how-to-send-html-content-with-image-through-android-default-email-client
                'QR Code for Asset '+textId,
                ['enter@email.com'], // TO: must be null or an array
                null, // CC: must be null or an array
                null, // BCC: must be null or an array
                ['"'+base64encodedstring+'"'], // FILES: can be null, a string, or an array
                onSuccess, // called when sharing worked, but also when the user cancelled sharing via email. On iOS, the callbacks' boolean result parameter is true when sharing worked, false if cancelled. On Android, this parameter is always true so it can't be used). See section "Notes about the successCallback" below.
                onError // called when sh*t hits the fan
              );
        })

        $('#galleryButton').click(function(){
        //     var newbase64=base64encodedstring.split(',')[1];
        //    // alert(newbase64);
        //     var params = {data: newbase64, prefix: 'myPrefix_', format: 'JPG', quality: 80, mediaScanner: true};
        //     window.imageSaver.saveBase64Image(params,
        //         function (filePath) {
        //             alert('File has been saved in the Gallery');
        //         },
        //         function (msg) {
        //             alert(msg);
        //         }
        //     );

        var permissions = cordova.plugins.permissions;
        permissions.requestPermission(permissions.WRITE_EXTERNAL_STORAGE, success, error); 
        function error() {
            alert('permission write storage denied');
        }
        
        function success( status ) {
        if( !status.hasPermission ) error();
        else{
            cordova.base64ToGallery(
                newbase64,
         
                {
                    prefix: 'img_',
                    mediaScanner: true
                },
         
                function(path) {
                    alert("File has been Saved");
                },
         
                function(err) {
                    alert(err);
                }
            );
        }
        }

        })
    });
}

$("#addAssetButton").click(function(){
    if(global_page=='asset'){
        addAsset();
        //testku();
    }
    else if(global_page=='preventive'){
        addwo();
    }
    else if(global_page=='inventory'){
        addJM();
    }
    
    $("#addAssetButton").hide();
    $("#backButton").show();
    $("#searchAssetButton").hide();
    $('#the_head').show();
    $('#settingButton').show();
});
$("#backButton").click(function(){
    if(global_page=='asset'){
        if(checkDetailAsset){
            detailAsset(global_asset);
        }else{
            getAsset(currentPage);
        }
        
    }
    else if(global_page=='preventive'){
        if(preventiveCheck=='wo'){
            // list_wo_tab('');
            cekWoTab();
        }
        else if(preventiveCheck=='pm'){
            list_pm('');
        }
    }
    else if(global_page=='inventory'){
        if(inventCheck=='topup'){
            getStateTopup();
        }
        else if(inventCheck=='movement'){
            getStateMovement();
        }
    }
    else if(global_page=='andon'){
        getPageAndon();
    }
    if(global_page=="notif_page"){
        $('#tab_home')[0].click();
        global_page='home';
        homePageLoad();
        // $("#addAssetButton").hide();
        // $("#searchAssetButton").hide();
        // $('#the_head').show();
        // $('#settingButton').show();
        // $("#backButton").show(); 
        // console.log('CEKKKK');          
    }
    else if(global_page=='threed'){
        $("#addAssetButton").hide();
        $("#searchAssetButton").hide();
        $('#the_head').show();
        $('#settingButton').show();
        $("#backButton").hide();
        show3d('');
    }
    
    // if(global_page!='andon'){
    //     $("#addAssetButton").show();
    //     $("#backButton").hide();
    //     $("#searchAssetButton").show();
    //     $('#the_head').show();
    //     $('#settingButton').show();    
    // }
    // else{
    //     $("#addAssetButton").hide();
    //     $("#backButton").hide();
    //     $("#searchAssetButton").hide();
    //     $('#the_head').show();
    //     $('#settingButton').show();    
    // }
    
});
$("#searchAssetButton").click(function(){
    //alertSearchForm();
    //$('#allHeader').hide();
    $('#the_head').hide();
    $('#settingButton').hide();
    $("#addAssetButton").hide();
    $("#backButton").show();
    $("#searchAssetButton").hide();
    $('#searchBar').show();
    searchClick();
});

function homePageLoad(){
    $("#the_head").text("Asset Management");
    $("#addAssetButton").hide();
    $("#backButton").hide();
    $("#searchAssetButton").hide();
    $("#searchBar").hide();

    tab_active('#tab_home');
    $('#data_content').empty();
    $('#detail_asset_window').hide();
    $('#backButton').hide();
    $('#searchAssetButton').hide();
    $('#addAssetButton').hide();
    get_asset_page('home');
}

function assetPageLoad(){

    $("#addAssetButton").show();
    $("#backButton").hide();
    $("#searchAssetButton").hide();
    
    tab_active('#tab_asset');
    $('#data_content').empty();
    $('#detail_asset_window').hide();
    $('#backButton').hide();
    $('#searchAssetButton').show();
    $('#addAssetButton').show();
    getAsset(currentPage);
    countAsset();
}

function preventivePageLoad(){
    $("#the_head").text("Preventive");
    $("#detail_asset_window").hide();
    $("#addAssetButton").hide();
    $("#backButton").hide();
    $("#searchAssetButton").hide();

    $('#data_content').empty();
    tab_active('#tab_preventive');
    get_asset_page('preventive');
}

function inventoryPageLoad(){
    $("#the_head").text("Inventory");
    $("#detail_asset_window").hide();
    $("#addAssetButton").hide();
    $("#backButton").hide();
    $("#searchAssetButton").hide();

    $('#data_content').empty();
    tab_active('#tab_inventory');
    get_asset_page('inventory');
}

function profilePageLoad(){
    $("#the_head").text("Profile");
    $("#detail_asset_window").hide();
    $("#addAssetButton").hide();
    $("#backButton").hide();
    $("#searchAssetButton").hide();

    // $('#data_content').empty();
    // tab_active('#tab_profile');
    // get_asset_page('asset');
    logout();
    // getFormAddMove();
    //getFormStatusRepair()
    //checkStatusWO('AS000859');
}

function tab_active(tab){
    $('#the_head').show();
    $('#settingButton').show();
    $('#tab_home').removeClass('deep-orange-500');
    $('#tab_asset').removeClass('deep-orange-500');
    $('#tab_preventive').removeClass('deep-orange-500');
    $('#tab_inventory').removeClass('deep-orange-500');
    $('#tab_profile').removeClass('deep-orange-500');
    $(tab).addClass('deep-yellow-500');
}

function get_asset_page(page){
    global_filter_wo='';
    $.ajax({
        type: "POST",
        url:glo_url+"get_page.php",
        data:{'page':page},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            $("#data_content").append(data);
            if(page=='preventive'){
                // drawChartPreventive(100,50,20);
                get_data_wo();
            }
        }
    })
}

function searchClick(){
    $('#data_content').empty();

    var temp='';
    var content='';
    if(global_page=='preventive'){
        temp='<div class="buttons-group full"><button class="amber border-amber radius-left" id="searchByAsset">Search by Asset</button><button class="white border-amber radius-right" id="searchByWO">Search by WO</button></div>'
        searchidf='searchbyasset';
    }
    
    content='<div class="padding">'+temp+'<div class="item border-amber yellow-100 padding"><h5 style="text-align: center;">Search</h5><div class="form-group">               </br>               <input type="text" class="form-control" id="search_input" placeholder="type id or name of asset" aria-describedby="search_input"></br>               <button type="button" class="btn btn-primary btn-lg btn-block" id="search_non_qr">Search</button>               <button type="button" class="btn btn-secondary btn-lg btn-block" id="search_qr"><i class="fas fa-camera"></i></button>               <small id="textSerach" class="form-text text-muted">*Type id or name of asset in the box and click search, if you want search by QR Code click camera button</small>             </div></div>';
    
    $('#data_content').append(content);


    if(global_page=='preventive'){
        $("#searchByAsset").click(function(){
            $("#searchByAsset").removeClass("white border-amber").addClass("amber border-amber");
            $("#searchByWO").removeClass("amber border-amber").addClass("white border-amber");
            $('#labelID').text('Search by Asset');
            $('#search_input').attr('placeholder','type part name of asset');
            searchidf='searchbyasset';
        });
        $("#searchByWO").click(function(){
            $("#searchByWO").removeClass("white border-amber").addClass("amber border-amber");
            $("#searchByAsset").removeClass("amber border-amber").addClass("white border-amber");
            $('#labelID').text('Search by Work Order');
            $('#search_input').attr('placeholder','type part id of work order');
            searchidf='searchbywo';
        });
    }

    var method='';
    $('#search_non_qr').click(function(){
        method='nonqr';
        var item=$('#search_input').val();
        
        $("#data_content").empty();
        getSearchItem(method, item);
        

    });
    $('#search_qr').click(function(){
        method='withqr';
        
        $("#data_content").empty();
        scanQrExec(method);
        
    });

}

function scanQrExec(method){
   
    window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    
        //Handle Errors
        if(err){
            if(global_page=='asset'){
                if(checkDetailAsset){
                    detailAsset(global_asset);
                }else{
                    getAsset(currentPage);
                }
                
            }
            else if(global_page=='preventive'){
                if(preventiveCheck=='wo'){
                    list_wo('');
                }
                else if(preventiveCheck=='pm'){
                    list_pm('');
                }
            }
            else if(global_page=='inventory'){
                if(inventCheck=='topup'){
                    getStateTopup();
                }
                else if(inventCheck=='movement'){
                    getStateMovement();
                }
            }
            console.log("Canceled");
            return;
        }
        
        //Do something with the data.
        console.log(result);
        getSearchItem(method,result);
        
    });

    // cordova.plugins.barcodeScanner.scan(
    //     function(result){ 
    //         if(!result.cancelled){
                

                        
    //         }
    //         else{
    //             alert("Cancelled");	
    //         }
    //     },
    //     function(error){
    //             alert("Scanning failed: "+error);
    //     },
    //     {
    //         preferFrontCamera : false, // iOS and Android
    //         showFlipCameraButton : true, // iOS and Android
    //         showTorchButton : true, // iOS and Android
    //         torchOn: false, // Android, launch with the torch switched on (if available)
    //         prompt : "Place a barcode inside the scan area", // Android
    //         disableAnimations : true, // iOS
    //         disableSuccessBeep: false // iOS and Android
    //     }

    // )
    
}

function getSearchItem(method, item){
    var mypage=global_page;
    if(global_page=='inventory'){
        mypage=global_page+'_'+inventCheck;
    }
    else if(global_page=='preventive'){
        mypage=global_page+'_'+preventiveCheck;
    }
    console.log(method+'|'+item+'|'+mypage+'|'+searchidf);
    $('#data_content').empty();
    $.ajax({
        type: "POST",
        url:glo_url+"search_item.php",
        data:{'method':method, 'item':item, 'page':mypage,'searchidf':searchidf},
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

function drawChart(){
    $("#data_content").empty();
    var myCanvas='<canvas id="myChart"></canvas>';
    $("#data_content").append(myCanvas);

    var ctx = document.getElementById('myChart').getContext('2d');
    var chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'doughnut',

        // The data for our dataset
        data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
            datasets: [{
                label: 'My First dataset',
                backgroundColor: 'rgb(255, 99, 132)',
                borderColor: 'rgb(255, 99, 132)',
                data: [0, 10, 5, 2, 20, 30, 45]
            }]
        },

        // Configuration options go here
        options: {}
    });
}

function myCustomALert(myVar){
    alert({
        title:'Announcement',
        message:'There are '+myVar+' Asset that near Warranty Check',
        class:'red',
        buttons:[
          {
            label: 'OK',
            class:'text-white',
            onclick:function(){
              closeAlert();
            }
          },
          {
             label:'',
            class:'text-white',
            onclick:function(){
                closeAlert();
            }
          }
        ]
      });
}

function getUpdate(){
    codePush.checkForUpdate(function (update) {
        if (!update) {
            alert("The app is up to date.");
        } else {
            //alert("An update is available! Should we download it?");
            alert({
                title:'Announcement',
                message:'There are update available, do you want to download it ?',
                class:'red',
                buttons:[
                  {
                    label: 'YES',
                    class:'text-white',
                    onclick:function(){
                      codePush.sync(syncStatus, null, downloadProgress);
                      closeAlert();
                    }
                  },
                  {
                     label:'NO',
                    class:'text-white',
                    onclick:function(){
                        closeAlert();
                    }
                  }
                ]
              });
        }
    });
}

function syncStatus(status) {
    switch (status) {
        case SyncStatus.DOWNLOADING_PACKAGE:
            console.log("downloading 1");
            loading();
            break;
        case SyncStatus.INSTALLING_UPDATE:
            console.log("downloading 2");
            break;
        case SyncStatus.UPDATE_INSTALLED:
            closeLoading();
            alert('Please Restart the app for change the update');
            break;
    }
}

function downloadProgress(downloadProgress) {
    if (downloadProgress) {
    	// Update "downloading" modal with current download %
        console.log("Downloading " + downloadProgress.receivedBytes + " of " + downloadProgress.totalBytes);
    }
}

function myScan(){
    window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    
        //Handle Errors
        if(err) {
            alert("THIS CANCELLED");
            return ;
        };
        
        //Do something with the data.
        alert(result);
        
    });
}