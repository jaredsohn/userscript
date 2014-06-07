// ==UserScript==
// @name           Fluid Grooveshark Ad Remover fixed
// @namespace      http://skammer.name
// @description    Removes the side banner advertisements on Grooveshark.
// @author         Modified by skammer (http://skammer.name), originally by  KnifeySpooney (http://spogg.com/KnifeySpooney, http://wurbo.com) 
// @version        1.1
// @include        http://listen.grooveshark.com/*
// ==/UserScript==

var main = document.getElementById("mainContainer");
var adbar = document.getElementById("adBar");
var wrap = document.getElementById("mainContentWrapper");

var removeAds = function() {
	if (wrap && adbar) {
		wrap.style.marginRight = "0px";
		adbar.style.display = "none";
	}
}

main.addEventListener("DOMSubtreeModified", removeAds, true);
removeAds();
