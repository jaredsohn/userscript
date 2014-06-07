// ==UserScript==
// @name           Neopets : Plot Prizes Pricer
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Tells the plot prizes that worth to be bought by showing the neopoints per plot point
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0
// @language       en
// @include        http://www.neopets.com/*/prizes.phtml
// @include        http://www.neopets.com/halloween/hwp/shack.phtml
// @include        http://www.neopets.com/mip/prize_shop.phtml
// @include        http://www.neopets.com/desert/ldp/gift_shop.phtml
// @include        http://www.neopets.com/water/com_prizes.phtml
// @include        http://www.neopets.com/altador/colosseum/staff/
// @grant          GM_log
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// @grant          GM_getResourceText
// @grant          GM_xmlhttpRequest
// @icon           http://gm.wesley.eti.br/icon.php?desc=101687
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/101685.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        3.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        3.0.0 Added missing @icon
// ==/UserScript==

/*jslint white: true, browser: true, evil: true, forin: true, onevar: true, undef: true */
/*global GM_setValue, GM_getValue, GM_deleteValue: true */
/*global xpath, JellyNeo: true */

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

(function () {
	var plot = (function () {
		switch (location.pathname) {
			case "/altador/colosseum/2010/prizes.phtml"	: return ["Altador Cup V", 3];
			case "/mip/prize_shop.phtml"				: return ["The Journey to the Lost Isle Plot", 3];	// *
			case "/halloween/hwp/shack.phtml"			: return ["The Haunted Woods Plot", 3];
			case "/desert/ldp/gift_shop.phtml"			: return ["The Lost Desert Plot", 3];	// *
			case "/water/com_prizes.phtml"				: return ["The Curse of Maraqua Plot", 3];	// *
			case "/prehistoric/outskirts/prizes.phtml"	: return ["War for the Obelisk", 3];
			case "/altador/colosseum/staff/"			: return ["Staff Tournament", 0];
		}

		return null;
	}()) || [(/^(?:Neopets - )?(.+?) - Prize/i.test(document.title) && RegExp.$1), 3],
	cache;
	try {
		cache = JSON.parse(GM_getValue("cache_" + location.pathname, "{}"));
	} catch (e) { // compatibility mode
		cache = eval(GM_getValue("cache_" + location.pathname, "({})"));
	}

	function getPoints(node) {
		var texts = xpath(".//text()", node),
		ai, at, text;

		for (ai = texts.length;ai--;) {
			text = texts[ai].textContent.replace(/[,.]/g, "");

			if (/^\d+(?:$| point)/i.test(text)) {
				return parseInt(text, 10);
			}
		}

		return false;
	}

	function attachNpRatio(node, point, item) {
		var ratio = document.createElement("span");

		ratio.innerHTML = (item.price?'<a target="_blank" href="http://items.jellyneo.net/index.php?go=item&showitem=' + item.id + '">' + item.price + " NP</a><br />(" + (Math.floor(100 * item.price / point) / 100) + " NP/p)<br /><br />":"<br />Unpriced<br /><br />");

		var a = xpath(".//a", node.insertBefore(ratio, node.firstChild))[0];

		if (a) {
			a.addEventListener("click", function (e) {
				e.stopPropagation();
			}, false);
		}
	}

	function attachPrices(list, fromCache) {
		var curr = new Date(),
		prizes = xpath(".//td[@class = 'content']//tr/td[(./*/img or ./img or .//div[contains(translate(@class, 'I', 'i'), 'image') and contains(@style, '//images.')]) and .//text()]"),
		items = {},
		fitems = [],
		ai, at;

		for (ai in list) {
			if (/\/([^\/]+)\.gif$/.test(list[ai].image)) {
				items[RegExp.$1] = list[ai];
			}
		}

		for (ai = 0, at = prizes.length;ai < at;++ai) {
			let prize = prizes[ai],
			point = getPoints(prize),
			img = /\/([^\/]+)\.gif/.test(xpath("string(.//img[1]/@src|.//div[contains(translate(@class, 'I', 'i'), 'image') and contains(@style, '//images.')]/@style)", prize)) && RegExp.$1;

			if (point && img) {
				if (img in items) {
					fitems.push(items[img]);

					attachNpRatio(prize, point, items[img]);
				} else {
					JellyNeo.ItemDatabase.find({
						"data" : {
							"pic" : "/" + img + ".gif",
							"pic_type" : "partial"
						},
						"callback" : function (list) {
							var name = "cache_" + location.pathname,
							cache = JSON.parse(GM_getValue(name, "{}")),
							ai;

							if (list.length) {
								attachNpRatio(prize, point, list[0]);

								for (ai = cache.items.length - 1; ai > -1; --ai) {
									if (cache.items[ai].id === list[0].id) {
										break;
									}
								}

								if (~ai) {
									cache.items[ai] = list[0];
								} else {
									cache.items.push(list[0]);
								}

								GM_setValue(name, JSON.stringify(cache));
							}
						}
					});
				}
			}
		}

		if (!fromCache) {
			curr.setUTCHours(32, 0, 0, 0);

			GM_setValue("cache_" + location.pathname, JSON.stringify({
				"date" : curr,
				"items" : fitems,
			}));
		}
	}

	if (new Date(cache.date) > new Date()) {
		attachPrices(cache.items, true);
	} else if (plot) {
		JellyNeo.ItemDatabase.find({
			"data" : {
				"op_spec": 0,
				"specialcat" : plot[1],
				"notes" : plot[0],
				"notes_type" : "partial",
			},
			"pages" : -1,
			"callback" : attachPrices
		});
	} else {
		attachPrices([], false);
	}
}());