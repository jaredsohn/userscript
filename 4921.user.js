// ==UserScript==
// @name          Cheggit Re-titler
// @namespace     http://nipsden.blogspot.com
// @description   Makes the torrent name part of the page title
// @include       http://cheggit.net/torrents.php?*torrentid=*
// ==/UserScript==
//
// Concept borrowed from Empornium Util by Shannon Brooks (http://dogdoo.net)


var tit=document.getElementById('pagetitle');
var clTit=tit.innerHTML.replace(/^\s+/, '').replace(/\s+$/, '');
document.title = clTit + " on " + document.title;
