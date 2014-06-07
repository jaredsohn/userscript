// ==UserScript==
// @name           PHP.net search auto suggestions
// @namespace      http://christian.roy.name/
// @description    add suggest search  on PHP.net website (based on PHP.net suggests from Yukulélé)
// @include        http://*.php.net/*
// @include        http://php.net/*
// ==/UserScript==
var d = window.document;
var js = d.createElementNS ? d.createElementNS('http://www.w3.org/1999/xhtml', 'script') : d.createElement('script');
js.setAttribute('type', 'text/javascript');
js.innerHTML = "loadSuggestCode();";
d.getElementsByTagName('head')[0].appendChild(js);