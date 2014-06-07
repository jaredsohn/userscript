// ==UserScript==
// @name           TPB Torrage Link
// @namespace      http://userscripts.org/users/402337
// @description    Put Torrage Link next to Magnet Link
// @include        http://thepiratebay.org/torrent/*
// ==/UserScript==

var links = document.querySelectorAll('a[href*="magnet"]');
var i;
for (i = 0; i < links.length; i++) {
	var link = document.createElement("a");
  link.href = "http://torrage.com/torrent/" + links[i].getAttribute('href').substr(20, 40).toUpperCase() + ".torrent";
  link.textContent = "Torrage Link";
  links[i].parentNode.appendChild(link);
}