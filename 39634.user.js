// ==UserScript==
// @name Norra
// @description removes wikipedia donation message

// ==/UserScript==

var siteNotice = document.getElementById('siteNotice');
if (siteNotice) {
    adSidebar.parentNode.removeChild(siteNotice);
}