

function getServerURL(){
	return ((location.href.split('/'))[0])+'//'+((location.href.split('/'))[2]) + "/";
}

<<<<<<< HEAD
function loadPage(id){

=======
function loadPage(id, target){
	
>>>>>>> origin/master
	$.ajax({
		method: 'GET',
		url: getServerURL() + 'polaris-2.0/' + id + '.html',
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
		loadPage($(this).attr('id'), 'content');
	})
<<<<<<< HEAD

	$('#nav ').click()
=======
	
	$('#home').click();
>>>>>>> origin/master


})
