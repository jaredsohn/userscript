// ==UserScript==
// @name           torrent.to adremover
// @namespace      http://botorrentadremover.org
// @include        http://www.torrent.to/torrent/*
// ==/UserScript==

document.body.childNodes[1].childNodes[1].rows[0].cells[2].style.display = "none"; // 

//Hide all iFrames (ticker + eklige omapussies verbergen):
var iframes = document.getElementsByTagName("iframe");
for(var c=0;c<iframes.length;c++) {
		iframes[c].style.display = "none"
}

