// ==UserScript==
// @name           Includes : Neopets : FlashGame
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    FlashGame Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.1.3
// @language       en
// @include        nowhere
// @exclude        *
// @resource       i18n http://i18n.pastebin.com/download.php?i=ULrVTsSg
// @require        http://www.onicos.com/staff/iz/amuse/javascript/expert/md5.txt
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/69584.user.js
// ==/UserScript==

/**************************************************************************

    Author's NOTE

    This script was made from scratch.

    Based on http://userscripts.org/scripts/version/63649/158447.user.js?format=txt (by Backslash)

***************************************************************************

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
//GM_setValue("rnd_time", "[2000, 1000]");
//GM_setValue("tries", 3);

FlashGame = function () {};

FlashGame.session = 0;

FlashGame.convert = function (doc, type) {
	switch (type) {
		case "play":
			var msg = xpath(".//div[@class = 'errormess' and b]", doc)[0] || null,
			img = xpath(".//div[@class = 'ctp-ctp']/a/img[@onerror]", doc)[0] || {},
			url = img.parentNode && img.parentNode.href || "";

			return {
				"error"			: (msg?1:0),
				"err_msg"		: msg,
				"link"			: (!/javascript:void/i.test(url)?url:""),
				"id"			: parseInt((/\-(\d+)\.\w+$/.test(img.src) || /game_id=(\d+)/.test(location.search)) && RegExp.$1, 10),
				"name"			: xpath("string(id('gr-ctp-feedback-form')/p/b/text())", doc) || xpath("string(id('gr-ctp-feedback-form')/p/b/text()|id('gr-header')//h1/text())", doc).replace(/^[-\s]+/g, "") || img.alt || img.parentNode.title,
				"ratio"			: parseFloat(xpath("string(id('gr-ctp-npratio')/div/text()[1])", doc).replace(/,/g, ".").replace(/[^\d.]+/g, "")),
				"featured"		: !!xpath("string(.//div[contains(@class, 'burst-featured-game')]/@class)", doc).length,
				"shockwave"		: !!xpath("string(.//script/text()[contains(., 'NP_getUrl') and contains(., 'shockwave')])", doc).length,
				"highscores"	: xpath("id('gr-ctp-hiscores')//ul[position() = last()]/li/span[2]/text()", doc).map(function (v) {
					return parseInt(v.textContent.replace(/\D+/g, ""), 10);
				}).sort(function (a, b) {
					return (b > a?1:-1);
				}),
			};
		case "play_flash":
			var msg = xpath(".//div[@class='errormess' and b]", doc)[0],
			obj = {
				"error"		: (msg ? 1 : 0),
				"err_msg"	: msg,
				"list"		: {},
				"name"		: xpath("string(.//title/text())", doc),
			},
			md = {};
			try {
				md = unsafeWindow.com.mtvnet.games.GameSettings.Game.metadata;
			} catch (e) { }
			var flashvars = xpath("string(id('gameWrapper')//param[@name='flashvars']/@value|id('gameWrapper')//script[contains(., 'gamePreloader')]/text())", doc) || md.gameURL || "";

			if (flashvars.length) {
				var filter_values = function (key, value) {
					switch (key) {
						case "id":
						case "f":
						case "dc":
						case "ddNcChallenge":
						case "multiple":
						case "forceScore":
						case "sp":
						case "ms":
							return parseInt(value, 10);
						case "n":
							return parseFloat(value);
						case "sh":
						case "sk":
							return (/^[a-f0-9]{20}$/i.test(value)?value:null);
						case "chall":
							if (value) {
								console.log(key + " = " + value);
							}
							return v;
						default:
							return v;
					}
				},
				re = /&(\w+)=([^&"]+)/gm, p;
				while (p = re.exec(flashvars)) {
					var v = decodeURIComponent(p[2]);

					// for security reasons
					if ( !/[()'"]/.test(v))	{
						obj.list[p[1]] = filter_values(p[1], v);
					} else {
						console.log(p, v);
					}
				}

				var xobj = {
					"link"			: "",
					"id"			: obj.list.id,
					"ratio"			: parseFloat((1 / obj.list.n).toFixed(2)),
					"featured"		: false,
					"shockwave"		: false,
					"highscores"	: [],
					"name"			: md.gameName || obj.name,
				};

				for (var x in xobj) {
					obj[x] = xobj[x];
				}
			}
			
			return obj;
		case "process_flash_score":
			var obj = {
				"list"	: {}
			};
			for each (var p in Array.prototype.map.apply((typeof(doc) == "string"?doc:doc.textContent).split("&"), [function(a) {
				var o = a.split("=", 2);
				o[1] = decodeURIComponent(o[1]);
				switch (o[0]) {
					case "errcode":
					case "success":
					case "plays":
					case "np":
						o[1] = parseInt(o[1].replace(/[,]+/g, ""), 10);
						break;
				}
				return o;
			}])) {
				obj.list[p[0]] = p[1];
			}

			obj.error = (p.length?0:1);
			obj.err_msg = obj.list.call_url;

			return obj;
	}
};

FlashGame.includes = {};
FlashGame.cached_includes = JSON.parse(GM_getValue("includes", "{}"));

FlashGame.open = function (obj) {
	if (obj.elements instanceof Array) {
		var list = {};
		for each (var f in obj.elements) {
			list[f.name] = f.value;
		}
		obj.elements = list;
	}

	var params = obj.elements || {
		game_id	: obj.game,
		size	: "large",
		quality	: "best",
		play	: "true",
	},
	tmpx = {
		game	: params.game_id,
		tries	: GM_getValue("tries", 3),
	};

	if (!obj.url) {
		var url = unsafeWindow.NP_getUrl && unsafeWindow.NP_getUrl(params.size, params.quality);
		obj.url = /game_id=(\d+)/.test(url) && RegExp.$1 == tmpx.game && url || params.game_id && "/games/play_flash.phtml?va=&game_id=" + params.game_id + "&nc_referer=&questionSet=&quality=" + params.quality;
	}
	if (!obj.referer) {
		params.size = "large";

		var x = "";
		for (var f in params) {
			x += "&" + f + "=" + params[f];
		}

		obj.referer = "http://www.neopets.com/games/game.phtml?" + x.substr(1);
	}
	
	for each (var v in ["url", "referer"]) {
		if (!obj[v]) {
			throw {
				code	: 0x1002,
				message	: "Missing parameter '" + v + "'",
				data	: v,
			};
		} else if (!/http:\/\//.test(obj[v])) {
			if ("/" != obj[v][0]) {
				obj[v] = "/games/" + obj[v];
			}
			obj[v] = "http://www.neopets.com" + obj[v];
		}
	}

	HttpRequest.open({
		"method"	: "get",
		"url"		: obj.url,
		"headers"	: {
			"Referer" : obj.referer,
		},
		"onsuccess"	: function (xhr) {
			var tmp = obj.merge || obj,
			result = FlashGame.convert(xhr.response.xml, "play_flash") || {},
			key = "plays-" + result.list.username,
			plays = JSON.parse(GM_getValue(key, '{"last":0,"games":{}}')),
			ratios = JSON.parse(GM_getValue("ratios", "{}")),
			x = Math.round(1000 / result.list.n);
			for (var v in tmpx) {
				tmp[v] = tmpx[v];
			}
			if (ratios[tmp.game] != x) {
				ratios[tmp.game] = x;
				GM_setValue("ratios", JSON.stringify(ratios));
			}

			for (var p in result) {
				tmp[p] = result[p];
			}

			tmp.referer = obj.url;
			tmp.response = xhr.response;

			var curr = new Date();
			if (86400000 < curr - plays.last) {
				curr.setUTCHours(curr.getUTCHours() - 8);
				curr.setUTCHours(8, 0, 0, 0);	// NST
				var a = new Date(curr);
				a.setUTCDate(1);	// 1st
				a.setUTCHours(10);	// 2am
				var b = new Date(a);
				a.setUTCMonth(2);	// March
				a.setUTCDate(14 - ((a.getUTCDay() + 6) % 7));	// 2nd Sunday
				b.setUTCMonth(10);	// November
				b.setUTCDate(7 - ((b.getUTCDay() + 6) % 7));	// 1st Sunday
				if (a <= curr && curr <= b) {	// Daylight Saving Time
					curr.setUTCHours(7);
				}
				plays.last = curr.valueOf();
				plays.games = {};
				GM_setValue(key, JSON.stringify(plays));
			}

			tmp.plays = result.list.sp || plays.games[tmp.game] || 0;

			if (!tmp.array_score) {
				tmp.array_score = [tmp.score, 0, 1];
			}
			if (!tmp.array_time) {
				tmp.array_time = [tmp.time, 0];
			}

			if (!tmp.max_score) {
				var review = JSON.parse(GM_getValue("reviews", "{}"))[tmp.game],
				min = (review >= 0?[review]:[]);

				min.push(tmp.array_score[0] + tmp.array_score[1] * tmp.array_score[2]);
				tmp.max_score = Math.min.apply(null, min);
				tmp.max_score -= tmp.max_score % tmp.array_score[2];
			}

			obj.onsuccess(tmp);
		},
	}).send();
};

FlashGame.url = function (obj) {
	if (/([\w_]+)\.swf$/.test(obj.options.include_movie)) {
		obj.include = RegExp.$1;
	}
	if (obj.options.id) {
		obj.game = obj.options.id;
	}
	if (obj.options.username) {
		obj.username = obj.options.username;
	}

	var nan = ["id", "f", "dc", "ddNcChallenge", "multiple", "forceScore", "n"].filter(function (v) {
		return (v in obj.options && isNaN(obj.options[v]));
	}),
	decimals_arr = JSON.parse(GM_getValue("decimals", "{}"));

	if (nan.length) {
		console.log(nan);
		throw {
			code	: 0x2001,
			message	: "Some numeric parameters aren't numbers",
			data	: nan,
		};
	} else if (!obj.include) {
		throw {
			code	: 0x2002,
			message	: "Missing parameter 'options.include_movie'",
			data	: "options.include_movie",
		};
	} else {
		console.log(obj);
		var test_value = function (v) {
			switch (v) {
				case "game":
				case "score":
				case "time":
					return obj[v] > 0;
				case "username":
					return obj[v].length > 0;
				case "onsuccess":
					return obj[v] instanceof Function;
			}
		};

		for each (var v in ["game", "score", "time", "username", "onsuccess"]) {
			if (!obj[v]) {
				throw {
					code	: 0x2002,
					message	: "Missing parameter '" + v + "'",
					data	: v,
				};
			} else if (!test_value(v)) {
				throw {
					code	: 0x2004,
					message	: "Wrong parameter '" + v + "'",
					data	: v,
				};
			}
		}
		for each (var v in ["sh", "sk"]) {
			if (!obj.options[v]) {
				throw {
					code	: 0x2002,
					message	: "Missing parameter 'options." + v + "'",
					data	: "options." + v,
				};
			}
		}
		
		if (obj.include in FlashGame.cached_includes && FlashGame.cached_includes[obj.include].Decimals in decimals_arr) {
			FlashGame.includes[obj.include] = FlashGame.cached_includes[obj.include];
		}
		
		var next = function (obj) {
			delete obj.captcha;

			if (obj.session === true) {
				window.clearInterval(FlashGame.session);
				FlashGame.session = obj.session = window.setInterval(function (obj) {
					HttpRequest.open({
						"method"	: "get",
						"url"		: "http://www.neopets.com/games/session_keep_alive.phtml",
						"headers"	: {
							"Referer" : obj.referer,
						},
					}).send();
				}, 900000, obj);
			}
			var i = obj.movie,
			decimals_arr = JSON.parse(GM_getValue("decimals", "{}")),
			idv = (function (inc) {
				switch (inc) {
					case "np8_include_v20":
					return {
						"fs_g" : "0",
						"r" : Math.random(),
						"remove" : ["przlvl"],
					};
					default:
					return {
						"fs_g" : "-1",
						"r" : 1000000 * Math.random(),
					};
				}
			}(obj.include));

			for each (var v in ["score", "time"]) {
				if (0 >= obj[v]) {
					throw {
						code	: 0x2010,
						message	: "'" + v + "' must be greater then zero",
						data	: obj[v],
					};
				}
			}

			if (i && i.Decimals in decimals_arr && decimals_arr[i.Decimals].length) {
				var encode = {
					"ssnhsh" : obj.options.sh,
					"ssnky" : obj.options.sk,
					"gmd" : obj.game,
					"scr" : obj.score,
					"przlvl" : "0",
					"frmrt" : obj.options.f || (obj.options.f = (24 + Math.floor(12 * Math.random()))),
					"chllng" : obj.options.chall || "",
					"gmdrtn" : obj.time,
				};
				
				for each (var xt in idv.remove) {
					delete encode[xt];
				}
				
				if (obj.extrafn instanceof Function) {
					obj.extra = obj.extrafn(obj.score);
				}

				for (var key in obj.extra) {
					if (!(key in encode)) {
						encode[key] = obj.extra[key];
					}
				}
				
				for (var xt in obj.asp) {
					encode["asp_" + xt] = obj.asp[xt];
				}

				var o = "",
				opts = {
					"cn" : 300 * obj.game,
					"gd" : obj.time
				},
				t = {
	//				"asp_fs_g" : ( params.options.forceScore != undefined ? params.options.forceScore||0 : "" ),
					"r" : idv.r,
					"gmd_g" : obj.game,
					"mltpl_g" : obj.options.multiple || 0,
					"gmdt_g" : (function (c, x) {
	//					var rnd = Math.floor(c.length * Math.random()),	// np8_gs_v16 and older
						var rnd = Math.floor(10 * Math.random()),
						bin = x.ssnhsh + x.ssnky,
						bl = bin.length,
						hex = String.fromCharCode.apply(this, c[rnd]),
						rnd = ("00" + rnd).substr(-2),
						hl = hex.length,
						str = "",
						output = "";

						for (var p in x) {
							str += "&" + p + "=" + x[p];
						}

						for (var ai = 1, at = str.length, k = 0;ai < at;++ai) {
							var x = hex.indexOf(str[ai]);
							output += ("000" + String.prototype.charCodeAt.call(~x ? hex[(x + hex.indexOf(bin[k])) % hl] : str[ai], 0)).substr(-3);
							k = ++k % bl;
						}

						return output + ("000" + rnd[0].charCodeAt(0)).substr(-3) + ("000" + rnd[1].charCodeAt(0)).substr(-3);
					}(decimals_arr[i.Decimals], encode)),
					"sh_g" : obj.options.sh,
					"sk_g" : obj.options.sk,
					"usrnm_g" : obj.username,
					"dc_g" : obj.options.dc || 0,
					"cmgd_g" : i.Vid || "",
					"ddNcChallenge" : obj.options.ddNcChallenge || 0,
					"fs_g" : (obj.options.forceScore != undefined ? obj.options.forceScore || "" : idv.fs_g)
				};
				
				for (var xt in t) {
					opts[xt] = t[xt];
				}

				for (var p in opts) {
					var x = obj.options[p] || opts[p];
					if (typeof(x) != "undefined") {
						o += "&" + p + "=" + encodeURI(x);
					}
				}

				console.log(o.substr(1));
				console.log(FlashGame.test(o.substr(1), decimals_arr[i.Decimals]));

				obj.url = "http://www.neopets.com/high_scores/process_flash_score.phtml?" + o.substr(1);

				if (obj.beep && !obj._beep) {
					if (true === obj.beep) {
						obj.beep = [20, 10, 3, 2, 1];
					}
					if (obj.beep instanceof Array) {
						obj.beep = new RegExp("^(?:" + obj.beep.join("|") + ")$");
					}
					obj._beep = xpath(".//audio[contains(@src, '/beep-8.wav')]")[0] || document.createElement("audio");
					obj._beep.setAttribute("src", "http://www.soundjay.com/button/beep-8.wav");
					document.body.appendChild(obj._beep);
				}

				obj.stop = function (obj) {
					window.clearTimeout(obj._timer);
					obj = {};
				}

				obj.start = function (obj) {
					obj.timer = new Timer({
						target	: new Date().valueOf() + obj.time,
					});
					obj.stop(obj);

					(function recursive (obj) {
						var ms = obj.timer.current(true);

						if (obj.tick instanceof Function) {
							obj.tick(obj, ms);
						}

						if (obj.beep instanceof RegExp && obj.beep.test(Math.floor(ms / 1000)) && obj._beep.play) {
							obj._beep.play();
						}

						if (ms <= 0) {
							FlashGame.send(obj);
						} else {
							obj._timer = window.setTimeout(recursive, 1000, obj);
						}
					}(obj));
				};

				obj.onsuccess(obj);
			} else {
				obj.onerror({
					code	: 0x2004,
					message	: "Wrong parameter 'movie'",
					data	: "movie",
				});
			}
		};

		if (FlashGame.includes[obj.include] && FlashGame.includes[obj.include].Decimals in decimals_arr && obj.cache && !obj.captcha) {
			obj.movie = FlashGame.includes[obj.include];
			next(obj);
		} else if (!obj.captcha) {
			throw {
				code	: 0x2002,
				message	: "Missing parameter 'captcha'",
				data	: "captcha",
			};
		} else {
			try {
				ShowMyCode.execute({
					"url"		: obj.options.image_host + "/" + obj.options.include_movie,
					"captcha"	: obj.captcha,
					"onsuccess"	: function (xhr) {
						var ini = /^\s+(?:public )?class (?:np\.projects\.(?:np\d+\.classCrypt|include\.Strings)|NP9_Score_Encryption {)/mi,
						include = {
							"LastUpdate"	: new Date().toString(),
							"Decimals"		: "",
							"Vid"			: null,
						},
						is_error = true,
						decimals = [],
						decimals_arr = JSON.parse(GM_getValue("decimals", "{}"));
						
						if (ini.test(xhr.response.text)) {
							var content = RegExp.rightContext.replace(/^\s+|[\t ]+/g, "");

							if (/functiongetiVID\(\)(?::number)?{return\((\d{5,})\);}/i.test(content.replace(/\s+/g, ""))) {
								include.Vid = parseInt(RegExp.$1, 10);
								var re = /aDecimals\.push\(\[(\d+(?:,\d+)+)\]\);/gi;

								while (re.exec(content) != null) {
									decimals.push(RegExp.$1.split(",").map(function ($0) {
										return parseInt($0, 10);
									}));
								}

								include.Decimals = MD5_hexhash(decimals.toSource().replace(/\s+/g, ""));
							}

							is_error = decimals.length != 20 || decimals[0].length != 83;
						}

						if (is_error && obj.cache && obj.include in FlashGame.cached_includes) {
							include = FlashGame.cached_includes[obj.include];
							decimals = decimals_arr[include.Decimals] || [];

							is_error = decimals.length != 20 || decimals[0].length != 83;
						} else if (xhr.error) {
							var err = function (n) {
								return (xhr.error == n?"[x] ":"[  ] ");
							};
							obj.onerror({
								code	: 0xA008,
								message	: ["An error has occurred while requesting file.", "", "Possible reasons and responsibles:", err(4) + "Wrong captcha (you)", err(2) + "Decoding engine is died (showmycode)", err(1) + "File not found (neopets)"].join("\n"),
								data	: xhr.error,
							});
							return;
						}

						if (!is_error && /^(?:13960|89198|97250)$/.test(include.Vid)) {
							FlashGame.includes[obj.include] = include;
							FlashGame.cached_includes[obj.include] = include;

							GM_setValue("includes", JSON.stringify(FlashGame.cached_includes));

							if (!(include.Decimals in decimals_arr)) {
								decimals_arr[include.Decimals] = decimals;

								GM_setValue("decimals", JSON.stringify(decimals_arr));
							}
						} else {
							obj.onerror({
								code	: 0xA004,
								message	: "Wrong parameter 'include.Vid'",
								data	: obj,
							});
							return;
						}

						obj.movie = include;
						next(obj);
					}
				});
			} catch (e) {
				if ("Missing parameter 'captcha'" == e) {
					throw {
						code	: 0x2002,
						message	: "Missing parameter 'captcha'",
						data	: "captcha",
					};
				} else {
					throw {
						message	: e,
					};
				}
			}
		}
	}
};

FlashGame.send = function (obj) {
	try {
		obj.referer = obj.options.image_host + "/" + obj.options.include_movie;
	} catch (e) {
	}

	for each (var v in ["url", "referer"]) {
		if (!obj[v]) {
			throw {
				code	: 0x4002,
				message	: "Missing parameter '" + v + "'",
				data	: v,
			};
		}
	}

	HttpRequest.open({
		"method"	: "post",
		"url"		: obj.url,
		"headers"	: {
			"Referer" : obj.referer,
		},
		"onsuccess"	: function (xhr) {
			console.log(xhr.response.text);
			var result = FlashGame.convert(xhr.response.text, "process_flash_score") || {},
			key = "plays-" + obj.options.username,
			plays = JSON.parse(GM_getValue(key, '{"last":0,"games":{}}'));
			if (result.list.plays) {
				plays.games[obj.game] = parseInt(result.list.plays, 10);
			} else {
				if (!plays.games[obj.game]) {
					plays.games[obj.game] = 0;
				}
				if (-1 == [17].indexOf(result.list.errcode)) {
					++plays.games[obj.game];
				}
			}
			obj.plays = plays.games[obj.game];
			GM_setValue(key, JSON.stringify(plays));
			for (var k in result) {
				if ("list" == k) {
					for (var k in result.list) {
						obj.list[k] = result.list[k];

						if (/^s[hk]$/i.test(k)) {
							obj.options[k] = result.list[k];
						}
					}
				} else {
					obj[k] = result[k];
				}
			}

			obj.message = [
				I18n.get("npafg.msg.success", [result.list.plays]),
				"Unknown success",
				"Unknown bonus",
				I18n.get("npafg.msg.reached_max"),
				"Zero score",
				"Unknown",
				"Invalid",
				"Timeout",	
				"No login",
				"Challenge",
				"Cookie",
				I18n.get("npafg.msg.reached_max"),
				"Challenge slow",
				"DC COMP",
				"DC TIME",
				I18n.get("npafg.msg.reviewed"),
				"Quick session",
				I18n.get("npafg.msg.missing_hash"),
				"Too slow",
				"DD SUCCESS",
				"DD NO SUCCESS",
				I18n.get("npafg.msg.reached_max"), //	"IDS_SM_DD_MAX",
				"IDS_SM_DD_BEAT_AAA",
				"IDS_SM_DD_BEAT_ABIGAIL",
				"IDS_SM_DD_BEAT_DOUBLE",
				"IDS_SM_DD_BEAT_LULU",
				I18n.get("npafg.msg.success", [result.list.plays])
			][result.list.errcode] || "Unknown error : " + result.list.errcode;
			obj.response = xhr.response;
			
			switch (result.list.errcode) {
				case 15:
					var reviews = JSON.parse(GM_getValue("reviews", "{}"));
					if (undefined == reviews[obj.game] || obj.score < reviews[obj.game]) {
						reviews[obj.game] = obj.score - 1;
						GM_setValue("reviews", JSON.stringify(reviews));
					}
					break;
			}

			if (result.list && result.list.call_url) {
				// example : http://www.neopets.com/games/display_avatar.phtml?id=130
				var url = result.list.call_url;
				if (!/^http/.test(url)) {
					if ("/" != url[0]) {
						url = "/" + url;
					}
					url = "http://www.neopets.com" + url;
				}
				if (GM_getValue("call_url", true)) {
					GM_openInTab(url);
				} else {
					console.log(url);
				}
			}

			try {
				var data = JSON.parse(decodeURIComponent(result.list.call_external_params).substr(5)) || [];

				for each (var d in data) {
					switch (d.fn) {
						case "setnp":
							document.getElementById("npanchor").textContent = d.args;
						break;
						case "updateRank":
							if (typeof unsafeWindow[d.fn] == "function") {
								if (d.args) {
									console.log("Execute", d);
								} else {
									unsafeWindow[d.fn]();
								}
							}
						break;
						case "flash_func_trigger":
							console.log(d);
							if (d.args && d.args.func && typeof unsafeWindow[d.args.func] == "function") {
								unsafeWindow[d.args.func](d.args.param);
							}
						break;
						default:
						console.log(d);
					}
				}
			} catch (e) {
			}

			if (obj.onsuccess(obj)) {
				window.setTimeout(obj.recursive, (function () {
					var x = JSON.parse(GM_getValue("rnd_time", "[2000, 1000]"));

					return Math.floor(x[0] + x[1] * Math.random());
				}()), obj);
			}
		}
	}).send({"onData" : "{}"}); // "{}"|"[type Function]"
};

FlashGame.execute = function (obj) {
	obj.recursive = function (obj) {
		if (!("options" in obj)) {
			obj.options = obj.list;
		}

		if (!obj.array_score[1] && obj.array_score[0] == obj.max_score) {
			obj.score = obj.max_score;
		} else {
			var rs = Math.floor(1000 / obj.options.n),
			xrand = function (v, r) {
				var min = (obj.array_score[0] - v) / obj.array_score[2];

				if (min && min == -obj.array_score[1]) {
					min *= 2;
				}

				return v + r * (min + obj.array_score[1]) * obj.array_score[2] * Math.random();
			};

			obj.score = xrand.apply(null, (obj.ratio_score?[rs, 0.15]:[obj.array_score[0], 1]));
			obj.score -= obj.score % obj.array_score[2];

			while (obj.score > obj.max_score) {
				var x = 1;
				do {
					x *= Math.min(Math.random(), 0.8);
				} while (x > 0.4);
				x = Math.max(x, 0.1);

				obj.score = Math.min(rs, obj.max_score);

				if (obj.ratio_score) {
					if (obj.max_score > obj.score && 4 < (obj.max_score - obj.score) * x / obj.array_score[2]) {
						obj.score += (obj.max_score - obj.score) * x;
					} else if (obj.score > obj.array_score[0] && 4 < (obj.score - obj.array_score[0]) * x / obj.array_score[2]) {
						obj.score -= (obj.score - obj.array_score[0]) * x;
					} else {
						obj.score -= obj.score * x;
					}
				} else {
					obj.score = xrand(obj.score, -x);
				}
			}
		}
		obj.score -= obj.score % obj.array_score[2];
		obj.score = Math.floor(obj.score);

		obj.time = obj.array_time[0] * (1 + obj.array_time[1] * Math.random());
		if (obj.array_time[0] < 0) {
			obj.time *= ((obj.ratio_time?obj.score - obj.max_score:0) - obj.max_score);
		} else if (obj.ratio_time) {
			obj.time *= obj.score;
		}
		obj.time = Math.ceil(obj.time);
		
		if (typeof obj.array_score[3] == "function") {
			obj.score = obj.array_score[3](obj.score);
		}

		if (!(obj.confirm instanceof Function)) {
			obj.confirm = function (obj) {
				var o = [];
				for (var label in obj.params) {
					o.push([I18n.get("inpfg." + label + ".label"), obj.params[label]].join("\t\t"));
				}

				return confirm(o.join("\n") + "\n\n" + I18n.get("inpfg.sendscore.confirm"));
			};
		}

		var tmp = {};
		for (var v in obj) {
			tmp[v] = obj[v];
		}
		obj.merge = tmp;

		obj.onsuccess = function (obj) {
			if (obj.merge.onsuccess) {
				obj.onsuccess = obj.merge.onsuccess;
			} else {
				obj.onsuccess = function (obj) {
					alert(obj.message);

					return true;
				};
			}
			obj.params = {
				"score" : obj.score,
				"time" : new Timer({
					target	: new Date().valueOf() + obj.time,
				}).toString(),
				"game" : obj.options.id,
				"username" : obj.options.username,
				"opts" : [obj.options.dc, obj.options.ddNcChallenge, obj.options.f, obj.options.chall, obj.options.multiple, obj.options.forceScore].join("|")
			};
			if (obj.extra) {
				var obj2url = function (obj) {
					var result = "";
					for (var x in obj) {
						result += "&" + x + "=" + obj[x];
					}
					return result.substr(1);
				};

				obj.params.extra = obj2url(obj.extra);
			}

			switch (~~obj.confirm(obj)) {
				case 1:
					obj.start(obj);
					break;
				case -1:
					obj.recursive(obj);
					break;
			}
		};

		try {
			FlashGame.url(obj);
		} catch (e) {
			obj.onerror(e);
		}
	};

	var tmp = {};
	for (var v in obj) {
		tmp[v] = obj[v];
	}
	obj.merge = tmp;

	obj.onsuccess = obj.recursive;

	try {
		FlashGame.open(obj);
	} catch (e) {
		obj.onerror(e);
	}
};

FlashGame.test = function(querystring, crypt) {
	var str = "",
	qs = {},
	remap = {
		"ssnhsh" : "sh_g",
		"ssnky" : "sk_g",
		"gmd" : "gmd_g",
		"gmdrtn" : "gd"
	};

	if (!(crypt instanceof Array)) {
		var decimals = JSON.parse(GM_getValue("decimals", "{}")),
		includes = JSON.parse(GM_getValue("includes", "{}"));
		if (crypt in includes) {
			crypt = decimals[includes[crypt].Decimals];
		} else {
			crypt = decimals["ec3b894948ef08a36067a4e6483e161e"];
		}
	}

	for each (var value in querystring.split("&")) {
		var x = value.split("=", 2);
		qs[x[0]] = x[1];
	}

	for (var ai = 0, at = qs.gmdt_g.length;ai < at;ai += 3) {
		str += String.fromCharCode(qs.gmdt_g.substr(ai, 3));
	}

	var hex = String.fromCharCode.apply(this, (crypt[0] instanceof Array ? crypt[parseInt(str.substr(-2), 10)] : crypt)),
	hl = hex.length,
	bin = qs.sh_g + qs.sk_g,
	bl = bin.length,
	output = "";

	for (var ai = 0, at = str.length - 2, k = 0;ai < at;++ai) {
		var x = hex.indexOf(str[ai]);
		output += (~x ? hex[(x + hl - hex.indexOf(bin[k])) % hl] : str[ai]);
		k = ++k % bl;
	}

	return output.split("&").map(function (value) {
		var pair = value.split("=", 2);

		if (pair[0] in remap && remap[pair[0]] in qs) {
			pair.push(qs[remap[pair[0]]] == pair[1]);
		}

		return pair.join("\t");
	}).join("\n");
};

/*
		"1288" : [2, 9, -9327, 1, "altadorcupplayer.gif", "Yooyuball", function (score) {
			var result = {"asp_pgs":"0,0,0,0,0,0,0,0,0,0,"};

			if (/^1(\d{2})(\d{2})$/.test(score)) {
				result["asp_pgs"] = "0,0,0,0," + parseInt(RegExp.$1, 10) + ",0," + parseInt(RegExp.$2, 10) + ",0,0,0,";
			}

			return result;
		}, function (score) {
			var adv = 0;
			for (var i = 2;i && 1 < score - adv;--i) {
				adv += Math.random() < i / 5;
			}
			score -= adv;

			var result = "1" + ("00" + adv).substr(-2) + ("00" + score).substr(-2);

			return /^10\d[01]\d$/.test(result) && parseInt(result, 10);
		}],
*/