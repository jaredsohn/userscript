// ==UserScript==
// @name           Newegg.com Title Fixer
// @namespace      http://freecog.net/2007/
// @description    Change the titles of newegg.com pages to remove the "newegg.com" prefix, so that actual product names appear on tabs, and pages bookmark nicely.
// @include        http://www.newegg.com/*
// @include        http://*.newegg.com/*
// ==/UserScript==

document.title = document.title.replace(/^newegg.com\s+-\s+/i, '');