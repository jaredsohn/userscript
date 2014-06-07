// ==UserScript==
// @name           Neopets : Tarla's Tour of Mystery 2010
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Finds Tarla and clicks on a prize
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2010+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.6
// @language       en
// @include        http://www.neopets.com/*
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/63810.user.js
// @contributor    jellyneo (http://twitter.com/statuses/user_timeline/42098834.rss)
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

//GM_setValue("auto_prize", true);

var user = xpath("string(id('header')//a[contains(@href, 'userlookup')]/text())");

if (/^(?:.+)$/.test(user))
{
	var prize = xpath(".//a[contains(@id, 'tarla_prize_link_')]", unsafeWindow.document)[0];

	if (prize)
	setTimeout(function()	// setTimeout is needed due to the Referer header
	{
		if (GM_getValue("auto_prize", false))
		{
			var c = unsafeWindow.confirm;
			unsafeWindow.confirm = function(){return true;};
			prize.onclick();
			unsafeWindow.confirm = c;
		}
		else
		prize.onclick();
	}, 600 + Math.floor(500 * Math.random()));
	else if (xpath("boolean(id('tarla2010-pushdown'))"))	// maxed out the number of prizes for today
	{
		var next = new Date(),
		curr = Neopets.convert(document).Time(true);
		next.setHours(24 * (next.getDate() == curr.getDate()), 0, 0, 0);
		GM_setValue("last_access-" + user, new Date(next - curr + new Date().valueOf()).toString());
	}

	(function recursive()
	{
		var current = new Date(),
		last_access = new Date(Date.parse(GM_getValue("last_access-" + user, "May 5 2010 00:00:00 GMT-0300"))),
		interval = 50000;	// 50 seconds

		if (current - last_access > interval)
		{
			GM_setValue("last_access-" + user, (last_access = current).toString());

			GM_xmlhttpRequest({
				"method" : "get",
				"url" : "http://twitter.com/statuses/user_timeline/42098834.rss",
				"onload" : function(xhr)
				{
					var title = xpath(".//item/title[contains(translate(text(), 'ALRT', 'alrt'), 'tarla') and contains(text(), 'http')]", new DOMParser().parseFromString(xhr.responseText, "text/xml"))[0],
					current = new Date();
					if (title && title.textContent != GM_getValue("sighting-" + user) && /(https?:\/\/\S+)/.test(title.textContent))
					{
						GM_setValue("last_access-" + user, current.toString());
						GM_setValue("sighting-" + user, title.textContent);

						if (current - Date.parse(xpath("string(./ancestor::item[1]/pubDate)", title)) < 1200000)	// current - pubDate < 20 minutes
						GM_openInTab(RegExp.$1);
					}
				}
			});
		}

		setTimeout(recursive, last_access - current + interval);
	})();
}

GM_registerMenuCommand("[Neopets : Tarla's Tour of Mystery 2010] Toggle auto-click on prizes", function()
{
	var ap = !GM_getValue("auto_prize", false);
	GM_setValue("auto_prize", ap);
	
	alert("Auto-click is "+(ap?"enabled":"disabled"));
});