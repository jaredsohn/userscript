// ==UserScript==
// @name           Grooveshark.com - Ad Remover
// @description    Removes the Advertisement Side Banner
// @include        http://listen.grooveshark.com/*
// @include        http://grooveshark.com/*
// @include        http://*.grooveshark.com/*
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.2
// ==/UserScript==

var adbar = document.getElementById("capital");
var wrap = document.getElementById("application");
var container = document.getElementById("mainContainer");

var removeAd = function() {
    if (wrap && adbar) {	
        wrap.style.marginRight = "0px";
        adbar.style.display = "none";
        container.removeChild(adbar);
    }
}

container.addEventListener("DOMSubtreeModified", removeAd, true);
removeAd();