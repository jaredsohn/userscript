// ==UserScript==
// @name           Neopets : Tyranu Evavu
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Plays Tyranu Evavu as much as possible.
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0.2
// @language       en
// @include        http://www.neopets.com/games/tyranuevavu.phtml*
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/28580.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @uso:version    version
// @history        2.0.0.1 Fixed @resource i18n
// ==/UserScript==

/**************************************************************************

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

**************************************************************************/

(function () {	// script scope
	var interval = JSON.parse(GM_getValue("interval", "[3000, 2000]")),
	actionButton = xpath(".//form[contains(@action, 'tyranuevavu.phtml')]/input[@type = 'submit']")[0];

	if (!actionButton && /(\d+)_(\w+)/.test(xpath("string(.//img[contains(@src, 'games/cards/')]/@src[contains(., '_')])"))) {	// keep playing
		var suit = ["spades", "hearts", "clubs", "diamonds"].indexOf(RegExp.$2),
		cards = JSON.parse(GM_getValue("cards", "[]")) || [],
		at = cards.length,
		evavu = (RegExp.$1 - 1) << 2,
		tyranu = 55 - at - evavu;

		cards.push(evavu - 4 + suit);
		cards.sort(function(a, b) {
			return (a != b) - ((a < b) << 1);
		});

		// number of cards lower than or equal to the current card
		for (var ai = 0;ai <= at && 0 < evavu - cards[ai];++ai) {
			if (4 < evavu - cards[ai]) {
				++tyranu;
			}
		}
		evavu -= ai;

		GM_setValue("cards", JSON.stringify(cards));

		function nextAction () {
			location.replace(xpath("string(.//a[contains(@href, '" + ["higher", "lower"][0|(evavu > tyranu)] + "') and img[contains(@src, '/prehistoric/')]]/@href)"));
		}		
	} else {
		GM_setValue("cards", "[]");

		function nextAction () {
			actionButton.click();
		};
	}

	window.setTimeout(nextAction, interval[0] + Math.floor(Math.random() * interval[1]));
})();