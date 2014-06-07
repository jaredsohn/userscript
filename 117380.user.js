// ==UserScript==
// @name          Walla (walla.co.il) ads skipper and VOD viewer with no toolbar
// @namespace amirrima
// @description   Enables the walla VOD viewer without installing the annoying walla toolbar, plus skips ads
// @version      0.2
// @include  http://*.walla.co.il/*
// ==/UserScript==

var loc = (window.location).toString();
window.addEventListener("load", function(e) {

if (loc.indexOf("http://video.walla.co.il")==0){
    element = document.getElementById("toolbarCurtainOuter");
    element.parentNode.removeChild(element);
    var s = document.createElement("script");
    s.innerHTML = "drawPlayer()";
    document.body.appendChild(s);
}

ads = document.getElementsByClassName("adBox ");
while (ads.length>0){
for (var i = 0; i < ads.length; i++) {
    element = ads[i];
    element.parentNode.removeChild(element);
}
ads = document.getElementsByClassName("adBox ");
}

}, false);