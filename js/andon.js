var production='prod1';
function getPageAndon(){
    production=$('#prodSelect').val();
    global_page='andon';
    $("#the_head").text("Andon");
    $("#backButton").hide();
    $('#data_content').empty();
    
    get_asset_page('andon');

    $.ajax({
        type: "POST",
        url:glo_url+"andon.php",
        data:{'form':'getValueAndon','production':production},
        crossDomain:true,
        cache:false,
        async:false,
        dataType:'json',
        beforeSend: function(){
               loading('Please wait...');
            
        },
        success:function(data){
            closeLoading();
            setChart(data);
            getSelectProduction();  
        }
    })
}

function getSelectProduction(){
    $('#prodSelect').change(function(){
        production=$('#prodSelect').val();
        // console.log(production);
        $.ajax({
            type: "POST",
            url:glo_url+"andon.php",
            data:{'form':'getValueAndon','production':production},
            crossDomain:true,
            cache:false,
            async:false,
            dataType:'json',
            beforeSend: function(){
                   loading('Please wait...');
                
            },
            success:function(data){
                closeLoading();
                setChart(data);
                getSelectProduction();  
            }
        })
    })
}

function setChart(data){
    // console.log("ALL"+data.all);
    $('#labelAndonAll').text(data.all);
    $('#labelAndonConnect').text(data.connect);
    $('#labelAndonNotConnect').text(data.notConnect);
    production=$('#prodSelect').val();
    // console.log(production);
    drawChartAndon(data.connect,data.notConnect);    
}

function getNewAndon(type_andon){
    $("#backButton").show();
    if(type_andon=='all'){
        $("#the_head").text("All Andon");
    }
    else if(type_andon=='connect'){
        $("#the_head").text("Connect");
    }
    else if(type_andon=='notConnect'){
        $("#the_head").text("Not Conn.");
    }
    $('#data_content').empty();
    $.ajax({
        type: "POST",
        url:glo_url+"andon.php",
        data:{'form':'new_andon','type_andon':type_andon,'production':production},
        crossDomain:true,
        cache:false,
        // async:false,
        beforeSend: function(){
            loading('Please wait...');
            
        },
        success:function(data){
            closeLoading();
            $('#data_content').append(data);      
        }
    })       
}


function drawChartAndon(connect,notConnect){

    var ctx = document.getElementById('myDonutChart').getContext('2d');

    var data = {
        datasets: [{
            data: [connect, notConnect],
            backgroundColor: ['#4CAF50','#F44336']
        }],

        labels: [
            'Connected',
            'Not Connected'
        ]
    };

    var myDoughnutChart = new Chart(ctx, {
        type: 'pie',
        data: data,
        options: { 
            plugins : {
                labels:{
                    render:'percentage',
                    fontColor: '#fff',
                }
            }
        }
    });

}
