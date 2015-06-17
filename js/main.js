

function getServerURL(){
	return ((location.href.split('/'))[0])+'//'+((location.href.split('/'))[2]) + "/";
}

function loadPage(id, section){
	
	$.ajax({
		method: 'GET',
		url: getServerURL() + 'polaris-2.0/backend/main.php?section=' + section,
		dataType: 'html',
		success: function(data){
			$('#content').html(data);
		},
		error: function(){
			alert('se produjo un error');
		}
		
	})
}




$(function(){
	$('#lala').click(function(ev){
		ev.preventDefault();
		loadPage($(this).attr('id'), 'home');
	})

})

