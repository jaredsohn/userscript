// ==UserScript==
// @name       	  	FireCold Source
// @version    	  	1.0.1
// @description   	Redirect firecold video to youtube source if it exists.
// @homepageURL   	http://userscripts.org/scripts/show/398814
// @downloadURL   	http://userscripts.org/scripts/source/398814.user.js  
// @updateURL     	http://userscripts.org/scripts/source/398814.meta.js  
// @include  		http*://*.firecold.com/videos/*
// ==/UserScript==

var x=document.getElementById("player").firstElementChild.getAttribute("flashvars")
var id = (x.split('v='))[1]
if (id) location.replace("https://www.youtube.com/embed/" + id + "?autoplay=1")