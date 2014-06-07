// ==UserScript==
// @name       defocus-flash
// @namespace  http://namingcrisis.net
// @version    0.1
// @description  defocus out of flash
// @match      http://*youtube.com/*
// @copyright  2012+, Kamal Advani
// ==/UserScript==

var DEFOCUS_INTERVAL = 33000;
    
function defocusFlash() {
    // see Chris Anthony's answer: http://stackoverflow.com/questions/254111/flash-steals-browser-focus
    document.body.tabIndex = 0;
    document.body.focus();
}

function setUpDefocus() {
    window.setInterval(defocusFlash, DEFOCUS_INTERVAL);
}

setUpDefocus();

