// ==UserScript==

// @name           South Park Zone Clean(ish)

// @namespace
// @include        http://www.southparkzone.com/* 
//==/UserScript==

var adSidebar = document.getElementById('header');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('footer');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}
var adSidebar = document.getElementById('search');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}