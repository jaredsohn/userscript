// ==UserScript==
// @name           Includes : Neopets : FlashGame [DEPRECATED]
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    FlashGame Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        4.0.0.0
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
// @history        4.0.0.0 Refactored
// @history        3.1.0.4 Fixed minor bug
// @history        3.1.0.3 Updated @require#87940
// @history        3.1.0.2 Nps are updated dynamically
// @history        3.1.0.0 Updated due to changes in the game page
// @history        3.0.1.3 Added some data validations
// @history        3.0.1.3 Updated some encryption patterns
// @history        3.0.1.2 Encryption wasn't being stored
// @history        3.0.1.1 Some bug fixes
// @history        3.0.1.0 Added referer header (GM 0.9.3+ only)
// @history        3.0.0.0 Improved encryption cache system
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

FlashGame = function () {};

FlashGame.convert = function (doc, type) {
	switch (type) {
		case "play":
			var msg = xpath(".//div[@class = 'errormess' and b]", doc)[0],
			alert_txt = xpath("id('alert_text')", doc)[0],
			type = xpath("id('gamesRoomContentWrap')//td[1]//div//td[2]//area[1]", doc)[0];

			if (type) {
				obj = {
					"error": (msg ? 1 : 0),
					"message": msg,
					"id" : parseInt(/\bgame_id=(\d+)/.test(type.getAttribute("onclick")) && RegExp.$1, 10),
					"name" : xpath("string(id('gamesRoomContentWrap')//td[1]//div[4]/div[3])", doc),
					"ratio" : parseFloat(xpath("string(id('gamesRoomContentWrap')//td[1]/div/div//tr[2]/td/a[1])", doc).match(/\d+(?:[.,]\d+)?/)),
					"featured" : alert_txt && /\bnp\b/i.test(alert_txt.textContent),
					"shockwave" : alert_txt && /shock ?wave/i.test(alert_txt.textContent)
				};
			} else {
				obj = {
					"error": (msg ? 1 : 0),
					"message": msg,
					"id" : parseInt(/\bgame_id=(\d+)/.test(xpath("string(.//script[contains(text(), 'game_id')]/text())", doc)) && RegExp.$1, 10),
					"name" : xpath("string(id('gamesRoomContentWrap')//td[1]//div[4]/div[3])", doc)
				}
			}
			break;
		case "play_flash":
			var msg = xpath(".//div[@class='errormess' and b]", doc)[0],
			obj = {
				"error": (msg ? 1 : 0),
				"message": msg,
				"list" : {},
				"name" : xpath("string(.//title/text())", doc),
				"highscores" : []
			};

			for each (var h in xpath("id('game-info')//td[1]//tr[2]//strong/div", doc)) {
				obj.highscores.push({
					"username" : xpath("string(.//a[1])", h),
					"score" : parseInt(("" + h.textContent.match(/\d+(?:[,.]\d+)+/)).replace(/[,.]/g, ""), 10)||0
				});
			}

			var flashvars = xpath("string(id('gameWrapper')//param[@name='flashvars']/@value|id('gameWrapper')//script[contains(., 'gamePreloader')]/text())", doc), p;

			if (flashvars) {
				function filter_values(k, v) {
					switch (k) {
						case "id":
						case "f":
						case "dc":
						case "ddNcChallenge":
						case "multiple":
						case "forceScore":
						case "sp":
						case "ms":
							return parseInt(v, 10);
						case "n":
							return parseFloat(v);
						case "sh":
						case "sk":
							return ( /^[a-f0-9]{20}$/i.test(v) ? v : null );
						case "chall":
							if (v)
							GM_log(k + " = " + v);
							return v;
						default:
							return v;
					}
				}

				var re = /&(\w+)=([^&"]+)/gm;
				while (p = re.exec(flashvars)) {
					var v = decodeURIComponent(p[2]);

					// for security reasons
					if ( !/[()'"]/.test(v))	{
						obj.list[p[1]] = filter_values(p[1], v);
					} else {
						GM_log(p + " (" + v + ")");
					}
				}

				obj.id = obj.list.id;
			}
			break;
		case "process_flash_score":
			var obj = {"list" : {}};
			for each (var p in String(typeof(doc) == "string" ? doc : doc.textContent).split("&").map(function(a) {
				var o = a.split("=", 2);
				o[1] = decodeURIComponent(o[1]);
				return o;
			})) {
				obj.list[p[0]] = p[1];
			}

			obj.error = (p.length ? 0 : 1);
			obj.message = obj.list.call_url;
			break;
	}
	return obj;
};

FlashGame.includes = {};
FlashGame.cached_includes = eval(GM_getValue("includes", "({})"));

FlashGame.open = function (params) {
	if (!("referer" in params)) {
		try {
			params.referer = "http://www.neopets.com/games/play.phtml?game_id=" + (/game_id=(\d+)/.test(params.url) && RegExp.$1 || params.id);
		} catch (e) {
		}
	}

	if (!/^http:\/\/www\.neopets\.com\/games\/play_flash\.phtml/.test(params.url))
	alert("[Includes : Neopets : FlashGame : open]\n" + I18n.get("inpfg.parameter.missing", ["url"]));
	else if (!params.referer)
	alert("[Includes : Neopets : FlashGame : open]\n" + I18n.get("inpfg.parameter.missing", ["referer"]));
	else
	HttpRequest.open({
		"method" : "get",
		"url" : params.url,
		"headers" : {
			"Referer" : params.referer
		},
		"onsuccess" : function (_params) {
			var obj = FlashGame.convert(_params.response.xml, "play_flash") || {};
			for (var v in params) {
				obj[v] = params[v];
			}

			obj.referer = params.url;
			obj.response = _params.response;

			if (typeof obj.onsuccess == "function") {
				obj.onsuccess(obj);
			}
		}
	}).send();
};

FlashGame.url = function (params) {
	function x(params) {
		var i = FlashGame.includes[params.include],
		decimals_arr = eval(GM_getValue("decimals", "({})"));

		idv = (function(inc) {
			switch (inc) {
				case "np8_include_v20":
				return {
					"fs_g" : "0",
					"r" : Math.random()
				};
				default:
				return {
					"fs_g" : "-1",
					"r" : 1000000 * Math.random(),
					"opts" : {"przlvl":"0"}
				};
			}
		})(params.include);

		if ((i && i.Decimals in decimals_arr && decimals_arr[i.Decimals].length) || params.score <= 0 || params.time <= 0) {
			var encode = {
				"ssnhsh" : params.hash || params.opts.sh,
				"ssnky" : params.key || params.opts.sk,
				"gmd" : params.game,
				"scr" : params.score
			},
			t = {
				"frmrt" : params.opts.f || (24 + Math.floor(12 * Math.random())),
				"chllng" : params.opts.chall || "",
				"gmdrtn" : params.time
			};
			
			for (var xt in idv.opts) {
				encode[xt] = idv.opts[xt];
			}
			
			for (var xt in t) {
				encode[xt] = t[xt];
			}
			
			for (var key in params.extra) {
				if (!(key in encode)) {
					encode[key] = params.extra[key];
				}
			}

			var o = "",
			opts = {
				"cn" : 300 * params.game,
				"gd" : params.time
			},
			t = {
//				"asp_fs_g" : ( params.opts.forceScore != undefined ? params.opts.forceScore||0 : "" ),
				"r" : idv.r,
				"gmd_g" : params.game,
				"mltpl_g" : params.opts.multiple || 0,
				"gmdt_g" : (function(c, x) {
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
						output += ("000" + String( ~x ? hex[(x + hex.indexOf(bin[k])) % hl] : str[ai] ).charCodeAt(0)).substr(-3);
						k = ++k % bl;
					}

					return output + ("000" + rnd[0].charCodeAt(0)).substr(-3) + ("000" + rnd[1].charCodeAt(0)).substr(-3);
				})(decimals_arr[i.Decimals], encode),
				"sh_g" : params.hash || params.opts.sh,
				"sk_g" : params.key || params.opts.sk,
				"usrnm_g" : params.username || params.opts.username,
				"dc_g" : params.opts.dc || 0,
				"cmgd_g" : i.Vid || "",
				"ddNcChallenge" : params.opts.ddNcChallenge || 0,
				"fs_g" : (params.opts.forceScore != undefined ? params.opts.forceScore||"" : idv.fs_g)
			};
			
			for (var xt in params.asp) {
				opts["asp_"+xt] = params.asp[xt];
			}

			for (var xt in t) {
				opts[xt] = t[xt];
			}

			var not = {};
			for (var p in opts) {
				not[p] = true;
				if (typeof(params.opts[p] || opts[p]) != "undefined") {
					o += "&" + p + "=" + encodeURI(params.opts[p] || opts[p]);
				}
			}

			GM_log(o.substr(1));
			GM_log(FlashGame.test(o.substr(1), decimals_arr[i.Decimals]));

			return "http://www.neopets.com/high_scores/process_flash_score.phtml?" + o.substr(1);
		}
		else
		return false;
	}

	if (!params.opts) {
		params.opts = {};
	}

	if (params.opts.include_movie && /([\w_]+)\.swf$/.test("" + params.opts.include_movie)) {
		params.include = RegExp.$1;
	}

	if (params.opts.id) {
		params.game = params.opts.id;
	}

	params.game = parseInt(params.game, 10);
	params.time = parseInt(params.time, 10);
	params.score = parseInt(params.score, 10);

	var nan = (function(o, c) {
		var ps = [];

		for each (var p in c) {
			if (p in o && isNaN(o[p])) {
				ps.push(p);
			}
		}

		return ps;
	})(params.opts, ["id", "f", "dc", "ddNcChallenge", "multiple", "forceScore", "n"]);

	var ci = GM_getValue("cached_includes", 1),
	decimals_arr = eval(GM_getValue("decimals", "({})"));

	if (params.include && params.include in FlashGame.cached_includes) {
		// Compatibility mode (3.0.0.0)
		if (FlashGame.cached_includes[params.include].Decimals instanceof Array) {
			var val = FlashGame.cached_includes[params.include].Decimals,
			key = MD5_hexhash(val.toSource().replace(/\s+/g, ""));

			decimals_arr[key] = val;
			GM_setValue("decimals", uneval(decimals_arr));

			FlashGame.cached_includes[params.include].Decimals = key;
			GM_setValue("includes", uneval(FlashGame.cached_includes));
		}

		if (FlashGame.cached_includes[params.include].Decimals in decimals_arr && !(params.include in FlashGame.includes) && (ci == 2 || ci == 1 && confirm("[Includes : Neopets : FlashGame]\n\n" + I18n.get("inpfg.cached_encrypt.confirm", [FlashGame.cached_includes[params.include].LastUpdate || I18n.get("unknown")])))) {
			FlashGame.includes[params.include] = FlashGame.cached_includes[params.include];
		}
	}

	var alertMsg = "[Includes : Neopets : FlashGame : url]\n" + I18n.get("inpfg.parameter.missing");
	if (nan.length)
	alert("[Includes : Neopets : FlashGame : url]\n" + I18n.get("inpfg.parameters.wrong", [nan.join("','")]));
	else if (!params.include)
	alert(alertMsg.replace("{0}", "include"));
	else if (!params.game)
	alert(alertMsg.replace("{0}", "game"));
	else if (!params.time)
	alert(alertMsg.replace("{0}", "time"));
	else if (!params.score)
	alert(alertMsg.replace("{0}", "score"));
	else if (!params.hash && !params.opts.sh)
	alert(alertMsg.replace("{0}", "hash"));
	else if (!params.key && !params.opts.sk)
	alert(alertMsg.replace("{0}", "key"));
	else if (!params.username && !params.opts.username)
	alert(alertMsg.replace("{0}", "username"));
	else if (!params.onsuccess)
	alert(alertMsg.replace("{0}", "onsuccess"));
	else if (params.include in FlashGame.includes) {
		params.error = 0;
		params.output = x(params);
		params.movie = FlashGame.includes[params.include];

		params.onsuccess(params);
	}
	else
	ShowMyCode.execute({
		"url" : params.opts.image_host + "/" + params.opts.include_movie,
		"captcha" : params.captcha,
		"onsuccess" : function (_params) {
			var obj = _params || {};
			for (var v in params) {
				obj[v] = params[v];
			}
			var ini = /^\s+(?:public )?class (?:np\.projects\.(?:np\d+\.classCrypt|include\.Strings)|NP9_Score_Encryption {)/mi,
			include = {
				"LastUpdate" : new Date().toString(),
				"Decimals" : "",
				"Vid" : null
			},
			is_error = true,
			decimals = [];
			console.log(1, _params);
			if (ini.test(_params.response.text)) {
				var content = RegExp.rightContext.replace(/^\s+|[\t ]+/g, "");

				if (/functiongetiVID\(\)(?::number)?{return\((\d{5,})\);}/i.test(content.replace(/\s+/g, ""))) {
					include.Vid = parseInt(RegExp.$1, 10);
					var re = /aDecimals\.push\(\[(\d+(?:,\d+)+)\]\);/gi;

					while (re.exec(content) != null) {
						decimals.push(RegExp.$1.split(",").map(function($0) {
							return parseInt($0, 10);
						}));
					}

					include.Decimals = MD5_hexhash(decimals.toSource().replace(/\s+/g, ""));
				}

				is_error = decimals.length != 20 || decimals[0].length != 83;
			}

			if (is_error && obj.include in FlashGame.cached_includes && GM_getValue("cached_includes", 1) == 0 && confirm("[Includes : Neopets : FlashGame]\n\n" + I18n.get("inpfg.cached_encrypt.confirm"))) {
				include = FlashGame.cached_includes[obj.include];

				is_error = decimals.length != 20 || decimals[0].length != 83;
			}

			obj.error = (is_error ? 2 : ((/^(?:13960|89198|97250)$/).test(include.Vid) ? 0 : 1));

			if (!obj.error) {
				FlashGame.includes[obj.include] = include;

				FlashGame.cached_includes[obj.include] = include;
				GM_setValue("includes", uneval(FlashGame.cached_includes));

				var decimals_arr = eval(GM_getValue("decimals", "({})"));
				if (!(include.Decimals in decimals_arr)) {
					decimals_arr[include.Decimals] = decimals;
					GM_setValue("decimals", uneval(decimals_arr));
				}
			}

			obj.output = x(obj);
			obj.movie = include;

			obj.onsuccess(obj);
		}
	});
};

FlashGame.send = function (params) {
	if (!("referer" in params)) {
		try {
			params.referer = params.opts.image_host + "/" + params.opts.include_movie;
		} catch (e) {
		}
	}

	if (!/^http:\/\/www\.neopets\.com\/high_scores\/process_flash_score\.phtml/.test(params.url))
	alert("[Includes : Neopets : FlashGame : send]\n" + I18n.get("inpfg.parameter.missing", ["url"]));
	else if (!params.referer)
	alert("[Includes : Neopets : FlashGame : send]\n" + I18n.get("inpfg.parameter.missing", ["referer"]));
	else
	HttpRequest.open({
		"method" : "post",
		"url" : params.url,
		"headers" : {
			"Referer" : params.referer,
		},
		"onsuccess" : function(_params) {
			var obj = _params,
			result = FlashGame.convert(_params.response.text, "process_flash_score") || {};
			for (var v in params) {
				obj[v] = params[v];
			}
			for (var v in result) {
				obj[v] = result[v];
			}

			if (obj.list && obj.list.call_url) {
				// example : http://www.neopets.com/games/display_avatar.phtml?id=130
				if (GM_getValue("call_url", true)) {
					GM_openInTab(obj.list.call_url);
				} else {
					console.log(obj.list.call_url);
				}
			}

			try {
				var data = JSON.parse(decodeURIComponent(obj.list.call_external_params).substr(5)) || [];

				for each (var d in data) {
					switch (d.fn) {
						case "setnp":
							document.getElementById("npanchor").innerHTML = d.args;
						break;
						case "flash_func_trigger":
							if (d.args && d.args.func && typeof window[d.args.func] == "function") {
								window[d.args.func](d.args.param);
							}
						break;
					}
				}
			} catch (e) {
			}

			if (typeof params.onsuccess == "function") {
				params.onsuccess(obj);
			}
		}
	}).send({"onData":"{}"}); // "{}"|"[type Function]"
};

FlashGame.execute = function (params) {
	FlashGame.open({
		"url" : "http://www.neopets.com/games/play_flash.phtml?game_id=" + params.id,
		"onsuccess" : function (_params) {
			(params.recursive = function (p) {
				for (var v in params) {
					p[v] = params[v];
				}
				if (!("opts" in p)) {
					p.opts = p.list;
				}

				p.s = p.score[0] + Math.floor(p.score[1] * p.score[2] * Math.random());
				if (p.ratio_score)
				p.s += Math.floor(1000 / p.list.n);
				p.s -= p.s % p.score[2];
				if ("max_score" in p && p.s > p.max_score) {
					p.s = p.max_score - Math.floor(p.score[1] * p.score[2] * Math.min(Math.random(), 0.5));
					p.s -= p.s % p.score[2];
				}
				p.t = p.time[0] * ( p.ratio_time ? p.s : 1 ) + Math.floor(p.time[1] * Math.random());

				FlashGame.url({
					"score" : p.s,
					"time" : p.t,
					"opts" : p.opts,
					"onsuccess" : function (params) {
						for (var v in p) {
							params[v] = p[v];
						}
						if (params.output) {
							function ms2str(v) {
								return ("0" + Math.floor(v / 60000)).substr(-2) + ":" + ("0" + Math.floor((v % 60000) / 1000)).substr(-2);
							}

							var n = {
								"game" : p.name + " ["+p.opts.id+"]",
								"user" : p.opts.username,
								"score" : p.s,
								"time" : ms2str(p.t),
								"params" : [p.opts.dc, p.opts.ddNcChallenge, p.opts.f, p.opts.chall, p.opts.multiple, p.opts.forceScore].join("|")
							},
							o = [];
							for (var label in n) {
								o.push([I18n.get("inpfg." + label + ".label"), n[label]].join("\t\t"));
							}

							params.beep = xpath(".//audio[contains(@src, '/beep-8.wav')]")[0];
							if (!params.beep) {
								params.beep = document.createElement("audio");
								params.beep.setAttribute("src", "http://www.soundjay.com/button/beep-8.wav");
								document.body.appendChild(params.beep);
							}

							if (confirm(o.join("\n")+"\n\n" + I18n.get("inpfg.sendscore.confirm"))) {
								if (params.session === true)
								params.session = setInterval(function() {
									HttpRequest.open({
										"method" : "get",
										"headers" : {
											"Referer" : params.referer
										},
										"url" : "http://www.neopets.com/games/session_keep_alive.phtml"
									}).send();
								}, 900000);

								var next = function (p) {
									var params = {};
									for (var v in p) {
										params[v] = p[v];
									}
									params.url = p.output;
									params.parameters = p;
									params.onsuccess = function (params) {
										delete params.parameters.list;
										for (var v in params.parameters) {
											params[v] = params.parameters[v];
										}
										for (var v in params.list) {
											if (/^s[hk]$/i.test(v)) {
												params.opts[v] = params.list[v];
											}
										}
										delete params.referer;

										if (typeof params.onsuccess == "function") {
											params.onsuccess(params);
										}
									};

									FlashGame.send(params);
								};

								if (params.autosend === true) {
									params.autosend = setTimeout(next, params.t, params);
								} else {
									params.next = next;
								}

								params.continue(params);
							}
						}
						else
						alert("[Includes : Neopets : FlashGame]\n\n" + I18n.get("inpfg.cached_encrypt.notfound") + "\n\n" + ("" + params.opts.include_movie).match(/([\w_]+)\.swf$/)[1]);
					}
				});
			})(_params);
		}
	});
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
		var decimals = eval(GM_getValue("decimals", "({})")),
		includes = eval(GM_getValue("includes", "({})"));
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

	return output.split("&").map(function(value) {
		var pair = value.split("=", 2);

		if (pair[0] in remap && remap[pair[0]] in qs) {
			pair.push(qs[remap[pair[0]]] == pair[1]);
		}

		return pair.join("\t");
	}).join("\n");
};

FlashGame.menu = function(type, value) {
	var menus = {
		"cached_includes" : function() {
			var ci = (GM_getValue("cached_includes", 1) == 2 ? 1 : 2);
			GM_setValue("cached_includes", ci);

			if (ci == 1 && confirm("[Includes : Neopets : FlashGame]\n\n" + I18n.get("inpfg.clear_cache.confirm"))) {
				GM_setValue("includes", "({})");
			}

			alert("[Includes : Neopets : FlashGame]\n\n" + I18n.get("inpfg.cache_status.alert") + " " + I18n.get("inpfg." + (ci == 2 ? "activated" : "deactivated") + ".label").toUpperCase());
		}
	};

	if (type in menus) {
		GM_registerMenuCommand(value || "[Includes : Neopets : FlashGame] " + I18n.get("inpfg.cache_encrypt.label"), menus[type]);
	}
};