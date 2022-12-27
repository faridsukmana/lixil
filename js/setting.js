function onSetting(){
  window.location='setting.html';
}

function onloadSetting(){
   if(localStorage.getItem('address')===null){
      localStorage.setItem('address','https://devsantino.greskit.com');
   }
   var curAddress=localStorage.getItem('address').toString();
      $('#currentAddress').text(curAddress.toString());
      $('#curAddress').text(curAddress.toString());
      //alert(curAddress);  
}

$('#saveAddressButton').click(function(){
   var newAddress=$('#inputAddress').val();
   alert({
      title:'Save',
      message:'Are you sure want to change to the new addess ?',
      class:'red',
      buttons:[
        {
          label: 'Yes',
          class:'text-white',
          onclick:function(){
            $('#currentAddress').text(newAddress.toString());
            localStorage.setItem('address',newAddress.toString());
            closeAlert();
          }
        },
        {
           label:'No',
          class:'text-white',
          onclick:function(){
              closeAlert();
          }
        }
      ]
    });
  
})

$('#backAddressButton').click(function(){
   window.location="index.html";
})

// function createFile() {
//   var type = window.TEMPORARY;
//   var size = 5*1024*1024;
//   window.requestFileSystem(type, size, successCallback, errorCallback)

//   function successCallback(fs) {
//      fs.root.getFile('log.txt', {create: true, exclusive: true}, function(fileEntry) {
//         alert('File creation successfull!')
//      }, errorCallback);
//   }

//   function errorCallback(error) {
//      alert("ERROR: " + error.code)
//   }
 
// }

// function writeFile() {
//   var type = window.TEMPORARY;
//   var size = 5*1024*1024;
//   window.requestFileSystem(type, size, successCallback, errorCallback)

//   function successCallback(fs) {
//      fs.root.getFile('log.txt', {create: true}, function(fileEntry) {

//         fileEntry.createWriter(function(fileWriter) {
//            fileWriter.onwriteend = function(e) {
//               alert('Write completed.');
//            };

//            fileWriter.onerror = function(e) {
//               alert('Write failed: ' + e.toString());
//            };

//            var blob = new Blob(['Lorem Ipsum'], {type: 'text/plain'});
//            fileWriter.write(blob);
//         }, errorCallback);
//      }, errorCallback);
//   }

//   function errorCallback(error) {
//      alert("ERROR: " + error.code)
//   }
// }

// function readFile() {
//   var type = window.TEMPORARY;
//   var size = 5*1024*1024;
//   window.requestFileSystem(type, size, successCallback, errorCallback)

//   function successCallback(fs) {
//      fs.root.getFile('log.txt', {}, function(fileEntry) {

//         fileEntry.file(function(file) {
//            var reader = new FileReader();

//            reader.onloadend = function(e) {
//               var txtArea = document.getElementById('textarea');
//               txtArea.value = this.result;
//            };
//            reader.readAsText(file);
//         }, errorCallback);
//      }, errorCallback);
//   }

//   function errorCallback(error) {
//      alert("ERROR: " + error.code)
//   }
// }

// function removeFile() {
//   var type = window.TEMPORARY;
//   var size = 5*1024*1024;
//   window.requestFileSystem(type, size, successCallback, errorCallback)

//   function successCallback(fs) {
//      fs.root.getFile('log.txt', {create: false}, function(fileEntry) {

//         fileEntry.remove(function() {
//            alert('File removed.');
//         }, errorCallback);
//      }, errorCallback);
//   }

//   function errorCallback(error) {
//      alert("ERROR: " + error.code)
//   }
// }