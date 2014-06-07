// ==UserScript==
// @name           Pardus Forum Utility
// @version        1.0
// @namespace      coawyn@gmail.com
// @description    Adds features to the forums such as missing smilies.
// @homepage       http://unique.hobby-site.com/
// @include        http://forum.pardus.at/index.php*
// ==/UserScript==

var tables = document.getElementsByClassName("tablefill");
if (tables.length > 0) {
	var lastRow = tables[0].rows[tables[0].rows.length - 2];
	lastRow.cells[lastRow.cells.length - 2].innerHTML = "<a href=\"javascript:emoticon('[IMG]http://static.pardus.at/img/std/forum/emoticons/blush.gif[/IMG]')\"><img src=\"http://static.pardus.at/img/std/forum/emoticons/blush.gif\" alt=\"smilie\" border=\"0\"></a>&nbsp;";
}