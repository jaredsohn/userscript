// ==UserScript==
// @name          The Student room space maximiser
// @namespace     http://none/
// @description   Removes TSR header and 'featured content'
// @include       http://www.thestudentroom.co.uk/*
// @include       http://thestudentroom.co.uk/*
// @date          2009-01-26
// @version       0.2
// @GM_version    0.5.4
// ==/UserScript==

(function() {
    if (div = document.getElementById('header_logo')) { div.style.display = 'none'; }
    if (div = document.getElementById('featuredContent')) { div.style.display = 'none'; }
    if (div = document.getElementByclassname('mainmenu')) { div.style.display = 'none'; }
})();
