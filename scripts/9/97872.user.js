//<![CDATA[
// ==UserScript==
// @name             ST7 Tabchatting
// @version          1.1
// @namespace        simmaster07
// @description      Because that popup window is ugleh.
// @include          *simtropolis.com/*
// ==/UserScript==
//]]>

if(window.location.href.toString().indexOf('simtropolis.com') >= 0)
{
	var chatElem = document.getElementById('nav_app_ipchat').childNodes[0];
	var chatLink = chatElem.getAttribute("onclick").replace('popup("', '').replace('");', '');
	    chatLink = chatLink.replace('?0,0,5,0,0', '?0,0,0,0,0');

	chatElem.setAttribute('onclick', '');
	chatElem.setAttribute('href', chatLink);
	chatElem.setAttribute('target', '_blank');
}