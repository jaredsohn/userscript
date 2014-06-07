// ==UserScript==
// @name          Google Maps fade in
// @namespace     http://tr.ashcan.org/
// @description	  Like the fading in of the map tiles on iOS? So do I.
// @include       http://maps.google.com/*
// @include       https://maps.google.com/*
// ==/UserScript==

(function() {
    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "@-webkit-keyframes arrive { from { opacity: 0; } to { opacity: 1; } } #map img { -webkit-animation: arrive 1s; }";
    document.head.appendChild(style);
})();
