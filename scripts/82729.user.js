// ==UserScript==
// @name		Google Images Classic View
// @description		Switch back to the classic Google Images view 
// @include        	http://images.google.*/*
// @include        	http://*.google.*/images?*
// @include        	http://*.google.*/imgres?imgurl=*
// @include        	http://*.google.*//imghp?*
// @version		1.0
// @contributor		http://www.ivanlovo.tk
// ==/UserScript==

if (location.href.indexOf('?hl=')>0){if (location.href.indexOf('&sout=1')==-1){top.location=location.href+'&sout=1';}}