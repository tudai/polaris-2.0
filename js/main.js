

function getServerURL(){
	return ((location.href.split('/'))[0])+'//'+((location.href.split('/'))[2]) + "/";
}

function getRemoteServerURL(){
	return "http://web-unicen.herokuapp.com/api/";
}

function getGroupNumber(){
	return 106;
}


/*
 * Función generica que carga, mediante una llamada ajax, una sección de contenido html y 
 * lo inserta dentro de otra.
 * Params
 * @path
 * */

function loadSection(path, target, callback){
	$.ajax({
		method: 'GET',
		url: getServerURL() + 'polaris-2.0/' +path + '.html',
		dataType: 'html',
		success: function(data){
			$('#'+target).html(data);
			if( typeof callback !== 'undefined' && jQuery.isFunction( callback ) ){
				callback();
			}
		},
		error: function(){
			alert('se produjo un error de red, wachin');
		}
	})
}

function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
          center: new google.maps.LatLng(-37.310872, -59.116085),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
}

function saveCatalogData(){
	var info = {
			"group": getGroupNumber(),
			"thing": $('#loadData-page').find('form').serializeArray(),
		} 
	$.ajax({
		url: getRemoteServerURL() + 'create',
		method: 'post',
		dataType: 'json',
		data: JSON.stringify(info),
		contentType: "application/json; charset=utf-8",
		success: function(result){
			console.log(result);
		},
		error: function(){
			alert('algo no funcó vieja ');
		}
		
	})
}

function getCatalogData(){
	$.ajax({
		url: getRemoteServerURL() + 'group/' + getGroupNumber(),
		method: 'get',
		dataType: 'json',
		success: function(data){
			var information = data.information;
			var row = "";
			
			for(var t=0; t<information.length; t++){
				var auto = information[t].thing;
				row += '<tr>';
				for(i = 0; i<auto.length; i++)
					row += '<td>' +auto[i].value + '</td>';
				row += '</tr>';
			}
				
			$('table').append(row);	
		},
		error: function(){
			alert('no hay caso locura, no recupera info');
		}
	})
}


$(function(){

	$('body').on('click', '.list-group-item', function(event){
		event.preventDefault();
		loadSection('catalog/'+this.id, 'catalog-content');
		$(this).addClass('active');
		$(this).siblings().removeClass('active');
	})

	$('body').on('click', '#tablaprecios', function(event){
		event.preventDefault();
		getCatalogData();
		
	})

	$('nav li > a').click(function(event){
		event.preventDefault();
		loadSection(this.id, 'content');
	})

	$('#catalog').click(function(event){
		event.preventDefault();
		loadSection(this.id, 'content', function(){
			$('.list-group-item:first').click();
		});
	})


	$('#contact').click(function(event){
		event.preventDefault();
		loadSection(this.id, 'content', function(){
			initialize();
		})
	})

	$('#home').click();

	$('body').on('click', '#submitData', function(event){
		event.preventDefault();
		saveCatalogData();
	})

})
