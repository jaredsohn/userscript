// ==UserScript==
// @name           Habilitar clique no CSC
// @namespace      www.eliezer.com.br
// @author         Eliezer Rodrigues
// @description    CSC não sabe usar z-index
// @include        http://URL_CSC_AKI/*
// @version        0.0.1
// Change : Start tosk zindex tosk
// ==/UserScript==

window.addEventListener("load", function(){

	removeIndex('div', document);

	var frames = document.getElementsByTagName('iframe')
	for(var i =0; i<frames.length;i++){
		removeIndex('div', frames[i].contentDocument);
	}


}, false);


function removeIndex(elementName, root){
	element = root.getElementsByTagName(elementName)
	for(var i =0; i<element.length;i++){
	    element[i].style.zIndex = 1000
	}
}
