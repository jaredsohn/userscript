// ==UserScript==
// @name           PHP.net suggests
// @namespace      c.partiot.free.fr
// @description    add suggest on PHP.net website
// @include        http://*.php.net/*
// ==/UserScript==
var script="http://php.net/functions.js";
var d = this.window.document;
var js = d.createElementNS ? d.createElementNS('http://www.w3.org/1999/xhtml', 'script') : d.createElement('script');
js.setAttribute('type', 'text/javascript');
js.setAttribute('src', script);    js.setAttribute('defer', 'defer');
d.getElementsByTagName('head')[0].appendChild(js);