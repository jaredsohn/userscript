// ==UserScript==
// @name GrooveShark-Fullscreen-noAds
// @namespace Grooveshark
// @version  2.0 
// @description    Removes the sidebar(ads) itself and extends player to fill the screen. Also removes ads from search result.
// @include        http://grooveshark.com/*
// @author         Manish Chiniwalar (http://userscripts.org/users/manishchiniwalar)
// @license        GNU GENERAL PUBLIC LICENSE
// ==/UserScript==


//remove sidebar
window.onload = function () {
    var main = document.getElementById("mainContainer");
    var ads = document.getElementById("capital");
    var app = document.getElementById("application");
    main.removeChild(ads);
    app.style.marginRight = '0px'};

//remove ads from search page
setInterval(function () {
    var x = document.getElementById("searchCapitalWrapper");
    x.parentElement.removeChild(x);
}, 1000);

