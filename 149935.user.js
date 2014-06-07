// ==UserScript==
// @name           Torrent Leech Highlighter
// @description    Easily identify if a torrent has been downloaded more than X times
// @lastupdated    2012-10-09
// @version        1.0
// @license        GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html
// @compatibility  Firefox 3.6+
// @include        http://torrentleech.org/torrents/browse*
// @include        http://www.torrentleech.org/torrents/browse*
// @grant          none
// ==/UserScript==

$(document).ready(function(){
	$("#torrents table tbody tr td:nth-child(6)").each(function(){
		var value = $(this).html();
		var value_array = value.split('<br>');
		
		if(value_array[0] > 700)
		{
			$(this).parents('tr:first').css('background-color', 'green');
		}
	});
});
