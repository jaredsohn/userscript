// ==UserScript==
// @name           RT Disable autoplay
// @namespace      rtdap@kwierso.com
// @description    Disable RT video autoplays
// @include        http://roosterteeth.com/*
// @include        http://*.roosterteeth.com/*
// @include        http://redvsblue.com/*
// @include        http://achievementhunter.com/*
// @include        http://strangerhood.com/*
// ==/UserScript==

(function(){
    var playerFull = document.getElementById("playerFull");
    var flashvars = playerFull.getElementsByTagName("embed")[0].getAttribute("flashvars");
    flashvars = flashvars.replace("autostart=true", "autostart=false");
    playerFull.getElementsByTagName("embed")[0].setAttribute("flashvars", flashvars);
})();