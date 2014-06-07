// ==UserScript==
// @name           AdsSkipper
// @description    Removes ad links from various sites
// @namespace      http://0x59.net/
// @author         Yehuda Deutsch <yeh@uda.co.il>
// @license        GPLv3
// @include        http://*.ynet.co.il/*
// @match          http://*.ynet.co.il/*
// @include        http://*.mako.co.il/*
// @match          http://*.mako.co.il/*
// @include        http://*.haaretz.co.il/*
// @match          http://*.haaretz.co.il/*
// @include        http://*.themarker.co.il/*
// @match          http://*.themarker.co.il/*
// ==/UserScript==

for (i in document.links) {
  l = document.links[i].href;
  linicom = /linicom\.([^/]+)\/external/.test(l);
  if (linicom) {
    document.links[i].href = decodeURIComponent(l.substr(l.indexOf('&a=') + 3));
  }
}