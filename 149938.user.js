// ==UserScript==
// @name           Ausblenden
// @description    Blendet Blaue Blume aus
// @author         r u ready for gangbang?
// @version        1.0
// @include        http://de85.die-staemme.de/game.php?
// ==/UserScript==

var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
		$('[class="icon header new_post"].hide()