// ==UserScript==
// @name           siteFooterRemoval
// @namespace      sitefooter
// @description    removes ogame sitefooter
// @version	1
// include        http://*.ogame.*/game/index.php?page=*
// @include        http://*
// ==/UserScript==

var footer = document.getElementById('siteFooter');
if (footer) {
    adSidebar.parentNode.removeChild(footer);
}