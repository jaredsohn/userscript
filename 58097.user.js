// ==UserScript==
// @name		zShare Bypass Player
// @namespace	http://www.zshare.net/
// @description	Bypasses zShare java media player page and goes straight to download page.
// @include		*
// @author		ror
// @version		0.2
// @copyright	2009+, Daniele Mancino (http://damagedgoods.it)
// @license		GPL version 3 or any later version; http://www.gnu.org/copyleft/gpl.html)

// ==/UserScript==

// History:
// v0.2 : 2009.10.07 : Better link handling
// v0.1 : 2009.09.10 : First release

(function () {
var links = document.getElementsByTagName('a');
		for (var i = 0; i < links.length; i++) {
			if (links[i].href.indexOf('http://www.zshare.net/audio/') != -1) {
				new_link = links[i].href.replace('http://www.zshare.net/audio/','http://www.zshare.net/download/');
				links[i].href = new_link;
			}
		}
})();