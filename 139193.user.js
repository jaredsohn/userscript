// ==UserScript==
// @name       S1CleanGlobo
// @namespace  http://userscripts.org/users/478131
// @version    0.1
// @description  Limpa as propagandas da globo.com
// @match      http://*globo.com/*
// @copyright  2012+, S1
// ==/UserScript==

var ads = document.getElementsByClassName("glb-opec");
if (ads) {
    var adsLength = ads.length;
    for (var i=0; i < adsLength; i++) {
        ads[i].style.display = 'none';
    }
}

ads = document.getElementsByClassName("separator");
if (ads) {
    var adsLength = ads.length;
    for (var i=0; i < adsLength; i++) {
        ads[i].style.display = 'none';
    }
}

ads = document.getElementsByClassName("destaque-inferior");
if (ads) {
    var adsLength = ads.length;
    for (var i=0; i < adsLength; i++) {
        ads[i].style.display = 'none';
    }
}

var ads2 = document.getElementById("opec-frame1");
if (ads2) {
    ads2.style.display = 'none';
}

var ads3 = document.getElementById("ad-position-top1");
if (ads3) {
    ads3.style.display = 'none';
}

var ads4 = document.getElementById("opec-banner-middle-container");
if (ads4) {
    ads4.style.display = 'none';
}

var ads5 = document.getElementById("ad-position-bottom1");
if (ads5) {
    ads5.style.display = 'none';
}

var ads6 = document.getElementById("ad-position-bottom2");
if (ads6) {
    ads6.style.display = 'none';
}

var ads7 = document.getElementById("ad-position-bottom3");
if (ads7) {
    ads7.style.display = 'none';
}
