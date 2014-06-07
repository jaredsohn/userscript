// ==UserScript==
// @name          OkCupid Recent Activity Remover
// @description   This removes the annoying Recent Activity section from the OkCupid homepage.
// @include       http://*.okcupid.*
// ==/UserScript==

// Removes the Recent Activity section
var adSidebar = document.getElementById('orbit-box');
if (adSidebar) {
    adSidebar.parentNode.removeChild(adSidebar);
}


