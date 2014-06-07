// ==UserScript==
// @name           Neopets : Price Checker
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Puts a link near to the item name in many places.
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.9.1
// @language       en
// @include        http://www.neopets.com/games/kadoatery/index.phtml
// @include        http://www.neopets.com/objects.phtml?*type=inventory*
// @include        http://www.neopets.com/island/training.phtml?*type=status*
// @include        http://www.neopets.com/pirates/academy.phtml?*type=status*
// @include        http://www.neopets.com/island/fight_training.phtml?*type=status*
// @include        http://www.neopets.com/quests.phtml*
// @include        http://www.neopets.com/auctions.phtml*
// @include        http://www.neopets.com/safetydeposit.phtml*
// @include        http://www.neopets.com/island/tradingpost.phtml*
// @include        http://www.neopets.com/market.phtml?*type=your*
// @include        http://www.neopets.com/browseshop.phtml?*owner=*
// @include        http://www.neopets.com/faerieland/employ/employment.phtml?*type=jobs*
// @include        http://www.neopets.com/objects.phtml?*type=shop*
// @include        http://www.neopets.com/island/kitchen.phtml
// @include        http://www.neopets.com/island/kitchen2.phtml
// @include        http://www.neopets.com/quickstock.phtml
// @include        http://www.neopets.com/halloween/garage.phtml
// @include        http://www.neopets.com/winter/igloo2.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/112692.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/56503.user.js
// @require        http://pastebin.com/download.php?i=sin7DHJi
// @contributor    nozkfox
// @history        1.0.9.0 Added to Igloo Garage Sale + Added support to Auto Pricing (Shift + P)
// @history        1.0.8.0 Added to Attic
// @history        1.0.7.0 Added to Quickstock
// @history        1.0.6.0 Added to Kitchen Quest
// @history        1.0.5.0 Added to Main Shops
// @history        1.0.4.2 Fixed Trading Post
// @history        1.0.4.1 Fixed some urls
// @history        1.0.4.0 Added support to Training Schools and Kadoatery(*)
// @history        1.0.3.0 Added support to Trading Post
// @history        1.0.2.0 Added to Auction House
// @history        1.0.1.1 Improved SDB
// @history        1.0.1.0 Added functionality to Shop Stock and Faerie Quests
// @history        1.0.0.1 Added updater
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

GM_setValue("config", JSON.stringify({enable : 0xFFFF, percent : 10, attempts : 3, append : false, interval : [500, 500],}));

/*
[enabled]
	0x0001	/objects.phtml (type=inventory)
	0x0002	/browseshop.phtml
	0x0004	/safetydeposit.phtml
	0x0008	/faerieland/employ/employment.phtml
	0x0010	/market.phtml
	0x0020	/quests.phtml
	0x0040	/auctions.phtml
	0x0080	/island/tradingpost.phtml
	0x0100  /island/training.phtml
			/pirates/academy.phtml
			/island/fight_training.phtml

[disabled]
	0x0200	/games/kadoatery/index.phtml
	0x0400	/objects.phtml (type=shop)
	0x0800  /island/kitchen.phtml
			/island/kitchen2.phtml
	0x1000	/quickstock.phtml
	0x2000	/halloween/garage.phtml
	0x4000	/winter/igloo2.phtml
*/


(function () {	// script scope
	var config = JSON.parse(GM_getValue("config", JSON.stringify({
		enable		: 0x01FF,
		percent		: 10,
		attempts	: 3,
		append		: false,
		interval	: [500, 500],
	}))),
	wait = false;
	obj = (function () {
		switch (location.pathname) {
			case "/objects.phtml":
				switch (/type=(\w+)/.test(location.search) && RegExp.$1 || "inventory") {
					case "inventory":
						return {
							"key" : 0x0001,
							"item" : ".//td[a/img[contains(@src, '/items/')]]/text()[1]",
						};
					case "shop":
						return {
							"key" : 0x0400,
							"item" : ".//td[a/img[contains(@src, '/items/')]]/b/text()[1]",
						};
				}
			case "/browseshop.phtml":
				return {
					"key" : 0x0002,
					"item" : ".//td[a/img[contains(@src, '/items/')]]/b/text()[1]",
				};
			case "/safetydeposit.phtml":
				return {
					"key" : 0x0004,
					"item" : ".//td[preceding-sibling::td[1]/img[contains(@src, '/items/')]]/b/text()[1]",
					"id" : ["string(./td/input[starts-with(@name, 'back_to_inv')]/@name)"],
				};
			case "/faerieland/employ/employment.phtml":
				return {
					"key" : 0x0008,
					"item" : ".//tr[position() mod 3 = 2 and preceding-sibling::tr[1]/td/img[contains(@src, '/items/')]]/td/text()[1]",
					"inline" : true,
				};
			case "/market.phtml":
				return {
					"key" : 0x0010,
					"item" : ".//td[following-sibling::td[1]/img[contains(@src, '/items/')]]/b/text()[1]",
				};
			case "/quests.phtml":
				return {
					"key" : 0x0020,
					"item" : ".//td[img[contains(@src, '/items/')]]/b/text()[1]",
				};
			case "/auctions.phtml":
				return {
					"key" : 0x0040,
					"item" : ".//td[preceding-sibling::td[1]/a/img[contains(@src, '/items/')]]/a/text()[1]",
				};
			case "/island/tradingpost.phtml":
				return {
					"key" : 0x0080,
					"item" : ".//td/text()[preceding-sibling::*[1][contains(@src, '/items/')]]",
				};
			case "/island/training.phtml":
			case "/pirates/academy.phtml":
			case "/island/fight_training.phtml":
				return {
					"key" : 0x0100,
					"item" : ".//b[following-sibling::img[1][contains(@src, '/items/')]]/text()[1]",
					"inline" : true,
				};
			case "/games/kadoatery/index.phtml":
				return {
					"key" : 0x0200,
					"item" : ".//td/strong[2]/text()[1]",
				};
			case "/island/kitchen.phtml":
				return {
					"key" : 0x0800,
					"item" : ".//b[preceding-sibling::img[1][contains(@src, '/items/')]]/text()[1]",
					"inline" : true,
				};
			case "/island/kitchen2.phtml":
				return {
					"key" : 0x0800,
					"item" : ".//b[preceding-sibling::img[1][contains(@src, '/items/')]]/text()[1]",
				};
			case "/quickstock.phtml":
				return {
					"key" : 0x1000,
					"item" : ".//td[@class = 'content']/form/table/tbody/tr[position() < last() - 1]/td[1]/text()[1]",
					"inline" : true,
				};
			case "/halloween/garage.phtml":
				return {
					"key" : 0x2000,
					"item" : ".//form[a/img[contains(@src, '/items/')]]/b/text()[1]",
				};
			case "/winter/igloo2.phtml":
				return {
					"key" : 0x4000,
					"item" : ".//td[a/img[contains(@src, '/items/')]]/b/text()[1]",
				};
		}

		return null;
	}());

	if (obj && obj.key & config.enable) {
		GM_addStyle(".dollar_button { color: #008800; cursor: pointer; }");

		if (typeof obj.append == "undefined") {
			obj.append = config.append;
		}
		
		var pn = new RegExp(/^\.\/\/(\w+)/.test(obj.item) && RegExp.$1 || "td", "i"),
		listButtons = [],
		DollarButton = function (item, parent, target) {
			this.item = item;
			this.parent = parent;
			this.target = target;
			this.callback = function (params) {
			};
			this.click = function (evt) {
				var _this = this;
				_this.target.style.color = "#0000CC";

				Wizard.find({
					"text" : _this.item.textContent.trim(),
					"onsuccess" : function (params) {
						_this.target.style.color = (/^2/.test(params.response.raw.status) && !params.message ? "#008800" : "#CC0000");

						if (params.message) {
							alert(params.message.textContent);
						} else {
							var previous = parseInt(_this.target.nextElementSibling.textContent, 10);
							if (params.list.length && (!("id" in obj) || (obj.id[1] || /(\d+)/).test(xpath(obj.id[0], _this.parent)) && RegExp.$1 == params.list[0].Id) && (evt.altKey || !previous || params.list[0].Price <= previous)) {
								_this.target.nextElementSibling.innerHTML = '<a target="_blank" href="' + params.list[0].Link + '">' + params.list[0].Price + '</a>';
							}
						}
						
						_this.callback(params);
					}
				});
			};
		};

		window.addEventListener("keyup", function (e) {
			if (e.shiftKey && 80 == e.keyCode) {
				if (wait) {
					wait = false;

					console.log("force stop");
				} else {
					var attempts = parseInt(prompt("How many times to search for lowest prices?", config.attempts), 10);

					if (0 < attempts) {
						wait = true;

						if (attempts != config.attempts) {
							GM_setValue("config", JSON.stringify(config));
						}

						(function recursive1 (index, list) {
							if (wait && index < list.length) {
								(function recursive2 (attempt) {
									if (!wait) {
										recursive1(0, []);
									} else if (0 < attempt) {
										list[index].callback = function (p) {
											if (!p.message) {
												if (p.list[0] && !Math.floor(p.list[0].Price / config.percent)) {
													attempt = 1;
												}
												window.setTimeout(recursive2, Math.floor(500 + 500 * Math.random()), --attempt);
											}
										};
										list[index].click(e);
									} else {
										recursive1(++index, list);
									}
								}(attempts));
							} else {
								wait = false;
							}
						}(0, listButtons));
					}
				}
			}
		}, false);

		for each (var item in xpath(obj.item)) {
			block = document.createElement("span");
			block.style.textAlign = "center";
			block.style.fontWeight = "bold";
			if (obj.inline) {
				block.style.marginLeft = "5px";
			} else {
				block.style.display = "block";
			}
			block.innerHTML = '<span class="dollar_button">$</span> <span class="price_shop"> </span>';

			var previous = item;
			while (!pn.test(previous.parentNode.tagName)) {
				previous = previous.parentNode;
			}
			previous.parentNode[obj.append ? "appendChild" : "insertBefore"](block, previous.nextSibling);

			var link = new DollarButton(item, previous.parentNode.parentNode, block.firstElementChild);
			listButtons.push(link);

			(function (link) {
				link.target.addEventListener("click", function (e) {
					link.click.apply(link, [e]);
				}, false);
			}(link));
		}
	}
}());