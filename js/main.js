

function getServerURL(){
	return ((location.href.split('/'))[0])+'//'+((location.href.split('/'))[2]) + "/";
}

function loadPage(id){
	
	$.ajax({
		method: 'GET',
		url: getServerURL() + 'polaris-2.0/backend/main.php?section=' + id,
		dataType: 'html',
		success: function(data){
			$('#content').html(data);
		},
		error: function(){
			alert('se produjo un error de red, wachin');
		}
		
	})
}




$(function(){

	$('nav li > a').click(function(event){
		event.preventDefault();
		loadPage($(this).attr('id'));
	})
	
	$('#content').load("sections.html #home");
	/*
	$('nav li > a').click(function(event){
		event.preventDefault();
		$('#content').load("sections.html #"+$(this).attr('id'));
	})
*/	
})

