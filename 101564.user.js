// ==UserScript==
// @name           Includes : Neopets : TradingPost
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    TradingPost Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.0 BETA
// @language       en
// @include        nowhere
// @exclude        *
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

TradingPost = function(){};

TradingPost.convert = function(xml, type)
{
	switch (type)
	{
		case "view":
		return {
			"Lots" : function()
			{
				var output = [],
				count = -1,
				item = -1,
				next = true,
				ids = xpath(".//td[@class='content']/table//table//tr[2]/td/b/text()", xml).map(function($0)
				{
					return parseInt($0.textContent.match(/\d+/)[0], 10)||0;
				}),
				wishlist = xpath(".//td[@class='content']/table//table//td/p[position() mod 2 = 1]/text()", xml).map(function($0)
				{
					return $0.textContent.replace(/^\s+|\s+$/g, "").replace(/^(none|nenhuma|geen|nichts|aucun|aperto alle offerte|ninguno)$/g, "");	// |无|無|なし|없음
				});

				for (var ai in ids)
				output.push({
					"id" : ids[ai],
					"wishlist" : wishlist[ai],
					"items" : []
				});
				
				for each (var node in xpath(".//td[@class='content']/table//table//tr[2]/td/img/@src|.//td[@class='content']/table//table//tr[2]/td/text()", xml))
				if (/^http/.test(node.textContent))
				{
					output[count].items[++item] = {"image" : node.textContent};
					next = false;
				}
				else if (next)
				{
					++count;
					item = -1;
					next = false;
				}
				else
				{
					output[count].items[item].name = node.textContent.replace(/^\s+|\s+$/g, "");
					next = true;
				}

				return output;
			}
		};
	}
};

TradingPost._execute = function(params)
{
	if (!params.data.referer)
	alert("Referer is required.");
	else
	{
		params.data["_ref_ck"] = params.data.referer;

		delete params.data.referer;

		HttpRequest.open({
			"method" : "post",
			"url" : "http://www.neopets.com/island/process_tradingpost.phtml",
			"onsuccess" : function(xhr)
			{
				if (params.callback)
				params.callback(xhr);
			}
		}).send(params.data);
	}
};

TradingPost.create = function(params)
{
	if (!params.data.items.length)
	alert("Items are required.");
	else
	{
		params.data.type = "create";

		params.data["selected_items[]"] = params.data.items;

		delete params.data.items;

		TradingPost._execute(params);
	}
};

TradingPost.offer = function(params)
{
	if (!params.data.id)
	alert("Lot id is required.");
	else if (!params.data.items.length)
	alert("Items are required.");
	else
	{
		params.data.type = "makeoffer";

		params.data["selected_items[]"] = params.data.items;
		params.data["lot_id"] = params.data.id;

		delete params.data.items;
		delete params.data.id;

		TradingPost._execute(params);
	}
}

TradingPost.cancel = function(params)
{
	if (!params.data.id)
	alert("Lot id is required.");
	else
	{
		params.data.type = "cancel_lot";

		params.data["lot_id"] = params.data.id;
		delete params.data.id;

		TradingPost._execute(params);
	}
};