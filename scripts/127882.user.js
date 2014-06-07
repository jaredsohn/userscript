// ==UserScript==
// @name           Neopets : Avatars Flash Games [BETA]
// @namespace      http://gm.wesley.eti.br
// @description    Displays Avatars Flash Games and lets us to send score automatically
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0
// @language       en
// @include        http://www.neopets.com/games/*#gmc
// @include        http://www.neopets.com/games/game.phtml?game_id=*
// @include        http://www.neopets.com/altador/colosseum/ctp.phtml
// @include        http://www.neopets.com/altador/colosseum/ctp.phtml?game_id=*
// @icon           http://gm.wesley.eti.br/icon.php?desc=127882
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta http://userscripts.org/scripts/source/127882.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @resource       css_colorbox http://www.neopets.com/games/css/colorbox.css?v=1
// @resource       avatarPopupHtml http://pastebin.com/download.php?i=RG4TiCqD
// @resource       avatarPopupCss http://pastebin.com/download.php?i=LHt0DtZG
// @resource       avatarPopup2Css http://pastebin.com/download.php?i=CYb7aJHK
// @resource       gamesSettingsCss http://pastebin.com/download.php?i=wPx0uaEY
// @resource       css_gamesroom http://www.neopets.com/games/css/gamesroom_redux.css?v=2
// @require        http://pastebin.com/download.php?i=sin7DHJi
// @require        http://pastebin.com/download.php?i=BjjHSA30
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/69584.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/85450.user.js
// @require        http://userscripts.org/scripts/source/127696.user.js
// @require        http://images.neopets.com/js/jquery-1.7.1.min.js?v=1
// @require        http://images.neopets.com/js/jquery.colorbox.min.js?v=1
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        3.0.0 Fixed some bugs
// @history        2.0.0.0 Updated @require#87942
// @history        1.0.2.1 Added game #1347
// @history        1.0.1.0 Updated @require#127696 (highly recommended)
// @history        1.0.0.27 Updated @require#127696
// @history        1.0.0.23 Updated @require#127696
// @history        1.0.0.22 Some minor bug fixes
// @history        1.0.0.21 Updated @require#127696
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

//GM_setValue("call_url", false);
//GM_setValue("stored", false);
//GM_setValue("mod_change", 1);
//GM_setValue("beep", false);
//GM_setValue("generic", true);
//GM_setValue("sp", 5);

GM_addStyle(GM_getResourceText("css_gamesroom"));
GM_addStyle(GM_getResourceText("gamesSettingsCss"));
GM_addStyle(GM_getResourceText("css_colorbox"));
GM_addStyle(GM_getResourceText("avatarPopupCss"));

function init (doc) {	// script scope
	//alert(doc.toSource());

	var games = {
	//	"id"  : [min_score, ratio_score, ratio_time, mod_score, avatar_gif, avatar_name],
	// + non-avatar games
		"970" : [345, 860, 164, 1],
	// + avatar games
		"149" : [250, 33, 2322, 1, "kacheek06.gif", "Kacheek - Herder"],
		"159" : [1000, 875, 589, 1, "gadsgadsgame.gif", "Gadgadsgame"],
		"197" : [1220, 260, 483, 1, "efmcdraik.gif", "Draik - Escape from Meridell Castle"],
		"198" : [2250, 746, 159, 1, "donna_wasm.gif", "Revenge is Sweet"],
		"204" : [700, 89, 347, 1, "acezafara.gif", "Ace Zafara"],
		"212" : [1100, 7, 556, 10, "gtu.gif", "Grand Theft Ummagine"],
		"226" : [200, 19, 1469, 1, "extremepotato.gif", "Extreme Potato Counter"],
		"228" : [250, 24, 1673, 5, "petpetrescue.gif", "Petpet Rescue"],
		"230" : [1200, 451, 492, 1, "evileliv.gif", "Evil Eliv Thade"],
		"248" : [800, 358, 721, 1, "maraquanraider.gif", "Raider Of Maraqua"],
		"306" : [2000, 1215, 226, 1, "sutekstomb.gif", "Suteks Tomb"],
		"307" : [300, 224, 1543, 1, "techobuzz.gif", "Techo - The Buzzer Game"],
		"315" : [800, 12, 1743, 10, "myncispike.gif", "Spike It!"],
		"358" : [2000, 265, 301, 1, "faeriebubbles.gif", "Faerie Bubbles"],
		"379" : [3500, 1215, 239, 1, "ahhhhmeepit.gif", "A Meepit! Run!"],
		"381" : [850, 149, 37, 1, "whackedkass.gif", "Whack-a-Kass"],
		"390" : [1250, 586, 707, 1, "ff_yoinked.gif", "Freaky Factory - Yoinked"],
		"412" : [5000, 1245, 101, 1, "snowmuncher.gif", "Snowmuncher"],
		"428" : [2500, 265, 364, 5, "petpetsitter.gif", "Petpetsitter"],
		"500" : [1250, 451, 691, 1, "meercachase.gif", "Meerca Chase"],
		"507" : [14500, 605, 83, 5, "icecreammachine.gif", "Ice Cream Machine"],
		"538" : [1000, 194, 758, 1, "jellyprocessing.gif", "Skeith - Jelly Processing Plant"],
		"539" : [1300, 141, 404, 1, "chiabomber.gif", "Chia Bomber"],
		"540" : [3000, 241, 326, 1, "meepvsfeep.gif", "Meepit Vs Feepit"],
		"544" : [10000, 881, 102, 1, "grundo_snowthrow.gif", "Grundo - Snowthrow!"],
		"574" : [3600, 123, 149, 1, "typingterror.gif", "Typing Terror"],
		"645" : [250, 14, 2734, 1, "florg.gif", "Chia - Florg"],
		"761" : [1500, 21, 359, 1, "volcanorun.gif", "Volcano Run"],
		"763" : [3500, 454, 241, 1, "magax.gif", "Magax: Destroyer"],
		"772" : [2500, 111, 234, 5, "smuggleddubloon.gif", "Smuggler's Dubloon"],
		"801" : [9050, 34, 133, 10, "freakedkorbat.gif", "Freaked Korbat"],
		"852" : [1200, 358, 491, 1, "deckswabber.gif", "Deckswabber"],
		"885" : [7530, 32, 109, 75, "mathsbabaa.gif", "Babaa - Maths Nightmare"],
		"902" : [725, 103, 467, 1, "carnival_terror.gif", "Carnival of Terror"],
		"903" : [100, 30, 2415, 1, "bullseye.gif", "Turtum"],
		"999" : [2500, 230, 237, 1, "destructomatch2.gif", "Destruct-O-Match II"],
		"1042": [2250, 19, 398, 10, "mutantgravedoom.gif", "Mutant Graveyard of Doom II"],
		"1048": [4000, 24, 316, 10, "nimmospond.gif", "Nimmos Pond"],
		"1347": [20000, 2134, 74, 1, "a53.gif", "A53 - LIKE A BOSS"],
	},
	id = parseInt(doc.id || /game_id=(\d+)/.test(location.search) && RegExp.$1, 10);

	if (!doc.error && !doc.link && !isNaN(id) && (id in games || GM_getValue("generic", false)) && (!doc.shockwave || GM_getValue("scoresender", false))) {
		var list = JSON.parse(GM_getValue("games", "{}")),
		usern = xpath("string(.//a[contains(@href, '/userlookup.phtml?user=')]/text())"),
		slist = ("#gmc" == location.hash?[].concat((prompt("List of games", xpath(".//a[contains(@href, 'game_id=')]/@href").map(function (x) {
			return (/game_id=(\d+)/.test(x.nodeValue)?RegExp.$1:null);
		}).join(",")) || "").split(",")).map(function (x) {
			return parseInt(x, 10);
		}).filter(function (x) {
			return x > 0;
		}):[]),
		play = {},
		ss = JSON.parse(GM_getValue("ss", "[]")) || [],
		efn = function (v) {
			if (v instanceof Function) {
				return v;
			} else {
				return function (score) {
					var result = {},
					er = /(?:^|&)(\w+)=([^&]+)/g;

					while (er.exec(v)) {
						result[RegExp.$1] = RegExp.$2;
					}

					return result;
				};
			}
		},
		obj2url = function (obj) {
			var result = "";
			for (var key in obj) {
				result += "&" + key + "=" + obj[key];
			}
			return result.substr(1);
		},
		data_g = function (id) {
			var x = GM_getValue("stored", true) && games[id] || list[id] || games[id] || [0, 0, 0, 100];
			if (games[id] && games[id][6]) {
				x[6] = efn(games[id][6]);
			}
			if (games[id] && games[id][7]) {
				x[7] = games[id][7];
			}
			return x;
		},
		data = data_g(id),
		updateGame = function (x) {
			data = data_g(id = x);
			
			var name = data[5] || ("Game " + id);
			
			$("#label_game").text(name);

			var avatar = $("#image_avatar");
			avatar.attr("src", "http://images.neopets.com/neoboards/avatars/" + (data[4] || "default.gif"));
			avatar.attr("title", name);
			
			$("#button_rand").click();
		},
		randscore = function (v) {
			var result = [Math.ceil(v || data[0] || 1000 * doc.ratio || 0), 1000 * Math.random()],
			x = Math.max(doc.highscores.length - 2, 0);

			if (x) {
				if (result[0] > doc.highscores[x]) {
					data[0] = result[0] = doc.highscores[x];
				} else if (!data[0]) {
					data[0] = result[0];
				}
				data[0] -= data[0] % data[3];
				if (!data[1]) {
					data[1] = Math.ceil((doc.highscores[x - 1] - data[0]) / data[3]);
				}
			}
			result[0] += Math.ceil(Math.min(20743 / (Math.abs(data[2]) * data[3]), data[1])) * data[3] * Math.random();
			if (doc.highscores.length && result[0] > doc.highscores[0]) {
				result[0] = doc.highscores[0];
			}
			result[0] -= result[0] % data[3];
			result[0] = Math.floor(result[0]);

			result[1] += data[2] * (1 + 0.1 * Math.random()) * (result[0] - (data[2] < 0?2 * (data[0] + data[1] * data[3]):0));
			result[1] = Math.ceil(result[1]);
			
			return result;
		},
		copy = {
			"gr-ctp-settings-btn" : {
				rename : ["settings", "avatar"],
				execute : function (node, p) {
					if (!p) {
						p = xpath(".//a[contains(@href, '/neoboards/boardlist.phtml?board=')]/following-sibling::*[1]")[0];
						GM_addStyle(GM_getResourceText("avatarPopup2Css"));
					}
					
					return p;
				},
				code : '<a href="javascript:void(0)"><div id="gr-ctp-avatar-btn"></div></a>',
			},
			"gr-ctp-settings" : {
				rename : ["settings", "avatar"],
				execute : function (node, p) {
					var btn = xpath("id('ctp-avatar-save')/img", node)[0],
					table = xpath("./ancestor::table[1]", btn)[0];
					table.setAttribute("style", "margin: 0 20px;");
					btn.src = btn.src.replace("use-these-settings", "submit");
					btn.parentNode.parentNode.setAttribute("class", "confirmation-2");
					btn.parentNode.parentNode.setAttribute("colspan", 3);
					btn.parentNode.setAttribute("href", "javascript:void(0)");
					btn.parentNode.setAttribute("alt", "Submit");
					btn.parentNode.setAttribute("class", "ctp-avatar-save");
					btn.parentNode.parentNode.setAttribute("height", "50");
					btn.parentNode.parentNode.appendChild(document.createElement("br"));
					var td = btn.parentNode.parentNode.cloneNode(true),
					btn2 = xpath(".//a[@id]", td)[0],
					span = document.createElement("span"),
					score_time = randscore(/score=(\d+)/.test(location.hash) && RegExp.$1),
					score = (typeof data[7] == "function"?data[7](score_time[0]):score_time[0]);

					td.setAttribute("class", "confirmation");
					btn2.setAttribute("id", "ctp-avatar-save-2");
					span.setAttribute("id", "ctp-message");
					btn2.parentNode.insertBefore(span, btn2.nextElementSibling);
					btn.parentNode.parentNode.parentNode.appendChild(td);
					table.rows[0].innerHTML = '<th style="width:75px" class="confirmation-2">Score</th><td style="width:91px" class="confirmation-2"><input name="score" type="text" id="field_score"  value="' + score_time[0] + '" /></td><td rowspan="2" width="50" height="50" class="confirmation-2"><img id="image_avatar" src="http://images.neopets.com/neoboards/avatars/' + (data[4] || "default.gif") + '" title="' + (data[5] || doc.name || "") + '" /></td><td rowspan="6" class="confirmation confirmation-2" style="width:5px">&nbsp;</td><th colspan="2" class="confirmation" id="label_score">' + score + '</th>';
					table.rows[1].innerHTML = '<th class="confirmation-2">Time (ms)</th><td class="confirmation-2"><input type="text" name="time" id="field_time" value="' + score_time[1] + '" /></td><th colspan="2" class="confirmation" id="label_time"><span class="red">00:00</span></th>';

					var groups = [{
						name:"captcha",
						list:[
							'<th class="confirmation-2"><img src="http://www.showmycode.com/?c" id="image_captcha" /></th><td colspan="2" class="confirmation-2"><input id="field_captcha" name="captcha" maxlength="1" /></td><th class="confirmation">Params</th><td class="confirmation aleft" id="label_opts"><span class="red">0|0|0|||</span></td>',
							'<th colspan="3" class="acenter confirmation-2">Captcha</th><th class="confirmation">Username&nbsp;</th><td class="confirmation aleft" id="label_username">' + usern + '</td>',
						],
					},];

					for each (var g in groups) {
						for each (var t in g.list) {
							var row = table.insertRow(2);
							row.setAttribute("class", g.name);
							row.innerHTML = t;
						}
					}
					table.insertRow(2).innerHTML = '<td colspan="2" class="aleft confirmation-2"><input id="field_cache" name="cache" type="checkbox" value="1" /> <label for="field_cache">Try cached encryption</label></td><td class="confirmation-2"><input type="button" value="R" title="Randomize" id="button_rand" /></td><th class="confirmation" style="width:75px">Game</th><td class="confirmation aleft" style="width:205px" id="label_game">' + doc.name + ' (' + id + ')</td>';
					
					if (!p) {
						table.insertRow(2).innerHTML = '<th style="width:75px" class="confirmation-2">Extra</th><td style="width:91px" colspan="2" class="confirmation-2"><input name="extra" type="text" id="field_extra"  value="' + obj2url(efn(data[6])(score)) + '" /></td><td colspan="2" class="confirmation aleft" style="width:205px" id="label_extra">&nbsp;</td>';
						return document.body.firstElementChild;
					}
				},
				code : GM_getResourceText("avatarPopupHtml"),
			},
		},
		first = true,
		ratios = JSON.parse(GM_getValue("ratios", "{}")),
		slistEmpty = !slist.length;

		if (slistEmpty) {
			if (doc.shockwave) {
				for (var v in list) {
					v = parseInt(v, 10);
					if (!~ss.indexOf(v)) {
						slist.push(v);
					}
				}
				for (var v in games) {
					v = parseInt(v, 10);
					if (!(v in list) && !~ss.indexOf(v)) {
						slist.push(v);
					}
				}
				console.log(slist);
			} else {
				slist.push(id);
			}
		}

		for (var c in copy) {
			var node = xpath("id('" + c + "')")[0],
			r = copy[c].rename, tmp;

			if (node) {
				tmp = node.cloneNode(true);
				tmp.setAttribute("id", String.prototype.replace.apply(tmp.getAttribute("id"), r));
			} else {
				var div = document.createElement("div");
				div.innerHTML = copy[c].code;
				tmp = div.firstElementChild;
			}

			for each (var n in xpath(".//*[contains(@name, '" + r[0] + "') or contains(@id, '" + r[0] + "')]", tmp)) {
				var a = (n.hasAttribute("id") ? "id" : "name");
				n.setAttribute(a, String.prototype.replace.apply(n.getAttribute(a), r));
			}
			node = copy[c].execute(tmp, node) || node;
			//alert(node);
			node.parentNode.insertBefore(tmp, node);
		}

		$(document).ready(function (e) {
			$("#gr-ctp-avatar-btn").click(function (e) {
				$.colorbox({ inline:true, href:"#gr-ctp-avatar", open:true, opacity:0.70, scrolling:false, onClosed: function () {
					if (play.stop instanceof Function) {
						play.stop(play);
					}
					$("#ctp-avatar-save").show();
				}});
			});
			$("#ctp-avatar-save-2").click(function (e) {
				e.preventDefault();
				$("#ctp-message").html("&nbsp;").show();

				$("#ctp-avatar-save-2").hide();

				play.start(play);
			});
		});

		if (!doc.shockwave && (!~ss.indexOf(id) || !slistEmpty)) {
			if (ratios[id] != 1000 * doc.ratio) {
				ratios[id] = 1000 * doc.ratio;
				GM_setValue("ratios", JSON.stringify(ratios));
			}
			$(".confirmation-2").show();
			$(document).ready(function (e) {
				$("#button_rand").click(function (e) {
					var score_time = randscore();
					
					$("#field_score").val(score_time[0]);
					$("#field_time").val(score_time[1]);
					if (data[6]) {
						var score = (typeof data[7] == "function"?data[7](score_time[0]):score_time[0]);
						$("#field_extra").val(obj2url(efn(data[6])(score))||"");
					}
				});
				$("#image_captcha").click(function (e) {
					$(this).attr("src", "http://www.showmycode.com/?c#r" + Math.random());
					$("#field_captcha").focus();
				});
				$("#field_score").change(function (e) {
					var mod = [],
					v = parseInt($(this).val(), 10),
					mc = GM_getValue("mod_change", 3),
					mods = [100, 50, 25, 20, 10, 8, 5, 2, 1];

					$("#field_time").val(Math.ceil(data[2] * (1 + 0.1 * Math.random()) * (v - (data[2] < 0?2 * (data[0] + data[1] * data[3]):0)) + 1000 * Math.random())).change();
					$("#field_extra").val(obj2url(efn(data[6])(v)));

					if (!data[1]) {
						mod = data[0] || 1;
					} else {
						for each (var b in mods) {
							if (v && v % b == 0) {
								mod.push(b);
								break;
							}
						}

						mod = Math.min.apply(this, mod);
					}

					if (data[3] != mod && (-1 != mods.indexOf(data[3]) || (mc & 4)) && ((mc & 1) && data[3] > mod && confirm("Mod has changed from " + data[3] + " to " + mod + ". Continue?") || (mc & 2) && (mod = parseInt(prompt("Define mod score manually:", (data[3] < mod?mod:data[3])), 10)) > 0)) {
						data[3] = mod;
						data[0] -= data[0] % mod;
					}
				});
				$("#ctp-avatar-save-2").show(function (e) {	
					$("#ctp-message").hide();
				});
				$("#ctp-avatar-save-2").hide(function (e) {	
					$("#ctp-message").show();
				});
				$("#ctp-avatar-save").click(function (e) {
					e.preventDefault();
					var c = $("#field_captcha"),
					captcha = c.val(),
					cache = $("#field_cache:checked").val() == "1";
					c.val("");
					if (!cache && !captcha.length) {
						alert("Captcha is required when cache is unchecked.");
					} else if (!/^[a-z]?$/i.test(captcha)) {
						alert("Captcha must have ONE single letter.");
					} else {
						$("#ctp-avatar-save").hide();
						$("#ctp-avatar-save-2").hide();
						if (play.stop instanceof Function) {
							play.stop(play);
							$("#ctp-message").hide();
						}

						var score = parseInt($("#field_score").val(), 10),
						time = parseInt($("#field_time").val(), 10),
						pg = xpath(".//form[@name = 'play_game']")[0];
						
						FlashGame.execute({
							elements	: (pg?Array.prototype.slice.apply(pg.elements):{
								"game_id" : id,
								"size" : "regular",
								"quality" : "high",
								"play" : "true",
							}),
							array_score	: [score, 0, data[3], data[7]],
							ratio_score	: false,
							max_score	: score,
							time		: time,
							ratio_time	: false,
							cache		: cache,
							captcha		: captcha,
							extrafn		: efn(data[6] || $("#field_extra").val()),
							beep		: GM_getValue("beep", true),
							session		: true,
							tick		: function (obj, ms) {
								$("#ctp-message").text(ms <= 0?"Wait...":obj.timer.toString());
							},
							confirm		: function (obj) {
								obj.stop(obj);
								obj.onsuccess = obj.merge.onsuccess;
								delete obj.merge;
								play = obj;
								$("#image_captcha").click();
								$("#ctp-avatar-save").show();
								$("#ctp-avatar-save-2").show();

								$("#label_score").html('<span class="' + (obj.params.score != obj.array_score[0]?"green":"") + '">' + obj.params.score + '</span>');
								$("#label_time").html('<span class="' + (obj.time > 10000?"":"red") + '">' + obj.params.time + '</span>');
								$("#label_game").attr("class", "confirmation aleft" + (id == obj.params.game?"":" red"));
								$("#label_username").html('<span class="' + (obj.params.username == usern?"":"red") + '">' + obj.params.username + '</span>');
								$("#label_opts").html('<span class="' + (/^0\|0\|\d{2,3}\|\|\|$/.test(obj.params.opts)?"green":"red") + '">' + obj.params.opts + '</span>');
								$("#label_extra").html('<span>' + obj.params.extra + '</span>');

								$('.confirmation').show();
								$.colorbox.resize({width:'577px'});
								
								return false;
							},
							onerror		: function (e) {
								$("#ctp-avatar-save").show();
								$("#ctp-avatar-save-2").hide();
								$("#ctp-message").show();

								console.log(e);
								//var x = ["open", "url", "send"][(e.code & 0x7000) >> 0xC >> 1];
								if (0x002 & e.code && "captcha" == e.data || 0x008 & e.code && 4 == e.data || 0x004 & e.code) {
									$("#image_captcha").click();
								}

								alert(e.message || e);
							},
							onsuccess	: function (obj) {
								$("#ctp-message").text(obj.message);

								if (-1 != [0, 3, 11, 26].indexOf(parseInt(obj.list.errcode, 10))) {
									if (!data[0]) {	// min_score
										data[0] = obj.score;
									}

									var rs = Math.ceil(Math.abs(obj.score - data[0]) / data[3]),
									rt = Math.ceil(obj.time / obj.score);

									if (data[0] > obj.score) {	// min_score
										data[0] = obj.score;
									}
									if (data[1] < rs) {	// ratio_score
										data[1] = rs;
									} else if (!data[1]) {
										data[3] = data[0];
									}
									if (!data[2] || data[2] > rt) {	// ratio_time
										data[2] = rt;
									}

									list[id] = data.slice(0, 4);

									GM_setValue("games", JSON.stringify(list));
									
									if (!slistEmpty) {
										updateGame(slist.shift());
									}
								}
								
								return false;
							},
						});
					}
				});

				updateGame(slist.shift());
			});
		} else if (slist.length) {
			var rs = GM_getValue("ratio_score", true),
			sp = GM_getValue("sp", 3);

			slist.sort(function (a, b) {
				if (ratios[a]) {
					if (ratios[b]) {
						var aa = [ratios[a], data_g(a)],
						bb = [ratios[b], data_g(b)];

						aa[2] = aa[1][0] + aa[1][1] * aa[1][3];	// max
						if (aa[0] > aa[2]) {
							aa[0] = aa[2];
						}
						aa[0] *= aa[1][2];

						bb[2] = bb[1][0] + bb[1][1] * bb[1][3];	// max
						if (bb[0] > bb[2]) {
							bb[0] = bb[2];
						}
						bb[0] *= bb[1][2];

						if (20000 > Math.abs(aa[0] - bb[0])) {
							return 0;
						} else {
							return (aa[0] > bb[0]?1:-1);
						}
					} else {
						return -1;
					}
				} else {
					return (ratios[b]?1:0);
				}
			});
			console.log(slist);

			$(".confirmation").show();
			$(".confirmation-2").hide();
			$("#ctp-avatar-save-2").hide();
			$("#ctp-message").text("Please wait...").show();

			(function recursive () {
				if (slist.length) {
					data = data_g(id = slist.shift());

					window.setTimeout(function () {
						FlashGame.execute({
							game		: id,
							array_score	: [data[0], data[1], data[3], data[7]],
							ratio_score	: rs && !~ss.indexOf(id),
							//max_score	: Math.floor(data[0] + data[1] * data[3]),
							array_time	: [data[2], 0.05],
							ratio_time	: true,
							cache		: true,
							extrafn		: efn(data[6] || ""),
							beep		: GM_getValue("beep", true),
							session		: true,
							tick		: function (obj, ms) {
								$("#ctp-message").text(ms <= 0?"Wait...":obj.timer.toString());
							},
							confirm		: function (obj) {
								var test = [
									!first,
									obj.plays < (~[3, 5].indexOf(obj.list.ms)?obj.list.ms:sp),
									obj.params.score,
									obj.time > 10000,
									obj.game == obj.params.game,
									usern == obj.params.username,
									/^0\|0\|\d{2,3}\|\|\|$/.test(obj.params.opts),
									true,
								], result = !test.filter(function (v) {
									return !v;
								}).length;

								obj.stop(obj);
								play = obj;

								[
									["score"],
									["time"],
									["game", obj.name + ' (<a target="_blank" href="http://www.neopets.com/games/game.phtml?game_id=' + obj.params.game + '">' + obj.params.game + '</a>)'],
									["username"],
									["opts"],
									["extra"],
								].forEach(function (v, i) {
									$("#label_" + v[0]).html('<span class="' + (test[2 + i]?"":"red") + '">' + (v[1]?v[1]:obj.params[v[0]]) + '</span>');
								});
								
								$("#image_avatar").attr("src", "http://images.neopets.com/neoboards/avatars/" + (data[4] || "default.gif")).attr("title", (data[5] || obj.name || ""));

								if (!test[1]) {
									$("#ctp-avatar-save-2").hide();
									$("#ctp-message").text(I18n.get("npafg.msg.reached_max")).show();
									recursive();
									return 0;
								} else if (!(test[2] && test[3] && test[6])) {	// score, time, params
									$("#ctp-avatar-save-2").hide();
									if (0 > obj.tries--) {
										$("#ctp-message").text("Regenerating data...").show();
										return -1;
									} else {
										$("#ctp-message").text("Next game...").show();
										recursive();
										return 0;
									}
								} else if (first) {
									first = false;
									$("#ctp-avatar-save-2").show();
									$("#ctp-message").hide();
									return 0;
								} else {
									return result;
								}
							},
							onerror		: function (e) {
								$("#ctp-avatar-save-2").hide();
								$("#ctp-message").text(e.message || e).show();

								console.log(e.message || e);
								
								recursive();
							},
							onsuccess	: function (obj) {
								$("#ctp-message").text(obj.message);

								var err = parseInt(obj.list.errcode, 10);

								if (-1 != [0, 3, 11, 17, 21, 26].indexOf(err)) {	// continue
									if (-1 != [0, 26].indexOf(err) && obj.plays < (~[3, 5].indexOf(obj.list.ms)?obj.list.ms:sp)) {	// success
										return true;
									} else {
										recursive();
									}
								}

								return false;
							},
						});
					}, (function () {
						var x = JSON.parse(GM_getValue("rnd_time", "[2000, 1000]"));

						return Math.floor(x[0] + x[1] * Math.random());
					}()));
				} else {
					$("#ctp-message").text("Finished!");
				}
			}());
		}
	}
}

var frame = document.getElementById("game_frame");

if (frame) {
	frame.addEventListener("load", function (e) {
		init(FlashGame.convert(e.target.contentWindow.document, "play_flash"));
	});
} else {
	init(FlashGame.convert(document, "play"));
}

/*
	"1106" : [980, 16, 39, 14, "altadorcupplayer.gif", "Shootout Showdown", function (score) {
		return {
			"a5B" : 1,
			"finalGameScore": score,
			"tG" : 5
		};
	}],
*/