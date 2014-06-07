// ==UserScript==
// @name           Includes : Neopets : Pin
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Pin Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.6
// @language       en
// @include        http://www.neopets.com/pin_prefs.phtml*
// @require        http://www.neopets.com/process_pin_prefs.phtml
// @require        http://userscripts.org/scripts/source/63808.user.js
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

Pin = function () {};

Pin.convert = function (doc) {
	var msg = xpath(".//div[@class = 'errormess' and b]")[0],
	obj = {
		"error": (msg ? 1 : 0),
		"message": msg,
		"list" : {}
	};
	
	for each (var area in xpath(".//td[@class='content']//form[2]//tbody/tr/td/div/input[@type = 'checkbox']", doc)) {
		obj.list[area.name] = area.checked;
	}

	return obj;
};

Pin.process = function (params) {
	if (params.old) {
		params.pin = params.old;
	} else if (!params.pin) {
		if (params["new"]) {
			params.pin = params["new"];
		} else {
			params.pin = GM_getValue("pin", "") || prompt("[Neopets : Pin]\nType in your current PIN number:");
		}
	}
		
	if (!params.data) {
		params.data = {};
	}

	params.data.pin_posted = params.pin;
	
	if (params.action == "create_pin") {
		params.data.pin_posted_confirm = params.pin;
	}
	
	params.data.dowhat = params.action;

	HttpRequest.open({
		"method" : "post",
		"url" : "http://www.neopets.com/process_pin_prefs.phtml",
		"headers" : {
			"Referer" : "http://www.neopets.com/pin_prefs.phtml",
		},
		"onsuccess" : function (params) {
			var obj = Pin.convert(params.response.xml) || {};

			for (var p in params.parameters) {
				obj[p] = params.parameters[p];
			}

			obj.response = params.response;
			
			if (typeof params.onsuccess == "function") {
				params.onsuccess(obj);
			}
		},
		"paramaters" : params
	}).send(params.data);
};

Pin.create = function (params) {
	if (!params.pin) {
		alert("[Includes : Neopets : Pin : create]\nParameter 'pin' is wrong/missing.");
	} else {
		params.action = "create_pin";

		delete params["new"];
		delete params.old;

		Pin.process(params);
	}
};

Pin.change = function (params) {
	if (!params["new"]) {
		alert("[Includes : Neopets : Pin : create]\nParameter 'new' is wrong/missing.");
	} else {
		params.action = "change_pin";

		if (!params.data) {
			params.data = {};
		}

		params.data.pin_posted_change = params.data.pin_posted_change_confirm = params["new"];

		delete params["new"];

		Pin.process(params);
	}
};

Pin.areas = function (params) {
	if (!params.list) {
		alert("[Includes : Neopets : Pin : areas]\nParameter 'areas' is wrong/missing.");
	} else {
		params.action = "set_areas";

		if (!params.data) {
			params.data = {};
		}

		for each (var area in params.list) {
			params.data[area] = "1";
		}

		Pin.process(params);
	}
};

Pin.disable = function (params) {
	if (!params) {
		params = {};
	}

	params.action = "disable";

	if (!params.data) {
		params.data = {};
	}

	params.data.checktodelete = "on";
	
	Pin.process(params);
};

Pin.execute = function (type, def) {
	if (!type) {
		alert("[Includes : Neopets : Pin : execute]\nParameter 'type' is wrong/missing.");
	} else {
		switch (type) {
			case "pin_request":
			if (!GM_getValue("pin_isset", !!GM_getValue("pin", ""))) {
				var pin = def || prompt("Type in your Pin number");

				if (pin != null) {
					GM_setValue("pin", pin);
					GM_setValue("pin_isset", true);
					GM_deleteValue("pin_pending");
					
					return true;
				}

				return false;
			}

			return true;
		}
	}
};

if (location.pathname == "/process_pin_prefs.phtml") {
	GM_deleteValue("pin_pending");
} else if (location.pathname == "/pin_prefs.phtml") {
	xpath(".//td[@class='content']//form[1]")[0].addEventListener("submit", function(e) {
		GM_setValue("pin_pending", (e.target.elements.namedItem("pin_posted_change")||e.target.elements.namedItem("pin_posted_confirm")).value);
	}, false);
	
	if (GM_getValue("pin_pending")) {
		GM_setValue("pin", GM_getValue("pin_pending"));
		GM_setValue("pin_isset", true);
		GM_deleteValue("pin_pending");
	}

	var areas = Pin.convert(document).list;
	GM_setValue("pin_areas", uneval(areas));

	if (/^#(?:alert|console)$/.test(location.hash)) {
		var output = [];

		for ( var area in areas)
		output.push([area, areas[area]]);
		
		(location.hash == "#alert" ? alert : console && console.log || GM_log)(output.join("\n"));
	}
}