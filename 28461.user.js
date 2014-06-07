// ==UserScript==
// @name           Neopets : Dice-A-Roo
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Plays Dice-a-Roo until your pet get tired.
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://www.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        6.0.0
// @language       en
// @include        http://www.neopets.com/games/dicearoo.phtml
// @include        http://www.neopets.com/games/play_dicearoo.phtml
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=28461
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       random_events http://pastebin.com/download.php?i=839tCaQh
// @resource       randomEventsHtml http://pastebin.com/download.php?i=nPMWZeHY
// @resource       meta https://github.com/w35l3y/userscripts/raw/neopets/scripts/28461.user.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml https://github.com/w35l3y/userscripts/raw/master/resources/html/updaterWindowHtml
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @resource       winConfigDiceARooCss http://pastebin.com/download.php?i=67LnUSrC
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/154322.user.js
// @require        http://userscripts.org/scripts/source/154363.user.js
// @require        http://userscripts.org/scripts/source/163374.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @cfu:version    version
// @history        6.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        5.0.0 Added Dice-A-Roo Settings
// @history        4.0.0.0 Added Random Events History
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

GM_addStyle(GM_getResourceText("winConfigDiceARooCss"));

(function () {
	var win = new WinConfig({
		title	: "Dice-A-Roo Settings",
		type	: WinConfig.WindowType.CUSTOM,
		size	: ["350px", 0],
		load	: function (cfg) {
			options = cfg.group;
		},
		default	: {
			group	: {
				stop	: {
					dice	: 0x30,	//	silver | jackpot
					turn	: -1,
					time	: -1,
					amount	: -1,
				},
				interval: {
					min		: 1000,
					rnd		: 1500,
				},
				reset	: 0x02 | 0x04,	//	turn + time
			},
		},
		fields	: [{
			name	: "settingsHotKey",
			label	: "Settings HotKey",
			key		: "hotkey",
			callback: function(event, win) {
				win.open();
			},
		}, {
			name	: "group",
			nogroup	: true,
			type	: WinConfig.FieldType.GROUP,
			fields	: [{
				name	: "stop",
				label	: "Stop",
				type	: WinConfig.FieldType.GROUP,
				fields	: [{
					name		: "turn",
					label		: "Turn",
					format		: WinConfig.FieldFormat.NUMBER,
//					description	: "",
//					help		: true,
					empty		: -1,
				}, {
					name		: "time",
					label		: "Time",
					format		: WinConfig.FieldFormat.NUMBER,
//					description	: "",
//					help		: true,
					empty		: -1,
				}, {
					name		: "amount",
					label		: "Amount",
					format		: WinConfig.FieldFormat.NUMBER,
//					description	: "",
//					help		: true,
					empty		: -1,
				}, {
					name	: "dice",
					label	: "Dice",
					type	: WinConfig.FieldType.CHECK,
					format	: WinConfig.FieldFormat.NUMBER,
					multiple: true,
					unique	: true,
					empty	: 0,
					value	: [{
						value	: 0x01,
						label	: "Red",
					}, {
						value	: 0x02,
						label	: "Blue",
					}, {
						value	: 0x04,
						label	: "Green",
					}, {
						value	: 0x08,
						label	: "Yellow",
					}, {
						value	: 0x10,
						label	: "Silver",
					}, {
						value	: 0x20,
						label	: "Jackpot",
					}],
				}],
			}, {
				name	: "reset",
				label	: "Reset",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.NUMBER,
				multiple: true,
				unique	: true,
				empty	: 0,
				value	: [{
					value	: 0x02,
					label	: "Turn",
//					help	: true,
				}, {
					value	: 0x04,
					label	: "Time",
//					help	: true,
				}, {
					value	: 0x10,
					label	: "Amount",
//					help	: true,
				}, {
					value	: 0x01,
					label	: "Dice",
//					help	: true,
				}],
			}, {
				name	: "interval",
				label	: "Interval",
				type	: WinConfig.FieldType.GROUP,
				fields	: [{
					name		: "min",
					label		: "Minimum",
					format		: WinConfig.FieldFormat.NUMBER,
//					description	: "The minimum value of time between steps.<br /><sup><i>Time in miliseconds</i></sup>",
					empty		: 0,
//					help		: true,
				}, {
					name		: "rnd",
					label		: "Random",
					format		: WinConfig.FieldFormat.NUMBER,
//					description	: "The random value of time between steps.<br />This value is multiplied by a random value between 0-1 and added to the minimum value.<br /><sup><i>Time in miliseconds</i></sup>",
					empty		: 0,
//					help		: true,
				}],
			}],
		}],
	}),
	options = win.get("group");
	
	RandomEvents.title = "Random Events : Dice-A-Roo";
	RandomEvents.location = location.pathname;

	if (options) {
		var opt_props = ["Dice", "Turn", "Time", "Jackpot", "Amount"],
		dice = ["red", "blue", "green", "yellow", "silver", "silver5"],
		last = {turn : 0, time : new Date()},
		stats = ["happy_green", "sad_blue", "happy_blue"],
		wait;

		window.addEventListener("keypress", function (e) {
			switch (e.keyCode) {
				case 27:
					console.log("Force Stop!");
					window.clearTimeout(wait);
					break;
			}
		}, false);
		
		window.addEventListener("unload", function (e) {
			window.clearTimeout(wait);
		}, false);
		
		(function recursive (obj) {
			var btn = xpath(".//td[@class = 'content']//div[2]//form//input[@type = 'submit']");

			if (btn.length) {
				var iff,options_tmp = {
					dice : /\/dice\/((\D+)\d+)/.test(xpath("string(.//td[@class = 'content']//div/center/img[1][not(following-sibling::img[1]) and contains(@src, '/games/dice/')]/@src)")) && [(~(iff = dice.indexOf(RegExp.$1))?iff:dice.indexOf(RegExp.$2)), RegExp.$1] || [-1, undefined],
					amount : btn.length > 1 && parseInt(btn[1].value.replace(/[,.]+/g, "").match(/\d+/), 10) || 0,
					stat : ~(/\/(\w+)\/blumaroo_(\w+)_/.test(xpath("string(.//td[@class = 'content']//div/center/img[contains(@src, '_baby.gif')]/@src)")) && ~stats.indexOf(RegExp.$1 + "_" + RegExp.$2) || 0),
					turn : last.turn,
				},
				sf = function (f) {
					var data = {};

					for each (var e in Array.prototype.slice.apply(f.elements)) {
						data[e.name] = e.value;
					}

					HttpRequest.open({
						method : f.method,
						url : f.action,
						headers : {
							Referer : obj.referer,
						},
						onsuccess : function (xhr) {
							RandomEvents.process({
								document	: xhr.response.xml,
							});

							var module = xpath(".//td[@class = 'content']//div[@class = 'frame']")[0],
							nmodule = xpath(".//td[@class = 'content']//div[@class = 'frame']", xhr.response.xml)[0];

							if (nmodule) {
								module.parentNode.replaceChild(nmodule, module);
							}

							recursive({
								referer : xhr.response.raw.finalUrl,
							});
						},
					}).send(data);
				},
				sel = function (e) {
					window.clearTimeout(wait);
					e.preventDefault();
					e.stopPropagation();
					console.log("Reprocessing...");
					sf(e.target);
				},
				stop = -1,
				delta = {
					time : new Date() - last.time
				};

				for each (var f in btn) {
					f.form.addEventListener("submit", sel, false);
				}

				//	collect	0	/pets/happy/blumaroo_green_baby.gif
				//	lose	1	/pets/sad/blumaroo_blue_baby.gif
				//	jackpot	2	/pets/happy/blumaroo_blue_baby.gif
				switch (options_tmp.stat) {
					case 1:
						++options_tmp.turn;
						break;
				}
				console.log(options_tmp.stat, options_tmp.dice[0], options_tmp.turn, delta.time, options_tmp.amount);

				if ((~options.stop.dice && ~options_tmp.dice[0] && ((1 << options_tmp.dice[0]) & options.stop.dice) && last.dice && options_tmp.dice[0] != last.dice[0] && ~(stop = 0)) ||
				(~options.stop.turn && options_tmp.turn >= options.stop.turn && options_tmp.turn != last.turn && (stop = 1)) ||
				(~options.stop.time && delta.time >= options.stop.time && (stop = 2)) ||
				(~options.stop.amount && options_tmp.amount >= options.stop.amount && options_tmp.amount > last.amount && (stop = 3))) {
					alert("Stop! (" + opt_props[stop] + ")");

					switch ((1 << stop) & options.reset) {
						case 0x01:	// dice
							--options_tmp.dice[0];
							break;
						case 0x02:	// turn
							options_tmp.turn = 0;
							break;
						case 0x04:	// time
							last.time = new Date();
							break;
						case 0x08:	//amount
							options_tmp.amount = 0;
							break;
					}
				} else {
					wait = window.setTimeout(sf, options.interval.min + Math.floor(options.interval.rnd * Math.random()), btn[0].form);
				}

				last.dice = options_tmp.dice;
				last.turn = options_tmp.turn;
				last.amount = options_tmp.amount;
			}
		}({
			referer : location.href,
		}));
	}
}());