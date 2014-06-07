// ==UserScript==
// @name          GMailSecure
// @version       1.0
// @author        wotupset
// @namespace     http://userscripts.org/scripts/show/152679
// @description   force GMail to use secure connection
// @include       http://gmail.google.com/*
// @exclude       http://www.google.com.tw/*
// ==/UserScript==

window.location.href = window.location.href.replace(/^http:/, 'https:');