// ==UserScript==
// @name Grooveshark Sidebarless!
// @author Grant
// @version .01
// @description  Hides the adbar on grooveshark.com. 
// @include http://listen.grooveshark.com/
// ==/UserScript==

(function(){
	if(document.URL.match('http://listen.grooveshark.com/'){

hideAdvertisingBar();}}