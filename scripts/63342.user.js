// ==UserScript==
// @name           Includes : Neopets : Inventory
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    Inventory Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0.0
// @language       en
// @include        http://www.neopets.com/objects.phtml?type=inventory#alert
// @include        http://www.neopets.com/objects.phtml?type=inventory#console
// @require        http://userscripts.org/scripts/source/63808.user.js
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

Inventory = function () {};

Inventory.convert = function (doc) {
	var output = {
		"list" : []
	},
	items = xpath(".//td[@class='content']/div[2]/table/tbody/tr/td/div/table/tbody/tr[2]/td/table/tbody/tr/td/text()", doc);

	for (var ai = items.length ; ai-- ; ) {
		var item = items[ai],
		img = item.parentNode.getElementsByTagName("img")[0];

		output.list.push({
			"Id" : /(\d+)/.test(img.parentNode.getAttribute("onclick")) && RegExp.$1 || NaN,
			"Name" : item.textContent,
			"Image" : img.src,
			"Description" : img.alt || img.title
		});
	}

	return output;
};

Inventory.list = function (params) {
	if (typeof params.onsuccess != "function")
		alert("[Includes : Neopets : Inventory : list]\nParameter 'onsuccess' is wrong/missing.");
	else
	HttpRequest.open({
		"method" : "get",
		"url" : "http://www.neopets.com/objects.phtml",
		"onsuccess" : function (params) {
			var obj = Inventory.convert(params.response.xml) || {};

			for (var p in params.parameters)
			obj[p] = params.parameters[p];

			obj.response = params.response;

			params.onsuccess(obj);
		},
		"parameters" : params
	}).send({
		"type" : "inventory"
	});
};

if (location.pathname == "/objects.phtml" && /\btype=inventory\b/.test(location.search) && /^#(?:alert|console)$/.test(location.hash)) {
	var output = [];
	for each ( var item in Inventory.convert(document).list )
	output.push([item.Id, item.Name, item.Image, item.Description].join("\n"));
	
	( location.hash == "#alert" ? alert : console && console.log || GM_log )(output.join("\n\n"));
}