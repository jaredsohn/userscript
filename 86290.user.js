// ==UserScript==
// @name           Redirect to Amazon full page
// @namespace      http://userscripts.org/users/130678
// @description    Redirect to full page from pages for mobile devices.
// @include        http://www.amazon.tld/gp/aw/*
// ==/UserScript==

var asin = location.href.match(/[\?&]a=(\w*)/)[1];
if(!asin) return;
location.href = 'http://' + location.hostname + '/dp/' + asin;