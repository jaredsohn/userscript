// ==UserScript==
// @name           Includes : Neopets : Safety Deposit Box
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    SDB Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.5
// @language       en
// @include        http://www.neopets.com/safetydeposit.phtml*#debug
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

SDB = function () {};

SDB.convert = function (doc) {
	var msg = doc.evaluate(".//div[@class='errormess' and b]", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue,
	page = doc.evaluate(".//td[@class='content']//td/form/select", doc, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue,
	obj = {
		"current" : page && parseInt(page.options[page.selectedIndex].textContent, 10)-1||0,
		"last" : page && parseInt(page.options[page.options.length - 1].textContent, 10)-1||0,
		"error" : (msg ? 1 : 0),
		"message" : msg,
		"list" : []
	};

	var items = doc.evaluate(".//td[6]/input", doc, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var ai = items.snapshotLength ; ai-- ; ) {
		var item = items.snapshotItem(ai);
		var cells = doc.evaluate("./ancestor::tr[1]", item, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.cells;

		obj.list.push({
			"Image": cells[0].getElementsByTagName("img")[0].src,
			"Name": cells[1].firstChild.childNodes[0].textContent,
			"Description": cells[2].textContent || "",
			"Type": cells[3].textContent || "",
			"Quantity": parseInt(cells[4].textContent, 10) || 0,
			"Id": /^back_to_inv\[(\d+)\]$/.test(item.name) && RegExp.$1 || NaN
		});
	}

	return obj;
};

SDB.list = function (params) {
	if (typeof params.onsuccess != "function") {
		alert("[Includes : Neopets : Safety Deposit Box : list]\nParameter 'onsuccess' is wrong/missing.");
	} else {
		if (params.page && !params.offset) {
			params.offset = 30 * parseInt(params.page, 10);
		}

		// Description		Neopets : Safety Deposit Box : list
		// Include URL		^http:\/\/www\.neopets\.com\/safetydeposit\.phtml
		// Function			referrer to specified site
		// Config...		http://www.neopets.com/safetydeposit.phtml
		HttpRequest.open({
			"method": "get",
			"url": "http://www.neopets.com/safetydeposit.phtml",
			"headers" : {
				"Referer" : "http://www.neopets.com/safetydeposit.phtml",
			},
			"onsuccess": function(params) {

				var obj = SDB.convert(params.response.xml) || {};

				for (var p in params.parameters)
				obj[p] = params.parameters[p];
				obj.response = params.response;
				
				params.onsuccess(obj);
			},
			"parameters": params
		}).send({
			"obj_name": params.name || "",
			"category": parseInt(params.category, 10) || 0,
			"offset": parseInt(params.offset, 10) || 0
		});
	}
};

SDB.remove = function (params) {
	if (params.page && !params.offset) {
		params.offset = 30 * parseInt(params.page, 10);
	}

	var data = {
		"pin": params.pin || "",
		"obj_name": params.name || "",
		"category": params.category || 0,
		"offset": parseInt(params.offset, 10) || 0
	};
	
	for ( var ai = params.items.length ; ai-- ; )
	if (parseInt(params.items[ai][0], 10))
		data["back_to_inv[" + params.items[ai][0] + "]"] = parseInt(params.items[ai][1], 10) || 0;

	// Description		Neopets : Safety Deposit Box : remove
	// Include URL		^http:\/\/www\.neopets\.com\/process_safetydeposit\.phtml\?checksub=scan
	// Function			referrer to specified site
	// Config...		http://www.neopets.com/safetydeposit.phtml
	HttpRequest.open({
		"method": "post",
		"url": "http://www.neopets.com/process_safetydeposit.phtml?checksub=scan",
		"headers" : {
			"Referer" : "http://www.neopets.com/safetydeposit.phtml",
		},
		"onsuccess": function (params) {
			var obj = SDB.convert(params.response.xml) || {};

			for (var p in params.parameters)
			obj[p] = params.parameters[p];
			obj.response = params.response;
			
			if (typeof params.onsuccess == "function") {
				params.onsuccess(obj);
			}
		},
		"parameters": params
	}).send(data);
};

SDB.removeOne = function(params) {
	if (!params.id) {
		alert("[Includes : Neopets : Safety Deposit Box : removeOne]\nParameter 'id' is wrong/missing.");
	} else {
		var obj = params || {};
		obj.items = [[params.id, 1]];
		SDB.remove(obj);
	}
};

if (location.hash == "#debug" && location.pathname == "/safetydeposit.phtml") {
	var output = [];
	
	for each (var item in SDB.convert(document).list) {
		output.push([item.Id, item.Image, item.Name, item.Description, item.Type, item.Quantity].join("\n"));
	}

	alert(output.join("\n"));
}