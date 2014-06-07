// ==UserScript==
// @name           Includes : Neopets : Mystery Island Training School
// @namespace      http://gm.wesley.eti.br/includes/neopets
// @description    Course Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes/neopets)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes/neopets
// @version        1.0.0.1
// @language       en
// @contributor    Steinn (http://userscripts.org/users/85134)
// @include        nowhere
// @require        http://userscripts.org/scripts/source/54389.user.js
// @require        http://userscripts.org/scripts/source/54987.user.js
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

Course = function(){};

Course.fromDocument = function(xml)
{
	var res = {};	// result

	var pets = xml.evaluate("//td[@class='content']/table[1]//tr[position() mod 2 = 0]", xml, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for ( var ai = 0 , at = pets.snapshotLength ; ai < at ; ++ai )
	{
		var pet = pets.snapshotItem(ai);

		var title = pet.previousSibling/*tr*/.cells[0]/*td*/.textContent;
		var pet_name = title.substr(0, title.indexOf(" "));

		var stats = pet.cells[0].textContent.match(/\d+/g);
		var comp = false;
		var time = 0;
		var sitems = {};
		var completeform = pet.cells[1].getElementsByTagName('form');
		var timeb = pet.cells[1].getElementsByTagName("b");
		var itemsimg = pet.cells[1].getElementsByTagName('img');
		var status = 0;
		if (completeform.length)
		{
			status = 3;
			comp = /^complete$/i.test(completeform[0].elements.namedItem("type").value);
		}
		else if (itemsimg.length)
		{
			status = 1;
			var codestones_ids = 7457;	// codestones ids
			for ( var bi = 0 , bt = itemsimg.length ; bi < bt ; ++bi )
			{
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
		}
		else if (timeb.length)
		{
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
			'Endurance': parseInt(stats[5], 10),	// index 4 = current hp / index 5 = max hp
			'Items': sitems,	// "code":{"Name":"","Quantity":0}
			'Time': time
		};
	}

	return res;
};

Course.status = function(params)	// e, onLoadCallback
{
	if (typeof params.onsuccess != "function")
	{
		WinConfig.init({
			"type" : "error",
			"title" : "Mystery Island Training School",
			"description" : "<br />Parameter 'onsuccess' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else if (params.response && params.response.xml)
	{
		var msg = params.response.xml.evaluate("//div[@class='errormess' and b]", params.response.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		var obj = params.parameters||{};
		obj.list = Course.fromDocument(params.response.xml);
		obj.response = params.response;
		obj.error = ( !!msg ? 1 : 0 );
		obj.message = msg;

		params.onsuccess(obj);
	}
	else
	{
		HttpRequest.open({
			"method" : "get",
			"url" : "http://www.neopets.com/island/training.phtml",
			"onsuccess" : function(params)
			{
				var msg = params.response.xml.evaluate("//div[@class='errormess' and b]", params.response.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				var obj = params.parameters||{};
				obj.list = Course.fromDocument(params.response.xml);
				obj.response = params.response;
				obj.error = ( /\?type=status$/.test(params.response.raw.finaUrl) ? 1 : 0 );
				obj.message = msg;

				params.onsuccess(obj);
			},
			"parameters" : params
		}).send({
			"type" : "status"
		});
	}
};

Course.start = function(params)	// type, pet, onLoadCallback
{
	if (!params.type)
	{
		WinConfig.init({
			"type" : "error",
			"title" : "Mystery Island Training School",
			"description" : "<br />Parameter 'type' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else if (!params.pet)
	{
		WinConfig.init({
			"type" : "error",
			"title" : "Mystery Island Training School",
			"description" : "<br />Parameter 'pet' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else
	{
		// Description	Mystery Island Training School : Course.start
		// URL		^http:\/\/www\.neopets\.com\/island\/process_training\.phtml$
		// Function	referrer to specified site
		// Config...	http://www.neopets.com/island/training.phtml?type=courses
		HttpRequest.open({
			"method" : "post",
			"url" : "http://www.neopets.com/island/process_training.phtml",
			"onsuccess" : function(params)
			{
				if (typeof params.onsuccess == "function")
				{
					Course.status(params);	// repassando
				}
			},
			"parameters" : params
		}).send({
			"type" : "start",
			"course_type" : params.type,
			"pet_name" : params.pet
		});
	}
};

Course.pay = function(params)	//pet, onLoadCallback
{
	if (!params.pet)
	{
		WinConfig.init({
			"type" : "error",
			"title" : "Mystery Island Training School",
			"description" : "<br />Parameter 'pet' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else
	{
		// Description	Mystery Island Training School : Course.pay
		// URL		^http:\/\/www\.neopets\.com\/island\/process_training\.phtml\?type=pay&pet_name=
		// Function	referrer to specified site
		// Config...	http://www.neopets.com/island/training.phtml?type=status
		HttpRequest.open({
			"method" : "get",
			"url" : "http://www.neopets.com/island/process_training.phtml",
			"onsuccess" : function(params)
			{
				var msg = params.response.xml.evaluate("//div[@class='errormess' and b]", params.response.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				if (typeof params.onsuccess == "function")
				{
					Course.status(params);	// repassando
				}
			},
			"parameters" : params
		}).send({
			"type" : "pay",
			"pet_name" : params.pet
		});
	}
};

Course.complete = function(params)
{
	if (!params.pet)
	{
		WinConfig.init({
			"type" : "error",
			"title" : "Mystery Island Training School",
			"description" : "<br />Parameter 'pet' is wrong/missing."
		}).Open().FadeIn(0);
	}
	else
	{
		// Description	Mystery Island Training School : Course.complete
		// URL		^http:\/\/www\.neopets\.com\/island\/process_training\.phtml$
		// Function	referrer to specified site
		// Config...	http://www.neopets.com/island/training.phtml?type=status
		HttpRequest.open({
			"method" : "post",
			"url" : "http://www.neopets.com/island/process_training.phtml",
			"onsuccess" : function(params)
			{
				var msg = params.response.xml.evaluate("//div[@class='errormess' and b]", params.response.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

				if (typeof params.onsuccess == "function")
				{
					var obj = params.parameters||{};
					obj.response = params.response;
					obj.error = ( /\/process_training\.phtml$/.test(params.response.raw.finaUrl) ? 1 : 0 );
					obj.message = msg;

					params.onsuccess(obj);
				}
			},
			"parameters" : params
		}).send({
			"type" : "complete",
			"pet_name" : params.pet
		});
	}
};

/*
Course.status({
	"onsuccess" : function(params)
	{
		var pets = [];
		for ( var key in params.list )
		{
			var pet = params.list[key];

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
	}
});
*/