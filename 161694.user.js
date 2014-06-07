// ==UserScript==
// @run-at document-start
// @id             Ebay URL Cleaner
// @name           Ebay URL Cleaner
// @namespace      
// @description    Clean ebay item URL
// @include        http://www.ebay.tld/itm/*
// @include        https://www.ebay.tld/itm/*
// @version        1.1
// ==/UserScript==
var newurl = document.URL.match(/https?:\/\/(|www).ebay.(.+?)\/itm/g) + document.URL.match(/\/[0-9]{11,13}[^#?/]/g);
if (newurl != document.URL) location.replace(newurl);