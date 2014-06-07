// ==UserScript==
// @name           Bigger Strava Thumbnails
// @version        0.0.1
// @include        http://www.strava.com/*
// ==/UserScript==

var script = document.createElement('script');
script.textContent = "mapboxMaxZoom=14";
document.head.appendChild(script);
script.parentNode.removeChild(script);
