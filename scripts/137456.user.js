// ==UserScript==
// @name            Youtube - Remove Scrollbars
// @namespace       http://ruirize.co.uk/
// @author          Steffan James (Ruirize)
// @description     Hides both vertical and horizontal scrollbars on Youtube. Designed for use with Youtube Center.
// @match           http://*.youtube.com/*
// @match           https://*.youtube.com/*
// @exclude         http://apiblog.youtube.com/*
// @exclude         https://apiblog.youtube.com/*
// @run-at          document-end
// ==/UserScript==
(function(){
	console.log("Remove Scrollbars: Loaded");
	document.body.style.overflow = "hidden";
	console.log("Remove Scrollbars: Done!");
})();