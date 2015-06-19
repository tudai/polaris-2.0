

function getServerURL(){
	return ((location.href.split('/'))[0])+'//'+((location.href.split('/'))[2]) + "/";
}



function loadSection(path, target){
	$.ajax({
		method: 'GET',
		url: getServerURL() + 'polaris-2.0/' +path + '.html',
		dataType: 'html',
		success: function(data){
			$('#'+target).html(data);
		},
		error: function(){
			alert('se produjo un error de red, wachin');
		}

	})
}




$(function(){
	$('nav li > a').click(function(event){
		event.preventDefault();
		loadSection($(this).attr('id'), 'content');
	})
	
	$('#home').click();



})
