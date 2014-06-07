// ==UserScript==
// @name       Nyaa Magnet Linker
// @version    1.1
// @description  Transforms all links on nyaa to magnet links
// @match      http://*.nyaa.se/*
// @match      http://*.nyaa.eu/*
// @copyright  2014, Jason Lam
// ==/UserScript==
var regex = /^[^.]*\.nyaa\.(se|eu)\/\?page=download&tid=/;

for (var i = 0; i < document.links.length; i++) {
    if (document.links[i].href.match(regex) !== null) {
        document.links[i].href += "&magnet=1";
    }
}