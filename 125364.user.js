// ==UserScript==
// @name          GoogleBar fixer
// @namespace     http://userscripts.org/scripts/show/125364
// @description   Reduces the new Google bar down to just the grey Google bar
// @include       http://*.google.com/
// ==/UserScript==

GM_addStyle("\
#gbx1,#gbx2,#gbq,#gbu{top:0px !important;}\
#gbx3,#gbx4,#gbzw{display:none;}\
.k-Qf-YB-nb-dd,#gb{height:72px !important;}\
");