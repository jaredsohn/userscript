// ==UserScript==
// @name           Reader links in search results
// @namespace      ingeo.org/gmonkey
// @description    just adds a link to reader.
// @include        http://*.google.com/*
// ==/UserScript==

(function () {
var el, node;

el = document.getElementById("gbar").getElementsByTagName("nobr")[0];
node = document.createElement("a");
node.setAttribute("class", "gb1");
node.setAttribute("href", "http://www.google.ca/reader/view");
node.innerHTML = "Reader";
el.insertBefore(node, el.getElementsByTagName("a")[5]);

}) ();