// ==UserScript==
// @name           Fullscreenmap
// @namespace      david
// @include        http://www.bing.com/maps/*
// ==/UserScript==


var scripts = [
    'http://script.aculo.us/prototype.js',
    'http://script.aculo.us/effects.js',
    'http://script.aculo.us/controls.js'
];
for (i in scripts) {
    var script = document.createElement('script');
    script.src = scripts[i];
    document.getElementsByTagName('head')[0].appendChild(script);
}


window.addEventListener(
    'load', 
    function() { 
    	unsafeWindow['$']('msve_mapContainer').style.overflow = "visible"; 
    	unsafeWindow['$$']('.MSVE_Map')[0].style.zIndex= "30000";
    },
    true);
    
