// ==UserScript==
// @name           FreakAngels Be-header
// @namespace      54243
// @include        http://www.freakangels.com/*
// ==/UserScript==



var adSidebar = document.getElementById('head');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
