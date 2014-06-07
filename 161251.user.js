// ==UserScript==
// @name           Neopets : Battledome : Fight!
// @namespace      http://gm.wesley.eti.br
// @description    Automatically fights at Battledome
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.1.1
// @language       en
// @include        http://www.neopets.com/dome/arena.phtml
// @icon           http://gm.wesley.eti.br/icon.php?desc=161251
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceURL
// @grant          GM_getResourceText
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       hpBar http://img803.imageshack.us/img803/7471/hpbar.png
// @resource       meta http://userscripts.org/scripts/source/161251.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @resource       winConfigBattledomeCss http://pastebin.com/download.php?i=pRhS97Zg
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/163374.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        2.1.1 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        2.1.0 Fixed SecurityError (Firefox 23+)
// @history        2.0.0 Added Battledome Settings
// @history        1.5.0 Added number of remaining battles
// @history        1.4.2 Minor bug fixed
// @history        1.4.1 Code improvement
// @history        1.4.0 Added config "exit" that stops the script when defeated
// @history        1.3.0 Added a moving HP Bar
// @history        1.2.0 Supports different weapons/ability for each round
// @history        1.1.0 Scrolls the page while fighting
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

GM_addStyle(GM_getResourceText("winConfigBattledomeCss"));

setTimeout(function () {
	var plays = GM_getValue("plays", 0),
	$ = unsafeWindow.$,
	text = $("script:contains('#p1name')").text(),
	p1name = (/#p1name.+['"]([-,.\s\w]+)/.test(text)) && RegExp.$1 || "",
	p2name = (/#p2name.+['"]([-,.\s\w]+)/.test(text)) && RegExp.$1 || "",
	pk = "players-" + p1name,
	players = JSON.parse(GM_getValue("config-" + pk, "{}")),
	key = p2name/*.toLowerCase().replace(/\s+/g, "_")*/,
	opp = new WinConfig({
		name	: pk,
		title	: "Battledome : Opponent Settings",
		store	: true,
		group	: key,
		description : "<b>Opponent Name:</b> " + key,
		size	: ["400px", 0],
		load	: function () {
			location.replace("http://www.neopets.com/dome/arena.phtml");
		},
		default	: players["@"] || {
			weapons		: ["/items/bd_ring_scarab.gif", "/items/bd_ring_scarab.gif"],
			abilities	: ["/bd2/abilities/0001_h743ty2wez_staticcling/thumb_1.png"],
		},
		fields		: [{
			name	: "abilities",
			label	: "List of Abilities",
			type	: WinConfig.FieldType.TEXT,
			format	: WinConfig.FieldFormat.STRING | WinConfig.FieldFormat.ARRAY,
			description	: "URLs of the abilities.<br /><br />Add them in the order that you would like to use, even if you don't have them.<br />They will be ignored in case they can't be used for some reason.<br /><sup>Separate them by row</sup>",
			multiple	: true,
			help	: true,
		}, {
			name	: "weapons",
			label	: "List of Weapons",
			type	: WinConfig.FieldType.TEXT,
			format	: WinConfig.FieldFormat.STRING | WinConfig.FieldFormat.ARRAY,
			description	: "URLs of the weapons.<br /><br />Add them in the order that you would like to use, even if you don't have them.<br />They will be ignored in case they can't be used for some reason.<br /><sup>Separate them by row</sup>",
			multiple	: true,
			help	: true,
		}],
	}),
	win = new WinConfig({
		title		: "Battledome : Settings",
		store		: true,
		size		: ["420px", 0],
		load		: function () {
			location.replace("http://www.neopets.com/dome/arena.phtml");
		},
		default		: {
			group	: {
				time	: 515,
				wait	: 30000,
				play	: 30,
				p2name	: true,
				scroll	: true,
				reset	: false,
				def		: false,
				exit	: true,
			},
		},
		fields		: [{
			name		: "settingsHotKey",
			label		: "Settings HotKey",
			key			: "hotkey",
			callback	: function (event, win) {
				win.open();
			},
		}, {
			name		: "opponentHotKey",
			label		: "Opponent Settings HotKey",
			key			: "hotkey",
			default		: {
				keyCode	: "O".charCodeAt(0),
			},
			callback	: function (event, win) {
				opp.open();
			},
		}, {
			type	: WinConfig.FieldType.GROUP,
			name	: "group",
			fields	: [{
				name	: "time",
				label	: "Step",
				description	: "Time of waiting between steps<br /><sub><i>Time in miliseconds</i></sub>",
				format	: WinConfig.FieldFormat.NUMBER,
				help	: true,
			}, {
				name	: "wait",
				label	: "Reload",
				description	: "Time of waiting before a forced page reload<br /><sub><i>Time in miliseconds</i></sub>",
				format	: WinConfig.FieldFormat.NUMBER,
				help	: true,
			}, {
				name	: "play",
				label	: "Plays",
				description	: "Number of consecutive plays",
				format	: WinConfig.FieldFormat.NUMBER,
				help	: true,
			}],
		}, {
			type	: WinConfig.FieldType.GROUP,
			name	: "group",
			fields	: [{
				name	: "p2name",
				label	: "Opponent",
				description	: "Set of weapons/abilities for each opponent separately.",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				multiple: true,
				help	: true,
			}, {
				name	: "scroll",
				label	: "Scroll",
				description : "Auto scroll the page while fighting.",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				multiple: true,
				help	: true,
			}, {
				name	: "reset",
				label	: "Reset",
				description	: "Auto reset the set of weapons/abilities for the current opponent.<br /><br /><sub><i>This will reset your current settings of XXX vs YYY.<br />Continue?</i></sub>",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				multiple: true,
				help	: true,
			}, {
				name	: "def",
				label	: "Default",
				description	: "Auto update the default set of weapons/abilities.<br /><br /><sub><i>Update your default weapons and abilities too?</i></sub>",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				multiple: true,
				help	: true,
			}, {
				name	: "exit",
				label	: "Exit",
				description	: "Exit the fight once defeated.",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				multiple: true,
				help	: true,
			}],
		}],
	}),
	config = win.get("group"),
	stickerPosition = [],
	scroll = function (x, fn) {
		$("html, body").animate({
			scrollTop : $(x).offset().top,
		}, "slow", fn);
	},
	scrollY = function () {
		$("html, body").animate({
			scrollTop : stickerPosition[0][1].top,
		}, "slow");
	},
	execute = function (k) {
		var r = (0 < plays || 0 < (plays = prompt("How many times to fight?", config.play))),
		player = players[k],
		list = [["#start:visible"], ["#p1hp:visible", 0, function () {
			$("<img />", {
				id : "shp",
				src : GM_getResourceURL("hpBar"),
				style : "position:absolute;z-index:14;top:112px;left:8px;display:none;",
			}).insertBefore("#p1hp");
			
			stickerPosition[0] = [$("#p1hp").position(), $("#p1hp").offset()];
			stickerPosition[0][0].position = "absolute";
			stickerPosition[1] = [$("#p2hp").position(), $("#p2hp").offset()];
			stickerPosition[1][0].position = "absolute";
			
			$(window).scroll(function () {
				var s = $(window).scrollTop(),
				y = 363,
				ids = ["#p1hp", "#p2hp"];
				for (var a in ids) {
					var c = [], d = {};
					for (var i in stickerPosition[a][0]) {
						c[i] = stickerPosition[a][0][i];
						d[i] = stickerPosition[0][0][i];
					}
					if (s > stickerPosition[a][1].top) {
						if (s < stickerPosition[a][1].top + y) {
							c = {
								position : "fixed",
								top : 0,
								zIndex : 14,
								left : stickerPosition[a][1].left,
							};
							d = {
								position : "fixed",
								top : 0,
								left : stickerPosition[0][1].left - 23,
							};
						} else {
							c.top += y;
							d.top += y;
							d.left -= 23;
						}

						if (a) {
							$("#shp").css(d).show();
						}
					} else {
						$("#shp").hide();
					}

					$(ids[a]).css(c);
				}
			});

			if (config.scroll) {
				scroll("#p1hp");
			}

			return false;
		}]];
		
		if (r) {
			document.title += " ( " + plays + " )";
			var itemsPosition = [0, 0];

			(function recursive2 (list, x, round) {
				function el (type, spaceIds, itemListId, selectedItems, checkAvailabilityOfItem, spaceInUse, spaceAvailable) {
					if (selectedItems && selectedItems.length) {
						var spaceIdsList = $(spaceIds).toArray();
						spaceListLength = spaceIdsList.length;

						for (var bi = 0;bi < spaceListLength;++bi) {
							for (var ci = itemsPosition[type];ci < selectedItems.length;++ci) {
								++itemsPosition[type];

								if (checkAvailabilityOfItem(selectedItems[ci])) {
									var spaceCssSelector = "#" + spaceIdsList.shift().getAttribute("id") + (spaceAvailable || "") + ":visible";

									list.push([spaceCssSelector, 0, spaceInUse, [spaceCssSelector]], [itemListId + " img[src $= '" + selectedItems[ci] + "']:visible:eq(0)"]);

									break;
								}
							}
						}
					}
				}

				el(0, "#p1am:has(div:not([style *= 'background-image:'])),#p1am:has(div:not([style *= 'opacity: 1']))", "#p1ability", player.abilities, function (b) {	// 4
					return ($("#p1ability td:not([style *= 'display: none']) img[src $= '" + b + "']").length > 0);
				});

				el(1, "#p1e1m:has(div:not([style *= 'background-image:'])), #p1e1m:has(div:not([style *= 'opacity: 1'])), #p1e2m:has(div:not([style *= 'background-image:'])), #p1e2m:has(div:not([style *= 'opacity: 1']))", "#p1equipment", player.weapons, function (b) {	// 4
					return ($("#p1equipment li:not([style *= 'display: none']) img[src $= '" + b + "']").length > 0);
				}, function (l, x, p) {	// 5
					if ($("div[style *= 'background-image:']:visible", x).length) {
						l.unshift([p[0]]);
					}

					return true;
				}, "[style *= 'cursor:']");

				var tmp = "#fight.caction:not(.inactive):visible, button.end_ack:visible";
				list.push([tmp, 0, function recursive3 (l, x, p) {
					if (x.hasClass("caction")) {
						l.unshift(
							["#skipreplay:not(.replay):visible", 0, function () {
								if (config.scroll && $("#logcont:not(.collapsed)").length) {
									scroll("#skipreplay");
								}

								return true;
							}],
							[p[0], 0, function (l, x, p) {
								return (x.hasClass("caction")?recursive2:recursive3)(l, x, p);
							}, ++round]
						);
					} else {
						if (config.scroll) {
							scrollY();
						}

						if (x.hasClass("collect")) {
							l.unshift(
								["#bdplayagain:visible", 0, function (l) {
									GM_setValue("plays", --plays);
									
									if (0 < plays) {
										return true;
									} else {
										l.unshift(["#bdnewfight:visible"]);

										return false;
									}
								}]
							);
						} else if (x.hasClass("exit") && !config.exit) {
							GM_setValue("plays", --plays);
							
							if (0 < plays) {
								l.unshift([".defeatPlayAgain:visible"]);

								return false;
							}
						}
					}

					return true;
				}, [tmp]]);
				
				return false;
			}(list, undefined, 0));
		}
		
		(function recursive (l, c) {
			if (l.length) {
				var p = l[0],
				x = $(p[0]);

				if (1 <= x.length) {
					c = -1;
					l.shift();

					if (!p[2] || p[2](l, x, p[3])) {
						if (1 == x.length) {
							console.log("Clicking " + p[0]);
							location.assign('javascript:void($("' + p[0] + '").click());');
						} else {
							GM_log(p[0] + " is too generic.");
						}
					}
				}

				var t = config.time;
				if (c < Math.ceil(config.wait / t)) {
					window.setTimeout(recursive, t + (Math.ceil(p[1] * Math.random()) || 0), l, ++c);
				} else {
					location.assign("http://www.neopets.com/dome/arena.phtml");
				}
			}
		}(list, 0));

		return r;
	};

	if (config && !(key in players && execute(key))) {
		var key2 = "@";
		
		if (!(key2 in players && !(key in players) && (!config.p2name || confirm("Would you like to use your default weapons and ability?")) && execute(key2))) {
			if (!(key in players)) {
				alert(p1name + " vs " + p2name + "\n\nYou should fight at least once to verify whether it is capable of winning consecutively by its own.\nSelect its weapons and ability that you would like to use automatically.");
			} else if (!config.reset && !confirm("This will reset your current settings of " + p1name + " vs " + p2name + ".\nContinue?")) {
				return;
			}

			var first = true;
			$(".ability,.item").live("click", function (e) {
				if (first) {
					players[key] = {};

					if (!(key2 in players) || config.def || confirm("Update your default weapons and abilities too?")) {
						players[key2] = players[key];
					}

					first = false;
				}

				var img = xpath(".//img", e.target.parentNode)[0],
				s = img.getAttribute("src").replace("http://images.neopets.com", ""),
				c = ("item" == img.getAttribute("class")?"weapons":"abilities"),
				l = players[key][c] || [];

				l.push(s);
				players[key][c] = l;

				setTimeout(function (p) {
					GM_setValue("config-" + pk, JSON.stringify(p));
				}, 0, players);
			});
		}
	}
}, 0);