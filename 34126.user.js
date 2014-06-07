// ==UserScript==
// @name           Neopets : Underwater Fishing
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Reels in your line for all your pets
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        4.0.0
// @language       en
// @include        http://www.neopets.com/water/fishing.phtml
// @include        http://www.neopets.com/quickref.phtml
// @icon           http://gm.wesley.eti.br/icon.php?desc=34126
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta https://github.com/w35l3y/userscripts/raw/neopets/scripts/34126.user.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml https://github.com/w35l3y/userscripts/raw/master/resources/html/updaterWindowHtml
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @uso:version    version
// @history        4.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
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

(function () {	// script scope
	var user = {
		"interval" : eval(GM_getValue("interval",	"[3000, 1000]")),
		"disable" : eval(GM_getValue("disable", "[]"))
	},
	script = {
 		"firstPet" : GM_getValue("firstPet", ""),
		"currentPet" : xpath("string(.//tr[1]/td/a[contains(@href, 'quickref')]/b/text())"),
		"nextPet" : GM_getValue("nextPet", "")
	};

	function nextAction (f) {
		setTimeout(f, user.interval[0] + Math.floor(Math.random() * user.interval[1]));
	}

	if (/\/water\/fishing\.phtml$/.test(location.href)) {
		var reelIn = xpath(".//input[@name='go_fish']")[0];
		if (script.firstPet) {
			if (reelIn) {
				nextAction(function () {
					reelIn.form.submit();
				});
			} else if (script.currentPet == script.firstPet) {
				GM_deleteValue("firstPet");
				GM_deleteValue("nextPet");
			} else if (script.nextPet) {
				nextAction(function () {
					location.replace("http://www.neopets.com/process_changepet.phtml?new_active_pet=" + script.nextPet);
				});
			}
		} else {
			GM_setValue("firstPet", script.currentPet);
			GM_deleteValue("nextPet");

			nextAction(function () {
				location.replace("http://www.neopets.com/quickref.phtml");
			});
		}
	} else if (script.firstPet) {
		var arr_pets = [],
		pets = xpath("id('nav')/tbody/tr/td/a/img"),
		nextPet = -1;
		for (var ai = 0, at = pets.length ; ai < at ; ++ai) {
			var found = false;
			for (var pet in user.disable) {
				if (user.disable[pet] == pets[ai].title) {
					found = true;
					break;
				}
			}
			if (!found) {
				if (pets[ai].title == script.currentPet) {
					nextPet = 1 + ai;
				}
				arr_pets.push(pets[ai].title);
			}
		}
		
		if (~nextPet) {
			GM_setValue("nextPet", nextPet = arr_pets[nextPet % (at = arr_pets.length)]);

			if (script.nextPet || at == 1) {
				nextAction(function () {
					location.replace("http://www.neopets.com/water/fishing.phtml");
				});
			} else {
				nextAction(function () {
					location.replace("http://www.neopets.com/process_changepet.phtml?new_active_pet=" + nextPet);}
				);
			}
		} else {
			GM_deleteValue("firstPet");
			GM_deleteValue("nextPet");
		}
	}
}());