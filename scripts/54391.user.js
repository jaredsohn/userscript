// ==UserScript==
// @name           Includes : Neopets : Safety Deposit Box
// @namespace      http://gm.wesley.eti.br/includes
// @description    SDB Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.0.3.2
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

SDB = function(){};
SDB.Category = {
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

SDB.list = function(e, onLoadCallback)
{
	function convertToObject(xml)
	{
		var sitems = [];
		var items = xml.evaluate("//td[@class='content']//tr[position()>1 and position()<last()]//input", xml, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

		with (SDB.Category)
		var color_categories = {
//			"green":Rare,
//			"green":UltraRare,
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
			var item = items.snapshotItem(ai);
			var cells = xml.evaluate("./ancestor::tr[1]", item, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.cells;

			var cats = 0;
			var cs = cells[1].getElementsByTagName("span");
			for ( var bi = 0 , bt = cs.length ; bi < bt ; ++bi )
			{
				var font = cs[bi].getElementsByTagName("font");
				var color = (font.length && font[0].getAttribute("color").toLowerCase()||cs[bi].style.color||"").replace(/^rgb|[\s()]+/g, "");

				if (color in color_categories)
					cats |= color_categories[color];
			}

			sitems.push({
				"Image": cells[0].getElementsByTagName("img")[0].src,
				"Name": cells[1].firstChild.childNodes[0].textContent,
				"Category": cats,
				"Description": cells[2].textContent||"",
				"Type": cells[3].textContent||"",
				"Quantity": parseInt(cells[4].textContent, 10)||0,
				"Id": item.name.match(/^back_to_inv\[(\d+)\]$/)[1]
			});
		}

		return sitems;
	}

	var xargs;
	if (typeof e == "function")
	{
		onLoadCallback = e;
		e = undefined;

		xargs = array_slice(arguments, 1)||[];
	}
	else
		xargs = array_slice(arguments, 2)||[];

	if (typeof onLoadCallback != "function")
		alert("[SDB.list]\nArgument 2 must be a callback function");
	else if (e && e.responseXML)
	{
		var msg = e.responseXML.evaluate("//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		xargs.unshift(convertToObject(e.responseXML), e, !!msg, msg);
		onLoadCallback.apply(this, xargs);
//		onLoadCallback(convertToObject(e.responseXML), e, !!msg, msg);
	}
	else
	{
		var req = new HttpRequest();
		//req.options.headers["Referer"] = "http://www.neopets.com/safetydeposit.phtml?obj_name=&category=0";
		xargs.unshift("GET", "http://www.neopets.com/safetydeposit.phtml", function(e)
		{
			var msg = e.responseXML.evaluate("//div[@class='errormess' and b] | //td[@class='content']/p/b", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

			var xargs = array_slice(arguments, 1)||[];
			xargs.unshift(convertToObject(e.responseXML), e, !!msg, msg);
			onLoadCallback.apply(this, xargs);
//			onLoadCallback(convertToObject(e.responseXML), e, !!msg, msg);
		});
		req.open.apply(req, xargs);

		if (e && e.page && !e.offset)
		{
			e.offset = 30 * parseInt(e.page, 10);
		}

		req.send({
			"obj_name": e && e.name||"",
			"category": e && e.category||0,
			"offset": parseInt(e && e.offset, 10)||0
		});
	}
};

SDB.remove = function(items, pin, search, onLoadCallback)
{
	var xargs;

	if (typeof pin == "function")
	{
		onLoadCallback = pin;
		pin = search = null;

		xargs = array_slice(arguments, 2)||[];
	}
	else if (typeof pin == "object")
	{
		onLoadCallback = search;
		search = pin;

		xargs = array_slice(arguments, (typeof onLoadCallback == "function" ? 3 : 2))||[];
	}
	else if (typeof search == "function")
	{
		onLoadCallback = search;
		search = null;

		xargs = array_slice(arguments, 3)||[];
	}
	else
		xargs = array_slice(arguments, (typeof onLoadCallback == "function" ? 4 : 3))||[];

	var req = new HttpRequest();
	//req.options.headers["Referer"] = "http://www.neopets.com/safetydeposit.phtml";
	xargs.unshift("POST", "http://www.neopets.com/process_safetydeposit.phtml?checksub=scan", function(e)
	{
		//	https://addons.mozilla.org/en-US/firefox/addon/10636
		//	Description	Safety Deposit Box : SDB.remove
		//	URL			^http:\/\/www\.neopets\.com\/process_safetydeposit\.phtml\?checksub=scan
		//	Function	referrer to specified site
		//	Config...	http://www.neopets.com/safetydeposit.phtml

		if (typeof onLoadCallback == "function")
		{
//			var msg = e.responseXML.evaluate("//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

			var xargs = array_slice(arguments, 1)||[];
			xargs.unshift(e, onLoadCallback);
			SDB.list.apply(this, xargs);
//			SDB.list(e, onLoadCallback);
//			onLoadCallback(e, !!msg, msg);
		}
	});
	req.open.apply(req, xargs);

	if (search && search.page && !search.offset)
	{
		search.offset = 30 * parseInt(search.page, 10);
	}

	var data = {
		"pin": pin||"",
		"obj_name": search && search.name||"",
		"category": search && search.category||0,
		"offset": parseInt(search && search.offset, 10)||0
	};
	for ( var ai = 0 , at = items.length ; ai < at ; ++ai )
	{
		var item = items[ai];

		if (parseInt(item[0], 10) && parseInt(item[1], 10))
			data["back_to_inv[" + item[0] + "]"] = item[1]||0;
	}
	req.send(data);
};

SDB.removeOne = function(id, pin, search, onLoadCallback)
{
	if (!id)
		alert("[SDB.removeOne]\nArgument 1 is missing");
	else
	{
		var xargs = array_slice(arguments, 1)||[];

		xargs.unshift([[id, 1]]);
		SDB.remove.apply(this, args);
//		SDB.remove([[id, 1]], pin, search, onLoadCallback);
	}
};

/*
// Removes your codestones from SDB
SDB.list({"category":2}, function(list)
{
	var items = [];
	for ( var ai = 0 , at = list.length ; ai < at ; ++ai )
	{
		var item = list[ai];
		items.push([item.Id,item.Quantity,item.Name]);
	}

	alert("[Codestones]\n" + items.join("\n"));

	if (items.length)
	setTimeout(SDB.remove, 1000, items, null, {"category":2}, function(l,e,h,m)
	{
		if (h)	// has_error ?
		{
			alert(m && m.textContent);
		}
		else
		{
			alert("Remaining codestones on SDB: " + l.length);
		}
	});
});
*/