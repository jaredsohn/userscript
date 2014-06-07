// ==UserScript==
// @name AbrirEnTabs
// @author Jesus Bayo(aka Chucky)
// @include http://*
// @include https://*
// @version 1.0
// @description  Abre en tabs todos los enlaces, aunque no sean enlaces
// ==/UserScript==

/* 
 * This script is licensed under the 
 * Creative Commons Attribution-NonCommercial-ShareAlike 2.5 Spain License. 
 * To view a copy of this license, visit http://creativecommons.org/licenses/by-nc-sa/2.5/es/ 
 */
 (function () {
 
 function abrirTabs(){
	var links=window.getSelection().toString();
	var arrLinks=links.split(/\s/);
	for (var i=0; i<arrLinks.length; i++){
		if (arrLinks[i].trim().indexOf("http")==0)
			GM_openInTab(arrLinks[i].trim());
	}
 }
 
 GM_registerMenuCommand('Abrir en tabs', abrirTabs)
})()

