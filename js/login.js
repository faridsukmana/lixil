if(localStorage.getItem('user') === null){
	$('#signin').on('click', function(){
		var user = $('#user').val();
		var pass = $('#pass').val();
		//alert(user+' '+pass);
		
		$.ajax({
			type: "POST",
			dataType: "json",
			url:glo_url+"login.php",
			data:{'user':user,'pass':pass},
			crossDomain:true,
			cache:false,
			beforeSend: function(){
				loadingElement('signin');
			},
			success:function(data){
				closeLoading('signin'); 
				if(data.result){
					localStorage.setItem('user',data.user);
					window.location="main.html";
				}else{
					alert('Please check again your username and password', 'Login Failed');
				}
			}
		})
	})
}else{
	window.location="main.html";
}