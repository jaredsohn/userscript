// ==UserScript==
// @name           Includes : Neopets : Mystery Island Training School
// @namespace      http://gm.wesley.eti.br/includes
// @description    Course Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.0.3.1
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

Course = function () {};
Course.fromDocument = function(xml) {
	var res = {},	// result
	pets = xml.evaluate(".//td[@class='content']//table[1]//tr[position() mod 2 = 0]", xml, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

	for (var ai = 0, at = pets.snapshotLength;ai < at;++ai) {
		var pet = pets.snapshotItem(ai),
		title = pet.previousSibling/*tr*/.cells[0]/*td*/.textContent,
		pet_name = title.substr(0, title.indexOf(" ")),
		stats = pet.cells[0].textContent.match(/\d+/g),
		comp = false,
		time = 0,
		sitems = {},
		completeform = pet.cells[1].getElementsByTagName('form'),
		timeb = pet.cells[1].getElementsByTagName("b"),
		itemsimg = pet.cells[1].getElementsByTagName('img'),
		status = 0;
		if (completeform.length) {
			status = 3;
			comp = /^complete$/i.test(completeform[0].elements.namedItem("type").value);
		} else if (itemsimg.length) {
			status = 1;
			var codestones_ids = 7457;	// codestones ids
			for (var bi = 0, bt = itemsimg.length;bi < bt;++bi) {
				var n = codestones_ids + parseInt(itemsimg[bi].src.match(/\/codestone(\d+)\.gif$/)[1], 10);

				if (n in sitems)
					++sitems[n].Quantity;
				else
					sitems[n] = {
						"Id": n,
						"Name": itemsimg[bi].previousSibling.textContent,
						"Quantity": 1
					};
			}
		} else if (timeb.length) {
			status = 2;

			timeb = timeb[0].textContent.match(/\d+/g);
			time = (parseInt(timeb[0], 10) || 0) * 60;	// hours to minutes
			time = (time + (parseInt(timeb[1], 10) || 0)) * 60; // minutes to seconds
			time = (time + (parseInt(timeb[2], 10) || 0)) * 1000; // seconds to miliseconds
			time += new Date().valueOf();
		}

		res[pet_name] = {
			'Name':pet_name,
			'Status': status,
			'Level': parseInt(stats[0], 10),
			'Strength': parseInt(stats[1], 10),
			'Defence': parseInt(stats[2], 10),
			'Agility': parseInt(stats[3], 10),
			'Endurance': parseInt(stats[5], 10),	// 4 = current hp / 5 = max hp
			'Items': sitems,	// "code":{"Name":"","Quantity":0}
			'Time': time
		};
	}

	return res;
};
Course.status = function (e, onLoadCallback) {
	var xargs;
	if (typeof e == "function") {
		onLoadCallback = e;
		e = undefined;

		xargs = array_slice(arguments, 1) || [];
	} else
		xargs = array_slice(arguments, 2) || [];

	if (typeof onLoadCallback != 'function')
		alert("[Course.status]\nArgument 2 must be a callback function");
	else if (e && e.responseXML) {
		var msg = e.responseXML.evaluate(".//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		xargs.unshift(Course.fromDocument(e.responseXML), e, !!msg, msg);	// /\/safetydeposit\.phtml/.test(e.finaUrl)
		onLoadCallback.apply(this, xargs);
	} else {
		var req = new HttpRequest();
		xargs.unshift("GET", "http://www.neopets.com/island/training.phtml?type=status", function(e)
		{
			var msg = e.responseXML.evaluate(".//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

			var xargs = array_slice(arguments, 1) || [];
			xargs.unshift(Course.fromDocument(e.responseXML), e, /\?type=status$/.test(e.finaUrl), msg);
			onLoadCallback.apply(this, xargs);
		});
		req.open.apply(req, xargs);
		req.send();
	}
};

Course.start = function (type, pet, onLoadCallback) {
	if (!type)
		alert("[Course.start]\nArgument 1 is missing");
	else if (!pet)
		alert("[Course.start]\nArgument 2 is missing");
	else {
		var xargs = array_slice(arguments, 3) || [];

		var req = new HttpRequest();
		//req.options.headers["Referer"] = "http://www.neopets.com/island/training.phtml?type=courses";
		xargs.unshift("POST", "http://www.neopets.com/island/process_training.phtml", function (e) {
			//	https://addons.mozilla.org/en-US/firefox/addon/10636
			//	Description	Mystery Island Training School : Course.start
			//	URL			^http:\/\/www\.neopets\.com\/island\/process_training\.phtml$
			//	Function	referrer to specified site
			//	Config...	http://www.neopets.com/island/training.phtml?type=courses

			if (typeof onLoadCallback == "function") {
				var xargs = array_slice(arguments, 1) || [];
				xargs.unshift(e, onLoadCallback);
				Course.status.apply(this, xargs);
			}
		});
		req.open.apply(req, xargs);

		req.send({
			"type": "start",
			"course_type": type,
			"pet_name": pet
		});
	}
};

Course.pay = function (pet, onLoadCallback) {
	if (!pet)
		alert("[Course.pay]\nArgument 1 is missing");
	else {
		var xargs = array_slice(arguments, 2) || [];

		var req = new HttpRequest();
		//req.options.headers["Referer"] = "http://www.neopets.com/island/training.phtml?type=status";
		xargs.unshift("GET", "http://www.neopets.com/island/process_training.phtml?type=pay&pet_name=" + pet, function (e) {
			//	https://addons.mozilla.org/en-US/firefox/addon/10636
			//	Description	Mystery Island Training School : Course.pay
			//	URL			^http:\/\/www\.neopets\.com\/island\/process_training\.phtml\?type=pay&pet_name=
			//	Function	referrer to specified site
			//	Config...	http://www.neopets.com/island/training.phtml?type=status

			var msg = e.responseXML.evaluate(".//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

			if (typeof onLoadCallback == "function") {
				var xargs = array_slice(arguments, 1) || [];
				xargs.unshift(e, onLoadCallback);
				Course.status.apply(this, xargs);
			}
		});
		req.open.apply(req, xargs);
		req.send();
	}
};

Course.complete = function (pet, onLoadCallback) {
	if (!pet)
		alert("[Course.complete]\nArgument 1 is missing");
	else {
		var xargs = array_slice(arguments, 2) || [];

		var req = new HttpRequest();
		//req.options.headers["Referer"] = "http://www.neopets.com/island/training.phtml?type=status";
		xargs.unshift("POST", "http://www.neopets.com/island/process_training.phtml", function (e) {
			//	https://addons.mozilla.org/en-US/firefox/addon/10636
			//	Description	Mystery Island Training School : Course.complete
			//	URL			^http:\/\/www\.neopets\.com\/island\/process_training\.phtml$
			//	Function	referrer to specified site
			//	Config...	http://www.neopets.com/island/training.phtml?type=status

			var msg = e.responseXML.evaluate(".//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

			if (typeof onLoadCallback == "function") {
				var xargs = array_slice(arguments, 1) || [];
				xargs.unshift( e, /\/process_training\.phtml$/.test(e.finaUrl), msg);
				onLoadCallback.apply(this, xargs);
			}
		});
		req.open.apply(req, xargs);

		req.send({
			"type": "complete",
			"pet_name": pet
		});
	}
};

/*
Course.status(function(list)
{
	var pets = [];
	for ( var key in list )
	{
		var pet = list[key];

		pets.push([
			key,	// key = pet.Name
			pet.Status,
			pet.Level,
			pet.Strength,
			pet.Defence,
			pet.Agility,
			pet.Endurance,
			pet.Time,
			"\n" + (function(i)
			{
				var items = [];
				for ( var key in i )
				{
					items.push([key,i[key].Name,i[key].Quantity].join("-"));
				}
				return items.join("\n");
			})(pet.Items)
		]);
	}
	alert(pets.join("\n"));
});
*/