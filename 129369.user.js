// ==UserScript==
// @name           Neopets : Shop : NP Withdrawer
// @namespace      http://gm.wesley.eti.br
// @description    Automatically withdraws NP whether you don't have enough on hand
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0
// @language       en
// @include        http://www.neopets.com/browseshop.phtml?owner=*
// @include        http://www.neopets.com/objects.phtml?type=shop*
// @include        http://www.neopets.com/haggle.phtml*
// @include        http://www.neopets.com/auctions.phtml?type=bids&auction_id=*
// @include        http://www.neopets.com/auctions.phtml
// @include        http://www.neopets.com/pound/adopt.phtml
// @include        http://www.neopets.com/pound/abandon.phtml
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// @grant          GM_getResourceText
// @grant          GM_xmlhttpRequest
// @icon           http://gm.wesley.eti.br/icon.php?desc=129369
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/56533.user.js
// @require        http://userscripts.org/scripts/source/64182.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        2.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        2.0.0 Added missing @icon
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

/*
	type
	0x001	message
	0x002	withdraw

	shop
	0x001	user shops
	0x002	main shops
	0x004	haggle page
	0x008	auction [type=bids]
	0x010	auction [*] -- disabled by default
	0x020	pound (adopt + abandon)
*/

(function () {	// script scope
	var np = parseInt(xpath("string(id('npanchor')/text())").replace(/\D+/g, ""), 10),
	opt = JSON.parse(GM_getValue("options", JSON.stringify({
		alert	: true,
		type	: 0x003,
		shop	: 0x02F,
	}))),
	page = {
		"/browseshop.phtml"	: {
			id		: 0x001,
			item	: ".//a[contains(@href, 'buy_item.phtml') and img]",
			pdiff	: 0,
			event	: "click",
			price	: function (obj) {
				return ((/old_price=(\d+)/.test(obj.target.href) || obj.target.onclick && /(\d+)NP/i.test(obj.target.onclick.toSource().replace(/(?:[\seoit,.]|\\u[\da-f]{4})+/gi, ""))) && RegExp.$1);
			},
			confirm	: function (obj) {
				return (false !== obj.callback(obj.event));
			},
		},
		"/objects.phtml"	: {
			id		: 0x002,
			item	: ".//a[contains(@href, 'haggle.phtml') and img]",
			pdiff	: 0,
		},
		"/haggle.phtml"		: {
			id		: 0x004,
			item	: ".//form[@name = 'haggleform']",
			pdiff	: 0,
			event	: "submit",
			price	: function (obj) {
				return (obj.target.elements.namedItem("current_offer").value);
			},
			confirm	: function (obj) {
				return true;
			},
		},
		"/auctions.phtml"	: [{
			id		: 0x010,
			item	: ".//a[contains(@href, 'type=bids&auction_id')]",
			event	: "click",
			price	: function (obj) {
				return xpath("string(./ancestor::tr[1]/td[6]/b/text())", obj.target);
			},
		}, {
			id		: 0x008,
			item	: ".//form[contains(@action, 'auctions.phtml?type=placebid')]",
			price	: function (obj) {
				return (obj.target.elements.namedItem("amount").value);
			},
		}][1 + ["bids"].indexOf(/type=(bids)\b/.test(location.search) && RegExp.$1)],
		"/pound/adopt.phtml"	: {
			id		: 0x020,
			item	: ".//img[contains(@onclick, 'process_adopt')]",
			pdiff	: 0,
			event	: "click",
			price	: function (obj) {
				return unsafeWindow.pet_arr[unsafeWindow.selected_pet].price;
			},
			confirm	: function (obj) {
				return (~unsafeWindow.selected_pet);
			},
			execute	: function (obj) {
				obj.callback(obj.event);
			},
		},
		"/pound/abandon.phtml"	: {
			id		: 0x020,
			item	: ".//input[contains(@onclick, 'confirm_abandon')]",
			pdiff	: 0,
			event	: "click",
			price	: function (obj) {
				return xpath("string(.//div[2]/p[2]/b/text())").replace(/\D+/g, "");
			},
			confirm	: function (obj) {
				var c = xpath("string(.//input[@name = 'confirm']/@value)", obj.target.form);

				if (c < 4) {
					obj.callback(obj.event);

					return false;
				} else {
					return true;
				}
			},
			execute	: function (obj) {
				obj.callback(obj.event);
			},
			pin		: function (obj) {
				return xpath("string(id('pin_field')/@value)");
			},
		},
	},
	send = (opt.alert?window.alert:console.log);
	pcopy = {
		"/objects.phtml"	: "/browseshop.phtml",
		"/auctions.phtml"	: "/haggle.phtml",
	},
	withdrawAndBuy = function (e, cb) {
		e.stopPropagation();
		
		var obj = {
			target	: this,
			event	: e,
			callback: cb,
		},
		price = parseInt(page.price.apply(page, [obj]), 10);

		if (price >= np && opt.type) {
			if (0x001 == opt.type) {
				e.preventDefault();

				send("You don't have enough neopoints on hand. (" + np + " NP)");
			} else if (page.confirm.apply(page, [obj]) && 0x002 & opt.type && Pin.execute("pin_request", page.pin && page.pin.apply(page, [obj]))) {
				console.log(1);
				Bank.withdraw({
					amount		: Math.ceil(price - np * page.pdiff),
					pin			: GM_getValue("pin", ""),
					parameters	: {
						obj		: obj,
					},
					synchronous	: true,	// <--- it delays a little but it doesn't work at all!!!
					onsuccess	: function (xhr) {
						console.log(2);
						if (!xhr.error || xhr.message) {
							var npanchor = xpath("string(id('npanchor')/text())", xhr.response.xml),
							msg = xhr.message && xhr.message.textContent;
							np = parseInt(npanchor.replace(/\D+/g, ""), 10);
							xhr.obj.np = np;
							//xpath("id('npanchor')")[0].textContent = npanchor;
							
							if (price > np && 0x001 & opt.type || msg) {
								xhr.obj.event.preventDefault();	// should work, but it doesn't!

								send(msg || "You don't have enough neopoints on hand. (" + np + " NP)");
							} else if (page.execute) {
								page.execute.apply(page, [xhr.obj]);
							}
						} else {
							xhr.obj.event.preventDefault();	// should work, but it doesn't!

							send("Unknown error");
						}
					}
				});
				console.log(3);
			} else {
				e.preventDefault();
			}
		} else if (!page.confirm.apply(page, [obj])) {
			e.preventDefault();
		}
	};

	for (var a in pcopy) {
		for (var b in page[pcopy[a]]) {
			if (!(b in page[a])) {
				page[a][b] = page[pcopy[a]][b];
			}
		}
	}

	page = page[location.pathname];

	if (page.id & opt.shop) {
		for each (var node in xpath(page.item)) {
			var pe = "on" + page.event,
			cb = node[pe];
			node.removeAttribute(pe);

			(function (cb, node) {
				node.addEventListener(page.event, function (e) {
					withdrawAndBuy.apply(node, [e, cb]);
				}, true);
			}(cb, node));
		}
	}
}());