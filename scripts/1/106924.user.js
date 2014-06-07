// ==UserScript==
// @name           Removes the delete option
// @description    removes the delete thread button
// @version        1
// @include        http://*playstarfleet*.com/*
// ==/UserScript==
var adSidebar = document.getElementById('deletable');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
