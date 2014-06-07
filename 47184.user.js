// ==UserScript==
// @name	[2Shared] Add a download button to the top
// @namespace	nanobyte.online.de.2shared.com
// @description	Replace the "Download ***" text with a download button on 2Shared.com
// @version	1.0
// @author	Matthias Ruchay
// @include	http://*.2shared.com/file/*
// @run-at	document-start
// ==/UserScript==

var el=document.getElementsByClassName('header')[0];
var celNewDownload=document.createElement('div');
celNewDownload.innerHTML='<button onclick="startDownload()">Download file now!</button>';
el.parentNode.insertBefore(celNewDownload,el);el.parentNode.removeChild(el);