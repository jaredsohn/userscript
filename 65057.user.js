// ==UserScript==
// @name           Add Artist Widener
// @namespace      http://what.cd
// @description    Widens the Add Artist box
// @include        http*://*what.cd/torrents.php?id=*
// ==/UserScript==

function resize() {
	var artists = document.getElementById('AddArtists').getElementsByTagName('input');
	for(i=0;i<artists.length;i++)
		artists[i].size = 20;
}

var link = document.getElementById('AddArtists').parentNode.parentNode.parentNode.children[0].children[1].children[0];
// ugly, yes, but shh...
link.addEventListener("click", resize, true);
resize();