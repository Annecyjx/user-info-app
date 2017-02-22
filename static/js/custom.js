$(document).ready(function(){
	console.log('loaded the dom');
	var timeAfterPostRequest = 0
	$('#myInput').keyup(function(event){
		console.log('pressed a key')
		var timeNow = Date.now()
		var txt = $('#myInput').val();//the letter typing in the searchbar
		if((timeNow - timeAfterPostRequest) > 300){
			$.post('/search',{suggestion:txt}, function(data){
				console.log('performed post request')
				$('#result-box').html(data);
					for(var i=0; i<data.suggestion.length;i++){
						$('#result-box').append(			
							$('<option>'+ data.suggestion[i].firstname +' '+ data.suggestion[i].lastname +'</option>')
						);
					}
				timeAfterPostRequest = Date.now()
			})
		}
	});
})
