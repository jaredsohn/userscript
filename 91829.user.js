// ==UserScript==
// @name			Iksela's Grooveshark Ad Blocker
// @namespace		http://userscripts.org/users/65373
// @description		Hides the ad bar in Grooveshark
// @version			1.0
// @include	        http://listen.grooveshark.com/*
// ==/UserScript==

setTimeout(function(){
	document.getElementById("capital").style.display = "none";
	var a = document.getElementById("page_wrapper").style.width.split('px');
	var b = document.getElementById("application").style.marginRight.split('px');
	var c = parseInt(a[0])+parseInt(b[0]);
	var newWidth = c + "px";

	document.getElementById("page_wrapper").style.width = newWidth;
	document.getElementById("page_content").style.width = newWidth;
	document.getElementById("application").style.marginRight = "0px";
},2500);