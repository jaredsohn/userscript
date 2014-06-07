// ==UserScript==
// @name           Neopets : Dailies To-Do
// @namespace      http://neopets.wesley.eti.br
// @description    Plays those normal dailies that you need click a button
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        5.1.1
// @language       en
// @include        http://www.neopets.com/altador/council.phtml
// @include        http://www.neopets.com/altador/council.phtml?*
// @include        http://www.neopets.com/bank.phtml
// @include        http://www.neopets.com/desert/fruit/index.phtml
// @include        http://www.neopets.com/desert/shrine.phtml
// @include        http://www.neopets.com/faerieland/caverns/index.phtml
// @include        http://www.neopets.com/faerieland/tdmbgpop.phtml
// @include        http://www.neopets.com/faerieland/springs.phtml
// @include        http://www.neopets.com/island/tombola.phtml
// @include        http://www.neopets.com/jelly/jelly.phtml
// @include        http://www.neopets.com/medieval/pickyourown_index.phtml
// @include        http://www.neopets.com/medieval/pickyourown.phtml
// @include        http://www.neopets.com/moon/meteor.phtml
// @include        http://www.neopets.com/moon/meteor.phtml?getclose=1
// @include        http://www.neopets.com/petpetpark/daily.phtml
// @include        http://www.neopets.com/pirates/anchormanagement.phtml
// @include        http://www.neopets.com/pirates/buriedtreasure/index.phtml
// @include        http://www.neopets.com/pirates/forgottenshore.phtml
// @include        http://www.neopets.com/prehistoric/omelette.phtml
// @include        http://www.neopets.com/space/strangelever.phtml
// @include        http://www.neopets.com/water/fishing.phtml
// @include        http://www.neopets.com/winter/adventcalendar.phtml
// @include        http://www.neopets.com/worlds/deadlydice.phtml
// @include        http://www.neopets.com/worlds/geraptiku/tomb.phtml
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=32041
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       meta http://userscripts.org/scripts/source/32041.meta.js
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/163374.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        5.1.1 Updated some dailies
// @history        5.1.0 Updated <a href="http://userscripts.org/scripts/show/163374">Includes : WinConfig</a>
// @history        5.0.0 Added <a href="http://userscripts.org/scripts/show/163374">Includes : WinConfig</a>
// @history        4.1.0 Added <a href="http://www.neopets.com/moon/meteor.phtml">Meteors of Kreludor</a>
// @history        4.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        3.0.0.0 Updated @require#87942
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
	var dailiesField = {
		"/bank.phtml"							: [0, [[".//form[input[@name = 'type' and @value = 'interest']]"]]],
		"/jelly/jelly.phtml"					: [1, [[".//form[input[@name = 'type' and @value = 'get_jelly']]"]]],
		"/water/fishing.phtml"					: [2, [[".//form[input[@name = 'go_fish' and @value = '1']]"]]],
		"/desert/shrine.phtml"					: [3, [[".//form[input[@name = 'type' and @value = 'approach']]"]]],
		"/moon/meteor.phtml"					: [4, [[".//form[@name = 'meteorselect']/select[@name = 'pickstep']", function (v) {
			v.selectedIndex = 1;
			v.form.submit();
		}], [".//form[input[@name = 'getclose' and @value = '1']]"]]],
		"/island/tombola.phtml"					: [5, [[".//td[@class = 'content']//center/form[contains(@action, 'tombola2.phtml')]"]]],
		"/altador/council.phtml"				: [6, [[".//area[contains(@href, 'council.phtml?prhv=')]", function (v) {
			v.click();
		}], [".//form[input[@name = 'collect' and @value = '1']]"]]],
		"/petpetpark/daily.phtml"				: [7, [[".//form[input[@name = 'go'] and contains(@action, '/petpetpark/daily.phtml')]"]]],
		"/worlds/deadlydice.phtml"				: [8, [[".//form[input[@name = 'go' and @value = '1']]"]]],
		"/faerieland/springs.phtml"				: [9, [[".//form[input[@name = 'type' and @value = 'heal']]"]]],
		"/space/strangelever.phtml"				: [10, [[".//td[@class = 'content']//form[contains(@action, 'leverofdoom.phtml') and input[@name = '_ref_ck']]"]]],
		"/desert/fruit/index.phtml"				: [11, [[".//form[input[@name = 'spin' and @value = '1']]"]]],
		"/faerieland/tdmbgpop.phtml"			: [12, [[".//form[input[@name = 'talkto' and @value = '1']]"]]],
		"/prehistoric/omelette.phtml"			: [13, [[".//form[input[@name = 'type' and @value = 'get_omelette']]"]]],
		"/medieval/pickyourown.phtml"			: [14, [[".//b/center/form[contains(@action, 'process_pickyourown.phtml') and input[@name = 'x_collect' and @value = '1']]"]]],
		"/medieval/pickyourown_index.phtml"		: [14, [[".//form[contains(@action, 'process_pickyourown.phtml') and input[@name = 'x_start' and @value = '1']]"]]],
		"/worlds/geraptiku/tomb.phtml"			: [15, [[".//form[input[@name = 'opened' and @value = '1']]"], [".//form[contains(@action, '/geraptiku/process_tomb.phtml') and input[@type = 'submit']]"]]],
		"/faerieland/caverns/index.phtml"		: [16, [[function () {
			return ".//form/input[@name = 'go" + (Math.random() > 0.85 ? "Right" : "Left") + "']";
		}, function (v) {
			v.click();
		}], [".//form[input[@name = 'play' and @value = '1']]"]]],
		"/pirates/buriedtreasure/index.phtml"	: [17, [[".//td[@class = 'content']//form[contains(@action, 'buriedtreasure.phtml') and @method = 'get']"]]],
		"/pirates/anchormanagement.phtml"		: [18, [["id('form-fire-cannon')"]]],
		"/pirates/forgottenshore.phtml"			: [19, [[".//a[contains(@href, '?confirm=1&_ref_ck=')]", function (a) {
			a.click();
		}]]],
	};

	if (location.pathname in dailiesField) {
		GM_addStyle(".winconfig.winConfig_DailiesToDoSettings .field.fieldName_activate .subfield > label {width:75%}");

		var groups = [	// DON'T change the order of the elements
			// default
			undefined,			// 0

			// teams
			"Altador",
			"Brightvale",
			"Darigan Citadel",
			"Faerieland",
			"Haunted Woods",	// 5
			"Kreludor",
			"Krawk Island",
			"Shenkuu",
			"Lost Desert",
			"Maraqua",			// 10
			"Meridell",
			"Mystery Island",
			"Roo Island",
			"Terror Mountain",
			"Tyrannia",			// 15
			"Virtupets",
			"Kiko Lake",
			"Moltara",

			// others
			"Neopia Central",
			"Others",
		],
		dailies = [	// DON'T change the order of the elements
			[20, "Bank", "The National Neopian Bank "],	// 19
			[20, "Giant Jelly"],
			[20, "Underwater Fishing"],	// 10
			[9, "Coltzan's Shrine"],
			[20, "Meteors", "Meteors of Kreludor"],	// 6
			[12, "Tombola", "Tiki Tack Tombola"],
			[20, "Council", "Council Chamber"],	// 1
			[20, "ToyChest", "Weltrude's ToyChest"],
			[20, "Deadly Dice", "Count von Roo's Deadly Dice"],	// 13
			[4, "Healing Springs"],
			[20, "Lever of Doom"],	// 16
			[9, "Fruit Machine", "The Neopets Fruit Machine"],
			[4, "Grundo Plushie", "The Discarded Magical Blue Grundo Plushie of Prosperity"],
			[20, "Giant Omelette"], // 15
			[20, "Pick Your Own"],	// 11
			[12, "Deserted Tomb"],
			[20, "Faerie Caverns"],	// 4
			[7, "Buried Treasure"],
			[7, "Anchor Management"],
			[7, "Forgotten Shore"],

			[0, "Avatar", "Dailies that may give you avatar.", 0xB550D],			// 10110101010100001101
			[0, "NP +", "Dailies that may give you neopoints.", 0xF98E9],			// 11111001100011101001
			[0, "NP -", "Dailies that you need to spend some neopoints.", 0x34500],	// 00110100010100000000
			[0, "Items", "Dailies that may give you items.", 0xEFAFE],				// 11101111101011111110
			[0, "Stats", "Dailies that may give you stats.", 0x0010C],				// 00000000000100001100
			[0, "Select All", "Select all options", 0xFFFFF],						// 11111111111111111111
		],
		gKeys = [],
		options = [];
		for (var i in dailies) {
			var d = dailies[i],
			key = gKeys.indexOf(d[0]);
			
			if (~key) {
				options[key].dailies.push([i, d]);
			} else {
				gKeys.push(d[0]);
				options.push({
					group	: groups[d[0]],
					dailies	: [[i, d]],
				});
			}
		}
		options.sort(function (a, b) {
			return (a.group > b.group?1:-1);
		});

		var win = new WinConfig({
			title	: "Dailies To-Do : Settings",
			type	: WinConfig.WindowType.CUSTOM,
			size	: ["550px", 0],
			default	: {
				group	: {
					activate	: 0x1CBAFF,
				}
			},
			fields	: [{
				name		: "settingsHotKey",
				label		: __("Settings HotKey"),
				key			: "hotkey",
				callback	: function(event, win) {
					win.open();
				},
			}, {
				name	: "group",
				type	: WinConfig.FieldType.GROUP,
				nogroup	: true,
				label	: __("Dailies"),
				fields	: options.map(function (value) {
					if (value.dailies[0][1][0]) {
						value.dailies.sort(function (a, b) {
							return (a[1][1] > b[1][1]?1:-1);
						});
					}

					return {
						type		: WinConfig.FieldType.CHECK,
						format		: WinConfig.FieldFormat.NUMBER,
						multiple	: true,
						unique		: true,
						name		: "activate",
						label		: value.group,
						empty		: 0x000000,
						value		: value.dailies.map(function (value) {
							return {
								value		: value[1][3] || Math.pow(2, value[0]),
								label		: value[1][1],
								help		: true,
								description	: value[1][2] || value[1][1],
							};
						}),
					};
				}),
			}],
		}),
		opts = win.get("group");

		if (opts.activate & Math.pow(2, dailiesField[location.pathname][0])) {
			a:for each (var btn in dailiesField[location.pathname][1]) {
				var f = xpath(btn[0] instanceof Function?btn[0]():btn[0])[0];
				if (f) {
					if (btn[1] instanceof Function) {
						btn[1](f);
					} else {
						f.submit();
					}
					break a;
				}
			}
		}
	}
}());