// ==UserScript==
// @name           Includes : Neopets : The National Neopian Bank
// @namespace      http://gm.wesley.eti.br
// @description    Bank Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.4
// @language       en
// @contributor    Steinn (http://userscripts.org/users/85134)
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

Bank = function () {};

Bank.process = function (params) {
	var data = {};
	for (var key in params) {
		if (/^(amount|account_type|type|pin)$/.test(key)) {
			data[key] = params[key];
		}
	}

	HttpRequest.open({
		"method"		: "post",
		"url"			: "http://www.neopets.com/process_bank.phtml",
		"headers"		: {
			"Referer"	: "http://www.neopets.com/bank.phtml",
		},
		"synchronous"	: params.synchronous || false,
		"onsuccess"		: function (params) {
			var msg = params.response.xml.evaluate(".//div[@class='errormess' and b]", params.response.xml, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

			var obj = params.parameters || {};
			obj.response = params.response;
			obj.error = (/\/bank\.phtml$/.test(params.response.raw.finaUrl)?1:0);
			obj.message = msg;

			if (typeof params.onsuccess == "function") {
				params.onsuccess(obj);
			}
		},
		"parameters" : params
	}).send(data);
};

Bank.collect = function (obj) {
	obj.type = "interest";

	Bank.process(obj);
};

Bank.deposit = function (obj) {
	obj.type = "deposit";
	obj.amount = Math.abs(obj.amount) || 0;

	Bank.process(obj);
};

Bank.withdraw = function (obj) {
	obj.type = "withdraw";
	obj.amount = Math.abs(obj.amount) || 0;

	Bank.process(obj);
};

Bank.upgrade = function (obj) {
	obj.type = "upgrade";
	obj.amount = Math.abs(obj.amount) || 0;
	obj.account_type = obj.account_type;

	Bank.process(obj);
};