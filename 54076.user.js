// ==UserScript==
// @name           Neopets : The Snowager [Silent version]
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Silently visit the Snowager
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0.0
// @language       en
// @include        http://www.neopets.com/*
// @exclude        http://www.neopets.com/colorpallette.phtml
// @exclude        http://www.neopets.com/neomail_block_check.phtml?*
// @exclude        http://www.neopets.com/ads/*
// @exclude        http://www.neopets.com/games/play_flash.phtml?*
// @exclude        http://www.neopets.com/iteminfo.phtml?*
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       meta http://userscripts.org/scripts/source/54076.meta.js
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/54000.user.js
// @cfu:version    version
// @history        3.0.0.0 Updated @require#87942
// @history        2.0.0.1 Fixed resource i18n
// @history        2.0.0.2 Added custom interval
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

//GM_setValue("interval", 1);

if (NeopetsDocument.Username)
(function recursive () {	// script scope
	const INTERVAL = GM_getValue("interval", 8);

	var key = "Snowager-LastAccess-" + NeopetsDocument.Username,
	curr = NeopetsDocument.Time(true),
	compare = new Date(curr),
	h = curr.getHours(),
	la = new Date(GM_getValue(key, "Sat Apr 02 2011 12:42:02 GMT-0300")),
	sd = new Date(curr);

	compare.setMinutes(0, 0, 0);
	sd.setHours(h + INTERVAL - ((2 + h) % INTERVAL), 0, 30);

	if (la.valueOf() != compare.valueOf() && !((2 + h) % INTERVAL)) {
		GM_setValue(key, (la = compare).toString());
		
		HttpRequest.open({
			"method" : "get",
			"url" : "http://www.neopets.com/winter/snowager2.phtml",
			"headers" : {
				"Referer" : "http://www.neopets.com/winter/snowager.phtml"
			},
			"onsuccess" : function (xhr) {
				var msg = xpath(".//td[@class = 'content']//div[@class = 'errormess' and b] | .//td[@class = 'content']//center//b", xhr.response.xml)[0];

				Neopets.addMessage('<span style="color:red">[The Snowager]</span>');
				Neopets.addMessage(msg ? msg.textContent : "(Nothing)");
			}
		}).send();
	}

	setTimeout(recursive, sd.valueOf() - curr.valueOf());
}());