// ==UserScript==
// @name       No YouTube Sidebar
// @namespace  Tom Buutkamp
// @author	   Tom Buutkamp
// @version        2013.03.04
// @description  Removes the new YouTube sidebar.
// @copyright  © 2013 No YouTube Sidebar
// @include        *//*.youtube.*/*
// ==/UserScript==

function insertCSS(cssToInsert) {
	var head=document.getElementsByTagName('head')[0];
	if(!head)
		return;
	var style=document.createElement('style');
	style.setAttribute('type','text/css');
	style.appendChild(document.createTextNode(cssToInsert));
	head.appendChild(style);
}

headerstyle = "#guide { display: none; }"
insertCSS(headerstyle); 