// ==UserScript==
// @name           Includes : Neopets : Shop
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    Shop Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.1.1
// @language       en
// @include        nowhere
// @exclude        *
// @grant          GM_xmlhttpRequest
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @contributor    Steinn (http://userscripts.org/users/85134)
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

Shop = function () {};

Shop.convert = function (doc) {
	var msg = xpath(".//div[contains(@class, 'errormess')]/div[b] | .//td[@class = 'content']/p[5]/b | .//td[@class = 'content']/span[1]/b | .//td[@class = 'content']/center/p[1] | .//td[@class = 'content']/hr[1]/preceding-sibling::div[1]/b", doc)[0],
	obj = {
		"error" : (msg && msg.tagName.toUpperCase() == "DIV"?1:0),
		"message" : msg,
		"list" : []
	},
	items = xpath(".//td[@class='content']//td/a[contains(@href, '&_ref_ck') and img]", doc);
	
	for (var ai = 0,at = items.length;ai < at;++ai) {
		var item = items[ai],
		img = item.getElementsByTagName("img")[0],
		texts = xpath(".//text()[not(starts-with(., ' '))]", item.parentNode);
		
		obj.list.push({
			"Id" : /&obj_info_id=(\d+)/.test(item.href) && RegExp.$1 || NaN,
			"Link" : ( /^http:/i.test(item.href) ? "" : "http://www.neopets.com" + ( /^\//.test(item.href) ? "" : "/" ) ) + item.href,
			"Image" : img.src,
			"Name" : texts[0].textContent,
			"Description" : img.getAttribute("title"),
			"Quantity" : parseInt(texts[1].textContent.replace(/[,.]+/g, "").match(/\d+/), 10),
			"Price" : parseInt(texts[2].textContent.replace(/[,.]+/g, "").match(/\d+/), 10),
		});
	}
	console.log(obj);

	return obj;
}

Shop.list = function (params) {
	if (!/^http:\/\/www.neopets\.com\/browseshop\.phtml/i.test(params.link)) {
		alert("[Includes : Neopets : Shop : list]\nParameter 'link' is wrong/missing.");
	} else if (typeof params.onsuccess != "function") {
		alert("[Includes : Neopets : Shop : list]\nParameter 'onsuccess' is wrong/missing.");
	} else {
		HttpRequest.open({
			"method"	: "get",
			"url"		: params.link,
			"onsuccess"	: function (params) {
				var obj = Shop.convert(params.response.xml) || {};
				for (var p in params.parameters) {
					obj[p] = params.parameters[p];
				}

				obj.response = params.response;
				obj.referer = params.link;

				params[obj.error && typeof params.onerror == "function"?"onerror":"onsuccess"](obj);
			},
			"parameters" : params
		}).send({
			"buy_obj_confirm" : "yes"
		});
	}
};

Shop.buy = function (params) {
	if (!/^http:\/\/www\.neopets\.com\/buy_item\.phtml/i.test(params.link)) {
		alert("[Includes : Neopets : Shop : buy]\nParameter 'link' is wrong/missing.");
	} else {
		HttpRequest.open({
			"method"	: "get",
			"url"		: params.link,
			"headers"	: {
				"Referer"	: params.referer || "http://www.neopets.com/browseshop.phtml",
			},
			"onsuccess"	: function (params) {
				var obj = Shop.convert(params.response.xml) || {};
				for (var p in params.parameters) {
					obj[p] = params.parameters[p];
				}

				obj.response = params.response;

				params[obj.error && typeof params.onerror == "function"?"onerror":"onsuccess"](obj);
			},
			"parameters" : params
		}).send();
	}
};