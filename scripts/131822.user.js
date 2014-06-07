// ==UserScript==
// @name           getPlaylists
// @namespace      betterLastFm
// @include        http://www.lastfm.es/music*
// @include        http://www.last.fm/music/*
// @include        www.last.fm/music/*
// @include        last.fm/music/*
// @include        http://www.lastfm.*/music/*
// @include        www.lastfm.*/music/*
// @include        lastfm.*/music/*
// @require		   http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @require		   http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js
// ==/UserScript==


//Función para eliminar elementos duplicados de un array
Array.prototype.unique=function(a){
  return function(){return this.filter(a)}}(function(a,b,c){return c.indexOf(a,b+1)<0
});


 $(document).ready(function() {
	//Agregamos la CSS de colorbox
	$("head").append('<link href="http://jqueryui.com/themes/blitzer/jquery-ui.css" rel="stylesheet" type="text/css"/>');			
					
	var method = "user.getplaylists";	
	var api_key = "1d2598d7e38027acdc5740a84708fc45";
	var api_url = "http://ws.audioscrobbler.com/2.0/?method=";
	var ext_api_url = "http://lastfm-api-ext.appspot.com/2.0/?method=";
	var format = "json";
	var user = $('#idBadgerUser').text();
	var url = api_url + method + "&user=" + user + "&api_key=" + api_key + "&format=" + format;		
	
	
	
	$('.rightCol').append('<h2>Listas de reproducción</h2>');
	$('.rightCol').append('<p>Selecciona una para ver su contenido:</p>');
	
	//Si hay usuario está logueado
	if (user != ""){		
		$('.rightCol').append('<select id="playlists" name="playlists"></select>');					
		$('#playlists').append($("<option></option>").text("Selecciona una")); 	
				
		$.getJSON(url, function(json) {		
			$(json.playlists.playlist).each(function() {	
				//Cargamos cada lista de reproducción en el combo
				$('#playlists').append($("<option></option>").attr("value", this.id).text(this.title)); 				
			});			
		});
	}
	//Si no hay usuario logueado
	else{
		$('.rightCol').append('<p>No hay usuario logueado</p>');        
	}	
	
	
	    //Añado menú desplegable
	$('.rightCol').append('<p class="boton">Ver / Ocultar contenido</p>'); 
	$(".boton").css({ 'text-decoration': 'underline' });
	$(".boton").hover(function () {
		$(".boton").css({'cursor' : 'pointer'});
	});
	$('.rightCol').append('<div id="desplegable"><h2>Contenido oculto</h2><p>Sólo verás este contenido si despliegas el panel.</p></div>');
	
	$(".boton").click(function(){
		$("#desplegable").slideToggle("slow");
	});
	
	
	$('.rightCol').append('<div id="dialog" title="Exportar lista de reproducción" style="display: none; font-size: 0.5 em">' +
		'<form action="">' +
		'<p>Artistas</p>' +		
		'<div id="exportArtists"></div>' +
		'<p>Discos</p>' +
		'<p>Canciones</p></div>');
	
	$('.rightCol').append('<a id="export" class="lfmButton lfmBigButton" href="#"><strong>Exportar</strong></a>');	
	$("#export").click(function(){	
		if ($('.blfm_artist').length) {//Si hay alguna lista de reproducción seleccionada    
			var i = 0;
			var artists = new Array();
			$('.blfm_artist').each(function() {	
				artists[i] = $(this).text();
				i += 1;
			});
			artistsWithoutRep = artists.unique(); //Eliminamos duplicados

			for(var i = 0; i < artistsWithoutRep.length; i++){
				//Cargamos los artistas en el cuadro de diálogo de exportación														
				$('#exportArtists').append('<input type="checkbox" name="artists" value="' + artistsWithoutRep[i] + '" />' + 
				artistsWithoutRep[i] + '<br />');							
			}
			
		    $("#dialog").dialog({ width: 460 }, {
				buttons: {
					"Exportar": function() {						
						 ;}, 
					
					"Cancelar": function() {
						$(this).dialog("close"); } 									
				} });
		} else { //Si no hay ninguna lista de reproducción seleccionada
			$('.rightCol').append('<div id="noPlaylist" class="messageBox errorMessage" style="display: none"><span class="messageWrapper">' +
			'No has seleccionado ninguna lista de reproducción</span></div>');
			$("#noPlaylist").show('slow');
			setTimeout(function() { $("#noPlaylist").hide(1000);}, 3000);
		}
	});
	$(".ui-widget").css("font-size", "0.2em");	
	
	
	//Cuando hagamos clic en él, es muestra el diálogo de opciones		
	


	//Manejador del evento change del desplegable de listas de reproducción
	$("#playlists").change(function () {          
        var playlistId = $("select option:selected").attr("value");                      
		var url = ext_api_url + "playlist.fetch&playlistURL=lastfm://playlist/" + playlistId + "&api_key=" + api_key;
		
		//Utilizamos el método GM_xmlhttpRequest de Greasemonkey para realizar una llamada cross-domain
		GM_xmlhttpRequest({
			method: "GET",
			url: url,
			onload: function(response) {					
				var parser = new DOMParser();
				var dom = parser.parseFromString(response.responseText, "application/xml");
				var tracks = dom.getElementsByTagName('track');
				
				$('.eventsSmall').remove();
				$('.rightCol').append('<ul class="eventsSmall"></ul>');
				for (var i = 0; i < tracks.length; i++) {
					$('.eventsSmall').append('<li><strong class="blfm_track">' + tracks[i].getElementsByTagName('title')[0].textContent + 
						'</strong>, de ' + '<span class="blfm_artist">' + tracks[i].getElementsByTagName('creator')[0].textContent + '</span></li>');
				}				
			}
		});					
});     

});


