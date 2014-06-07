// ==UserScript==
// @name           Aftonbladet.se - Ingen autouppdatering
// @description    Hindrar Aftonbladet från att automatiskt ladda om varje halvtimme.
// @namespace      http://mablung.net
// @include        http://aftonbladet.se/*
// @include        http://*.aftonbladet.se/*
// ==/UserScript==

var r = document.getElementsByTagName('meta')[1];

if (r.getAttribute('http-equiv') == 'refresh' && r.getAttribute('content') == 1740) {
 r.parentNode.removeChild(r);
}