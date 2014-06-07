// ==UserScript==
// @name           Includes : Neopets : Shop Wizard
// @namespace      http://gm.wesley.eti.br/inludes
// @description    Wizard Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.1.1.2
// @contributor    Steinn (http://userscripts.org/users/85134)
// @include        nowhere
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/53965.user.js
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

Wizard = function(){};
Wizard.find = function(text, is_shop, is_identical, min_price, max_price, onLoadCallback)
{
	var xargs;
	if (typeof is_shop == "function")
	{
		onLoadCallback = is_shop;
		is_shop = is_identical = min_price = max_price = undefined;
		xargs = array_slice(arguments, 2)||[];
	}
	else if (typeof is_identical == "function")
	{
		onLoadCallback = is_identical;
		is_identical = min_price = max_price = undefined;
		xargs = array_slice(arguments, 3)||[];
	}
	else if (typeof min_price == "function")
	{
		onLoadCallback = min_price;
		min_price = max_price = undefined;
		xargs = array_slice(arguments, 4)||[];
	}
	else if (typeof max_price == "function")
	{
		onLoadCallback = max_price;
		max_price = undefined;
		xargs = array_slice(arguments, 5)||[];
	}
	else
		xargs = array_slice(arguments, 6)||[];

	if (!text)
		alert("[Shop Wizard]\nArgument 1 is missing");
	else if (typeof onLoadCallback != "function")
		alert("[Shop Wizard]\nCallback function is missing");
	else
	{
		var req = new HttpRequest();
		//req.options.headers['Referer'] = 'http://www.neopets.com/market.phtml?type=wizard';

		xargs.unshift("POST", "http://www.neopets.com/market.phtml", function(e)
		{
			var items = e.responseXML.evaluate("//td[@class='content']//table[not(.//img)]//tr[position()>1]", e.responseXML, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

			var r = [];	// result
			for ( var ai = 0 , at = items.snapshotLength ; ai < at ; ++ai )
			{
				var item = items.snapshotItem(ai).cells;

				var href = item[0].getElementsByTagName('a')[0].href;
				r.push({
					"Id": href.match(/&buy_obj_info_id=(\d+)/)[1],
					"Link": ( !/^http:\/\//i.test(href) ? "http://www.neopets.com" : "") + (!/^\//.test(href) ? "/" : "") + href,
					"Owner": item[0].textContent,
					"Item": item[1].textContent,
					"Stock": parseInt(item[2].textContent.replace(/[,.]/g, ""), 10)||0,
					"Price": parseInt(item[3].textContent.replace(/[,.]/g, "").match(/^\d+/), 10)
				});
			}
			var msg = e.responseXML.evaluate("//div[@class='errormess' and b] | //td[@class='content']/center[b[2]]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

			var xargs = array_slice(arguments, 1)||[];
			xargs.unshift(r, e, msg && /^div$/i.test(msg.tagName), msg);
			onLoadCallback.apply(this, xargs);
		});
		req.open.apply(req, xargs);

		req.send({
			"type": "process_wizard",
			"feedset": "0",
			"shopwizard": text,
			"table": ( typeof is_shop == "undefined" || is_shop ? "shop" : "gallery" ),
			"criteria": ( typeof is_identical == "undefined" || is_identical ? "exact" : "containing" ),
			"min_price": parseInt(("" + min_price).substr(0,6), 10)||0,
			"max_price": parseInt(("" + max_price).substr(0,6), 10)||99999
		});
	}
};

//Wizard.find("plain omelette", function(items)
//{
//	var a = [];
//	for ( var ai = 0 , at = items.length ; ai < at ; ++ai )
//	{
//		a.push([
////			items[ai].Link,
//			items[ai].Owner,
//			items[ai].Item,
//			items[ai].Stock,
//			items[ai].Price].join("\t"));
//	}
//
//	alert(a.join("\n"));
//});