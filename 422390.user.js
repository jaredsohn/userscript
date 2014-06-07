// ==UserScript==
// @name        SoundCloud Full Width Layout
// @namespace   http://userscripts.org/users/s4tori
// @version     0.1
// @description Set the width layout to 100% on SoundCloud
// @include     https://soundcloud.com/*
// @copyright   2014+, s4tori
// @grant       none
// ==/UserScript==
// ---------------------------------------------------------------------

window.addEventListener("load", function () {
    var el = document.getElementById("content");
    if (el) {
        el.style.width= "100%";
        el.style.boxSizing    = "border-box";
        el.style.MozBoxSizing = "border-box";
        document.body.style.background = "#FFF";
    }
});