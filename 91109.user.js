// ==UserScript==
// @name          Wikipedia Clean
// @namespace     http://userscripts.org/scripts/show/91109
// @homepage	  http://userscripts.org/scripts/show/91109
// @description   works thoroughly to remove not-needed site-notice, top ads and related promotions from wikipedia.
// @include       http://*.wikipedia.org/*
// @version       1.0.31
// ==/UserScript==
window.addEventListener("load", function () {
    var a;
    for (a = document.getElementById("siteNotice"); a.hasChildNodes();) a.removeChild(a.firstChild);
    a.parentNode.removeChild(a);
}(), false);

//.user.js