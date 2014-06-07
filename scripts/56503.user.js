// ==UserScript==
// @name           Includes : Neopets : Shop Wizard
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    Wizard Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        5.0.1
// @language       en
// @include        nowhere
// @exclude        *
// @grant          GM_log
// @grant          GM_xmlhttpRequest
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/63808.user.js
// @contributor    Steinn (http://userscripts.org/users/85134)
// @contributor    minicoz (http://userscripts.org/topics/125966#posts-498972)
// @history        5.0.0 Added SSW (obj.is_super = true)
// @history        2.1.0.0 Added @require#63808
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

Wizard = function () {};

Wizard.convert = function (params) {
	var r = [];	// result

	switch (params.type) {
		case 1:	// is_super (1)
		var text = params.doc.replace(/[\r\n\t]+/g, "").replace(/\s{2,}/g, " "),
		res = {},
		iname, id;

		try {
			res = JSON.parse(text);
		} catch (e) {
			res = eval(text);
		}
		
		try {
			iname = res.req.item_name;
			id = parseInt(res.req.oii, 10);
		} catch (e) {
			//{"data":{"error":"Access denied."}}
		}
		
		for (var ai = 0, at = res.data.rowcount;ai < at;++ai) {
			var owner = res.data.owners[ai],
			price = parseInt((res.data.prices[ai] || res.data.prices_str[ai]).replace(/[,.]+/g, "").match(/^\d+/), 10);

			r.push({
				"Id"	: id,
				"Link"	: ["http://www.neopets.com/browseshop.phtml?owner=" + owner, "buy_obj_info_id=" + id, "buy_cost_neopoints=" + price].join("&"),
				"Owner"	: owner,
				"Item"	: iname,
				"Stock"	: parseInt(res.data.amounts[ai].replace(/[,.]+/g, ""), 10) || 0,
				"Price"	: price,
			});
		}

		return {
			search	: iname,
			list	: r,
			error	: (res.data.error?1:0),
			message	: {
				"textContent"	: res.data.error,
			},
		};
		default:	// others (0, undefined)
		try {
			var items = xpath(".//td[@class = 'content']//table[not(.//img)]//tr[position() > 1]", params.doc),
			msg = xpath(".//div[contains(@class, 'errormess')]/div[b] | .//td[@class = 'content']//center/b | .//td[@class = 'content']/div[2]/div[2]/b", params.doc)[0];
		} catch (e) {
			var info = GM_info,
			items = [];

			alert(["[Please contact administrator]", "GM Version: " + info.version, "Script Name: " + info.script.name, "Error Message: " + e].join("\n"));
		}

		for (var ai = 0, at = items.length;ai < at;++ai) {
			var item = items[ai].cells,
			href = item[0].firstElementChild.href;

			if (/&buy_obj_info_id=(\d+)/.test(href)) {
				r.push({
					"Id"	: parseInt(RegExp.$1, 10),
					"Link"	: (!/^http:\/\//i.test(href)?"http://www.neopets.com" + (!/^\//.test(href)?"/":""):"") + href,
					"Owner"	: item[0].textContent,
					"Item"	: item[1].textContent,
					"Stock"	: parseInt(item[2].textContent.replace(/[,.]+/g, ""), 10) || 0,
					"Price"	: parseInt(item[3].textContent.replace(/[,.]+/g, "").match(/^\d+/), 10)
				});
			} else {
				GM_log([ai, items[ai].innerHTML].toString());
			}
		}

		return {
			search	: xpath("string(.//td[@class = 'content']//table[1]//td[2]/b/span/text())", params.doc),
			list	: r,
			error	: (msg && msg.tagName.toUpperCase() == "DIV"?1:0),
			message	: msg,
		};
	}
};

Wizard.find = function (params) {
	if (typeof params.text != "string") {
		throw "Wizard.find() : Parameter 'text' is wrong/missing.";
	} else if (typeof params.onsuccess != "function") {
		throw "Wizard.find() : Parameter 'onsuccess' is wrong/missing.";
	} else {
		var _pw = params.wait || [500, 500],
		process = function (p1, p2, r) {
			var is_super = !!p1.is_super,
			res = Wizard.convert({
				doc		: p2.response[is_super?"text":"xml"],
				type	: ~~is_super,
			}),
			list = p1.list.filter(function (item, index, array) {
				for (var ai in res.list) {
					var i = res.list[ai];

					if (item.Owner == i.Owner && item.Id == item.Id) {
						return false;
					}
				}

				return true;
			});

			if (p1.parameters) {
				for (var ai in p1.parameters) {
					p1[ai] = p1.parameters[ai];
				}
			}
			for (var ai in res) {
				p1[ai] = res[ai];
			}

			Array.prototype.push.apply(p1.list, list);

			p1.response = p2.response;

			if (r && !p1.error && 0 < --p1.attempts) {
				setTimeout(r, p1.wait(), p1);
			} else {
				p1.list.sort(function (a, b) {
					if (a.Id == b.Id) {
						if (a.Price == b.Price) {
							if (a.Stock == b.Stock) {
								return (a.Owner > b.Owner?1:-1);
							} else {
								return (a.Stock > b.Stock?-1:1);
							}
						} else {
							return (a.Price > b.Price?1:-1);
						}
					} else {
						return (a.Item > b.Item?1:-1);
					}
				});

				p1[p1.error && typeof p1.onerror == "function"?"onerror":"onsuccess"](p1);
			}
		};

		if (typeof params.wait != "function") {
			params.wait = function () {
				return Math.floor(_pw[0] + Math.random() * _pw[1]) || 1000;
			};
		}

		params.list = [];
		params.attempts = Math.max(1, params.attempts) || 1;

		if (params.is_super) {
			(function recursive (params) {
				HttpRequest.open({
					"method"	: "post",
					"url"		: "http://www.neopets.com/shops/ssw/ssw_query.php",
					"headers"	: {
						"Referer" : "http://www.neopets.com/market.phtml?type=wizard"
					},
					"onsuccess"	: function (params2) {
						process(params, params2, recursive);
					}
				}).send({
					"q"			: params.text,
					"priceOnly"	: "0",
					"context"	: (typeof params.is_shop == "undefined" || params.is_shop?"0":"1"),	// 0=shop 1=gallery
					"partial"	: (typeof params.is_exact == "undefined" || params.is_exact?"0":"1"),
					"min_price"	: parseInt(("" + params.min_price).replace(/[,.]+/g, "").substr(0, 5), 10) || 0,
					"max_price"	: parseInt(("" + params.max_price).replace(/[,.]+/g, "").substr(0, 5), 10) || 99999,
					"json"		: "1",
				});
			}(params));
		} else {
			(function recursive (params) {
				HttpRequest.open({
					"method"	: "post",
					"url"		: "http://www.neopets.com/market.phtml",
					"headers"	: {
						"Referer" : "http://www.neopets.com/market.phtml?type=wizard"
					},
					"onsuccess"	: function (params2) {
						process(params, params2, recursive);
					}
				}).send({
					"type"			: "process_wizard",
					"feedset"		: "0",
					"shopwizard"	: params.text,
					"table"			: (typeof params.is_shop == "undefined" || params.is_shop?"shop":"gallery"),
					"criteria"		: (typeof params.is_exact == "undefined" || params.is_exact?"exact":"containing"),
					"min_price"		: parseInt(("" + params.min_price).replace(/[,.]+/g, "").substr(0, 5), 10) || 0,
					"max_price"		: parseInt(("" + params.max_price).replace(/[,.]+/g, "").substr(0, 5), 10) || 99999
				});
			}(params));
		}
	}
};