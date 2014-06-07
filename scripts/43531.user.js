// ==UserScript==
// @name           Reload Overloaded
// @namespace      http://thepiratebay.org/search
// @description    Reload search results pages on The Pirate Bay when the search engine is overloaded
// @include        http://thepiratebay.org/search/*
// ==/UserScript==

var delay = 5;

var mc = document.getElementById("main-content");
if (mc.innerHTML.indexOf("Search engine overloaded") != -1) {
  mc.innerHTML = "Search engine overloaded -- will reload in " + delay + " seconds.";
  setTimeout(function() {
    location.reload();
  }, delay * 1000);
}
