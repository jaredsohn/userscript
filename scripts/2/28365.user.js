// ==UserScript==
// @name           Neopets : Daily Puzzle
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Selects the correct option to Daily Puzzle
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        4.0.0
// @language       en
// @include        http://www.neopets.com/community/index.phtml
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=28365
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta http://userscripts.org/scripts/source/28365.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @cfu:version    version
// @contributor    jellyneo (http://www.jellyneo.net/?go=dailypuzzle)
// @contributor    sunnyneo (http://www.sunnyneo.com/dailypuzzle.php)
// @history        4.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        3.1.0 Changed the order of @require#56489
// @history        3.0.0.0 Updated @require#87942
// @history        2.0.0.1 Added new source (sunnyneo)
// ==/UserScript==

"use strict";

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

(function () {	// script scope
	var interval = JSON.parse(GM_getValue("interval",	"[2000, 1000]")),
	language = xpath("string(.//select[@name = 'lang']/option[@selected]/@value)") || "en",
	sources = [
		["http://www.jellyneo.net/?go=dailypuzzle", "string(id('contentshell')/div/center/div/span/text())"],
		["http://www.sunnyneo.com/dailypuzzle.php", "string(.//table//table//table/tbody/tr[3]/td[2]/b[2]/text())"],
	];
	(function recursive (list) {
		if (list.length) {
			var source = list.shift();

			HttpRequest.open({
				"method" : "get",
				"url" : source[0],
				"onsuccess" : function (xhr) {
					var answer = xpath(source[1], xhr.response.xml);

					if (answer) {
						Translate.execute(answer, "en", language, function (result) {
							var found = false;

							for each (var option in xpath(".//form[input[@name = 'trivia_date']]/select[@name = 'trivia_response']/option[position() > 1]")) {
								if (~[result.translation.toLowerCase(), answer.trim().toLowerCase()].indexOf(option.textContent.toLowerCase())) {
									option.selected = found = true;

									window.setTimeout(function() {
										option.parentNode.form.submit();
									}, interval[0] + Math.floor(interval[1] * Math.random()));

									break;
								}
							}

							if (!found) {
								recursive(list);
							}
						});
					} else {
						recursive(list);
					}
				},
				"onerror" : function (xhr) {
					recursive(list);
				}
			}).send();
		}
	}(sources));
}());