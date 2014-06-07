// ==UserScript==
// @name           Grooveshark Advert Removal
// @namespace      jaymac407@@tangowebsolutions.com
// @description    Removes adverts and reclaims lost player space on Grooveshark.com.
// @include        http://listen.grooveshark.com/*
// ==/UserScript==
var adBar = document.getElementById('adBar');
var mainContentWrapper = document.getElementById('mainContentWrapper');
function weHateAdverts() {
	adBar.style.display = "none";
	mainContentWrapper.style.marginRight = "0";
}
setInterval(weHateAdverts, 1000);