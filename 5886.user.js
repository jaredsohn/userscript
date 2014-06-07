// ==UserScript==
// @name          Lassozoomer
// @namespace     http://www.lassozoomer.com/
// @description  LassoZoomer enables fast zoom in on an AJAX map like Google Maps to a rectangular area selected by mouse drag.
// @include       http://maps.google.com/*
// @include       http://local.google.com/*
// @include       http::/google.com/maphp/*
// @include       http://google.com/map/*
// ==/UserScript==
if (typeof(unsafeWindow.onLoad) == 'function') {
    var tempOnLoad = unsafeWindow.onLoad;
    unsafeWindow.onLoad = function() {
        tempOnLoad();
        __loadLz();
    };
}
function __loadLz() {
    var j=document.getElementById('com.gpstagr.lz');
    var h=document.getElementsByTagName('head')[0];
    if(!j) {
        j=document.createElement('script');
        j.id='com.gpstagr.lz';
        j.src='http://www.gpstagr.com/js/lz2.js';
        h.appendChild(j);
    } else {
        __lzInit();
    }
};