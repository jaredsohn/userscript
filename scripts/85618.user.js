// ==UserScript==
// @name           Includes : Translate
// @namespace      http://gm.wesley.eti.br/includes
// @description    Translate Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.1.1
// @language       en
// @include        nowhere
// @grant          GM_xmlhttpRequest
// @require        http://userscripts.org/scripts/source/56489.user.js
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

var Translate = {
	version		: 1,
	key			: "",
	execute		: function (text, from, to, cb) {
		var args = Array.prototype.slice.apply(arguments);

		if (!Translate.key) {
			// Google Translate API (deprecated)
			var v = function (from, text2) {
				switch (Translate.version) {
					case 2:	// v2
						var text_arr = [];
						if (text2 instanceof Array) {
							for (var index in text2) {
								text_arr.push({
									"translatedText" : (from == to ? text[index] : text2[index])
								});
							}
						} else {
							text_arr.push({
								"translatedText" : (from == to ? text : text2)
							});
						}

						return {
							"data" : { "translations" : text_arr }
						};
					case 1:	// v1
						return {
							"translation" : (from == to ? text : text2),
						};
					default:
						break;
				}
			};

			if (from == to) {
				cb(v(from, text), args);
			} else {
				HttpRequest.open({
					"method" : "GET",
					"url" : "http://translate.google.com.br/translate_a/t",
					"onsuccess" : function (xhr) {
						var r = [[[""]],,from];

						try {
							r = xhr.response.json || JSON.parse(xhr.response.text.replace(/,(?=,)/g, ',null'));
						} catch (e) {
							r = eval(xhr.response.text);
						}

						cb(v(r[2], r[0][0][0]), args);
					}
				}).send({
					"client"	: "t",
					"sl"		: from,
					"tl"		: to,
					"ie"		: "UTF-8",
					"oe"		: "UTF-8",
					"q"			: text,
				});
			}
		} else if (!from) {
			Translate.to(text, to, cb);
		} else {
			HttpRequest.open({
				"method" : "POST",
				"url" : "https://www.googleapis.com/language/translate/v2",
				"headers" : {
					"X-HTTP-Method-Override" : "GET"
				},
				"onsuccess" : function (xhr) {
					cb(xhr.response.json, args);
				}
			}).send({
				"key" : Translate.key,
				"source" : from,
				"target" : to,
				"q" : text
			});
		}
	},
	to			: function(text, to, cb) {
		if (!Translate.key) {
			// Google Translate API (deprecated)
			Translate.execute(text, "-", to, cb);
		} else {
			HttpRequest.open({
				"method" : "POST",
				"url" : "https://www.googleapis.com/language/translate/v2/detect",
				"headers" : {
					"X-HTTP-Method-Override" : "GET"
				},
				"onsuccess" : function (xhr) {
					if (/^2/.test(xhr.response.raw.status)) {
						data.detections.sort(function (a, b) {
							return a.confidence - b.confidence;
						});

						Translate.execute(text, data.detections[0].language, to, cb);
					}
				}
			}).send({
				"key" : Translate.key,
				"q" : text
			});
		}
	},
};