// ==UserScript==
// @name          Goear Downloader Beta
// @namespace     goear.downloader.beta
// @description   ES: Descarga musica de goear. | EN: Download audio from goear.
// @include       http*://*goear.com/listen*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @version       1.1 (22/JAN/2011)
// ==/UserScript==

/*
ES:
Este es una version basada en la extension para Google Chrome 'Goear Downloader Beta'
http://www.chromeextensions.org/other/goear-downloader-beta/
autor original: lio (desarrollador)
contacto: bender@akapost.com
EN:
This is a port of Google Chrome extension 'Goear Downloader Beta'
http://www.chromeextensions.org/other/goear-downloader-beta/
credits to: lio (developer)
contact me at: bender@akapost.com

(c) 2011
*/

/* ----------------------------------------------------------------------------------------------- */

function sleep(milliseconds) {
	var start = new Date().getTime();
	for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start)> milliseconds){
			break;
		}
	}
}

function setError(data){
	var pop=document.location.href;
	var regex = new RegExp(/listenwin\.php/i);
	var icond="http://1.bp.blogspot.com/_hUzg9dqfJjM/TFMCBKF3RZI/AAAAAAAAAcA/5S0apGnVKIQ/s1600/glossy-error-icon.jpg";
    if (regex.test(pop)) {
		$('embed')
		.after('<div id="MD" class="tipos" style="padding:10px;color:red;"><img width="32" height="32" alt="" '+
		'src="'+ icond +'" align="middle"><b>'+data+'</b></div>');
	}else{
		$('#options')
			   .after('<div id="MD" class="tipos" style="padding:10px;color:red;"><img width="32" height="32" alt="" '+
		'src="'+ icond +'" align="middle"><b>'+data+'</b></div>');
	}
}

function getXML(id){
	var cache=new Date().getTime();
	var url="http://www.goear.com/externaltrackhost.php?f="+id+"&cb="+cache;
	$.ajax({
		type: "GET",
		url: url,
		dataType:"html",
		success: function(data) {
			// Obtenemos la Url verdadera del sonido
			var file=$("song:last-child",data).attr("path");
			if (file!=undefined){
				var pop=document.location.href;
				var regex = new RegExp(/listenwin\.php/i);
				var icond="http://t3.gstatic.com/images?q=tbn:ANd9GcSr_sWHv_i0NxxxNZhh-BuQiLr0ko6v29xEgXZUf1itfsIr_dxnXw&t=1";
				if (regex.test(pop)) {
					$('embed').after('<div id="MD" class="tipos" style="padding-right:22px;"><img width="48" height="48" alt="" '+'src="'+ icond +'" style="float:left"><p style="float:right"><a href="'+ file +'?cb='+cache + '">&nbsp;&nbsp;&nbsp;<b>Descargar/Download</b><br /><span style="color:red">&nbsp;&nbsp;&nbsp;Usar bot&oacute;n derecho y <b>Guardar enlace como...</b><br />&nbsp;&nbsp;&nbsp;Right click on link and  <b>Save link as...</b></span></a></p></div>');
				}else{
					$('#options').after('<div id="MD" class="tipos" style="padding-right:22px;"><img width="48" height="48" alt="" '+'src="'+ icond +'" style="float:left"><p style="float:right"><a href="'+ file +'?cb='+cache + '">&nbsp;&nbsp;&nbsp;<b>Descargar/Download</b><br /><span style="color:red">&nbsp;&nbsp;&nbsp;Usar bot&oacute;n derecho y <b>Guardar enlace como...</b><br />&nbsp;&nbsp;&nbsp;Right click on link and  <b>Save link as...</b></span></a></p></div>');
				}
			}else{
				setError("Imposible obtener enlace mp3:(Z13)");
			}
		},
		error: function(data,texto,tt){
			setError("Imposible crear enlace,invalid tracker:(Z12)");
		}
	});
}

$(document).ready(function(){
	//Necesitamos leer las url de Goear...
	var el=$("embed").attr("src");
	var regex = new RegExp(/^http:\/\/www.goear.com\/files\/local.swf\?file\=(.+)$/i);
	if (regex.test(el)){
		// extraemos el enlace externo y bajamos el XML
		var Id=el.match(/local.swf\?file\=(.+)$/i);
		if((Id!=null)){
			if ((Id.length==2)){
				// Pasamos la Id,para extraer el mp3 desde el XML
				getXML(Id[1]);
			}else{ setError("No fue posible extraer el enlace de descarga:(Z10/1)"); } 
		}else{setError("No fue posible extraer el enlace de descarga,null:(Z10/0)");}
	}else{
		setError("No fue posible encontrar el archivo flash:(Z11)");
	}// end regex test
});