
// $(document).ready(function(){
//     addAsset();
// });
var myImage='noimage';
var myQrCode='';
var tagInput;

function addAsset(){
    var myPage='';
    if(global_page=='asset'){
        $("#the_head").text("Add Asset");
        myPage=global_page;
    }
    else if(global_page=='inventory'){
        myPage=global_page+'_'+inventCheck;
        if(inventCheck=='topup'){
            $("#the_head").text("Add Top Up");
            getFormAddTopUp();
        }
        else if(inventCheck=='movement'){
            $("#the_head").text("Add Journal Movement");
            getFormAddMove();
        }
    }
    else if(global_page=='profile'){
        myPage='asset';
    }
	$('#refresh').hide();
	$('#cam_inv').hide();
	$('#back').show();
	$('#save').show();
	
	if(global_page!='inventory'){
        $('#data_content').empty();
        $.ajax({
            type: "POST",
            url:glo_url+"form_request.php",
            data:{'form':myPage},
            crossDomain:true,
            cache:false,
            async:false,
            beforeSend: function(){
                loading('Please wait...');
            },
            success:function(data){
                closeLoading();
                $("#data_content").append(data);
                //lert(data);
            }
        })
    }
    if(global_page=='asset'){
        hideAllInput_2();
    }
    else if(global_page=='profile'){
        newInput(tagInput);
    }
}
function adminInputAsset(){
    tagInput='admininput';
    addAsset();
}

function newInput(tag){
    var indexShow;
    var i;
    var numb="#input";
    if(tag=='admininput'){
        indexShow=[2,7,9,11,15,18,23,24];
    }
    else if(tag=='marketing'){
        indexShow=[3,4,5,12,13,14,16,17,19,20,22];
    }
    for(i=0;i<=24;i++){
        if(!indexShow.includes(i)){
            numb="#input"+i;
            $(numb).hide();
        }
        
    }

}


function hideAllInput(){
    var indexShow=[2,3,4,5,9,8,7,22,11,12,13,14,20,19,23,24,15,16,17,18,21];
    var i;
    var numb="#input";
    var index="#asset";

    for(i=0;i<=24;i++){
        numb="#input"+i;
        $(numb).hide();
    }
    i=0;
    $('#input'+indexShow[i]).show();
    cekButton(i);
    $("#buttonNext").click(function(){
        numb='#input';
              
        if(valueCheck(indexShow[i])){
            $(numb+indexShow[i]).hide();
            i++;
            cekButton(i);
            //alert(numb+indexShow[i]);
            $(numb+indexShow[i]).show();
        }
        
    });
    $("#buttonBack").click(function(){
        numb='#input';
        $(numb+indexShow[i]).hide();
        i--;
        cekButton(i);
        $(numb+indexShow[i]).show();  
    });  

    function valueCheck(i){
        var checkIndex=[2,22,13,14,15,19,20,16];
        if(checkIndex.includes(i)){
            if($('#asset'+i).val()==''){
                alert('Warning the field must be filled');
                return true;
            }
            else{
                return true;
            }
        }
        else{
            return true;
        }
    }

    //---cek tombol hide atau show
function cekButton(index){
    var indexShow=[2,3,4,5,9,8,7,22,11,12,13,14,20,19,23,24,15,16,17,18,21];
    if(index<=0){
        $("#buttonBack").hide();
        $("#buttonSave").hide();
    }
    else if(index>=indexShow.length-1){
        $("#buttonNext").hide();
        $("#buttonSave").show();
    }
    else{
        $("#buttonBack").show();
        $("#buttonNext").show();
        $("#buttonSave").hide();
    }
}



    $("#buttonSave").click(function(){

        var asset_no=$('#asset1').val();
        var asset_desc=$('#asset2').val();
        var areaComb=$('#asset3').children("option:selected").val();
        var plantComb=$('#asset4').children("option:selected").val();
        var locComb=$('#asset5').children("option:selected").val();
        var depComb=$('#asset6').children("option:selected").val();
        var acComb=$('#asset7').children("option:selected").val();
        var asComb=$('#asset8').children("option:selected").val();
        var crComb=$('#asset9').children("option:selected").val();
        var emComb=$('#asset10').children("option:selected").val();
        var suComb=$('#asset11').children("option:selected").val();
        var waComb=$('#asset12').children("option:selected").val();
        var manufacture=$('#asset13').val();
        var model_no=$('#asset14').val();
        var serial_no=$('#asset15').val();
        var warr_exp=$('#asset16').val();
        var warrant_notes=$('#asset17').val();
        var asset_notes=$('#asset18').val();
        var date_acq=$('#asset19').val();
        var date_dis=$('#asset20').val();
        var price=$('#asset22').val();
        var rec_date=$('#asset23').val();
        var warehouse=$('#asset24').children("option:selected").val();

        var dataString={'asset_no':asset_no,'asset_desc':asset_desc, 'areaComb':areaComb, 'plantComb':plantComb, 'locComb':locComb,
        'depComb':depComb, 'acComb':acComb, 'asComb':asComb, 'crComb':crComb, 'emComb':emComb,
        'suComb':suComb, 'waComb':waComb, 'manufacture':manufacture, 'model_no':model_no, 'serial_no':serial_no,
        'warr_exp':warr_exp, 'warrant_notes':warrant_notes, 'asset_notes':asset_notes, 'date_acq':date_acq,
        'date_dis':date_dis, 'image_asset':myImage, 'price':price, 'rec_date':rec_date, 'warehouse':warehouse};

        alert({
            title:'Save',
            message:'Are you sure want to save this to database ? ',
            buttons:[
              {
                label: 'Save',
                onclick: function(){
                    $.ajax({
                        type: "POST",
                        url:glo_url+"insert_asset.php",
                        data:dataString,
                        crossDomain:true,
                        cache:false,
                        async:false,
                        beforeSend: function(){
                            loading('Please wait...');
                        },
                        success:function(data){
                            if(data!='ErrorImagexxLoad'){
                                if(data!='ErrorInsertxxLoad'){
                                    generateQRCode(data, 'Adding Data is Success','insert');
                                    myImage='noimage';
                                    addChecklist(data);
                                }
                                else{
                                    alert('Failed to Insert Data');
                                }
                                
                            }
                            else{
                                alert('Failed To Insert Due To Image')
                            } 
                                                                                             
                        }
                    });
                  closeAlert();
                  closeLoading();
                }
              },
              {
                label:'No',
                onclick: function(){
                  closeAlert();
                }
              }
            ]
          });    
    });
}


function hideAllInput_2(){
    var indexShow=[1,2,3,4,5,6,7,8,9,10,11,12,15,16,17,18,25,26,31,32,21];
    var i;
    var numb="#input";
    var index="#asset";

    for(i=0;i<=34;i++){
        numb="#input"+i;
        $(numb).hide();
    }
    i=0;

    for(var i=0;i<indexShow.length-1;i++){
        $('#input'+indexShow[i]).show();    
    }
    // i=0;
    // $('#input'+indexShow[i]).show();
    cekButton(i-1);
    $("#buttonNext").click(function(){
        numb='#input';
              
        if(valueCheck()){
            for(var j=0;j<indexShow.length-1;j++){
                $('#input'+indexShow[j]).hide();    
            }
           // $(numb+indexShow[i]).hide();
           // i++;
            cekButton(i);
            //alert(numb+indexShow[i]);
            $(numb+indexShow[i]).show();
        }
        else{
            alert("There are some empty field");
        }
        
    });
    $("#buttonBack").click(function(){
        numb='#input';
        $(numb+indexShow[i]).hide();
        //i--;
        cekButton(i-1);
        for(var j=0;j<indexShow.length-1;j++){
            $('#input'+indexShow[j]).show();    
        }  
    });  

    function valueCheck(){
        var indexShow=[1,2,3,4,6,7,8,9,10,11,12,31,16];
        // if(checkIndex.includes(i)){
        //     if($('#asset'+i).val()==''){
        //         alert('Warning the field must be filled');
        //         return false;
        //     }
        //     else{
        //         return true;
        //     }
        // }
        // else{
        //     return true;
        // }

        var mc=false;
        for(var j=0;j<indexShow.length;j++){
            //$('#input'+indexShow[j]).show();
            if($('#asset'+indexShow[j]).val()==''){
                //alert('Warning the field must be filled');
                mc=false;
                break;
            }
            else{
                mc=true;
            }    
        }
        return mc;
    }

    //---cek tombol hide atau show
    function cekButton(index){
        var indexShow=[1,2,3,4,5,6,7,8,9,10,11,12,15,16,17,18,25,26,31,32,21];
        if(index<=0){
            $("#buttonBack").hide();
            $("#buttonSave").hide();
        }
        else if(index>=indexShow.length-1){
            $("#buttonNext").hide();
            $("#buttonSave").show();
        }
        else{
            $("#buttonBack").show();
            $("#buttonNext").show();
            $("#buttonSave").hide();
        }
    }



    $("#buttonSave").click(function(){

        var AssetNo=$('#asset1').val();
        var AssetDesc=$('#asset2').val();
        var AreaID=$('#asset3').children("option:selected").val();
        var PlantID=$('#asset4').children("option:selected").val();
        var LineID=$('#asset33').children("option:selected").val();
        var DepartmentID=$('#asset6').children("option:selected").val();
        var AssetCategoryID=$('#asset7').children("option:selected").val();
        var AssetStatusID=$('#asset8').children("option:selected").val();
        var CriticalID=$('#asset9').children("option:selected").val();
        var EmployeeID=$('#asset10').children("option:selected").val();
        var SupplierID=$('#asset11').children("option:selected").val();
        var WarrantyID=$('#asset12').children("option:selected").val();
        var SerialNumber=$('#asset15').val();
        var WarrantyDate=$('#asset16').val();
        var WarrantyNotes=$('#asset17').val();
        var AssetNote=$('#asset18').val();
        var Manufacturer=$('#asset25').val();
        var ModelNumber=$('#asset26').val();
        var remark1=$('#asset27').val();
        var remark2=$('#asset28').val();
        var remark3=$('#asset29').val();
        var remark4=$('#asset30').val();
        var DateAcquired=$('#asset31').val();
        var DateSold=$('#asset32').val();
        var ParentID=$('#asset34').children("option:selected").val();
        
        // console.log(AssetNo+","+ AssetDesc+","+ AreaID+","+ PlantID+","+ LineID+","+ DepartmentID+","+ AssetCategoryID+","+ AssetStatusID+","+ CriticalID+","+ EmployeeID+","+ SupplierID+","+ WarrantyID+","+ SerialNumber+","+ WarrantyDate+","+ WarrantyNotes+","+ AssetNote+","+Manufacturer+","+ ModelNumber+","+ remark1+","+ remark2+","+ remark3+","+ remark4+","+ DateAcquired+","+ DateSold+","+ ParentID);

        var dataString={'AssetNo':AssetNo,'AssetDesc':AssetDesc,'AreaID':AreaID,'PlantID':PlantID,'LineID':LineID,'DepartmentID':DepartmentID,'AssetCategoryID':AssetCategoryID,'AssetStatusID':AssetStatusID,'CriticalID':CriticalID,'EmployeeID':EmployeeID,'SupplierID':SupplierID,'WarrantyID':WarrantyID,'SerialNumber':SerialNumber,'WarrantyDate':WarrantyDate,'WarrantyNotes':WarrantyNotes,'AssetNote':AssetNote,'image_asset':myImage,'Manufacturer':Manufacturer,'ModelNumber':ModelNumber,'remark1':remark1,'remark2':remark2,'remark3':remark3,'remark4':remark4,'DateAcquired':DateAcquired,'DateSold':DateSold,'ParentID':ParentID};

        alert({
            title:'Save',
            message:'Are you sure want to save this to database ? ',
            buttons:[
              {
                label: 'Save',
                onclick: function(){
                    $.ajax({
                        type: "POST",
                        url:glo_url+"insert_asset.php",
                        data:dataString,
                        crossDomain:true,
                        cache:false,
                        async:false,
                        beforeSend: function(){
                            loading('Please wait...');
                        },
                        success:function(data){
                            if(data!='ErrorImagexxLoad'){
                                console.log(data);
                                if(data!='ErrorInsertxxLoad'){
                                    console.log(data);
                                    generateQRCode(data, 'Adding Data is Success','insert');
                                    myImage='noimage';
                                    addChecklist(data);
                                }
                                else{
                                    alert('Failed to Insert Data');
                                }
                                
                            }
                            else{
                                alert('Failed To Insert Due To Image')
                            } 
                                                                                             
                        }
                    });
                  closeAlert();
                  closeLoading();
                }
              },
              {
                label:'No',
                onclick: function(){
                  closeAlert();
                }
              }
            ]
          });    
    });
}

function addChecklist(assetid){
    $.ajax({
        type: "POST",
        url:glo_url+"additional_item.php",
        data:{'assetid':assetid,'add_item':'history_checklist'},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            //loading('Please wait...');
        },
        success:function(data){
            //closeLoading();
            //$("#data_content").append(data);
            //alert("SUksess")
        }
    })
}

function cameraTakePicture() { 
    myImage='noimage';
    navigator.camera.getPicture(onSuccess, onFail, {  
       quality: 30, 
       destinationType: Camera.DestinationType.DATA_URL, 
       saveToPhotoAlbum: true 
    });  
    
    function onSuccess(imageData) { 
       var image = document.getElementById('myImage'); 
       image.src = "data:image/jpeg;base64," + imageData; 
       myImage=imageData;
       //console.log(myImage);
    }  
    
    function onFail(message) { 
       alert('Failed because: ' + message); 
    } 
 }

 function cameraGetPicture() {
    myImage='noimage';
    navigator.camera.getPicture(onSuccess, onFail, { quality: 30,
       destinationType: Camera.DestinationType.DATA_URL,
       sourceType: Camera.PictureSourceType.PHOTOLIBRARY
    });
 
    function onSuccess(imageURL) {
       var image = document.getElementById('myImage');
       image.src = "data:image/jpeg;base64," + imageURL;
       myImage=imageURL;       
    }
 
    function onFail(message) {
       alert('Failed because: ' + message);
    }
 
 }



 function saveImage(){
    if(typeof myImage !=="undefined"){
        $.ajax({
            type: "POST",
            url:glo_url+"save_image.php",
            data: {'img_data':myImage},
            cache: false,
            async:false,
            contentType: "application/x-www-form-urlencoded",
            success: function (result) {
            alert("upload OK: "+ result);
            }
    
        });
    }
    else{
        alert('Image Not Found');
    }
}

function generateQRCode(textId, tittle,cekInsert){
    global_asset=textId;
    checkDetailAsset=true;
    $('#the_head').text('QR Code');
    $("#addAssetButton").hide();
    $("#backButton").show();
    $("#searchAssetButton").hide();
    $('#the_head').show();
    $('#settingButton').show();
    $('#data_content').empty();
    
    
    var mycontent='<div class="list shadow padding radius white"><div class="item grey-200" style="text-align:center;"><strong>'+tittle+'</strong></br><strong>QR CODE For '+textId+'</strong></br></br><div id="qrcode" style="display: flex;justify-content: center;margin: 0px;"></div></br></br><div class="row horizontal-align-right"><div class="col-40"><strong style="font-size:13px;">Share via Whatsapp </strong></div><div class="col-20"><button class="green-900 circle icon ion-social-whatsapp" id="waButton"></button></div></div></div></div>';
    
    $('#data_content').append(mycontent);
    var qrcode=new QRCode("qrcode");
    qrcode.makeCode(textId);
    screenshoot(textId,cekInsert);   
}

function generateImage(textId, tittle){
    global_asset=textId;
    checkDetailAsset=true;
    $('#the_head').text('Image');
    $("#addAssetButton").hide();
    $("#backButton").show();
    $("#searchAssetButton").hide();
    $('#the_head').show();
    $('#settingButton').show();
    $('#data_content').empty();
    var imagePath=getImagePath(textId);
    var img_url=glo_url.replace("page/wo/","");
    //alert(img_url+imagePath);
    var mycontent='';
    if(global_page=='preventive'){
        var path1=imagePath.split('xxseparator_image_woxxx')[0];
        var path2=imagePath.split('xxseparator_image_woxxx')[1];
        // mycontent='<div class="list shadow padding radius white"><div class="item grey-200" style="text-align:center;"><strong>'+tittle+'</strong></br><strong>Image For '+textId+'</strong></br></br><i>Image Before Check</i></br><img src="'+img_url+path2+'" id="myimage" style="display: flex;justify-content: center;margin: 0px;"></br></br><i>Image After Check</i></br><img src="'+img_url+path1+'" id="myimage" style="display: flex;justify-content: center;margin: 0px;"></br></br></br></br></div></div>';

        mycontent='<div class="list shadow padding radius white"><div class="item grey-200" style="text-align:center;"><strong>'+tittle+'</strong></br><strong>Image For '+textId+'</strong></br></br><img src="'+img_url+path1+'" id="myimage" style="display: flex;justify-content: center;margin: 0px;"></br></br></br></br></div></div>';
    }
    else{
        mycontent='<div class="list shadow padding radius white"><div class="item grey-200" style="text-align:center;"><strong>'+tittle+'</strong></br><strong>Image For '+textId+'</strong></br></br><img src="'+img_url+imagePath+'" id="myimage" style="display: flex;justify-content: center;margin: 0px;"></br></br></br></br></div></div>';    
    }
    $('#data_content').append(mycontent);
}

function getImagePath(assetid){
    var imagePath='';
    $.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':'pathImage','assetid':assetid,'cekItem':global_page},
        crossDomain:true,
        cache:false,
        async:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            imagePath=data;

            console.log("ID : "+assetid);
            console.log("cekItem : "+global_page);
            console.log("imagePath : "+imagePath);
        }
    })
    return imagePath;
}


function alertSearchForm(){
    alert({
      title:'Search',
      message:'Please Choose Your Method',
      template: 'template-alert-custom',
      width:'70%',
      class:'deep-orange-900',
      buttons:[
        {
           label: 'OK',
           class:'text-white',
           onclick : function(){
               closeAlert();
           }
        },
        {
           label:'Cancel',
           class:'text-white',
           onclick : function(){
                closeAlert();
            }
        }
      ]
    });
  }
 
