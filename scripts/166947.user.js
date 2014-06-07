// ==UserScript==
// @name        hs.fi maksumuurin ohitus
// @namespace   hs_fi_maksumuurin_ohitus_1
// @description Helsingin sanomat (hs.fi) antaa lukea 5 artikkelia viikossa hs.fi -sivustosta. Tämä skripti tyhjentää localStorage:n joka sivun latauksen jälkeen. Napattu valmiista bookmarkletista.
// @include     http://*.hs.fi/*
// @version     1.0
// ==/UserScript==

localStorage.clear();
var c = document.cookie.split(';');
for (var i = 0; i < c.length; i++) { 
  var e = c[i].indexOf('=');
  var n = e > -1 ? c[i].substr(0,e) : c[i];
  document.cookie = n + '=;expires=Thu, 01 Jan 1970 00:00:00 GMT';
}