// ==UserScript==
// @name        what.cd + other gazelle trackers - improve readability
// @namespace   what.cd
//
// @include     http*://what.cd/torrents.php*
// @include     http*://what.cd/top10.php*
// @exclude	http*://what.cd/torrents.php?id=*
// @exclude	http*://what.cd/top10.php?type=votes*
//
// @include     http*://musiceye.tv/torrents.php*
// @exclude     http*://musiceye.tv/torrents.php?id=*
//
// @include     http*://*passthepopcorn.me/torrents.php*
// @include     http*://*passthepopcorn.me/artist.php*
// @exclude     http*://*passthepopcorn.me/torrents.php?id=*
//
// @include	http*://tv-vault.me/torrents.php*
// @exclude	http*://tv-vault.me/torrents.php?id=*
//
// @include	http*://stopthepress.es/torrents.php*
// @exclude	http*://stopthepress.es/torrents.php?id=*
//
// @include	http*://gazellegames.net/torrents.php*
// @exclude	http*://gazellegames.net/torrents.php?id=*
//
// @grant	none
// @version     0.7
// ==/UserScript==


var elms = document.querySelectorAll("tr.group, tr.torrent_row, tr.rowa, tr.rowb, tr.torrent");

for (m=0; m < elms.length; m++) {
        var links = elms[m].getElementsByTagName("a");
        
        for (i=0; i < links.length; i++) {
        	var link = links[i];
        	if ( link.href.indexOf("artist.php?id") != -1 || link.href.indexOf("torrents.php?id") != -1 ) {
        		link.style.fontSize = "140%";
        	} 
        }
}