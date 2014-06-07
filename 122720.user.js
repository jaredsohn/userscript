// ==UserScript==
// @name           Includes: Shop Wizard
// @namespace      http://www.hiddenbelow.com
// @description    Wizard Function
// @author         Monark (AKA Akinen)
// @email          thiiback@hotmailcom
// @copyright      2012, Monark (http://www.hiddenbelow.com)
// @license        GNU GPL
// @homepage       http://www.hiddenbelow.com
// @version        1.0.0.a
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

WinConfig.loadDefaultCss();
Wizard = function(){};
Wizard.find = function(params)
{
	if (typeof params.text != "string")
	{
		WinConfig.init({
			"type"		: "error",
			"title"		: "Shop Wizard",
			"description"	: "<br />Parameter 'text' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else if (typeof params.onsuccess != "function")
	{
		WinConfig.init({
			"type"		: "error",
			"title"		: "Shop Wizard",
			"description"	: "<br />Parameter 'onsuccess' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else
	{
		HttpRequest.open({
			"method"	: "post",
			"url"		: "http://www.neopets.com/market.phtml",
			"onsuccess"	: function(params)
			{
				var items = params.response.xml.evaluate("//td[@class='content']//table[not(.//img)]//tr[position()>1]", params.response.xml, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

				var r = [];	// result
				for ( var ai = 0 , at = items.snapshotLength ; ai < at ; ++ai )
				{
					var item = items.snapshotItem(ai).cells;

					var href = item[0].getElementsByTagName('a')[0].href;

					r.push({
						"Id"	: href.match(/&buy_obj_info_id=(\d+)/)[1],
						"Link"	: ( !/^http:\/\//i.test(href) ? "http://www.neopets.com" : "") + (!/^\//.test(href) ? "/" : "") + href,
						"Owner"	: item[0].textContent,
						"Item"	: item[1].textContent,
						"Stock"	: parseInt(item[2].textContent.replace(/[,.]+/g, ""), 10)||0,
						"Price"	: parseInt(item[3].textContent.replace(/[,.]+/g, "").match(/^\d+/), 10)
					});
				}

				var msg = params.response.xml.evaluate("//div[@class='errormess' and b] | //td[@class='content']/center[b[2]]", params.response.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				var obj = params.parameters||{};
				obj.list = r;
				obj.response = params.response;
				obj.error = (msg && /^div$/i.test(msg.tagName) ? 1 : 0);
				obj.message = msg;

				if (obj.error && typeof params.onerror == "function")
				{
					params.onerror(obj);
				}
				else
				{
					params.onsuccess(obj);
				}
			},
			"parameters"	: params
		}).send({
			"type"		: "process_wizard",
			"feedset"	: "0",
			"shopwizard"	: params.text,
			"table"		: ( typeof params.is_shop == "undefined" || params.is_shop ? "shop" : "gallery" ),
			"criteria"	: ( typeof params.is_identical == "undefined" || params.is_identical ? "exact" : "containing" ),
			"min_price"	: parseInt(("" + params.min_price).replace(/[,.]+/g, "").substr(0, 5), 10)||0,
			"max_price"	: parseInt(("" + params.max_price).replace(/[,.]+/g, "").substr(0, 5), 10)||99999
		});
	}
};