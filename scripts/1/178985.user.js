// ==UserScript==
// @name        Rutracker.org Magnet URLs
// @namespace   rutrackerorg-magnet-urls
// @description Transforms torrent hash into a magnet url
// @include     http://rutracker.org/*
// @version     1
// @grant       none
// ==/UserScript==

var e = document.getElementById("tor-hash");
if (e) {
    var hash = e.innerText;
    if (/^[0-9A-F]{40}$/.test(hash)) {
       e.innerHTML = "<a href='magnet:?xt=urn:btih:" + hash + "'>" + hash + "</a>";
    }
}
