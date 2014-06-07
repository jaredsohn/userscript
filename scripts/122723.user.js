// ==UserScript==
// @name           Quick Price Checker (Neopets)
// @namespace      http://www.hiddenbelow.com @description    Enables Alt+W to quickly check the price of the selected text and converts it into a link
// @author         Monark (AKA Akinen)
// @email          thiiback@hotmail.com// @copyright      2012, Monark (http://www.hiddenbelow.com)
// @license        GNU GPL
// @homepage       http://www.hiddenbelow.com// @version        1.0.0.a
// @include        http://www.neopets.com/*
 http://items.jellyneo.net/* // @require        http://userscripts.org/scripts/source/122717.user.js
// @require        http://userscripts.org/scripts/source/122721.user.js
// @require        http://userscripts.org/scripts/source/122722.user.js
// @require        http://userscripts.org/scripts/source/122719.user.js
// @require        http://userscripts.org/scripts/source/122720.user.js
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

window.addEventListener("keyup", function(e)
{
	var sel;
	if (e.altKey && e.keyCode == GM_getValue("keyCode", 87) && (sel = window.getSelection()).rangeCount) // Alt + W
	{
		for ( var ai = sel.rangeCount ; ai-- ; )
		{
			var range = sel.getRangeAt(ai);

			if (range.toString().length)
			{
				var current = new Date().valueOf();
				var next = parseInt(GM_getValue("nextAccess", "0"), 10);
				var time = Math.max(0, next - current);
				GM_setValue("nextAccess", 600 + (time ? next : current) + "");

				setTimeout(Wizard.find, time, {
					"text" : range.toString(),
					"onsuccess" : function(params)
					{
						var msg;
						if (params.list[0])
						{
							var a = document.createElement("a");
							a.textContent = params.range.toString();
							//a.setAttribute("target", "_blank");

							var last = params.range.extractContents().firstChild;
							a.setAttribute("href", !last.href || params.list[0].Price <= parseInt(last.href.match(/[?&]buy_cost_neopoints=(\d+)/)[1], 10) ? params.list[0].Link : (last.href).replace(/(?:#r\d+)?$/, "#r"+Math.floor(1000*Math.random())));

							params.range.insertNode(a);
							params.range.selectNode(a);
						}
						else if (params.error || (msg = xpath("id('content')/table/tbody/tr/td[2]/center/b[1]", params.response.xml)[0]))
						{
							alert("[Quick Price Checker]\n\n"+(msg && msg.textContent || params.message && params.message.textContent.replace(/^\s+|\s+$/g, "") || "Unexpected error"));
						}
						else if (GM_getValue("notfound", false))
						{
							alert("[Quick Price Checker]\n\nThe following text was not found:\n"+params.range.toString());
						}
					},
					"parameters" : {"range":range}
				});
			}
		}
	}
}, false);