// ==UserScript==
// @name        Protopage Ad Zapper
// @namespace   OPK
// @include     http://www.protopage.com/*
// @grant	none
// @version     1
// ==/UserScript==
var div = document.getElementById("ad-0");
if (div) {
    // div.style.display = "none"; // Hides the ad, leaves the space
    // Or
    div.parentNode.removeChild(div); // Removes it entirely
}