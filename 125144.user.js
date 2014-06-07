// ==UserScript==
// @name           DuckDuckGo in Dutch
// @namespace      Translates DuckDuckGo to Dutch.
// @include        http://duckduckgo.com/*
// @include        https://duckduckgo.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @version        0.01
// ==/UserScript==

alert("test");

var footer_firefox = $('label[value|="Firefox"]');
var footer_homepage = $('label[value|="Homepage"]');
var footer_settings = $('label[value|="Settings"]');

footer_homepage.html('Startpagina');