$(document).ready(function(){ 
	//alert(localStorage.getItem('user'));
	$.ajax({
		type: 'POST',
		url:glo_url+"get_wopmcheck.php",
		dataType: 'JSON',
		crossDomain:true,
		cache:false,
		beforeSend: function(){
			$('#wo_val').text('...');
			$('#pm_val').text('...');
			$('#check_val').text('...');
		},
		success:function(data){
			$('#wo_val').text(data.wo);
			$('#pm_val').text(data.pm);
			$('#check_val').text(data.ck);
		}
		
	})
})

