
function addwo(id_andon,type_insert){
	myImage='noimage';
	if(cek_user()=='mgrarea'||cek_user()=='mgrmtn'){
		Swal.fire(
            'Access Denied',
            'You do not have permission to Create WO',
            'error'
        )
	}
	else{
		arrPart={};
		$('#refresh').hide();
		$('#cam_inv').hide();
		$('#back').show();
		$('#save').show();
		$('#data_content').empty();
		
		$.ajax({
	        type: "POST",
	        url:glo_url+"form_request.php",
	        data:{'form':'wo','id_andon':id_andon,'type_insert':type_insert,'userPermit':cek_user(),'username':myuser},
	        crossDomain:true,
	        cache:false,
	        async:false,
	        beforeSend: function(){
	            loading('Please wait...');
	        },
	        success:function(data){
	            closeLoading();
	            $("#data_content").append(data);
	            $('#formDownEdit').hide();
	           
	            var deptId=$('#dept').val();
	            assetDrop(deptId);
	            chooseDept();

	            getdropDownSpare("xxx");
	            hideFormAddWO();
			    // addSparePartInventory();
			    // deleteSparePartInvent();
	        }
	    })
	}
}

function hideFormAddWO(){
	$('#sparepartField').hide();
	$('#manpowerField').hide();
	if(cek_user()=='mgrarea'){
			$('#reqsField').hide();
			$('#requField').hide();
			$('#plstartField').hide();
			$('#plfinField').hide();
			$('#acstartField').hide();
			$('#acendField').hide();
			// $('#reqbyField').hide();
			$('#wpriorField').hide();
			$('#wstatField').hide();
			// $('#pdescField').hide();
			$('#k3Field').hide();
			$('#causeField').hide();
			$('#acttakenField').hide();
			$('#prevtakenField').hide();
			// $('#reldocField').hide();
	}
	if(cek_user()=='spvarea'){
			$('#reqsField').hide();
			$('#requField').hide();
			$('#plstartField').hide();
			$('#plfinField').hide();
			$('#acstartField').hide();
			$('#acendField').hide();
			// $('#reqbyField').hide();
			$('#wpriorField').hide();
			$('#wstatField').hide();
			// $('#pdescField').hide();
			$('#k3Field').hide();
			$('#causeField').hide();
			$('#acttakenField').hide();
			$('#prevtakenField').hide();
			$('#assignto').attr('disabled',true);
			// $('#reldocField').hide();
	}

	else if(cek_user()=='tech'){
		$('#assignto').attr('disabled',true);
	}
}

function chooseDept(){
	$('#dept').change(function(){
		var deptId=$(this).val();
		assetDrop(deptId);
	})
}

function assetDrop(deptId){
	$.ajax({
	        type: "POST",
	        url:glo_url+"form_request.php",
	        data:{'form':'dropdown','cek':'assetDept','deptId':deptId},
	        crossDomain:true,
	        cache:false,
	        beforeSend: function(){
	            loading('Please wait...');
	        },
	        success:function(data){
	            closeLoading();
	            $('#assetno').empty();
	            $('#assetno').append(data);
	        }
	})
}

function assetDropText(){
	// alert('hello');
	var deptId=$('#dept').val();
	var assetName=$('#assSearch').val();
	$.ajax({
	        type: "POST",
	        url:glo_url+"form_request.php",
	        data:{'form':'dropdown','cek':'assetText','deptId':deptId,'assetName':assetName},
	        crossDomain:true,
	        cache:false,
	        beforeSend: function(){
	            loading('Please wait...');
	        },
	        success:function(data){
	            closeLoading();
	            $('#assetno').empty();
	            $('#assetno').append(data);
	        }
	})
}

function field_null(){
	var requested = $('#requested').val('');
	var requested_time = $('#requested_time').val('');
	var required = $('#required').val('');
	var required_time = $('#required_time').val('');
	var plan_start = $('#plan_start').val('');
	var plan_start_time = $('#plan_start_time').val('');
	var plan_finish = $('#plan_finish').val('');
	var plan_finish_time = $('#plan_finish_time').val('');
	var assetno = $('#assetno').val('').change();
	var requestby = $('#requestby').val('').change();
	var wprior = $('#wprior').val('').change();
	var wtype = $('#wtype').val('').change();
	var dept = $('#dept').val('').change();
	var wtrade = $('#wtrade').val('').change();
	var wstate = $('#wstate').val('').change();
	var problem = $('#problem').val('');
	var k3 = $('#k3').val('');
	var cause = $('#cause').val('');
	var action = $('#action').val('');
	var prevent = $('#prevent').val('');
	var id_andon = $('#id_andon').val('');
}

function save_wo(type_insert){
	//alert('test');
	var id_andon=$('#id_andon').val();
	var requested = $('#requested').val();
	var requested_time = $('#requested_time').val();
	requested = requested+' '+requested_time+':00';
	var required = $('#required').val();
	var required_time = $('#required_time').val();
	required = required+' '+required_time+':00';
	var plan_start = $('#plan_start').val();
	var plan_start_time = $('#plan_start_time').val();
	plan_start = plan_start+' '+plan_start_time+':00';
	var plan_finish = $('#plan_finish').val();
	var plan_finish_time = $('#plan_finish_time').val();
	plan_finish = plan_finish+' '+plan_finish_time+':00';
	var act_start = $('#actual_start').val();
	var act_start_time = $('#actual_start_time').val();
	act_start = act_start+' '+act_start_time+':00';
	var act_end = $('#actual_end').val();
	var act_end_time = $('#actual_end_time').val();
	act_end = act_end+' '+act_end_time+':00';
	var assetno = $('#assetno').val();
	var requestby = $('#requestby').val();
	var wprior = $('#wprior').val();
	var wtype = $('#wtype').val();
	var dept = $('#dept').val();
	var wtrade = $('#wtrade').val();
	var wstate = $('#wstate').val();
	var problem = $('#problem').val();
	var k3 = $('#k3').val();
	var cause = $('#cause').val();
	var action = $('#action').val();
	var prevent = $('#prevent').val();
	var createdby = localStorage.getItem('user');
	var assignto = $('#assignto').val();

	var causeDescArray = [];
	$('#listCause li').each(function(){
	    causeDescArray.push($(this).text());
	});

	var sparePartAndon=[];
	$('#listSP strong').each(function(){
		var andonID=this.id;
		if(this.id!=''){
			var newAndonID=andonID.replace('quantityAndon','');
			var quantityAndon=$(this).text().replace('Quantity : ','');
			sparePartAndon.push(newAndonID+','+quantityAndon);
		}
	});

	console.log(sparePartAndon); 	
		
	//alert (requested+' , '+required+' , '+plan_start+' , '+plan_finish+' , '+assetno+' , '+requestby+' , '+wprior+' , '+wtype+' , '+dept+' , '+wtrade+' , '+wstate+' , '+problem+' , '+k3+' , '+cause+' , '+action+' , '+prevent);
	var dataString = {'form':'insertwo','id_andon':id_andon,'type_insert':type_insert,'requested':requested,'required':required,'plan_start':plan_start,'plan_finish':plan_finish,'act_start':act_start,'act_end':act_end,'assetno':assetno,'requestby':requestby,'wprior':wprior,'wtype':wtype,'wtrade':wtrade,'dept':dept,'wstate':wstate,'problem':problem,'k3':k3,'cause':cause,'action':action,'prevent':prevent,'createdby':createdby,'causeDesc':causeDescArray, 'sparepart':sparePartAndon,'assignto':assignto,'image_asset':myImage,'username':myuser};
	
	$.ajax({
        type: "POST",
        url:glo_url+"form_request.php",
        data:dataString,
        crossDomain:true,
        cache:false,
        beforeSend: function(){
            loading('Please wait...');
        },
        success:function(data){
            closeLoading();
            //console.log(data);
			if(data.toString().includes('Succeeded')){
				Swal.fire(
                  'Succeeded!',
                  data,
                  'success'
                )
			}
			else if(data=='ErrorImagexxLoad'){
				Swal.fire(
                  'Error!',
                  'Error With Image',
                  'error'
                )
			}
			else{
				// console.log(data);
				Swal.fire(
                  'Error!',
                  data,
                  'error'
                )
			}
			field_null();
			$("#data_content").empty();
			// list_wo_tab('');
			cekWoTab();
        }
    })
}

//========Ketika scan qr code diaktifkan------
function asset_qr(){ 
		//$('#assetno').val('AS000950').change();
        /*scanner plugin*/
		window.plugins.GMVBarcodeScanner.scan({}, function(err, result) { 
    
			//Handle Errors
			if(err) {
				if(preventiveCheck=='wo'){
					// list_wo_tab('');
					cekWoTab();
				}
				else if(preventiveCheck=='pm'){
					list_pm('');
				}
				return ;
			};
			var id = result;

			$.ajax({
	        type: "POST",
	        url:glo_url+"form_request.php",
	        data:{'form':'dropdown','cek':'all'},
	        crossDomain:true,
	        cache:false,
	        beforeSend: function(){
	            loading('Please wait...');
	        },
	        success:function(data){
	            closeLoading();
	            $('#assetno').empty();
	            $('#assetno').append(data);
	            $('#assetno').val(id).change();
	        }
			});

		});
}
function addCause(){
	var causeDesc=$('#causeDesc').val();
	 var $deleteLink = $('<div class="right"><i class="icon ion-close-circled red"></i></div>');
	 $deleteLink.on('click', function(e) {
	    e.preventDefault();
	    $(this).parent().remove()
	  })

	var $entry = $('<li class="list-group-item">'+causeDesc+'</li>')
  	$entry.append($deleteLink)
  	$('#listCause').append($entry);		

}