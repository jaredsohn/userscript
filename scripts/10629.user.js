// ==UserScript==
// @name          Guardian Unlimited Text Ad Remover
// @namespace     http://bitrot.net/greasemonkey
// @description	  Removes the text "Advertiser links" panel from Guardian Unlimited pages
// @include       http://*.guardian.co.uk/*

// ==/UserScript==

(function() {
    var adDiv;
    // Remove text ads
    if (adDiv = document.getElementById("overturetextads")) {
        adDiv.parentNode.removeChild(adDiv);
    }
    // Remove iframe-based ads
    if (adDiv = document.getElementById("overtureIFrame")) {
        adDiv.parentNode.removeChild(adDiv);
    }
    // Remove that nasty little "Article continues" bit
    if (adDiv = document.getElementById("mpu_continue")) {
        adDiv.parentNode.removeChild(adDiv);
    }
    if (adDiv = document.getElementById("spacedesc_mpu_div")) {
        adDiv.parentNode.removeChild(adDiv);
    }
})();
