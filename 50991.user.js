// ==UserScript==
// @name           Vuze.com torrent link
// @namespace      http://userscripts.org/
// @include        http://www.vuze.com/details/*
// ==/UserScript==

var tid = location.pathname.split('/')[2];
if (tid)
 with (document.getElementById('bigDownloadButton').parentNode.parentNode.appendChild(document.createElement('a')))
  textContent = 'Download .torrent', href = unsafeWindow.contentData['h_' + tid].torrentURL;