// ==UserScript==

// @name        Wikipedia Randomizer
// @description Replace all links on a Wikipedia page with a random article
// @author      legendeveryone
// @namespace   Wikipedia
// @include     http://*.wikipedia.org/*

// ==/UserScript==

var link;
link = document.body.getElementsByTagName("a")

for (var i = 0; i < link.length; i++) {
    link[i].href = "http://en.wikipedia.org/wiki/Special:Random"
}
