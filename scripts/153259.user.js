// ==UserScript==
// @name           Isohunt Addon Remover
// @namespace      http://www.martinmunich.com
// @include        http://anonymouse.org/cgi-bin/anon-www.cgi/http://isohunt.com/torrent_details/*
// @include        http://isohunt.com/torrent_details/*
// @description    Remove addon installation procedure when clicking on download links
// @version        0.0.2
// @downloadURL    https://userscripts.org/scripts/source/153259.user.js
// @updateURL      https://userscripts.org/scripts/source/153259.user.js
// ==/UserScript==

matchLinkID = "_tlink"; // Identifies download links
document.getElementById(matchLinkID).onclick = ''; // Remove onclick event
