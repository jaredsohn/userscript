// ==UserScript==
// @name           Orkut AdRemoval
// @author		   iAreCow
// @include        http://www.orkut.com/*
// ==/UserScript==

var adSidebar = document.getElementById('rhs_ads');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}