// ==UserScript==
// @name         Wix Branding Destroyer
// @namespace    http://userscripts.org/users/zackton
// @version      1.1.2
// @description  Youtube first list item removal
// @include      htt*://*.wix.com/*
// @updateURL    http://userscripts.org/scripts/source/162186.meta.js
// ==/UserScript==

var del = document.getElementById('wixFooter')
del.parentNode.removeChild(del)