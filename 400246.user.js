// ==UserScript==
// @name       daily-jav.com skip redirect page
// @namespace  null
// @description daily-jav.com skip redirect page
// @include     http://daily-jav.com/goto/*
// @author      higegojira.jp
// @updateURL   http://userscripts.org/scripts/source/400246.user.js
// @version     0.21
// ==/UserScript==


window.addEventListener?	window.addEventListener('load',skipRedirect,false) : window.attachEvent('onload',skipRedirect); 

function skipRedirect () {
	
	document.getElementById("submit").click();
	
}


