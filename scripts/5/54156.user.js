// ==UserScript==
// @name           Includes : Neopets : The National Neopian Bank
// @namespace      http://gm.wesley.eti.br/inludes
// @description    Bank Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2009, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        1.0.3.0
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

Bank = function(){};
Bank.process = function(data, onLoadCallback)
{
	var req = new HttpRequest();
	//nr.options.headers['Referer'] = 'http://www.neopets.com/bank.phtml';
	var xargs = array_slice(arguments, 2)||[];
	xargs.unshift("POST", "http://www.neopets.com/process_bank.phtml", function(e)
	{
		//	https://addons.mozilla.org/en-US/firefox/addon/10636
		//	Description	Bank Process
		//	URL			^http:\/\/www\.neopets\.com\/process_bank\.phtml
		//	Function	referrer to specified site
		//	Config...	http://www.neopets.com/bank.phtml

		var msg = e.responseXML.evaluate("//div[@class='errormess' and b]", e.responseXML, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;

		if (typeof onLoadCallback == "function")
		{
			var xargs = array_slice(arguments, 1)||[];
			xargs.unshift(e, /\/bank\.phtml$/.test(e.finaUrl), msg);	// response, has_error, message node
			onLoadCallback.apply(this, xargs);
		}
	})
	req.open.apply(req, xargs);

	req.send(data);
};
Bank.collect = function(onLoadCallback)
{
	var xargs = array_slice(arguments, 0)||[];
	xargs.unshift({"type":"interest"});
	Bank.process.apply(this, xargs);
};
Bank.deposit = function(amount, onLoadCallback)
{
	var xargs = array_slice(arguments, 1)||[];
	xargs.unshift({"type":"deposit", "amount":Math.abs(amount)});
	Bank.process.apply(this, xargs);
};
Bank.withdraw = function(amount, pin, onLoadCallback)
{
	var xargs = array_slice(arguments, 2)||[];
	xargs.unshift({"type":"withdraw", "amount":Math.abs(amount), "pin":pin||""});
	Bank.process.apply(this, xargs);
};
Bank.upgrade = function(amount, type, onLoadCallback)
{
	var xargs = array_slice(arguments, 2)||[];
	xargs.unshift({"type":"upgrade", "amount":Math.abs(amount), "account_type":type});
	Bank.process.apply(this, xargs);
};

//Bank.deposit(1, function(e)
//{
//	alert("NPs on hand: " + e.responseXML.evaluate("string(id('header')//td/a[contains(@href,'?type=inventory')]/text())", e.responseXML, null, XPathResult.STRING_TYPE, null).stringValue);
//});