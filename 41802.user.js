
// ==UserScript==
// @name          Remove labels from notebook
// ==/UserScript==


var adSidebar = document.getElementById('gn2_0');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}