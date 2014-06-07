// ==UserScript==
// @name        BTN - collapse tech specs
// @namespace   diff
// @include     http*://broadcasthe.net/torrents.php?*id=*
// @grant	none
// @version     0.1
// ==/UserScript==

var torrents = document.querySelectorAll("[id^='torrent_']");
for (i=0; detail=torrents[i]; i++) {
	blocks = detail.getElementsByTagName("blockquote");
	specs = blocks[blocks.length-1];
	specs.style.display="none";
	
	var showhide = document.createElement('blockquote');
	showhide.innerHTML = "click to show specs";
	showhide.setAttribute("onClick", "javascript: this.nextSibling.style.display=''; this.style.display='none';");
	specs.parentNode.insertBefore(showhide, specs);
}