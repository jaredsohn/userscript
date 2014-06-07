// Adapted from the _blank Must Die script by Max Kueng.
// Stops links on digg.com v3 opening in new tabs/windows.
// ==UserScript==
// @name         Digg single window
// @version      0.1
// @description  Removes the blank target attribute on digg v3
// @author       Kieran
// @include      http://digg.com/*
// @include      http://www.digg.com/*
// ==/UserScript==

(function (){
	
	var a = window.document.getElementsByTagName("a");
	var regTarget = /^(_blank)$/i;
	for (i=0;i<a.length;i++) {
		if (a[i].target.match(regTarget)) {
			a[i].removeAttribute("target"); 
		}
	}

}());