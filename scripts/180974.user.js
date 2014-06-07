// ==UserScript==
// @name        NetuTv
// @namespace   netutv
// @description Removes Ad bar.
// @include     http://netu.tv/*
// @include     http://cdn.netu.tv/*
// @version     1.00
// @grant       tomasb
// ==/UserScript==

(function() {    
    var ad = document.getElementById('this-pays-for-bandwidth-container-hor');
    if (ad != null) {
        ad.parentElement.removeChild(ad);
    }
    return;
})();