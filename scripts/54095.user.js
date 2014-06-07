// ==UserScript==
// @name           Neopets : Healing Springs [Silent version]
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Silently visit the Healing Springs every 30 minutes
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.2.0
// @language       en
// @include        http://www.neopets.com/*
// @exclude        http://www.neopets.com/colorpallette.phtml
// @exclude        http://www.neopets.com/neomail_block_check.phtml?*
// @exclude        http://www.neopets.com/ads/*
// @exclude        http://www.neopets.com/games/play_flash.phtml?*
// @exclude        http://www.neopets.com/iteminfo.phtml?*
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=54095
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       meta http://userscripts.org/scripts/source/54095.meta.js
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/54000.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @cfu:version    version
// @history        3.2.0 Added missing @icon
// @history        3.1.0 Added Includes Checker (due to the recent problems with userscripts.org)
// @history        3.0.0.0 Updated @require#87942
// @history        2.0.0.4 Fixed @resource i18n
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

if (NeopetsDocument.Username)
(function () {	// script scope
	const INTERVAL = 1810000;	// 30 * 60 * 1000 + 10 * 1000 (30 minutes + 10 seconds)

	var n = "HealingSprings-LastAccess-" + NeopetsDocument.Username,
	la = Date.parse(GM_getValue(n, "Sat Apr 16 2011 08:13:43 GMT-0300")) || new Date(),
	curr = new Date();

	if (la.valueOf() < curr.valueOf() - INTERVAL) {
		GM_setValue(n, (la = curr).toString());

		HttpRequest.open({
			"method" : "post",
			"url" : "http://www.neopets.com/faerieland/springs.phtml",
			"headers" : {
				"Referer" : "http://www.neopets.com/faerieland/springs.phtml"
			},
			"onsuccess" : function(xhr) {
				var msg = xpath(".//td[@class = 'content']//div[@class = 'errormess' and b] | .//td[@class = 'content']//center[1]", xhr.response.xml)[0];

				Neopets.addMessage('<span style="color:red">[Healing Springs]</span>');
				Neopets.addMessage(msg.textContent);
			}
		}).send({"type" : "heal"});
	}

	setTimeout(arguments.callee, la - curr + INTERVAL * (1 + Math.random()));
}());