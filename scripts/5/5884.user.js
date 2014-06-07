// ==UserScript==
// @name           GMAIL Ad Remover
// @namespace      http://mywebsite.com/myscripts
// @description    A template for creating new user scripts from
// @include        http://mail.google.com/*
// ==/UserScript==

divtags=document.getElementsByTagName("DIV"); // get all div tags
// look for div tag with classname = rh

for ( i = 0; i < divtags.length; i++){
	if ( divtags.item(i).className == "rh" ) {
		divitem=divtags.item(i);
		divitem.style.display="none";
	}
	
}
