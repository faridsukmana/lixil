

//========Ketika Open new page------
document.addEventListener('openPage', function(e){
    $("#index").hide();
})

document.addEventListener('backPage', function(e){
    $("#index").show();
})