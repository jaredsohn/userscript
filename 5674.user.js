// ==UserScript==
// @name 20minutosComentarios
// @author Jesus Bayo(aka Chucky)
// @include http://www.20minutos.es/*
// @version 0.1
// @description Herramientas para los comentarios de 20minutos
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */
 (function () {
 if (document.getElementById("codigo")!=null) {
 
	function leftTrim(sString) {
		while (sString.charAt(0) == ' ' || sString.charAt(0) == '\n' || sString.charCodeAt(0) == 9) {
			sString = sString.substring(1, sString.length);
		}
		return sString;
	}
	
	function insertarEnText() {
		var textarea=document.getElementById('comentario');
		var texto=textarea.value+this.id;
		var seleccion=window.getSelection();
		if (seleccion!="") {
			texto+="\n\"\"\""+seleccion+"\"\"\"\n\n";
		}
		textarea.value=texto;
		textarea.scrollTop = textarea.scrollHeight - textarea.clientHeight;
		return false;
	}
	
	function mostrarAutor(unoby) {
		var byhijos=unoby.childNodes;
		var textomostrar="";
		for (var i = 0; i < byhijos.length; i++) {
			if (byhijos[i].nodeType==3) {
				var texto=leftTrim(byhijos[i].textContent);
				if (texto.charAt(0)=="-") {
					textomostrar+=texto.substring(2, texto.length-1);
				}
			} else if (byhijos[i].tagName=="B") {
				textomostrar+=" "+leftTrim(byhijos[i].textContent);				
			} else if (byhijos[i].tagName=="SPAN") {
				textomostrar+=" "+leftTrim(byhijos[i].textContent);
			}		
		}
		return textomostrar+":";
	}
	
	var idcom=document.getElementById("comments_form").parentNode;
	var anclajecom=document.createElement("a");
	anclajecom.name="ponercomentario";
	idcom.insertBefore(anclajecom, idcom.firstChild);
	
	var bytodos=document.evaluate("//p[@class='by']", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for(var i=0; i<bytodos.snapshotLength; i++) {
		var byactual=bytodos.snapshotItem(i);
		var anchorlink=document.createElement("a");
		anchorlink.href="#ponercomentario";
		anchorlink.id=mostrarAutor(byactual);
		anchorlink.addEventListener('mousedown', insertarEnText, false);
		anchorlink.innerHTML="Responder";
		byactual.appendChild(anchorlink);
	}
	
}
})()