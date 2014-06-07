// ==UserScript==
// @name           Neopets : Price Checker
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Puts a link near to the item name in many places.
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        4.6.4
// @language       en
// @include        http://www.neopets.com/games/kadoatery/index.phtml
// @include        http://www.neopets.com/objects.phtml?*type=inventory*
// @include        http://www.neopets.com/inventory.phtml
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
// @include        http://www.neopets.com/quickstock.phtml*
// @include        http://www.neopets.com/halloween/garage.phtml
// @include        http://www.neopets.com/winter/igloo2.phtml
// @include        http://www.neopets.com/halloween/witchtower.phtml
// @include        http://www.neopets.com/halloween/witchtower2.phtml
// @include        http://www.neopets.com/halloween/esophagor.phtml
// @include        http://www.neopets.com/halloween/esophagor2.phtml
// @include        http://www.neopets.com/winter/snowfaerie.phtml
// @include        http://www.neopets.com/winter/snowfaerie2.phtml
// @include        http://www.neopets.com/closet.phtml*
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=112692
// @resource       meta http://userscripts.org/scripts/source/112692.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @resource       winConfigPriceCheckerCss http://pastebin.com/download.php?i=VCzrR5E8
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/56528.user.js
// @require        http://userscripts.org/scripts/source/56533.user.js
// @require        http://userscripts.org/scripts/source/56503.user.js
// @require        http://userscripts.org/scripts/source/56562.user.js
// @require        http://userscripts.org/scripts/source/163374.user.js
// @require        http://pastebin.com/download.php?i=sin7DHJi
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @contributor    nozkfox
// @history        4.6.4 Fixed some minor bugs
// @history        4.6.0 Added Bank and SDB options
// @history        4.5.1 Fixed minor bugs when Auto pricing is enabled
// @history        4.5.0 Added SSW option (premium only)
// @history        4.4.2 Fixed minor bug (Updated @require#163374)
// @history        4.4.0 Added Auto Buy HotKey & NP Limit
// @history        4.3.0 Added Includes Checker (due to the recent problems with userscripts.org)
// @history        4.1.0 Added Group information (Hover $ sign)
// @history        4.0.0 Added Direct Buy (Hold Ctrl while clicking $ sign)
// @history        3.0.0 Added Price Checker Settings
// @history        2.0.1.0 Added to the new Inventory
// @history        2.0.0.0 Updated @require#87942
// @history        1.0.11.2 Fixed minor bug at Quickstock
// @history        1.0.11.1 Fixed minor bug at Ednas Quest
// @history        1.0.11.0 Added to Closet
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

/*
[enabled]
	0x0001	/objects.phtml (type=inventory)
			/inventory.phtml
	0x0002	/browseshop.phtml
	0x0004	/safetydeposit.phtml
			/closet.phtml
	0x0008	/faerieland/employ/employment.phtml
	0x0010	/market.phtml
	0x0020	/quests.phtml
	0x0040	/auctions.phtml
	0x0080	/island/tradingpost.phtml
	0x0100  /island/training.phtml
			/pirates/academy.phtml
			/island/fight_training.phtml
	0x0400	/objects.phtml (type=shop)
	0x0800  /island/kitchen.phtml
			/island/kitchen2.phtml
			/halloween/witchtower.phtml
			/halloween/witchtower2.phtml
			/halloween/esophagor.phtml
			/halloween/esophagor2.phtml
			/winter/snowfaerie.phtml
			/winter/snowfaerie2.phtml
	0x1000	/quickstock.phtml

[disabled]
	0x0200	/games/kadoatery/index.phtml
	0x2000	/halloween/garage.phtml
	0x4000	/winter/igloo2.phtml
*/

GM_addStyle(GM_getResourceText("winConfigPriceCheckerCss"));

(function () {	// script scope
	var win = new WinConfig({
		title	: "Price Checker : Settings",
		type	: WinConfig.WindowType.CUSTOM,
		size	: ["644px", 0],
		default	: {
			autoPriceHotKey	: {
				keys	: 0x4,
				keyCode	: 80,
			},
			autoBuyHotKey	: {
				keys	: 0x4,
				keyCode	: 79,
			},
			group		: {
				enable		: 0x1DFF,
				interval	: {
					min		: 500,
					rnd		: 500,
				},
				npLimit		: {
					item	: 15000,
					total	: 50000,
				},
				attempts	: 5,
				append		: false,
				isSuper		: false,
				nGroup		: 0,
				autopricing	: 0x0800,
				target		: "_self",
				ignore		: true,
			},
		},
		fields	: [{
			name		: "settingsHotKey",
			label		: "Settings HotKey",
			key			: "hotkey",
			callback	: function(event, win) {
				win.open();
			},
		}, {
			name		: "autoPriceHotKey",
			label		: "Auto Pricing HotKey",
			key			: "hotkey",
			events		: {
				change	: function (e) {
					if (e.target.checked) {
						if ((0x1 & e.target.value) && !confirm("All prices will be checked only once while pricing items. Continue?")) {
							e.target.checked = false;
						} else if ((0x2 & e.target.value) && !confirm("All items will be bought once items are priced. Continue?")) {
							e.target.checked = false;
						}
					}
				}
			},
			callback	: function(event, win) {
				autoprice(event);
			},
		}, {
			name		: "autoBuyHotKey",
			label		: "Auto Buy HotKey",
			key			: "hotkey",
			callback	: function(event, win) {
				if (testBuy()) {
					executeBuy(false);
				} else {
					alert("There isn't any priced item to buy.");
				}
			},
		}, {
			name	: "group",
			nogroup	: true,
			type	: WinConfig.FieldType.GROUP,
			fields	: [{
				name	: "interval",
				label	: "Interval",
				type	: WinConfig.FieldType.GROUP,
				fields	: [{
					name	: "min",
					label	: "Minimum",
					format	: WinConfig.FieldFormat.NUMBER,
					description	: "The minimum value of time between searches.<br /><sup><i>Time in miliseconds</i></sup>",
					empty	: 0,
					help	: true,
				}, {
					name	: "rnd",
					label	: "Random",
					format	: WinConfig.FieldFormat.NUMBER,
					description	: "The random value of time between searches.<br />This value is multiplied by random value between 0-1 and added to the minimum value.<br /><sup><i>Time in miliseconds</i></sup>",
					empty	: 0,
					help	: true,
				}],
			}],
		}, {
			name	: "group",
			nogroup	: true,
			type	: WinConfig.FieldType.GROUP,
			class	: "enable",
			fields	: [{
				name: "enable",
				type: WinConfig.FieldType.CHECK,
				format: WinConfig.FieldFormat.NUMBER,
				multiple: true,
				unique: true,
				empty: 0,
				value: [{
					value	: 0x0001,
					label	: "Inventory",
					description	: '<a href="/inventory.phtml">Inventory</a>',
					help	: true,
				}, {
					value	: 0x0002,
					label	: "User Shop",
					description	: '<a href="/browseshop.phtml">User Shop</a>',
					help	: true,
				}, {
					value	: 0x0004,
					label	: "SDB/Closet",
					title	: "Safety Deposit Box / Closet",
					description	: '<a href="/closet.phtml">Closet</a><br /><a href="/safetydeposit.phtml">Safety Deposit Box</a>',
					help	: true,
				}, {
					value	: 0x0008,
					label	: "FE Agency",
					title	: "Faerieland Employment Agency",
					description	: '<a href="/faerieland/employ/employment.phtml">Faerieland Employment Agency</a>',
					help	: true,
				}, {
					value	: 0x0010,
					label	: "Shop Stock",
					description	: '<a href="/market.phtml?type=your">Shop Stock</a>',
					help	: true,
				}, {
					value	: 0x0020,
					label	: "Faerie Quest",
					title	: "Faerie Quests",
					description	: '<a href="/quests.phtml">Random Faerie Quests</a>',
					help	: true,
				}, {
					value	: 0x0040,
					label	: "Auctions",
					title	: "Neopian Auction House",
					description	: '<a href="/auctions.phtml">Neopian Auction House</a>',
					help	: true,
				}, {
					value	: 0x0080,
					label	: "Trading Post",
					description	: '<a href="/island/tradingpost.phtml">Trading Post</a>',
					help	: true,
				}, {
					value	: 0x0100,
					label	: "Training School",
					description	: '<a href="/pirates/academy.phtml">Cap\'n Threelegs\' Swashbuckling Academy</a><br /><a href="/island/training.phtml">Mystery Island Training School</a><br /><a href="/island/fight_training.phtml">Secret Ninja Training School</a>',
					help	: true,
				}, {
					value	: 0x0200,
					label	: "Kadoatery",
					description	: '<a href="/games/kadoatery/index.phtml">The Kadoatery</a>',
					help	: true,
				}, {
					value	: 0x0400,
					label	: "Neopian Shop",
					description	: '<a href="/objects.phtml?type=shop">Neopian Shops</a>',
					help	: true,
				}, {
					value	: 0x0800,
					label	: "Quest",
					title	: "Quests",
					description	: '<a href="/island/kitchen.phtml">Mystery Island Kitchen</a><br /><a href="/halloween/esophagor.phtml">The Esophagor</a><br /><a href="/winter/snowfaerie.phtml">The Snow Faerie\'s Quest</a><br /><a href="/halloween/witchtower.phtml">The Witch\'s Tower</a>',
					help	: true,
				}, {
					value	: 0x1000,
					label	: "Quick Stock",
					description	: '<a href="/quickstock.phtml">Quick Stock</a>',
					help	: true,
				}, {
					value	: 0x2000,
					label	: "AAA",
					title	: "Almost Abandoned Attic",
					description	: '<a href="/halloween/garage.phtml">Almost Abandoned Attic</a>',
					help	: true,
				}, {
					value	: 0x4000,
					label	: "IGS",
					title	: "Igloo Garage Sale",
					description	: '<a href="/winter/igloo2.phtml">Igloo Garage Sale</a>',
					help	: true,
				}],
			}],
		}, {
			name	: "group",
			nogroup	: true,
			type	: WinConfig.FieldType.GROUP,
			class	: "others2",
			fields	: [{
				name	: "checkSdb",
				label	: "Check at SDB before buying",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.NUMBER,
				empty	: 0,
				value	: [{
					value	: 0,
					label	: "Never",
					help	: false,
					description : "Never check.",
				}, {
					value	: 1,
					label	: "Prompt",
					help	: false,
					description : "Prompts removal items from SDB when needed.",
				}, {
					value	: 2,
					label	: "Always",
					help	: false,
					description : "Always removes items from SDB when needed.",
				}],
			}, {
				name	: "withdraw",
				label	: "Withdraw NP when needed",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.NUMBER,
				empty	: 1,
				value	: [{
					value	: 0,
					label	: "Never",
					help	: false,
					description : "Never withdraws neopoints.",
				}, {
					value	: 1,
					label	: "Prompt",
					help	: false,
					description : "Prompts withdrawal neopoints when needed.",
				}, {
					value	: 2,
					label	: "Always",
					help	: false,
					description : "Always withdraws neopoints when needed.",
				}],
			}, {
				name	: "nGroup",
				label	: "Groups",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.NUMBER,
				empty	: 0,
				value	: [{
					value	: 0,
					label	: "None",
					help	: true,
					description : "Doesn't show any group information.",
				}, {
					value	: 1,
					label	: "List",
					help	: true,
					description : "Shows the list of groups visited.<br />The most recent group is at first.<br /><br />-1 means not found.<br /><br /><b>Groups:</b> AN0, BO1, CP2, DQ3, ER4, FS5, GT6, HU7, IV8, JW9, KX_, LY and MZ.<br /><br /><b>Example:</b> 5, -1, -1, 0",
				}, {
					value	: 2,
					label	: "Total",
					help	: true,
					description : "Shows the number of distinct groups visited.",
				}],
			}, {
				name	: "npLimit",
				type	: WinConfig.FieldType.GROUP,
				label	: "NP Limit",
				fields	: [{
					name	: "item",
					label	: "Item",
					description	: "NP Limit by item price.<br />NP Limit is checked only after auto pricing is executed.<br /><br /><sup>You may set 0 to ignore this limit.</sup>",
					format	: WinConfig.FieldFormat.NUMBER,
					help	: true,
					empty	: 0,
				}, {
					name	: "total",
					label	: "Total",
					description	: "NP Limit by total price.<br />NP Limit is checked only after auto pricing is executed.<br /><br /><sup>You may set 0 to ignore this limit.</sup>",
					format	: WinConfig.FieldFormat.NUMBER,
					help	: true,
					empty	: 0,
				}],
			}],
		}, {
			name	: "group",
			type	: WinConfig.FieldType.GROUP,
			class	: "others",
			fields	: [{
				name	: "autopricing",
				label	: "Auto pricing",
				type	: WinConfig.FieldType.SELECT,
				format	: WinConfig.FieldFormat.NUMBER,
				description	: "Locations where auto pricing should be enabled.<br /><br /><sub>This field is multiselect, hold Ctrl to select multiple options.</sub>",
				multiple: true,
				unique	: true,
				empty	: 0,
				help	: true,
				value	: [{
					value	: 0x0001,
					label	: "Inventory",
				}, {
					value	: 0x0002,
					label	: "User Shop",
				}, {
					value	: 0x0004,
					label	: "Safety Deposit Box/Closet",
				}, {
					value	: 0x0008,
					label	: "Faerieland Employment Agency",
				}, {
					value	: 0x0010,
					label	: "Shop Stock",
				}, {
					value	: 0x0020,
					label	: "Faerie Quests",
				}, {
					value	: 0x0040,
					label	: "Neopian Auction House",
				}, {
					value	: 0x0080,
					label	: "Trading Post",
				}, {
					value	: 0x0100,
					label	: "Training School",
				}, {
					value	: 0x0200,
					label	: "Kadoatery",
				}, {
					value	: 0x0400,
					label	: "Neopian Shop",
				}, {
					value	: 0x0800,
					label	: "Quests",
				}, {
					value	: 0x1000,
					label	: "Quick Stock",
				}, {
					value	: 0x2000,
					label	: "Almost Abandoned Attic",
				}, {
					value	: 0x4000,
					label	: "Igloo Garage Sale",
				}],
			}, {
				name	: "target",
				label	: "Tab",
				type	: WinConfig.FieldType.SELECT,
				description	: "Target of the $ sign when clicked.",
				help	: true,
				value	: [{
					value	: "_self",
					label	: "Current",
				}, {
					value	: "_blank",
					label	: "New",
				}],
			}, {
				name	: "append",
				label	: "Append",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				description	: "Default position of the $ sign (append or prepend).",
				multiple	: true,
				help	: true,
			}, {
				name	: "isSuper",
				label	: "SSW",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				title	: "Super Shop Wizard",
				description	: "Uses the Super Shop Wizard when checked.<br /><br /><sup><b>Premium Only</b></sup>",
				multiple	: true,
				help	: true,
				events	: {
					change	: function (e) {
						e.target.form.elements.attempts.disabled = e.target.checked;
					},
				},
			}, {
				name	: "ignore",
				label	: "Ignore",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				title	: "Ignore Autopricing",
				description	: 'It disables autopricing in some cases.<br /><br />For example, when you: <ul><li>just completed a <a href="/quests.phtml">Faerie Quest</a></li><li> are looking for <a href="/halloween/witchtower.phtml">Edna avatar</a> (3 items)</li></ul>',
				multiple	: true,
				help	: true,
				events	: {
					change	: function (e) {
						//e.target.form.elements.attempts.disabled = e.target.checked;
					},
				},
			}, {
				name	: "pinNumber",
				label	: "PIN",
				title	: "PIN Number",
				description	: "Your PIN Number<br />Leave it blank when not used.<br /><br /><sub>It will be used at Bank and SDB.</sub>",
				type	: WinConfig.FieldType.PASSWORD,
				format	: WinConfig.FieldFormat.NUMBER,
				help	: true,
				empty	: "",
				attrs	: {
					maxlength: 4,
				}
			}, {
				name	: "attempts",
				label	: "Attempts",
				description	: "Number of consecutive attempts for each item.<br /><br /><sub>Ignored when SSW is checked.</sub>",
				format	: WinConfig.FieldFormat.NUMBER,
				help	: true,
				empty	: 0,
				attrs	: {
					maxlength: 2,
				}
			}],
		}],
	}),
	config = win.get("group"),
	wait = false;
	obj = (function () {
		switch (location.pathname) {
			case "/inventory.phtml":
				return {
					"key" : 0x0001,
					"item" : ".//td[a/img[contains(@src, '/items/')]]/text()[1]",
				};
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
			case "/closet.phtml":
				return {
					"key" : 0x0004,
					"item" : ".//td[preceding-sibling::td[1]/img[contains(@src, '/items/')]]/b/text()[1]",
					"id" : ["string(./td[6]/input/@name)"],
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
					"ignore"	: function (doc, items) {
						return xpath("boolean(id('complete_faerie_quest'))", doc) || xpath("boolean(.//img[contains(@src, '/crafting-faerie')])");
					},
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
					"item" : ".//b[following-sibling::img[1][contains(@src, '/items/')] or ancestor::tr[1]/td/img[1][contains(@src, '/items/')]]/text()[1]",
					"inline" : true,
					"relative" : true,
				};
			case "/games/kadoatery/index.phtml":
				return {
					"key" : 0x0200,
					"item" : ".//td/strong[2]/text()[1]",
				};
			case "/island/kitchen.phtml":
			case "/halloween/esophagor.phtml":
			case "/winter/snowfaerie.phtml":
				return {
					"key" : 0x0800,
					"item" : ".//b[preceding-sibling::img[1][contains(@src, '/items/')]]/text()[1]",
					"inline" : true,
				};
			case "/halloween/witchtower.phtml":
				return {
					"key" : 0x0800,
					"item" : ".//b[preceding-sibling::img[1][contains(@src, '/items/')]]/text()[1]",
					"inline" : true,
					"ignore" : function (doc, items) {
						return (3 != items.length);
					},
				};
			case "/island/kitchen2.phtml":
			case "/halloween/esophagor2.phtml":
			case "/winter/snowfaerie2.phtml":
				return {
					"key" : 0x0800,
					"item" : ".//b[preceding-sibling::img[1][contains(@src, '/items/')]]/text()[1]",
				};
			case "/halloween/witchtower2.phtml":
				return {
					"key" : 0x0800,
					"item" : ".//b[preceding-sibling::img[1][contains(@src, '/items/')]]/text()[1]",
					"ignore" : function (doc, items) {
						return (3 != items.length);
					},
				};
			case "/quickstock.phtml":
				return {
					"key" : 0x1000,
					"item" : ".//td[@class = 'content']//form/table/tbody/tr[position() < last() - 1]/td[@align = 'left'][1]/text()[1]",
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

	if (config && obj && obj.key & config.enable) {
		if (typeof obj.append == "undefined") {
			obj.append = config.append;
		}
		
		var pn = new RegExp(/^\.\/\/(\w+)/.test(obj.item) && RegExp.$1 || "td", "i"),
		_w = function () {
			return Math.floor(config.interval.min + config.interval.rnd * Math.random());
		},
		doc = document,
		listButtons = [],
		buy = function (_this) {
			_this.target.style.color = "#CC8800";
			GM_log("Buying " + _this.previous.Item + "...");

			setTimeout(Shop.list, _w(), {
				link		: _this.previous.Link,
				onsuccess	: function (result) {
					if (result.error) {
						alert(result.message.textContent);
					} else if (result.list.length && result.list[0].Id == _this.previous.Id) {
						delete _this.previous;

						result.link = result.list[0].Link;
						result.onsuccess = function (result2) {
							_this.target.style.color = "#008800";
							_this.callback(result2);
						};
						result.onerror = function (result2) {
							_this.target.style.color = "#CC0000";
							alert(result2.message.textContent);
						};

						setTimeout(Shop.buy, _w(), result);

						return;
					}

					_this.target.style.color = "#CC0000";
				}
			});
		},
		DollarButton = function (item, parent, target) {
			this.item = item;
			this.name = item.textContent.trim();
			this.price = NaN;
			this.parent = parent;
			this.target = target;
			this.callback = function (params) {
			};
			this.groups = [];
			this.click = function (evt, n) {
				var _this = this,
				isSuper = true == config.isSuper || 1 == config.isSuper || "true" == config.isSuper;
				_this.target.style.color = "#0000CC";

				Wizard.find({
					"attempts"	: (isSuper?1:n),
					"is_super"	: isSuper,
					"text"		: _this.name.toLowerCase(),
					"onsuccess"	: function (params) {
						var currentGroup = (params.list.length?"ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_".indexOf(params.list[0].Owner[0].toUpperCase()) % 13:-1);

						if (1 == config.nGroup) {
							_this.groups.unshift(currentGroup);

							_this.target.title = _this.name + " (" + _this.groups.join(", ") + ")";
						} else if (2 == config.nGroup) {
							if (!~_this.groups.indexOf(currentGroup)) {
								_this.groups.unshift(currentGroup);
							}

							_this.target.title = _this.name + " (" + _this.groups.length + " groups)";
						}

						if (params.error) {
							alert(params.message.textContent);
						} else if (params.list.length && (!("id" in obj) || (obj.id[1] || /(\d+)/).test(xpath(obj.id[0], _this.parent)) && RegExp.$1 == params.list[0].Id) && (evt.altKey || !_this.previous || params.list[0].Price <= _this.previous.Price)) {
							_this.target.nextElementSibling.innerHTML = '<a target="' + config.target + '" href="' + params.list[0].Link + (!obj.relative?'" style="position: absolute;':'')+ '">' + params.list[0].Price + '</a>';
							_this.previous = params.list[0];
						}

						if (_this.previous && evt.ctrlKey && (!params.error || confirm("An error occurred but you may try to buy the current item. Continue?"))) {
							buy(_this);

							return;
						}
						
						_this.target.style.color = (/^2/.test(params.response.raw.status) && !params.error ? "#008800" : "#CC0000");
						_this.callback(params);
					}
				});
			};
		},
		executeWithdraw = function (list) {
			var cb = function (index) {
				if (index < list.length) {
					if (list[index]) {
						var v = listButtons[list[index][2]];

						if (v && v.previous) {
							v.callback = function (p) {
								if (p.error) {
									alert(p.message.textContent);
								} else {
									setTimeout(cb, _w(), ++index);
								}
							};

							buy(v);
						} else {
							cb(++index);
						}
					} else {
						cb(++index);
					}
				}
			};

			var sum = 0,
			hand = parseInt(xpath("string(id('npanchor'))").replace(/[,.]/g, ""), 10);

			for (var ai in listButtons) {
				listButtons[ai].target.style.color = "#008800";
			}

			for (var ai in list) {
				sum += parseInt(listButtons[list[ai][2]].previous.Price, 10) || 0;
				listButtons[list[ai][2]].target.style.color = "#CC00CC";
			}

			if (sum && (!hand || hand < sum) && (2 == config.withdraw || 1 == config.withdraw && window.confirm("Withdraw " + sum + " NP?"))) {
				Bank.withdraw({
					pin			: config.pinNumber || "",
					amount		: sum,
					onsuccess	: function (obj) {
						window.setTimeout(cb, _w(), 0);
					}
				});
			} else {
				cb(0);
			}
		},
		executeBuy = function (b) {
			if (b || window.confirm("Confirm auto buying the priced items?")) {
				var iList = {},
				tList = [];

				for (var ai in listButtons) {
					var n = listButtons[ai].name.toLowerCase();

					if (n in iList) {
						++tList[iList[n]][1];
					} else {
						iList[n] = tList.length;
						tList[iList[n]] = [n, 1, ai];
					}
				}

				(function (list) {
					if (2 == config.checkSdb || 1 == config.checkSdb && confirm("Check and remove items from SDB?")) {
						var sdbList = [];

						(function recursive3 (index) {
							if (index < list.length) {
								listButtons[list[index][2]].target.style.color = "#888888";

								SDB.list({
									name		: list[index][0],
									onsuccess	: function (obj) {
										if (obj.list.length) {
											for (var ai in obj.list) {
												if (obj.list[ai].Name.toLowerCase() == list[index][0] && obj.list[ai].Quantity >= list[index][1]) {
													list[index][3] = obj.list[ai];
													list[index][4] = index;

													sdbList.push(list[index]);
												}
											}
										}

										setTimeout(recursive3, _w(), ++index);
									}
								});
							} else {
								if (sdbList.length) {
									var slist = [];
									for (var ai in sdbList) {
										slist.push([sdbList[ai][3].Id, sdbList[ai][1]]);

										delete list[sdbList[ai][4]];
									}

									SDB.remove({
										pin			: config.pinNumber || "",
										items		: slist,
										onsuccess	: function () {
											setTimeout(executeWithdraw, _w(), list);
										}
									});
								} else {
									executeWithdraw(list);
								}
							}
						}(0));
					} else {
						executeWithdraw(list);
					}
				}(tList));
			}
		},
		testBuy = function () {
			for (var ai in listButtons) {
				if (listButtons[ai].previous) {
					return true;
				}
			}

			return false;
		},
		autoprice = function (e) {
			if (wait) {
				wait = false;

				console.log("force stop");
			} else if (listButtons.length) {
				var attempts = (e.altKey || config.isSuper?1:parseInt(window.prompt("How many times to search for lowest prices?", config.attempts), 10));

				if (0 < attempts) {
					wait = true;

					(function recursive1 (index) {
						var list = listButtons;

						if (wait && index < list.length) {
							(function recursive2 (attempt) {
								if (!wait) {
									recursive1(0, []);
								} else if (0 < attempt) {
									list[index].callback = function (p) {
										if (!p.error) {
											if (p.list.length && 1 == p.list[0].Price) {
												attempt = 1;
											}

											window.setTimeout(recursive2, _w(), --attempt);
										} else {
											wait = false;
										}
									};
									list[index].click({}, 1);
								} else {
									recursive1(++index, list);
								}
							}(attempts));
						} else {
							if (e.ctrlKey && testBuy()) {
								var sum = 0,
								tBuy = true;

								for (var ai in list) {
									if (list[ai].previous) {
										var tPrice = list[ai].previous.Price;

										sum += tPrice;

										if (config.npLimit.item && tPrice > config.npLimit.item) {
											alert("NP Limit exceeded! (Item " + tPrice + " > " + config.npLimit.item + ")");

											tBuy = false;
											break;
										}
									}
								}

								if (tBuy) {
									if (config.npLimit.total && sum > config.npLimit.total) {
										alert("NP Limit exceeded! (Total " + sum + " > " + config.npLimit.total + ")");
									} else {
										executeBuy(false);
									}
								}
							}

							wait = false;
						}
					}(0));
				}
			}
		},
		list = xpath(obj.item, doc);

		for (var ai in list) {
			var item = list[ai];

			block = document.createElement("span");
			block.style.textAlign = "center";
			block.style.fontWeight = "bold";
			if (obj.inline) {
				block.style.marginLeft = "5px";
			} else {
				block.style.display = "block";
			}

			block.innerHTML = '<span class="dollar_button" title="' + item.textContent.replace(/[">&]/g, function ($0) {
				return "&" + ["quot", "gt", "amp"]['">&'.indexOf($0)] + ";";
			}) + '">$</span><span class="price_shop"> </span>';

			var previous = item;
			while (!pn.test(previous.parentNode.tagName)) {
				previous = previous.parentNode;
			}
			previous.parentNode[obj.append ? "appendChild" : "insertBefore"](block, previous.nextSibling);

			var link = new DollarButton(item, previous.parentNode.parentNode, block.firstElementChild);
			listButtons.push(link);

			(function (link) {
				link.target.addEventListener("click", function (e) {
					link.callback = function () {};
					link.click.apply(link, [e, e.ctrlKey?config.attempts:1]);
				}, false);
			}(link));
		}
		
		if ((obj.key & config.autopricing) && listButtons.length && (!obj.ignore || config.ignore && !obj.ignore(doc, list))) {
			window.setTimeout(autoprice, 0, {
				altKey	: false,
				ctrlKey	: true,
			});
		}
	}
}());