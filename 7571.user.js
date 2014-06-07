// ==UserScript==
// @name SoapboxVideoDownload
// @author Jesus Bayo(aka Chucky)
// @include http://soapbox.msn.com/*
// @version 1.0
// @description  Descarga de Soapbox
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */
 (function () {
function actualizar() {
		var URL_Script="http://terra.es/personal/jesbayo/userscripts/SoapboxVideoDownload.user.js"; 			// Url del script
		var nombre_Stript="SoapboxVideoDownload";		// Nombre del script
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

function descargar() {

	var tocho=document.evaluate("//img[@name='s_i_msnportalvideouser']/@src", document, null, XPathResult.STRING_TYPE, null).stringValue;
	var parteurl=tocho.split("&v13=")[1].split("&")[0];
	var longparteurl=parteurl.length;
	var url="http://uuv2.msn.com.edgesuite.net/flash/prod/"+parteurl.substr(longparteurl-2,2)+"/"+parteurl.substr(longparteurl-4,2)+"/"+parteurl.substr(longparteurl-6,2)+"/"+parteurl+".flv";
	document.getElementById('linkdescarga').href=url;
	return true;	
}

function ponerlink() {

	var imag='<img border="0" title="Descargar" src="data:image/gif;base64,R0lGODdhHAAcAKEAAP///wAAADS8Sv///ywAAAAAHAAcAAACXYyPqcvtJ6KctEpks8a6T+55oACU5okCHySlrrka1XtWY0TD1N26GY/zWYC9UocYNG5YyZwuMnKiYoGZ08Ys0rAyy+uXnXyHYUpt2c2cwekQuuo+luNU+vuBz+sRBQA7" width="28" height="28">';
	var link=document.createElement('A');
	link.innerHTML=imag;
	link.href="#";
	link.id="linkdescarga";
	link.addEventListener('mousedown', descargar, false);
	document.getElementById('videoHeader').appendChild(link);

}

 window.addEventListener('load', ponerlink, false);
 
})()

