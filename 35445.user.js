// ==UserScript==
// @name           Userscripts : Script Version
// @namespace      http://gm.wesley.eti.br/userscripts
// @description    Displays the stats for every your script versions
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0
// @language       en
// @include        http*://userscripts.org/scripts/review/*
// @include        http*://userscripts.org/scripts/versions/*
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=35445
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta http://userscripts.org/scripts/source/35445.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/144996.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @cfu:version    version
// @history        3.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        2.4.2 Updated "title" attribute
// @history        2.4.1 Minor bug fixed
// @history        2.4.0 Added functionality that allows resetting metadata for the current script (Press "Ctrl + Alt + R" at the Source Code tab)
// @history        2.4.0 Added the "download" attribute to the install link
// @history        2.3.0 Added script informations by author (Press "Ctrl + Alt + Z" at the Source Code tab)
// @history        2.2.0.0 Added information for other people's scripts (Press "Ctrl + Alt + A" at the Source Code tab)
// @history        2.1.0.0 Added version of the script
// @history        2.0.3.2 Fixed minor bug
// @history        2.0.3.1 Updated stats even logged out
// @history        2.0.3.0 Fixed bug when uploading a new version from different locations
// @history        2.0.2.4 Fixed minor bug
// @history        2.0.2.3 Added stats since last access
// @history        2.0.2.2 Added HTTPS support
// @history        2.0.2.1 Added config "showZero"
// @history        2.0.2.0 Fixed minor bug when having a single version or paginated versions (25+)
// @history        2.0.1.1 Added ordering
// @history        2.0.1.0 Added @grants and review counts
// @contributor    jerone ( http://userscripts.org/topics/19030?page=1#posts-481988 )
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
	var script = {
		"current"	: parseInt(location.href.match(/\/(\d+)/)[1], 10),
		"stats"		: JSON.parse(GM_getValue("stats", "{}")),
		"users"		: JSON.parse(GM_getValue("users", "[]")),
		"meta"		: JSON.parse(GM_getValue("meta", "{}")),
		"config"	: JSON.parse(GM_getValue("config", JSON.stringify({
			internal	: {
				diff		: true,
				order		: [3, 0, 1, 2],	// reviews, fans, comments, installs
				showZero	: false,
				meta		: ["version"],
			},
			external	: {
				diff		: true,
				order		: [3, 0, 1],	// reviews, fans, comments
				showZero	: false,
				meta		: ["version"],
			},
			download	: "[<yyyy><mm><dd>-<hh><nn>] <name> [<version|uso:version>].user.js",
			auto		: 0x0,	// 2 = script, 1 = author (discouraged)
			keys		: [90, 65, 82], // Z, A, R
		}))),
		"user"		: xpath("string(id('top')//li/a[contains(@href, '/home')]/text())")
	}, toInt = function (x) {
		return parseInt((/\d+/.test(xpath("string(" + x + ")").replace(/[.,]/g, ""))?RegExp.lastMatch:""), 10);
	},
	user = xpath("string(id('details')//a[@user_id and contains(@href, '/users/')]/text())"),
	isYours = (user == script.user),
	stats = script.stats[script.current],
	meta = script.meta[script.current];

	if (!(script.current in script.meta)) {
		meta = script.meta[script.current] = {};
	}

	if (/\/review\//.test(location.href)) {
		var execute = function () {
			var nver = 1 + (toInt("id('content')/p/a/text()") || 0),					// number of versions
			fans = toInt("id('script-nav')/li/a[contains(@href, 'fans')]/span/text()"),	// fans
			comm = toInt("id('script-nav')/li/a[contains(@href, 'discuss')]/span/text()"),	// comments
			inst = toInt("id('details')/text()[contains(., 'nstall')]"),			// installs
			revws = toInt("id('script-nav')/li/a[contains(@href, 'reviews')]/span/text()"); // reviews

			if (!(script.current in script.stats)) {			// current script is new
				stats = script.stats[script.current] = [nver, {}];
			} else if (script.stats[script.current][0] == nver - 1 && isYours)	{ // current script was updated
				stats[0] = nver--;
			} else {
				stats[0] = nver;
			}

			if (!stats[2] || stats[3] == [0, 0, 0, 0].toString()) {
				stats[2] = true;
				stats[3] = [fans, comm, inst, revws].map(function (v, i) {
					var s = stats[1][nver];

					return v - (s?s[i] || 0:v);
				});
			}

			stats[1][nver] = [fans, comm, inst, revws];

			for (var ai = 1;ai < nver;++ai) {
				if (ai in stats[1]) {
					for (var bi = 1 + ai;bi <= nver;++bi) {
						if (bi in stats[1] && stats[1][ai] == stats[1][bi].toString()) {
							delete stats[1][bi];
						}
					}
				}
			}

			GM_setValue("stats", JSON.stringify(script.stats));
		},
		listContains = function (u) {
			for (var ai in script.users) {
				if (script.users[ai] == u) {
					return true;
				}
			}
			
			return false;
		};

		if (isYours || (script.current in script.stats) || (script.config.auto & 1) || listContains(user)) {
			execute();
		}

		var activated = script.config.auto | ((script.config.auto & 1) && 2);

		document.addEventListener("keyup", function (e) {
			if (e.ctrlKey && e.altKey) {
				for (var i in script.config.keys) {
					var a = Math.pow(2, i);

					if (e.keyCode == script.config.keys[i] && !(activated & a)) {
						activated |= a;

						if (a & 4) {	// reset
							delete script.meta[script.current];

							GM_setValue("meta", JSON.stringify(script.meta));

							alert("[" + GM_info.script.name + "]\n\nMetadata of the current script ( #" + script.current + " ) was resetted!");
						} else {
							execute();

							if (a & 1) {	// author
								activated |= 2;
								script.users.push(user);

								GM_setValue("users", JSON.stringify(script.users));

								alert("[" + GM_info.script.name + "]\n\nActivated for the current author! ( " + user + " )");
							} else if (a & 2) {	// script
								alert("[" + GM_info.script.name + "]\n\nActivated for the current script! ( #" + script.current + " )");

								location.assign(location.href.replace("/review/", "/versions/"));
							}
						}
					}
				}
			}
		}, false);
	} else if (script.current in script.stats) {
		var list = xpath("id('content')/ul[1]/li/a[1]"),
		page = /page=(\d+)/.test(location.search) && parseInt(RegExp.$1, 10) || 1,
		init = stats[0] - 25 * (page - 1),
		sss = ["fan", "comment", "install", "review"],
		returnPlural = function (n, s) {
			return s + (Math.abs(n) > 1?"s":"");
		},
		cfg = script.config[isYours?"internal":"external"],
		toStr = function (c) {
			var x = [];

			for (var ai in cfg.order) {
				var o = cfg.order[ai];

				if (c && o in c && !isNaN(c[o]) && (c[o] || cfg.showZero)) {
					x.push(c[o] + " " + returnPlural(c[o], sss[o]));
				}
			}

			return x;
		},
		ss2 = toStr(stats[3]),
		smeta = function (obj, e) {
			var x = [];

			for (var ai in cfg.meta) {
				var xai = cfg.meta[ai];
				
				if (xai in obj) {
					x.push(obj[xai]);
				}
			}
			
			if (obj.download) {
				e.setAttribute("download", obj.download);
				e.setAttribute("title", obj.download);
			}
			e.parentNode.insertBefore(document.createTextNode("[ " + x.join(" | ") + " ] "), e.parentNode.firstChild);
		},
		rmeta = function (index, e) {
			var l = e.getAttribute("href").replace("user", "meta");

			if (l) {
				GM_xmlhttpRequest({
					method	: "get",
					url		: l,
					onload	: function (xhr) {
						if (!(index in meta)) {
							meta[index] = {};
						}
						var m = false,
						data = {},
						r = /^\/\/\s+@([\w:]+)\s+?([^\r\n]+)/gim;

						while (r.exec(xhr.responseText)) {
							var t = RegExp.$2.trim();
							if (RegExp.$1 in data) {
								data[RegExp.$1] += ", " + t;
							} else {
								data[RegExp.$1] = t;
							}
						}

						meta[index].download = script.config.download.replace(/<([\w:]+(?:\|[\w:]+)*)>/g, function ($0, $1) {
							var keys = $1.split("|");

							for (var ai in keys) {
								var key = keys[ai];

								if (/^(?:y{1,2}|y{4}|m{1,2}|d{1,2}|h{1,2}|n{1,2}|s{1,2})$/i.test(key)) {
									var d = new Date(data["uso:timestamp"]),
									l = key.length;

									if (!isNaN(d)) {
										switch (key[0]) {
											case "Y":
												var x = d.getUTCFullYear();

												return (l > 1?x.toString().substr(-l):x);
											case "y":
												return (l > 1?d.getFullYear().toString().substr(-l):d.getYear());
											case "M":
												var x = 1 + d.getUTCMonth();

												return (l > 1?("0" + x).substr(-l):x);
											case "m":
												var x = 1 + d.getMonth();

												return (l > 1?("0" + x).substr(-l):x);
											case "d":
											case "h":
											case "n":
											case "s":
											case "D":
											case "H":
											case "N":
											case "S":
												var x = d[{
													"d"	: "getDate",
													"h" : "getHours",
													"n" : "getMinutes",
													"s"	: "getSeconds",
													"D"	: "getUTCDate",
													"H" : "getUTCHours",
													"N" : "getUTCMinutes",
													"S"	: "getUTCSeconds",
												}[key[0]]]();

												return (l > 1?("0" + x).substr(-l):x);
										}
									}
								} else if (key in data && data[key]) {
									return data[key].replace(/[\\\/*?<>()|\"]/g, "_");
								}
							}

							return $0;
						});

						for (var i in cfg.meta) {
							var x = cfg.meta[i];

							if (x in data) {
								m = true;
								meta[index][x] = data[x];
							}
						}

						if (m) {
							GM_setValue("meta", JSON.stringify(script.meta));
							
							smeta(meta[index], e);
						}
					}
				});
			}
		},
		ql = new QueuedList([500, 0]);

		stats[2] = false;
		
		GM_setValue("stats", JSON.stringify(script.stats));

		list.forEach(function (e, i) {
			var ii = init - i;
			
			if (ii in meta) {
				smeta(meta[ii], e);
			} else if (cfg.meta && cfg.meta.length) {
				ql.run([rmeta, [ii, e]]);
			}

			if (ii in stats[1]) {
				var s = stats[1][ii];

				while (--ii > 0 && !(ii in stats[1]));
				if (ii && ii in stats[1] && cfg.diff) {
					s[0] -= stats[1][ii][0];
					s[1] -= stats[1][ii][1];
					s[2] -= stats[1][ii][2];
					s[3] -= stats[1][ii][3] || 0;
				}
				
				var ss = toStr(s);

				if (ss.length) {
					e.parentNode.appendChild(document.createTextNode(" [ " + ss.join(" | ") + " ]"));

					if (stats[0] == init - i && ss2.length) {
						e.parentNode.appendChild(document.createTextNode(" - [ " + ss2.join(" | ") + " ]"));
					}
				}
			}
		});
	}
}());