// ==UserScript==
// @name          Youtube Warper
// @description   Warps every youtube page you visit
// @include       http://*.youtube.*/watch*
// @exclude       http://*.youtube.*/warp.swf*
// ==/UserScript==

currentLocation = document.location.href.split("watch");
document.location = currentLocation[0]+"warp.swf"+currentLocation[1];