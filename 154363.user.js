// ==UserScript==
// @name           Includes : Neopets : Random Events
// @namespace      http://gm.wesley.eti.br
// @description    RandomEvent Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.1.1
// @language       en
// @include        nowhere
// @exclude        *
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @grant          GM_log
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_openInTab
// @grant          GM_getResourceText
// @grant          GM_xmlhttpRequest
// @resource       random_events http://pastebin.com/download.php?i=839tCaQh
// @resource       randomEventsHtml http://pastebin.com/download.php?i=nPMWZeHY
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/154322.user.js
// @contibutor     jellyneo (http://www.jellyneo.net/?go=rereg)
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

var Content = {
	write	: function (obj) {
		if (!obj.title && !obj.key) {
			throw "Parameters key or title is required.";
		}

		if (typeof obj.title == "undefined") {
			obj.title = obj.key;
		}
		if (typeof obj.key == "undefined") {
			obj.key = obj.title.toLowerCase().replace(/[^\w]/g, "_");
		}

		var mode = [-1, 0, 1][1 + Number(obj.mode)] || 0;

		Persist.read({
			service	: "LOCAL",
			key		: obj.key,
			onload	: function (a) {
				var data = GM_getValue(obj.key, "");

				if (obj.value) {
					if (-1 == mode) {	// prepend
						data = obj.value + data;
					} else if (1 == mode) {	// append
						data += obj.value;
					} else {
						data = obj.value;
					}

					GM_setValue(obj.key, data);
				}

				if (!obj.value || obj.immediate) {
					Persist.write({
						service	: "PASTEBIN2",
						key		: a.value,
						value	: data,
						data	: {
							//paste_private	: "1",
							paste_name	: obj.title,
						},
						mode	: mode,
						onload	: function (b) {
							b.onload = obj.onload;
							a.value = b.key;
							delete a.onload;

							Persist.write(a);

							GM_deleteValue(obj.key);

							obj.onload(b);
						},
						onwarn	: obj.onwarn,
						onerror	: obj.onerror,
					});
				} else {
					a.onload = obj.onload;
					a.value = data;
					a.read = false;

					obj.onload(a);
				}
			}
		});
	},
	read	: function (obj) {
		if (!obj.title && !obj.key) {
			throw "Parameters key or title is required.";
		}

		if (typeof obj.title == "undefined") {
			obj.title = obj.key;
		}
		if (typeof obj.key == "undefined") {
			obj.key = obj.title.toLowerCase().replace(/[^\w]/g, "_");
		}

		Persist.read({
			service	: "LOCAL",
			key		: obj.key,
			onload	: function (a) {
				Persist.read({
					service	: "PASTEBIN2",
					key		: a.value,
					onload	: function (b) {
						b.onload = obj.onload;
						a.value = b.key;
						delete a.onload;

						if (a.value) {
							Persist.write(a);
						}

						obj.onload(b);
					},
					onwarn	: obj.onwarn,
					onerror	: obj.onerror,
				});
			}
		});
	},
},
RandomEvents = {
	title	: "Random Events",
	enable	: GM_getValue("types", 0x017),
	events	: GM_getResourceText("random_events").split("\n"),
	types	: {
		"#ffffcc" : 0x001,	// normal
		"#ccccff" : 0x002,	// winter
		"#be793f" : 0x004,	// tyranian
		"#cccccc" : 0x008,	// reserved (unknown/fake/static random events)
		"#ffcccc" : 0x010,	// reserved (dice-a-roo events)
		"pink" : 0x020,	// reserved (themes)
		"#ffccff" : 0x040,	// reserved (faerie quests)
	},
	process : function (obj) {
		var processEvent = function (obj) {
			var type = obj.type,
			image = obj.image.replace("http://images.neopets.com", ""),
			text = obj.text,
			params = xpath(".//b|.//strong", text),
			params2 = [];
			
			for (var b in params) {
				params2.push(params[b].innerHTML.replace(/[+,;]/g, function ($0) {
					return encodeURIComponent($0);
				}).replace(/[-]/g, function ($0) {
					return "%" + $0.charCodeAt(0).toString(16).toUpperCase();
				}).replace(/\s{2,}/g, " "));

				params[b].parentNode.replaceChild(document.createTextNode("#"), params[b]);
			}

			var str = text.innerHTML.replace(/^\s+|\s*(?:<br>)+$/g, "").replace(/\s{2,}/g, " ").replace(/[;]/g, function ($0) {
				return encodeURIComponent($0);
			}).replace(/[\r\n]+/g,"").replace(/<script(?:[^]+?)<\/script>\s*/g, ""),
			found = false,
			d = new Date(),
			ff = function (p0) {
				return ("00" + p0).substr(-2);
			},
			revents = RandomEvents.events,
			loc = location.href.substr(location.href.indexOf(location.pathname)).replace(RandomEvents.location, ""),
			output2 = [d.getUTCFullYear(), ff(1 + d.getUTCMonth()), ff(d.getUTCDate()), ff(d.getUTCHours()), ff(d.getUTCMinutes()), ff(d.getUTCSeconds())].join("") + ";" + loc + ";";
			
			b:for (var b in revents) {
				var event = revents[b].split(";"),
				match = null;
				
				if (/\([^)]+\+\)/.test(event[3]) && (match = new RegExp(event[3]).exec(str))) {
					match.shift();
					
					params2 = match.concat(params2);
					event[3] = str;
				}

				if (str == event[3]) {
					var p = event[4].split(","),
					ppp = [],
					private_params = JSON.parse(GM_getValue("private_params", "[]")),
					sum = -1,
					out = "";

					for (var c in p) {
						var pc = params2[c] || "";
						
						if (/([+-])/.test(p[c])) {
							var pp = p[c],
							kk = parseInt(pp.indexOf(RegExp.$1), 10),
							ss = [kk],
							prefix = pp.substr(0, kk),
							suffix = pp.substr(1 + kk),
							psuffix = pc.lastIndexOf(suffix);
							
							if (~psuffix) {
								ss.push(psuffix - kk);
							}

							var k = String.prototype.substr.apply(pc, ss);

							if (prefix != pc.substr(0, kk) || !~psuffix || suffix != pc.substr(psuffix)) {
								continue b;
							} else if (~pp.indexOf("-")) {
								var f = -1;

								for (var c in private_params) {
									if (private_params[c] == k) {
										f = c;
										break;
									}
								}

								if (!~f) {	// not found, so add it
									f = private_params.push(k) - 1;
								}

								ppp.push(f);
							} else {
								ppp.push(k);
							}
						} else if (p[c] != pc) {
							continue b;
						}
					}
					
					found = true;

					if ((Math.pow(2, event[1]) & RandomEvents.enable) > 0) {
						GM_setValue("private_params", JSON.stringify(private_params));

						out = output2 + ppp.join(",") + ";" + (!event[2] || event[2] != image?image:"") + ";" + event[0] + "\n";
					}

					return out;
				}
			}
			
			if (!found) {
				return output2 + ";;[" + type + ";" + image + ";" + str + ";" + params2.join(",") + "]" + "\n";
			}
		},
		output = "",
		types = RandomEvents.types,
		events = xpath(".//table[@align = 'center' and @width and tbody/tr[1]/td[1][@bgcolor] and tbody/tr[2]/td[1]/img[1][contains(@src, 'http://images.neopets.com/')]]", obj.document || document);

		for (var a in events) {
			var nodes = xpath(".//td", events[a]),
			bgcolor = nodes[0].getAttribute("bgcolor");

			if (3 == nodes.length) {
				var image = nodes[1].firstElementChild.src,
				text = nodes[2].cloneNode(true);
			} else {
				var text = nodes[1].cloneNode(true),
				image2 = xpath(".//img", text)[0],
				image = image2.src;

				image2.parentNode.removeChild(image2);
			}
			
			output += processEvent({
				type	: Math.floor(Math.log(types[bgcolor] || 0x008) / Math.log(2)),
				image	: image,
				text	: text,
			});
		}
		
		events = xpath(".//div[@class = 'inner_wrapper2' and img[contains(@src, '/items/')] and p]", obj.document || document);
/*
<div class="pushdown">
	<div class="inner_wrapper">
		<div class="inner_wrapper2">
						
						<img class="icon" src="http://images.neopets.com/shh/event/water-faerie-1.png">
			<img class="item" src="http://images.neopets.com/items/book_elephant_wings.gif">			<p>A Water Faerie sniffs and says, "You probably won&#39;t help, but I need <b>Little Wings Big Feet</b> for my studies. I can&#39;t tell you why."</p>
		</div>
	</div>
</div>
*/
		
		for (var a in events) {
			var nodes = xpath("./img[contains(@src, '/items/')]|./p", events[a]),
			image = nodes[0].src,
			text = nodes[1].cloneNode(true);
			
			output += processEvent({
				type	: Math.floor(Math.log(0x040) / Math.log(2)),
				image	: image,
				text	: text,
			});
		}

		if (output.length) {
			var onload = obj.onload || function (obj) {
				console.log("Random events saved successfully");
			},
			onerror = obj.onerror || function (obj) {
				console.log(obj.value);
			};

			// http://pastebin.com/ts4kB60q (private paste by guest)
			// http://pastebin.com/qQ9KL8sr
			Content.write({
				key			: "random_events",
				title		: RandomEvents.title,
				value		: output,
				mode		: -1,
				onload	: onload,
				onerror	: onerror,
			});
		}
	},
};

document.addEventListener("keyup", function (e) {
	if (e.ctrlKey && e.altKey && e.keyCode == "H".charCodeAt(0)) {
		Content.write({
			key			: "random_events",
			title	: RandomEvents.title,
			mode	: -1,
			onload	: function (obj) {
				var kvalues = {},
				values = [];
				if (obj.value.length) {
					var rows = obj.value.split(/\r?\n/);

					for (var index in rows) {
						var $0 = rows[index];

						var o = $0.split(";"),
						sd = function (i, f) {
							return o[0].substr(i || 0, f || 2);
						},
						t = o.slice(4).join(";"),
						image = "",
						text = "",
						params = [],
						sum = -1,
						sum2 = -1,
						type = -1,
						types = RandomEvents.types,
						revents = RandomEvents.events,
						private_params = JSON.parse(GM_getValue("private_params", "[]"));
						
						if (/^\[.*\]$/.test(t)) {
							o[4] = t.substr(1, t.length - 2).split(";");	// content
							type = o[4][0];	// type
							image = o[4][1];	// image
							text = o[4][2];	// text
							params = o[4][3].split(",");	// params
						} else {
							for (var a in revents) {
								var e = revents[a].split(";");
								
								if (e[0] == o[4]) {	// id
									type = e[1];	// type
									image = e[2] || o[3];	// image
									text = e[3];	// text
									params = e[4].split(",");	// params

									break;
								}
							}
						}
						
						for (var a in types) {
							if (types[a] == Math.pow(2, type)) {
								type = a;
								break;
							}
						}

						var loc = {},
						ll = (RandomEvents.location || "") + o[1];
						loc[ll] = {
							index	: ll,
							value	: [new Date(sd(0, 4) + "/" + sd(4) + "/" + sd(6) + " " + sd(8) + ":" + sd(10) + " +00:00")]
						};

						var k = [type, image, o[4], o[2]].join(";");
						
						if (k in kvalues) {
							var r = values[kvalues[k]][0];
							if (ll in r) {
								r[ll].value.push(loc[ll].value[0]);
							} else {
								r[ll] = loc[ll];
							}
							//console.log("key found=",k,"position=",kvalues[k]);
						} else {
							kvalues[k] = values.length;

							values.push([
								loc,
								image,
								decodeURIComponent(text.replace(/^\^|\\(?!\\)|\$$/g, "").replace(/\([^\(\)]+?\+\)/g, function () {
									var p = o[2].split(",");

									return params[++sum].replace(/([+-])/, function ($0, $1) {
										var x = p[++sum2];

										if ("+" == $1 || isNaN(x)) {
											return x;
										} else {
											return private_params[x];
										}
									});
								}).replace(/#/g, function () {
									var p = o[2].split(",");

									//console.log("sum=",sum,"params=",params,"text=",text);
									return "<strong>" + params[++sum].replace(/([+-])/, function ($0, $1) {
										var x = p[++sum2];

										if ("+" == $1 || isNaN(x)) {
											return x;
										} else {
											return private_params[x];
										}
									}) + "</strong>";
								})),
								type,
							]);
						}
					}
				}

				var template = function (str, vars, group, index) {
					return str.replace(/{(\w+)}(.+?){\/\1}/g, function ($0, $1, $2) {
						if ($1 in vars) {
							var o = "",
							v = vars[$1];

							for (var a in v) {
								o += template($2, v[a], $1, a)/*.replace(/{(\w+)\/}/g, function ($0, $1) {
									return ($1 in v[a]?v[a][$1] || "":$0);
								}).replace(/{index\/}/g, a)*/;
							}
				
							return o;
						} else {
							return $0;
						}
					}).replace(/{(\w+(?:\.\w+)*)\/}/g, function ($0, $1) {
						var x = $1.split("."),
						r = function (v, i) {
							var t = v[x[i++]];

							return (i < x.length?r(t, i):(t instanceof Array?t.join("<br />"):t));
						};

						return (x[0] in vars?r(vars, 0):$0);
					});
				},
				html = template(GM_getResourceText("randomEventsHtml"), {
					script	: GM_info.script,
					row		: values,
				});

				GM_openInTab("data:text/html;charset=utf-8," + encodeURIComponent(html));
			},
			onerror	: function (obj) {
				alert(obj.value);
			},
		});
	}
}, false);