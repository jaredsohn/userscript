// ==UserScript==
// @name           Zelly's NOSCRIPT tag remover
// @description    Deletes all NOSCRIPT tags from included websites
// @author         Zelly
// @homepage       http://userscripts.org/scripts/show/174236
// @updateURL      https://userscripts.org/scripts/source/174236.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174236.user.js
// @version        0.021
// @include        *.google.com/*
// @include	   *coinapps.com/*
// @include        *.ebay.com/sch*
// @include        *.ebay.com/csc*
// @include	   *.thefreshmarket.com/*
// @include	   *.nissancommercialvehicles.com/*
// @grant          none
// ==/UserScript==

var scripts = document.getElementsByTagName('noscript');
var i = scripts.length;
while (i--){scripts[i].parentNode.removeChild(scripts[i]);}