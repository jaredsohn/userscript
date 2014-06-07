// ==UserScript==
// @name           PC Case Gear: add model number to product title
// @description    Show product's model number on the page (is added to product's title)
// @namespace      dylandylan1
// @version        1.1
// @downloadURL    http://userscripts.org/scripts/source/152694.user.js
// @updateURL      http://userscripts.org/scripts/source/152694.meta.js

// @include        *://www.pccasegear.com/*
// ==/UserScript==


document.getElementsByClassName('producttitle')[0].innerHTML += "<br />" + document.title.match(/\[(.*?)\]/)[0];
