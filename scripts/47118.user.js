// ==UserScript==
// @name           TD DL Link
// @namespace      td
// @description    Rewrites TD DL Link
// @include        http://www.torrent-damage.net/torrents.php*
// ==/UserScript==


var ChangeLinks = function ChangeLinksFunc()
{
	var links = document.getElementsByTagName ("a");
	for (var l = 0; l < links.length; l++)
	{
		links[l].href = links[l].href.replace ("action=download", "action=dl");
	}
}
window.addEventListener("load", function(event) { ChangeLinks(); } , true );