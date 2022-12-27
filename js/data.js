//=========Variabel global untuk semua fungsi di dalam javascript===
//var glo_url = 'http://localhost:4343/sisoft/page/wo/';
//var glo_url = 'https://cmms.greskit.com/wo/';

//=========Digunakan ketika dokumen pertama kali dibuka===
$(document).ready(function(){
    $(".loading").hide();
    $("#sub_header_wo").hide();
    $("#sub_header_pm").hide();
    $("#sub_header_inv").hide();
})

//===========Menu Work Order======================
//------ Form Update status WO --------------------
function update_state_wo(wo_number){
	//var user = localStorage.getItem('user');
    //--------Hapus id list WO--------------
    $("#list_wo").remove();
    //--------Hapus Combo boc--------------
    $("#combo_up").remove();
    // var dataString = {'wo':wo_number,'user':user}; 
    // $.ajax({
    //     type: 'POST',
    //     url:glo_url+"stage.php",
    //     data:dataString,
    //     crossDomain:true,
    //     cache:false,
    //     beforeSend: function(){
    //         $('.loading').show();
    //     },
    //     success:function(data){
    //         $('.loading').hide();
    //         $("#data_content").append(data);
    //     }
    // })

    var result="";
    var dataString = 'woid='+wo_number; 
     
    var user = localStorage.getItem('user');
    var dataString2 = {'wo':wo_number,'user':user};
    //--------Hapus id list WO--------------
    $("#data_content").empty();
    //--------Mendapatkan Update WO---------
    $.ajax({
        type: "POST",
        //url:glo_url+"detail_wo.php",
        url:glo_url+"stage.php",
        data:dataString2,
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            result+=data;
        }
    })
    $.ajax({
        type: "POST",
        url:glo_url+"detail_wo.php",
        //url:glo_url+"stage.php",
        data:dataString,
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
        }
    })
    result+="</br></br>";
    $("#data_content").append(result);
}

//------ Update status WO --------------------
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
            $('.loading').show();
        },
        success:function(data){
            alert('Success update '+data.WorkOrderNo+' to '+data.WorkStatus);
            //---Cek refresh id memanggil fungsi apa ---//
            var refresh = $('#refresh').attr('onClick');
            
            if(refresh=='openWO()'){
                openWO();
            }else if (refresh=="list_wo_stage('WS000001')"){
                list_wo_stage('WS000001');
            }else if (refresh=="list_wo_stage('WS000022')"){
                list_wo_stage('WS000022');
            }else if (refresh=="list_wo_stage('WS000020')"){
                list_wo_stage('WS000020');
            }else if(refresh=='openPM()'){
                openPM();
            }else if (refresh=="list_pm_stage('WS000001')"){
                list_pm_stage('WS000001');
            }else if (refresh=="list_pm_stage('WS000022')"){
                list_pm_stage('WS000022');
            }else if (refresh=="list_pm_stage('WS000020')"){
                list_pm_stage('WS000020');
            }else if (refresh=="openINV()"){
                openINV();
            }
        }
    })
}

//---- Jika menu wo di klik-----------
function openWO(){
    //----------Default Header----------------
    $("#approve_wo").removeClass("orange-900").addClass("orange-800");
    $("#job_plan_wo").removeClass("orange-900").addClass("orange-800");
    $("#open_wo").removeClass("orange-900").addClass("orange-800");
    //----------------------------------------

    //----------Default Footer----------------
    $("#tab_wo").addClass("active");
    $("#tab_pm").removeClass("active");
    $("#tab_inv").removeClass("active");
    //----------------------------------------

    //--------Hapus id combo box update--------------
    $("#combo_up").remove();
    //--------Hapus id list WO--------------
    $("#list_wo").remove();
    //--------Tampilkan sub header wo------
    $("#sub_header_wo").show();
    //--------Sembunyikan sub header pm-----
    $("#sub_header_pm").hide();
    //--------Sembunyikan sub header inv-----
    $("#sub_header_inv").hide();
    //--------Tambahkan teks pada menu title-
    $("#menu_title").text("Work Order");
    //--------Even yang dilakukan ketika tombol refresh di tekan ---
    $("#refresh").attr("onClick","openWO()");
    $.ajax({
        type: "POST",
        url:glo_url+"wo.php",
        data:"stage=",
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            $('.loading').show();
        },
        success:function(data){
            $('.loading').hide();
            $("#data_content").append(data);
        }
    })
}

//----- Jika sub menu open diklik------
$("#open_wo").click(function(){
    //----------Sub Header ketika ditekan open wo----------------
    $("#approve_wo").removeClass("orange-900").addClass("orange-800");
    $("#job_plan_wo").removeClass("orange-900").addClass("orange-800");
    $("#open_wo").removeClass("orange-800").addClass("orange-900");
    list_wo_stage('WS000001');
});

//----- Jika sub menu approve diklik------
$("#approve_wo").click(function(){
    $("#open_wo").removeClass("orange-900").addClass("orange-800");
    $("#job_plan_wo").removeClass("orange-900").addClass("orange-800");
    $("#approve_wo").removeClass("orange-800").addClass("orange-900");
    list_wo_stage('WS000022');
});

//----- Jika sub menu job planning diklik ----
$("#job_plan_wo").click(function(){
    $("#open_wo").removeClass("orange-900").addClass("orange-800");
    $("#approve_wo").removeClass("orange-900").addClass("orange-800");
    $("#job_plan_wo").removeClass("orange-800").addClass("orange-900");
    list_wo_stage('WS000020');
});

//----- Fungsi update list wo stage -----//
function list_wo_stage(stage){
     //--------Hapus id combo box update--------------
     $("#combo_up").remove();
     //--------Hapus id list WO--------------
     $("#list_wo").remove();
     //--------Tampilkan sub header wo------
     $("#sub_header_wo").show();
     //--------Sembunyikan sub header pm-----
     $("#sub_header_pm").hide();
     //--------Sembunyikan sub header inv-----
     $("#sub_header_inv").hide();
     //--------Tambahkan teks pada menu title-
     $("#menu_title").text("Work Order");
     //--------Even yang dilakukan ketika tombol refresh di tekan ---
     $("#refresh").attr("onClick","list_wo_stage('"+stage+"')");
     $.ajax({
        type: "POST",
        url:glo_url+"wo.php",
        data:"stage="+stage,
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            $('.loading').show();
        },
        success:function(data){
            $('.loading').hide();
            $("#data_content").append(data);
        }
    })
}

//????????????????????????????????????????????????????????????????????????????????????????????????//
//===========Menu PM======================
//---- Jika menu pm di klik-----------
function openPM(){
    //----------Default Header----------------
    $("#approve_pm").removeClass("orange-900").addClass("orange-800");
    $("#job_plan_pm").removeClass("orange-900").addClass("orange-800");
    $("#open_pm").removeClass("orange-900").addClass("orange-800");
    //----------------------------------------

    //----------Default Footer----------------
    $("#tab_wo").removeClass("active");
    $("#tab_pm").addClass("active");
    $("#tab_inv").removeClass("active");
    //----------------------------------------

    //--------Hapus id combo box update--------------
    $("#combo_up").remove();
    //--------Hapus id list WO--------------
    $("#list_wo").remove();
    //--------Tampilkan sub header wo------
    $("#sub_header_wo").hide();
    //--------Sembunyikan sub header pm-----
    $("#sub_header_pm").show();
    //--------Sembunyikan sub header inv-----
    $("#sub_header_inv").hide();
    //--------Tambahkan teks pada menu title-
    $("#menu_title").text("Preventive Maintenance");
    //--------Even yang dilakukan ketika tombol refresh di tekan ---
    $("#refresh").attr("onClick","openPM()");
    $.ajax({
        type: "POST",
        url:glo_url+"pm.php",
        data:"stage=",
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            $('.loading').show();
        },
        success:function(data){
            $('.loading').hide();
            $("#data_content").append(data);
        }
    })
}

//----- Jika sub menu open diklik------
$("#open_pm").click(function(){
    $("#approve_pm").removeClass("orange-900").addClass("orange-800");
    $("#job_plan_pm").removeClass("orange-900").addClass("orange-800");
    $("#open_pm").removeClass("orange-800").addClass("orange-900");
    list_pm_stage('WS000001');
});

//----- Jika sub menu approve diklik------
$("#approve_pm").click(function(){
    $("#open_pm").removeClass("orange-900").addClass("orange-800");
    $("#job_plan_pm").removeClass("orange-900").addClass("orange-800");
    $("#approve_pm").removeClass("orange-800").addClass("orange-900");
    list_pm_stage('WS000022');
});

//----- Jika sub menu job planning diklik ----
$("#job_plan_pm").click(function(){
    $("#open_pm").removeClass("orange-900").addClass("orange-800");
    $("#approve_pm").removeClass("orange-900").addClass("orange-800");
    $("#job_plan_pm").removeClass("orange-800").addClass("orange-900");
    list_pm_stage('WS000020');
});

//----- Fungsi update list pm stage -----//
function list_pm_stage(stage){
    //--------Hapus id combo box update--------------
    $("#combo_up").remove();
    //--------Hapus id list WO--------------
    $("#list_wo").remove();
    //--------Sembunyikan sub header wo------
    $("#sub_header_wo").hide();
    //--------Sembunyikan sub header pm-----
    $("#sub_header_pm").show();
    //--------Sembunyikan sub header inv-----
    $("#sub_header_inv").hide();
    //--------Sembunyikan sub header inv-----
    $("#sub_header_inv").hide();
    //--------Tambahkan teks pada menu title-
    $("#menu_title").text("Preventive Mainatenance");
    //--------Even yang dilakukan ketika tombol refresh di tekan ---
    $("#refresh").attr("onClick","list_pm_stage('"+stage+"')");
    $.ajax({
       type: "POST",
       url:glo_url+"pm.php",
       data:"stage="+stage,
       crossDomain:true,
       cache:false,
       beforeSend: function(){
           $('.loading').show();
       },
       success:function(data){
           $('.loading').hide();
           $("#data_content").append(data);
       }
   })
}


//????????????????????????????????????????????????????????????????????????????????????????????????//
//===========Menu INVENTORY======================
function openINV(){
     //----------Default Header----------------
     $("#cam_inv").removeClass("orange-900").addClass("orange-800");

    //----------Default Footer----------------
    $("#tab_wo").removeClass("active");
    $("#tab_pm").removeClass("active");
    $("#tab_inv").addClass("active");

    //--------Hapus id combo box update--------------
    $("#combo_up").remove();
    //--------Hapus id list WO--------------
    $("#list_wo").remove();
    //--------Tampilkan sub header wo------
    $("#sub_header_wo").hide();
    //--------Sembunyikan sub header pm-----
    $("#sub_header_pm").hide();
    //--------Sembunyikan sub header inv-----
    $("#sub_header_inv").show();
    //--------Tambahkan teks pada menu title-
    $("#menu_title").text("Spare Part");
    //--------Even yang dilakukan ketika tombol refresh di tekan ---
    $("#refresh").attr("onClick","openINV()");
    $.ajax({
        type: "POST",
        url:glo_url+"inventory.php",
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            $('.loading').show();
        },
        success:function(data){
            $('.loading').hide();
            $("#data_content").append(data);
        }
    })
}

//=======Open inventory =======================
function detail_inven(itemid){
    var dataString = 'itemid='+itemid; 
    //--------Hapus id list WO--------------
    $("#list_wo").remove();
    $.ajax({
        type: "POST",
        url:glo_url+"detail_inv.php",
        data:dataString,
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            $('.loading').show();
        },
        success:function(data){
            $('.loading').hide();
            $("#data_content").append(data);
        }
    })
}

//========Ketika scan qr code diaktifkan------
$("#cam_inv").click(function(){
        /*scanner plugin*/
		cordova.plugins.barcodeScanner.scan(
            function(result){ 
                if(!result.cancelled){
                    var id = result.text; 
                    detail_inven(id);        
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

//========Ketika Open new page------
document.addEventListener('openPage', function(e){
    $("#index").hide();
    //$("#data_content").empty();
})

document.addEventListener('backPage', function(e){
    $("#index").show();
})