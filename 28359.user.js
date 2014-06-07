// ==UserScript==
// @name           Neopets : Lunar Temple
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Selects the correct image to Lunar Temple
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        4.0.0
// @language       en
// @include        http://www.neopets.com/shenkuu/lunar/?show=puzzle
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=28359
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta http://userscripts.org/scripts/source/28359.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @uso:version    version
// @history        4.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        3.1.0 Added missing @require#56489
// @history        3.0.0.0 Updated @require#87942
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

(function() {	// script scope
	var interval = eval(GM_getValue("interval",	"[4000, 3000]")),
	answer = (8 + Math.round(document.body.innerHTML.match(/angleKreludor=(\d+)/)[1] / 22.5)) % 16,
	shadow = xpath(".//form[contains(@action, 'results.phtml')]/table/tbody/tr/td/input[@name = 'phase_choice']")[answer];

	if (shadow) {
		setTimeout(function() {
			shadow.click();
		}, interval[0] + Math.floor(Math.random() * interval[1]));
	}
}());