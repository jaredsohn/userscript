// ==UserScript==
// @name           Neopets : Altador Cup Neoboard
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Displays the team of the users in the Altador Cup Neoboard
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0
// @language       en
// @include        http://www.neopets.com/neoboards/topic.phtml?topic=*
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=77897
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta http://userscripts.org/scripts/source/77897.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @contributor    jellyneo (http://www.jellyneo.net/?go=plotsummary_ac)
// @history        3.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        2.1.0 Fixed bug with calculated rank
// @history        2.0.1.3 Minor bug fix
// @history        2.0.1.2 Improved estimated rank
// @history        2.0.1.1 Links open in a new tab now
// @history        2.0.1.0 Added name of team captains
// @history        2.0.0.1 Some bug fixes
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

//GM_setValue("cache", 3600000);	// 1 hour
//GM_setValue("history_cups", 0);

// Altador Cup Neoboard
if (xpath("string(id('content')//td//a[contains(@href, 'boardlist') and contains(text(), 'Altador')]/@href)")) {
	var teams = ["Unknown", "Altador", "Brightvale", "Darigan Citadel", "Faerieland", "Haunted Woods", "Kreludor", "Krawk Island", "Shenkuu", "Lost Desert", "Maraqua", "Meridell", "Mystery Island", "Roo Island", "Terror Mountain", "Tyrannia", "Virtupets", "Kiko Lake", "Moltara"],
	players = [['"Trapper" Remis'],['"Squeaky" Tressif'],['Layton Vickles'],['Kakoni Worrill'],['Krell Vitor'],['Derlyn Fonnet'],['Garven Hale'],['Mirsha Grelinek'],['Leera Heggle'],['Elon "The Black Hole" Hughlis'],['"Wizard" Windelle'],['Volgoth'],['Lilo Blumario'],['Prytariel'],['Loryche'],['Keetra Deile'],['"Poke" Cellers'],['Aldric Beign']],
	cache_time = GM_getValue("cache", 7200000),	// 2 hours
	history_cups = GM_getValue("history_cups", 3),
	current = new Date(),
	cyear = current.getFullYear(),
	signup = new Date(cyear, 4, 25),	// May 25th
	positions = GM_getValue("positions", "{}");
	
	try {	// legacy compatibility
		positions = JSON.parse(positions);
	} catch (e) {
		positions = eval(positions);
		GM_setValue("positions", JSON.stringify(positions));
	}

	var upd_positions = !((cyear-1) in positions);

	if (current < signup) {
		--cyear;
	}

	if (GM_getValue("year") != cyear) {
		GM_setValue("year", cyear);
		GM_deleteValue("users");

		upd_positions = true;
	}

	function rank2str(rank) {
		switch (rank) {
			case -1	: return 'Unknown';
			case 0	: return 'Beginner';
			case 20	: return 'All Star';
			default	: return 'Level ' + rank;
		}
	}

	function calculatedRank(text) {
		if (/(\w+)_(engrave|\w+gem)\.png/.test(text)) {
			var groups = ["wood", "stone", "bronze", "silver", "gold"].indexOf(RegExp.$1),
			gems = ["yellowgem", "redgem", "greengem", "bluegem"].indexOf(RegExp.$2);

			if (~groups) {
				return 1 + 4 * groups + gems;
			}
		}

		var ranks = [50, 100, 150, 200, 275, 350, 425, 500, 600, 700, 800, 900, 1025, 1150, 1275, 1400, 1550, 1700, 1850, 2000],
		indexes = {"1":1, "2":2, "4":2, "6":12, "8":12},
		ai = 0,
		sum = 0,
		at = ranks.length;
		for (var v, re = /<td style='text-align: right; font-weight: bold;'>(\d+(?:[,.]\d{3})*)<\/td>/gi;v = re.exec(text); ++ai) {
			if (ai in indexes && (sum += parseInt(v[1].replace(/[,.]+/g, ""), 10) * (1/indexes[ai])) >= ranks[at - 1]) {
				return at;
			}
		}

		if (ai) {
			for (ai = 0; ai < at && ranks[ai] <= sum; ++ai);

			return ai;
		}

		return null;
	}

	function ac(p, l, yr, isCache, hc) {
		var users = JSON.parse(GM_getValue("users", "{}")),
		info = users[l],
		history = xpath(".//div[@class='cup_history']", p)[0];

		if (yr in info.cups && "team" in info.cups[yr]) {
			var pos = "",
			ordpos = ["th", "st", "nd", "rd"];

			if (yr in positions) {
				for (var ai in positions[yr]) {
					if (positions[yr][ai] == info.cups[yr].team) {
						pos = " (" + (++ai) + ordpos[(!/1[12]$/.test(ai) && /(\d)$/.test(ai) && RegExp.$1 < 4) ? RegExp.$1 : 0] + " " + yr + ")";
						break;
					}
				}
			}

			if (history) {
				history.innerHTML += '<a href="http://www.neopets.com/altador/colosseum/' + yr + '/trophy.phtml?username=' + l + '" target="_blank"><img height="20" style="border: 1px solid #000000;" alt="' + teams[info.cups[yr].team] + '" title="' + rank2str(info.cups[yr].rank) + pos + '" src="http://images.neopets.com/altador/altadorcup/team_logos/' + teams[info.cups[yr].team].replace(/\s+/g, '').toLowerCase() + '_50.gif" /></a> ';
//				history.innerHTML += '<a href="http://www.neopets.com/altador/colosseum/' + yr + '/trophy.phtml?username=' + l + '" target="_blank"><img height="20" style="border: 1px solid #000000;padding: 1px" alt="' + teams[info.cups[yr].team] + '" title="' + rank2str(info.cups[yr].rank) + pos + '" src="http://images.neopets.com/neoboards/smilies/' + teams[info.cups[yr].team].replace(/\s+/g, '').toLowerCase() + '.gif" /></a> ';
//				history.innerHTML += '<a href="http://www.neopets.com/altador/colosseum/' + yr + '/trophy.phtml?username=' + l + '" target="_blank"><img width="22" height="22" style="border: 1px solid #000000;" alt="' + teams[info.cups[yr].team] + '" title="' + rank2str(info.cups[yr].rank) + pos + '" src="http://images.neopets.com/altador/altadorcup/team_logos/' + teams[info.cups[yr].team].replace(/\s+/g, '').toLowerCase() + '_50.gif" /></a> ';
			} else {
				hr = document.createElement("tr"),
				acx = document.createElement("tr");

				hr.appendChild(document.createElement("td"));
				hr.firstChild.setAttribute("colspan", "2");
				hr.firstChild.innerHTML = '<hr color="#d1d1d1" size="1" noshade="noshade" />';
				p.appendChild(hr);

				acx.appendChild(document.createElement("td"));
				acx.firstChild.innerHTML = '<a href="http://www.neopets.com/altador/colosseum/' + yr + '/trophy.phtml?username=' + l + '" target="_blank"><img width="50" height="50" style="border: 1px solid #' + (yr == cyear ? '00' : 'FF') + '0000;" alt="' + teams[info.cups[yr].team] + '" title="' + rank2str(info.cups[yr].rank) + pos + '" src="http://images.neopets.com/altador/altadorcup/team_logos/' + teams[info.cups[yr].team].replace(/\s+/g, '').toLowerCase() + '_50.gif" /></a>';
				acx.appendChild(document.createElement("td"));
				acx.childNodes[1].setAttribute("class", "sf");
				acx.childNodes[1].innerHTML = '<b>' + teams[info.cups[yr].team] + '</b><br />' + rank2str(info.cups[yr].rank) + '<div style="margin-top: 4px;" class="cup_history"></div>';
//				acx.childNodes[1].innerHTML = '<img width="50" height="50" alt="' + rank2str(info.cups[yr].rank) + '" title="Level ' + info[yr].rank + '" src="http://images.neopets.com/altador/altadorcup/' + yr + '/badges/' + info.cups[yr].rank + '.png" />';
				p.appendChild(acx);
			}
		}

		if (isCache && hc < history_cups) {
			ac(p, l, --yr, isCache, ++hc);
		}
	}
	
	function init() {
		var users = GM_getValue("users", "{}"),
		wait = {},
		update_users = [];
		
		try {	// legacy compatibility
			users = JSON.parse(users);
		} catch (e) {
			users = eval(users);
			GM_setValue("users", JSON.stringify(users));
		}
		
		for each (var user in xpath("id('boards_table')//td//td/a[contains(@href, 'userlookup')]")) {
			var login = /user=(\w+)/.test(user.href) && RegExp.$1,
			p = xpath("./ancestor::tbody[1]", user)[0];

			if (login) {
				if (login in users && current - cache_time < Date.parse(users[login].update)) {
					ac(p, login, cyear, true, 0);
				} else if (login in wait) {
					wait[login].push(p);
				} else {
					var img = document.createElement("img");
					img.setAttribute("style", "display:none;width:0;height:0");
					img.setAttribute("src", "http://www.obyneo.net/ac/2013/calc.png?u=" + login);
					document.body.appendChild(img);
					GM_log("Updated " + login);

					update_users.push(login);
					wait[login] = [p];
				}
			}
		}

		(function recursive(yr, list) {
			var users = JSON.parse(GM_getValue("users", "{}"));

			if (!list.length) {
				if (cyear - yr < history_cups) {
					setTimeout(recursive, 777 + 477 * Math.random(), yr - 1, JSON.parse(update_users.toSource()));
				} else {
					GM_log("Teams updated!");
				}
			} else if (yr != cyear && list[0] in users && yr in users[list[0]].cups) {
				// no need to update old tournaments
				var l = list.shift();

				if (l in wait && users[l].cups[yr].team) {
					for each (var row in wait[l]) {
						ac(row, l, yr, false, 0);
					}
				}

				recursive(yr, list);
			} else {
				HttpRequest.open({
					"method" : "get",
					"url" : "http://www.neopets.com/altador/colosseum/" + yr + "/trophy.phtml",
					"headers" : {
						"Referer" : "http://www.neopets.com/userlookup.phtml?user=" + list[0]
					},
					"onsuccess" : function(xhr) {
						var l = list[0],
						users = JSON.parse(GM_getValue("users", "{}")),
						t = /\/team_(\d+)\./.test(xhr.response.text) && RegExp.$1;

						if (!(l in users)) {
							users[l] = {
								"cups" : {}
							};
						}

						if (!t) {
							if (/Team ([\w ]+)/i.test(xhr.response.text)) {
								for (var ai in teams) {
									if (teams[ai] == RegExp.$1) {
										t = ai;
										break;
									}
								}
							} else {
								var tf = 0;
								a:for (var ai in players) {
									for (var bi in players[ai]) {
										if (xhr.response.text.indexOf(players[ai][bi]) > -1) {
											tf = 1+parseInt(ai, 10);
											break a;
										}
									}
								}
								if (tf) {
									t = tf;
								}
							}
						}
						
						if (yr == cyear) {
							users[l].update = new Date().toString().replace(/\s+\(.+\)/g, "");
						}

						if (t) {
							users[l].cups[yr] = {
								"team" : parseInt(t, 10) || 0,
								"rank" : parseInt(/\/(?:badges\/|levelshields_?\d+_)(\d+)\./.test(xhr.response.text) && RegExp.$1 || calculatedRank(xhr.response.text), 10)
							};

							if (isNaN(users[l].cups[yr].rank)) {
								users[l].cups[yr].rank = -1;
							}

							GM_setValue("users", JSON.stringify(users));

							if (l in wait) {
								for each (var row in wait[l]) {
									ac(row, l, yr, false, 0);
								}
							}
						} else {
							users[l].cups[yr] = {};

							GM_setValue("users", JSON.stringify(users));
						}

						list.shift();
						setTimeout(recursive, 838 + 338 * Math.random(), yr, list);
					}
				}).send({
					"username" : list[0]
				});
			}
		}(cyear, JSON.parse(update_users.toSource())));
	}

	if (upd_positions) {
		HttpRequest.open({
			"url" : "http://www.jellyneo.net/?go=plotsummary_ac",
			"method" : "get",
			"headers" : {
				"Referer" : "http://www.jellyneo.net/?go=altadorcup6"
			},
			"onsuccess" : function(xhr) {
				var yr = 2005,
				iteams = {};

				for (var ai in teams) {
					iteams[teams[ai]] = ai;
				}

				for each (var result in xpath("id('contentshell')/div/center/div[contains(., 'Results')]/div[2]/table/tbody/tr/td[not(contains(text(), '('))]/text()", xhr.response.xml)) {
					if (/^(\d+)\. (.+)$/.test(result.textContent)) {
						if (RegExp.$1 == 1) {
							++yr;
						}

						if (!(yr in positions)) {
							positions[yr] = new Array(16);	// 16 teams
						}

						positions[yr][RegExp.$1 - 1] = iteams[RegExp.$2];
					}
				}

				// removes positions older than `1 + history_cups` years ago
				for (var ai = yr - (1 + history_cups); ai >= 2006; --ai) {
					delete positions[ai];
				}

				GM_setValue("positions", JSON.stringify(positions));

				init();
			}
		}).send();
	} else {
		init();
	}
}