// ==UserScript==
// @name           Neopets : Quick Price Checker
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Enables Alt+W to quickly check the price of the selected text and converts it into a link
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br/includes/neopets)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes/neopets
// @version        3.2.1
// @include        http://www.neopets.com/*
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=61379
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @resource       winConfigQuickPriceCheckerCss http://pastebin.com/download.php?i=mkruS5YA
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/56503.user.js
// @require        http://userscripts.org/scripts/source/56562.user.js
// @require        http://userscripts.org/scripts/source/163374.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        3.2.1 Added missing @icon
// @history        3.2.0 Added Includes Checker (due to the recent problems with userscripts.org)
// @history        3.1.0 Added Buy Hotkey
// @history        3.0.0 Added WinConfig Settings
// @history        2.0.0.0 Updated @require#54987
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

GM_addStyle(GM_getResourceText("winConfigQuickPriceCheckerCss"));

(function () {
	function execute (config, fn) {
		(function (obj) {
			var sel;

			if ((sel = window.getSelection()).rangeCount) {
				for (var ai = sel.rangeCount;ai--;) {
					var range = sel.getRangeAt(ai);

					if (range.toString().length) {
						var current = new Date().valueOf(),
						next = parseInt(GM_getValue("nextAccess", "0"), 10),
						time = Math.max(0, next - current),
						params = obj.parameters(range) || [];

						GM_setValue("nextAccess", obj.time() + (time ? next : current) + "");

						params.unshift(obj.function, time);

						setTimeout.apply(this, params);
					}
				}
			}
		}({
			"time"		: function () {
				return config.interval.min + Math.ceil(config.interval.rnd * Math.random());
			},
			"function"	: Wizard.find,
			"parameters" : function (range) {
				return [{
				"text"		: range.toString(),
				"attempts"	: (fn?config.attempts:1),
				"onsuccess"	: function (params) {
					var msg;

					if (params.list.length) {
						var a = document.createElement("a"),
						g = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_".indexOf(params.list[0].Owner[0].toUpperCase()) % 13;

						a.textContent = params.range.toString();

						var last = params.range.extractContents().firstChild;

						if (last.href && !fn) {
							var gg = last.getAttribute("data:groups").split(","),
							gi = gg.indexOf("" + g);
							if (~gi) {
								gg.splice(gi, 1);
							}
							gg.push(g);
							last.setAttribute("data:groups", gg.join(","));

							if (/[?&]buy_cost_neopoints=(\d+)/.test(last.href) && params.list[0].Price <= parseInt(RegExp.$1, 10)) {
								last.setAttribute("href", params.list[0].Link + "#g" + last.getAttribute("data:groups"));
							} else {
								last.setAttribute("href", last.href.replace(/#g\d+(?:,\d+)*/g, "") + "#g" + last.getAttribute("data:groups"));
							}

							a = last;
						} else {
							a.setAttribute("data:groups", g);
							a.setAttribute("target", config.target);
							a.setAttribute("href", params.list[0].Link + "#g" + a.getAttribute("data:groups"));

							if (fn) {
								fn(params.list[0]);
							}
						}
						
						params.range.insertNode(a);
						params.range.selectNode(a);
					} else if (params.error) {
						WinConfig.init({
							title	: "Quick Price Checker : Error",
							type	: WinConfig.WindowType.ERROR,
							description	: "<br />" + (params.message && params.message.textContent.trim() || "Unexpected error (1)"),
						});
					} else if (config.notfound) {
						WinConfig.init({
							title	: "Quick Price Checker : Warning",
							type	: WinConfig.WindowType.WARNING,
							description	: "<br />" + (params.message && params.message.textContent.trim() || "The following text was not found:\n" + params.range.toString()),
						});
					}
				},
				"parameters": {
					"range"	: range,
				}
			}];
			}
		}));
	}

	WinConfig.init({
		title	: "Quick Price Checker : Settings",
		type	: WinConfig.WindowType.CUSTOM,
		size	: ["340px", 0],
		default	: {
			executeHotKey	: {
				keys	: 0x1,
				keyCode	: 87,
			},
			buyHotKey	: {
				keys	: 0x3,
				keyCode	: 87,
			},
			group		: {
				target		: "_self",
				attempts	: 2,
				notfound	: false,
				interval	: {
					min		: 500,
					rnd		: 500,
				},
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
			name		: "executeHotKey",
			label		: "Search HotKey",
			key			: "hotkey",
			callback	: function(event, win) {
				execute(win.get("group"));
			},
		}, {
			name		: "buyHotKey",
			label		: "Buy HotKey",
			key			: "hotkey",
			callback	: function(event, win) {
				var config = win.get("group");

				execute(config, function (item) {
					function rnd() {
						return config.interval.min + Math.ceil(config.interval.rnd * Math.random());
					};

					window.setTimeout(Shop.list, rnd(), {
						link		: item.Link,
						onsuccess	: function (obj) {
							if (obj.list.length && obj.list[0].Id == item.Id) {
								window.setTimeout(Shop.buy, rnd(), {
									link		: obj.list[0].Link,
									onsuccess	: function (obj2) {
										alert("Item bought successfully!");
									},
									onerror		: function (obj2) {
										WinConfig.init({
											title	: "Quick Price Checker : Error",
											type	: WinConfig.WindowType.ERROR,
											description	: "<br />" + (obj2.message && obj2.message.textContent.trim() || "Unexpected error (2)"),
										});
									}
								});
							} else if (config.notfound) {
								WinConfig.init({
									title	: "Quick Price Checker : Warning",
									type	: WinConfig.WindowType.WARNING,
									description	: "<br />" + (obj.message && obj.message.textContent.trim() || "The following text was not found:\n" + item.Name),
								});
							}
						}
					});
				});
			},
		}, {
			name	: "group",
			type	: WinConfig.FieldType.GROUP,
			fields	: [{
				name: "target",
				label: "Tab",
				type: WinConfig.FieldType.SELECT,
				description: "Target of the link.",
				help: true,
				value: [{
						value: "_self",
						label: "Current",
					}, {
						value: "_blank",
						label: "New",
					}
				],
			}, {
				name	: "notfound",
				label	: "Not found",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				multiple: true,
				help	: true,
				description	: "Shows warning messages.",
			}, {
				name	: "attempts",
				label	: "Attempts",
				format	: WinConfig.FieldFormat.NUMBER,
				help	: true,
				empty	: 1,
				description	: "Number of attempts before buying.",
			}],
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
		}],
	});
}());