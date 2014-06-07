// ==UserScript==
// @name           Google Code direct download 2
// @namespace      http://totallyrand.om
// @description    Rewrites all Google Code file links to point directly to the file
// @include        http*://code.google.com/p/*
// @exclude        http*://code.google.com/p/*/downloads/list
// @grant          none
// @version        1.1
// @updateURL      https://userscripts.org/scripts/source/174538.meta.js
// @downloadURL    https://userscripts.org/scripts/source/174538.user.js
// ==/UserScript==
// Forked and fixed version of http://userscripts.org/scripts/show/10410

var links = document.getElementsByTagName("a");
for(var i = 0; i < links.length; i++) {
  var match = links[i].href.match(/https?:\/\/code\.google\.com\/p\/(.*)\/downloads\/detail\?name=(.*)/);
  if(match) links[i].href = "https://" + match[1] + ".googlecode.com/files/" + match[2];
}

