// ==UserScript==
// @name        New window for Bigstock Lightboxes
// @namespace   http://www.bigstockphoto.com/
// @include     http://*.bigstockphoto.com/saved/*
// @version     1
// ==/UserScript==

(function(){
	var script = document.createElement("script");
	script.type = "application/javascript";
	script.innerHTML = "$(function(){$('a').attr('target', '_blank');});";
	document.body.appendChild(script);
})();