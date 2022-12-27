/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
// var app = {
//     // Application Constructor
//     initialize: function() {
//         document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
//     },

//     // deviceready Event Handler
//     //
//     // Bind any cordova events here. Common events are:
//     // 'pause', 'resume', etc.
//     onDeviceReady: function() {
var notifMessage='';
//         this.receivedEvent('deviceready'); 
//     },

//     // Update DOM on a Received Event
//     receivedEvent: function(id) {
//         var parentElement = document.getElementById(id);
//         var listeningElement = parentElement.querySelector('.listening');
//         var receivedElement = parentElement.querySelector('.received');

//         listeningElement.setAttribute('style', 'display:none;');
//         receivedElement.setAttribute('style', 'display:block;');

//         console.log('Received Event: ' + id);
        
//     }
// };

// app.initialize();

document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
    // Cordova is now initialized. Have fun!
    // loadSettings();
    // glo_url=localStorage.getItem('address')+'/page/wo/';
    // console.log(glo_url);
    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
    //document.getElementById('deviceready').classList.add('ready');
    codePush.notifyApplicationReady();
}

// Add to index.js or the first page that loads with your app.
document.addEventListener('deviceready', OneSignalInit, false);
function OneSignalInit() {
    // Uncomment to set OneSignal device logging to VERBOSE  
    // window.plugins.OneSignal.setLogLevel(6, 0);
    
    // NOTE: Update the setAppId value below with your OneSignal AppId.
    window.plugins.OneSignal.setAppId("2c00b9ad-6aad-4fc6-af85-53c4ad78c8ee");
    window.plugins.OneSignal.setNotificationOpenedHandler(function(jsonData) {
        console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        // notifMessage=jsonData;
    //     var arrMessage=JSON.parse(notifMessage);
    // console.log("TITLE : "+arrMessage['notification']['title']);
    // console.log("BODY : "+arrMessage['notification']['body']);
        myNotifSignal(jsonData);
        // console.log('Title: ' + JSON.stringify(jsonData.payload.title));
        // console.log('Body: ' + JSON.stringify(jsonData.payload.body));
    });
    
    // iOS - Prompts the user for notification permissions.
    //    * Since this shows a generic native prompt, we recommend instead using an In-App Message to prompt for notification permission (See step 6) to better communicate to your users what notifications they will get.
    window.plugins.OneSignal.promptForPushNotificationsWithUserResponse(function(accepted) {
        console.log("User accepted notifications: " + accepted);
    });
}

//=========Variabel global untuk semua fungsi di dalam javascript===
// var glo_url = 'https://localhost/akebono/page/wo_temp/';
// var glo_url = 'https://americanstd.greskit.com/page/wo/';
// var glo_url = 'https://greskit.akebono-astra.co.id/page/wo/';
// var glo_url = 'http://192.168.0.103/akebono/page/wo_temp/';
//var glo_url = 'http://192.168.0.5:4343/order/timuraya/page/wo/';
//var glo_url = 'https://devsantino.greskit.com/page/wo/';
var glo_url = 'https://dev.greskit.com/lixil/page/wo/';
//var glo_url = 'http://103.43.129.218:2223/greskit/';
//var glo_url = 'http://103.43.129.218:2223/greskit/page/wo/';
//var glo_url = 'http://182.253.207.76:82/greskit/page/wo/';
//var glo_url=localStorage.getItem('address')+'/page/wo/';
//console.log(glo_url);
//var glo_url=localStorage.getItem('address')+'/page/wo/';
// var glo_url='http://server.greskit.com/akebono/page/wo_temp/';
//alert(glo_url);

function logout(){
	localStorage.removeItem('user');
	window.location="index.html";
}