// ==UserScript==
// @name GoearDownload
// @author Jesus Bayo(aka Chucky)
// @include http://www.goear.com/listen.php?v=*
// @include http://www.goear.com/gamma/listen.php?v=*
// @include http://goear.com/listen.php?v=*
// @include http://goear.com/gamma/listen.php?v=*
// @version 1.1
// @description  Descarga de Goear
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */
 (function () {
function actualizar() {
		var URL_Script="http://terra.es/personal/jesbayo/userscripts/GoearDownload.user.js"; 			// Url del script
		var nombre_Stript="GoearDownload";		// Nombre del script
		var ndias=1;							// Tiempo en el q comprueba la actualizacion
		
		var hoy=new Date();
		
		
		var fechaultact=new Date(GM_getValue("fechaUltAct", 0));
		if (fechaultact.getTime()==0) {
			GM_setValue("fechaUltAct", hoy.toGMTString());
			fechaultact=new Date(hoy.toGMTString());
		}
		var fechaultcom=new Date(GM_getValue("fechaUltCom", hoy.toGMTString()));

		if (hoy.getTime()>=(fechaultcom.getTime() + ((24*60*60*1000)*ndias))) {
			
			GM_xmlhttpRequest({method: 'HEAD', url: URL_Script,  headers: {'If-Modified-Since': fechaultact.toGMTString()},
				onload: function(request) {
							if(request.readyState==4 && request.status==200) {								
								var cacho=request.responseHeaders.substring(request.responseHeaders.indexOf('Last-Modified:')+15);
								var textfecha=cacho.substring(0, cacho.indexOf("\n"));
								var fecha=new Date(textfecha);
								if (fecha.getTime() > fechaultact.getTime()){
									if (confirm("Hay una nueva version del script "+ nombre_Stript +" para descargar. Desea hacerlo?")){
										GM_setValue("fechaUltAct", fecha.toGMTString());
										location.href=URL_Script;
									}
								}
							}			
						}
			});			
		}
		GM_setValue("fechaUltCom", hoy.toGMTString());
	}
try{ actualizar(); } catch(e){}

var gamma= location.href.indexOf("/gamma/") > -1 ? true : false;

function crearEnlace(enlace) {
	var link=document.createElement("a");
	link.href=enlace;	
	link.innerHTML='<img border="0" title="Descargar" src="data:image/gif;base64,R0lGODdhHAAcAKEAAP///wAAADS8Sv///ywAAAAAHAAcAAACXYyPqcvtJ6KctEpks8a6T+55oACU5okCHySlrrka1XtWY0TD1N26GY/zWYC9UocYNG5YyZwuMnKiYoGZ08Ys0rAyy+uXnXyHYUpt2c2cwekQuuo+luNU+vuBz+sRBQA7" width="28" height="28">';
	var padrelink;
	if (gamma){
		padrelink=document.evaluate("//div[@id='playerContainer']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	} else{
		padrelink=document.evaluate("//span[@class='Estilo3']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	}
	padrelink.insertBefore(link, padrelink.firstChild);
}
 
function verxml(request){
	if(request.readyState==4 && request.status==200) {
		var responseXML = (new DOMParser).parseFromString(request.responseText, "application/xml");
		var enlace=responseXML.getElementsByTagName('song')[0].getAttribute('path');
		crearEnlace(enlace);
	}
}
 
function descargar() {
	var ref=location.href.split("?v=")[1].split("&")[0].split("#")[0];
	GM_xmlhttpRequest({method: 'GET', url: 'http://www.goear.com/files/sst/secm'+ref+'.xml',  onload: verxml});
 }
 
 window.addEventListener('load', descargar, false);
})()

