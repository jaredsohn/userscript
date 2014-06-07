// ==UserScript==
// @name        KG - hyperlink log entries
// @namespace   KG
// @include     http*://karagarga.net/log.php*
// @grant	GM_addStyle
// @version     0.2
// ==/UserScript==

var cells = document.querySelectorAll(".main td");

GM_addStyle(" .hoverme:hover { border-bottom: 1px solid #333; } ");

for (i=0; i< cells.length; i++) {
	var cell = cells[i];
	if ( cell.textContent.match(/^Torrent/) ) {
		var id = cell.textContent.match(/^Torrent\s(\d*)/)[1];
		var html =  cell.innerHTML;
		cell.innerHTML = "<a href='https://karagarga.net/details.php?id=" + id + " ' class='hoverme'> " + html + "</a>";
	}
}