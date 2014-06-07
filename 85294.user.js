// ==UserScript==
// @name           remove yellow ABP ad
// @namespace      genhows
// @include        http://pspiso.com/*
// ==/UserScript==
var adSidebar = document.getElementById('abmsg');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}