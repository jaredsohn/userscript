// ==UserScript==
// @name RBCDownload
// @author Jesus Bayo(aka Chucky)
// @include http://www.radioblogclub.com/open/*
// @include http://www.radioblogclub.com/search/*
// @include http://radioblogclub.com/open/*
// @include http://radioblogclub.com/search/*
// @version 1.0
// @description  Descarga de RadioBlogClub
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */
 (function () {
function actualizar() {
		var URL_Script="http://terra.es/personal/jesbayo/userscripts/RBCDownload.user.js"; 			// Url del script
		var nombre_Stript="RBCDownload";		// Nombre del script
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
	var nodos=document.evaluate("//input[@src='http://stat.radioblogclub.com/images/play.gif' and @onClick]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	
	for (var i=0; i< nodos.snapshotLength; i++ )
	{
		var unnodo=nodos.snapshotItem(i);
		var ref=unnodo.getAttribute("onClick").split("blogThis('")[1].split("');")[0];		
		ref=unescape(ref);
		
		var link=document.createElement("a");
		link.href=ref;
		link.innerHTML='<img border="0" title="Descargar" src="data:image/gif;base64,R0lGODdhDgAOAKEAAP///wAAADS8Sv///ywAAAAADgAOAAACJoyPKcu95qKAAthrX2A464Y1FAc4VHd9C8qMVdpuYCnKUnzXyW4UADs=" width="14" height="14">';
		var td=document.createElement("td");
		td.setAttribute("valign", "top");
		td.setAttribute("width", "16");
		td.appendChild(link);
		unnodo.parentNode.parentNode.insertBefore(td, unnodo.parentNode);
	}

}
 
 window.addEventListener('load', descargar, false);
})()

