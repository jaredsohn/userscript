// ==UserScript==
// @name           TSH Search Title
// @namespace      http://torrentshack.net/
// @description    Changes the title bar on Torrent Shake to whatever you are searching for.
// @include        http://torrentshack.net/torrents.php?searchstr=*
// ==/UserScript==

var title = document.getElementsByTagName('input');
if (title[0].value) {
	document.title = "TSH - " + title[0].value;
}