// ==UserScript==
// @name           Open links in same tab
// @creator        Kim Christensen
// @namespace      http://www.kimcc.com
// @description    Open links in the current tab - without breaking out of any possible frames.
// @version        0.1
// @include        http://*
// ==/UserScript==

var links = document.getElementsByTagName('a');

for (var i=links.length-1; i>=0; i--) {
  links[i].target = "_self";
}