

function getLocalServerURL(){
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
 * lo inserta dentro de otra. Si la llamada se realiza exitosamente, ejecuta un callback(comprobación
 * previa de que se pasó como parametro).
 * 
 */
function loadSection(path, target, callback){
	$.ajax({
		method: 'GET',
		url: getLocalServerURL() + 'polaris-2.0/' +path + '.html',
		dataType: 'html',
		success: function(data){
			$('#'+target).html(data);
			if( typeof callback !== 'undefined' && jQuery.isFunction( callback ) ){
				callback();
			}
		},
		error: function(){
			alert('Ops, se ha producido un error de red desconocido. Si es martes comuniquese con el Centro de Consultas de Berazategui');
		}
	})
}


/*
 * Genera el Google Map de la sección de contacto
 */
function initialize() {
        var mapCanvas = document.getElementById('map-canvas');
        var mapOptions = {
          center: new google.maps.LatLng(-37.310872, -59.116085),
          zoom: 18,
          mapTypeId: google.maps.MapTypeId.ROADMAP,
          
        }
        var map = new google.maps.Map(mapCanvas, mapOptions)
}

/*
 * Guarda en el servidor provisto por la cátedra, mediante llamada ajax,
 * información sobre los precios y productos de polaris
 */

function saveCatalogData(){
	
	var status = validateCatalogForm($('#loadData-page').find('form'));
	
	if (status){
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
				if (result.status == "OK")
					$('#statusMessage').addClass('text-success').html('Se guardo con éxito la información');
				else
					$('#statusMessage').addClass('text-danger').html('Se produjo un error al guardar la información');
			},
			error: function(){
				alert('Ops, se ha producido un error de red desconocido. Por favor, contacte al Ministerio de Defensa');
			}
			
		});
	} else{
		alert('Los campos en rojo son obligatorios. Tómese el trabajo de llenarlos por favor :) ');
		$('input').blur();
		$('textarea').blur();
		$('select').blur();
		
	}
}

/*
 * Verifica que todos los campos del formulario esten en condiciones de ser enviados por red 
 */
function validateCatalogForm(form){
	var groups = $(form).find('.form-group');
	var result = true;
	groups.each(function(){
		if(!$(this).hasClass('has-success'))
			result = false;
	})
	return result;
}


//Valida un campo input, textarea, select
function validateFormField(field){
	if ($(field).val().length!=0){
		$(field).parents('.form-group').addClass('has-success');
		$(field).parents('.form-group').removeClass('has-error');
	} else{
		$(field).parents('.form-group').addClass('has-error');
		$(field).parents('.form-group').removeClass('has-success');
	}
}


/*
 * Obtiene del servidor provisto por la cátedra, mediante llamada ajax, 
 * la información cargada por el método saveCatalogData(), cre una 
 * estructura de filas y la inserta en una tabla.
 */
function getCatalogData(){
	$.ajax({
		url: getRemoteServerURL() + 'group/' + getGroupNumber(),
		method: 'get',
		dataType: 'json',
		success: function(data){
			var information = data.information;
			var row = "";
			console.log(data);
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
			alert('Ops, la información no puede ser recopilada. Comuniquese al 0810-SAMPDORIA para mas información y pida hablar con Elsa');
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
	
	
	$('body').on('blur', 'input, textarea', function(){
		validateFormField(this);
	})
	
	$('body').on('blur', 'select', function(){
		validateFormField($(this).find('option:selected'));
	})

})
