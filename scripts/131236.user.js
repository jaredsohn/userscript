// ==UserScript==
// @name           Suomi24-Treffit - disable the ad banner
// @namespace      suomi24
// @description    Disables the ad banner
// @include        http://treffit.suomi24.fi/*
// ==/UserScript==

(function() {
    var banner;
    banner = document.getElementsByTagName('div')[0];
    if (!banner) { return; }
    banner.style.display = "none";
})();