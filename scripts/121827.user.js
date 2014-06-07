// ==UserScript==
// @name           Ausblenden
// @description    Blendet » einloggen (gleiches Fenster) aus
// @author         Master
// @version        1.0
// @include        http://de*.die-staemme.de/game.php?*&screen=settings&mode=vacation*
// ==/UserScript==


		var $ = typeof unsafeWindow != 'undefined' ? unsafeWindow.$ : window.$;
		$('table[class="vis"] a:contains("gleiches Fenster")').hide()