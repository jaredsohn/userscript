// ==UserScript==
// @name           Leech using Torrific
// @namespace      http://blog.bcse.tw/leech-using-torrific
// @description    Makes Torrific your default bittorrent client
// @license        Apache Software License
// @author         Joel Lee
// @include        http://*
// @exclude        http://torrific.com/*
// @exclude        http://*.torrific.com/*
// @version        1.0
// ==/UserScript==

var torrents = document.querySelectorAll('a[href$=".torrent"],a[href*=".torrent?"]');
for (var i = 0; i < torrents.length; i++) {
	torrents[i].href = 'http://torrific.com/submit/?url=' + encodeURIComponent(torrents[i].href);
}