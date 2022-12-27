$(document).ready(function(){
	get_item();
	get_vendor();
})

function get_item(){
	var itemid = "SA00050";
	$.ajax({
        type: "POST",
        url:glo_url+"get_item.php",
        data:{'item':itemid},
		dataType: 'JSON',
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
			$("#item_id").val(data.itemid);
			$("#item_name").val(data.itemname);
        },
		error:function (data){
			closeLoading();
			alert('Error');
		}
    })
}

function get_vendor(){
	$.ajax({
        type: "POST",
        url:glo_url+"get_vendor.php",
        data:{'data':'true'},
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(datahtml){
            closeLoading();
			$("#vendor").append(datahtml);
        }
    })
}

