// ==UserScript==
// @name        info_hash2magnet
// @namespace   Torrentz
// @description Replace the torrent's infohash with a magnet link
// @version     0.1.2
// @include     http://torrentz.eu/*
// @include     https://torrentz.eu/*
// @author      paxcoder
// ==/UserScript==

var div = document.getElementsByClassName('trackers')[0].firstChild;
var magnet_link = div.innerHTML.replace('info_hash: ', 'magnet:?xt=urn:btih:');
div.innerHTML = '<a href="'+magnet_link+'">'+magnet_link+'</a>';
