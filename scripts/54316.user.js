// ==UserScript==
// @name           Includes : Inventory
// @namespace      http://gm.wesley.eti.br/includes
// @description    Inventory Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.0.2.0
// @language       en
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

Inventory = function(){};
Inventory.Category = {
	"Neocash":1,
	"Wearable":2,
	"Neohome":4,
	"Special":8,
	"Glowing":16,
	"Uncommon":32,
	"Trading":64,
	"Auctioned":128,
	"Retired":256,
	"Rare":512,
	"UltraRare":1024,
	"Shaking":2048
};

Inventory.list = function(onLoadCallback)
{
	if (typeof onLoadCallback != "function")
		alert("[Inventory.list]\nArgument 1 must be a callback function");
	else
	{
		var req = new HttpRequest();
		var xargs = array_slice(arguments, 1)||[];
		xargs.unshift("GET", "http://www.neopets.com/objects.phtml?type=inventory", function(e)
		{
			var sitems = [];
			var items = e.responseXML.evaluate("//td[@class='content']//table//td[a/img]", e.responseXML, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

			with(Inventory.Category)
			var color_categories = {
//				"green":Inventory.Category.Rare,
//				"green":Inventory.Category.UltraRare,
				"#aa4455":Special,
				"35,103,181":Wearable,
				"163,101,28":Neohome,
				"#ab27be":Neocash,
				"#666666":Retired,
				"pink":Shaking,
				"red":Glowing,
				"darkred":Trading,
				"blue":Auctioned,
				"green":Uncommon
			};

			for ( var ai = 0 , at = items.snapshotLength ; ai < at ; ++ai )
			{
				var item = items.snapshotItem(ai).childNodes;
				
				var cats = 0;	// categories

				var link = "http://www.neopets.com";
				var index = 0;
				if (/^cash_win/i.test(item[0].getAttribute("onclick") || item[2].getAttribute("onclick")))
				{
					cats |= Inventory.Category.Neocash;
					index += 2;	// this is because the initial A,BR tags that only happens for neocash items
				}

				function convertType(value)
				{
					switch (value)
					{
						case "true":return true;
						case "false":return false;
						case "undefined":return undefined;
						case "NaN":return NaN;
						case "0":return 0;
						default:return value;
					}
				}
//				function cash_win(cash_obj_id, gucid, obj_type, is_habitat, is_giftbox, force_live);
				var params = item[index].getAttribute("onclick").match(/([""'']|[\w-]+)[""'',)]/gi);
				var p = [];
				for ( var bi = 0 , bt = params.length ; bi < bt ; ++bi )
				{
					p.push(convertType(params[bi].replace(/[""'',)]+/g,"")));
				}

				if (p.length == 1)
				{
					link += "/iteminfo.phtml?obj_id=" + p[0];
				}
				else
				{
//					if (!p[5]) link = "";
					link += ( p[4] ? "/ncmall/boxinfo.phtml?" : "/iteminfo.phtml?" );
					link += "cash_obj_id=" + p[0] + "&gucid=" + p[1] + "&habitat=" + ( p[3] ? "1" : "0" );
				}
				switch ((item[0].parentNode.style.backgroundColor||"").replace(/^rgb|[\s()]+/g, ""))
				{
					case "223,234,247":	// wearable
						cats |= Inventory.Category.Wearable;
						break;
					case "233,193,145":	// neohome
						cats |= Inventory.Category.Neohome;
						break;
				}

				var img = item[index].getElementsByTagName('img')[0];

				for ( var bi = 4 + index ; item[bi] && /^span$/i.test(item[bi].tagName) ; bi += 2 )
				{
					var font = item[bi].getElementsByTagName("font");
					var color = (font.length && font[0].getAttribute("color").toLowerCase()||item[bi].style.color||"").replace(/^rgb|[\s()]+/g, "");

					if (color in color_categories)
						cats |= color_categories[color];
				}

				sitems.push({
					"Parameters": p,
					"Link": link,
					"Name": item[2+index].textContent,
					"Image": img.getAttribute("src"),
					"Description": img.getAttribute("title") || img.getAttribute("alt") || "",
					"Category": cats
				});
			}
			onLoadCallback(sitems, e, false, null);
		});
		req.open.apply(req, xargs);
		req.send();
	}
};

Inventory.auction = function(item, opts, onLoadCallback)
{
//	opts = start, increment, duration, neofriend
	if (!item)
		alert("[Inventory.auction]\nArgument 1 is missing");
	else if (!("Parameters" in item) || !item.Parameters[0])
		alert("[Inventory.auction]\nArgument 1 must be a valid Item");
	else if ((item.Category & (Inventory.Category.Neocash|Inventory.Category.Trading|Inventory.Category.Auctioned)) != 0)
		alert("[Inventory.auction]\nThis item cannot be put up for action");
	else
	{
		var xargs;
		if (typeof opts == "function")
		{
			onLoadCallback = opts;
			opts = {"start":1,"increment":1,"duration":1,"neofriend":false};
			xargs = array_slice(arguments, 2)||[];
		}
		else
			xargs = array_slice(arguments, 3)||[];

		var req = new HttpRequest();
		//req.options.headers["Referer"] = item.Link;
		xargs.unshift("POST", "http://www.neopets.com/add_auction.phtml", function(e)
		{
			if (typeof onLoadCallback == "function")
			{
				var msg = e.responseXML.evaluate("//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				onLoadCallback(e, !!msg, msg);
			}
		});
		req.open.apply(req, xargs);
		req.send({
			"start_price": (opts && opts.start||1).toString().substr(0,10),
			"min_increment": (opts && opts.increment||1).toString().substr(0,10),
			"duration": (opts && opts.duration||1).toString().substr(0,10),	// 1 2 3 4 6 9 12 18 24 48
			"neofriends_only": (opts && opts.neofriend ? "on" : ""),
			"obj_id": item.Parameters[0]
		});
	}
};

Inventory.process = function(item, action, onLoadCallback)
{
	var xargs = array_slice(arguments, 3)||[];
	if (!item)
		alert("[Inventory.process]\nArgument 1 is missing");
	else if (!("Parameters" in item) || !item.Parameters[0])
		alert("[Inventory.process]\nArgument 1 must be a valid Item");
	else if (!action)
		alert("[Inventory.process]\nArgument 2 is missing");
	else if (action == "give")
		alert("[Inventory.process]\nUse Inventory.give() instead");
	else if (action == "auction")
		alert("[Inventory.process]\nUse Inventory.auction() instead");
	else if (!/^(?:Equip |(?:Feed|Give) to |(?:(?:safetydeposit|closet|stockshop|stockgallery|donate|drop)$))/i.test(action))
		alert("[Inventory.process]\nArgument 2 is unknown (" + action + ")");
	else if ((item.Category & Inventory.Category.Neocash) != 0 && !/^(closet|stockgallery|safetydeposit)$/i.test(action))
		alert("[Inventory.process]\nYou cannot process that action to the current item");
	else if ((item.Category & (Inventory.Category.Trading|Inventory.Category.Auctioned)) != 0)
		alert("[Inventory.process]\nThis item cannot be processed. Try again later");
	else if (item.Parameters[4])	// is_giftbox ?
	{
		alert("[Inventory.process]\nNot implemented yet");
	}
	else if ((item.Category & Inventory.Category.Neocash) != 0)
	{
		var req = new HttpRequest();
		//req.options.headers["Referer"] = item.Link;
		xargs.unshift("POST", "http://www.neopets.com/process_cash_object.phtml", function(e)
		{
			if (typeof onLoadCallback == "function")
			{
				var msg = e.responseXML.evaluate("//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				onLoadCallback(e, !!msg, msg);
			}
		});
		req.open.apply(req, xargs);
		req.send({
			"action": action,
			"cash_obj_id": item.Parameters[0]
		});
	}
	else
	{
		var req = new HttpRequest();
		//req.options.headers["Referer"] = item.Link;
		xargs.unshift("POST", "http://www.neopets.com/useobject.phtml", function(e)
		{
			if (typeof onLoadCallback == "function")
			{
				var msg = e.responseXML.evaluate("//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				onLoadCallback(e, !!msg, msg);
			}
		});
		req.open.apply(req, xargs);
		req.send({
			"action": action,
			"obj_id": item.Parameters[0]
		});
	}
};

Inventory.give = function(item, to, onLoadCallback)
{
	if (!item)
		alert("[Inventory.give]\nArgument 1 is missing");
	else if (!("Parameters" in item) || !item.Parameters[0])
		alert("[Inventory.give]\nArgument 1 must be a valid Item");
	else if (!to)
		alert("[Inventory.give]\nArgument 2 is missing");
	else if ((item.Category & (Inventory.Category.Neocash|Inventory.Category.Trading|Inventory.Category.Auctioned)) != 0)
		alert("[Inventory.give]\nThis item cannot be given");
	else
	{
		var xargs = array_slice(arguments, 3)||[];
		var req = new HttpRequest();
		//req.options.headers["Referer"] = item.Link;
		xargs.unshift("POST", "http://www.neopets.com/useobject.phtml", function(e)
		{
			if (typeof onLoadCallback == "function")
			{
				var msg = e.responseXML.evaluate("//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				onLoadCallback(e, !!msg, msg);
			}
		});
		req.open.apply(req, xargs);
		req.send({
			"or_name": to,
			"obj_id": item.Parameters[0]
		});
	}
};

//Inventory.give = function(item, to, onLoadCallback)
//{
//	Inventory.process(item, "Give to " + to, onLoadCallback);
//};

Inventory.equip = function(item, pet, onLoadCallback)
{
	if (!pet)
		alert("[Inventory.equip]\nArgument 2 is missing");
	else
	{
		var xargs = array_slice(arguments, 2)||[];
		xargs.unshift(item, "Equip " + pet);
		Inventory.process.apply(this, xargs);
	}
};

Inventory.feed = function(item, pet, onLoadCallback)
{
	if (!pet)
		alert("[Inventory.feed]\nArgument 2 is missing");
	else
	{
		var xargs = array_slice(arguments, 2)||[];
		xargs.unshift(item, "Feed to " + pet);
		Inventory.process.apply(this, xargs);
	}
};

/*

Inventory.list(function(list)
{
	var items = [];
	var action = 0;
	for ( var ai = 0 , at = list.length ; ai < at ; ++ai )
	{
		var item = list[ai];
		items.push([item.Link,item.Name,item.Image,item.Description,item.Category].join("\n"));
		if ((item.Category & (Inventory.Category.Auctioned|Inventory.Category.Trading)) == 0)
		{
			setTimeout(Inventory.process, ++action * 2500, item, "safetydeposit", function(a,b,c)
			{
				GM_log(a.responseText);
				alert(["Erro? " + b,"Message: " + c].join("\n"));
			});
		}
	}
	alert(items.join("\n\n"));
});

*/