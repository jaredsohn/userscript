// ==UserScript==
// @name        BTN - collapse show info
// @namespace   diff
// @include     http*://broadcasthe.net/torrents.php?*id=*
// @grant	none
// @version     0.1
// ==/UserScript==

var heads = document.querySelectorAll('div.head');
for (i=0; head=heads[i]; i++) {
	if (head.textContent.toLowerCase().indexOf("show info") != -1) {
		head.textContent += " (click to expand)";
		var info = head.parentNode;
		info.style.overflow="auto";
		info.style.height = "10em";
		info.setAttribute("onClick", "javascript: this.style.overflow=''; this.style.height = '' ");
	}
}