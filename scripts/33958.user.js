// ==UserScript==
// @name           Neopets : Shop Wizard
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Allows you to use the Shop Wizard even if you are on a Faerie Quest
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0
// @language       en
// @include        http://www.neopets.com/market.phtml?type=wizard
// @include        http://www.neopets.com/market.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/33958.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       shopWizardHtml http://pastebin.com/download.php?i=J3Se4KkK
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @require        http://pastebin.com/download.php?i=sin7DHJi
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/163374.user.js
// @history        3.0.0 Added Shop Wizard Settings
// @history        2.0.0.1 Fixed area and criteria selections
// @history        2.0.0.2 Fixed resource i18n
// @uso:version    version
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

GM_addStyle(".winConfig_ShopWizardSettings .fieldType_0 {float: left;width: 50%;}.winConfig_ShopWizardSettings .fieldType_0 input {width:40%;}");

(function () {	// script scope
	var win = new WinConfig({
		title	: "Shop Wizard : Settings",
		type	: WinConfig.WindowType.CUSTOM,
		size	: ["320px", 0],
		default	: {
			group	: {
				fill	: true,
				interval: {
					min	: 500,
					rnd	: 1000,
				},
			},
		},
		fields	: [{
			name: "settingsHotKey",
			label: "Settings HotKey",
			key: "hotkey",
			callback: function(event, win) {
				win.open();
			},
		}, {
			name	: "group",
			nogroup	: true,
			type	: WinConfig.FieldType.GROUP,
			fields	: [{
				name	: "interval",
				label	: "Interval",
				type	: WinConfig.FieldType.GROUP,
				fields	: [{
					name	: "min",
					label	: "Minimum",
					format	: WinConfig.FieldFormat.NUMBER,
					description	: "The minimum value of time before searching for the item name.<br /><sup><i>Time in miliseconds</i></sup>",
					empty	: 0,
					help	: true,
				}, {
					name	: "rnd",
					label	: "Random",
					format	: WinConfig.FieldFormat.NUMBER,
					description	: "The random value of time before searching for the item name.<br />This value is multiplied by a random value between 0-1 and added to the minimum value.<br /><sup><i>Time in miliseconds</i></sup>",
					empty	: 0,
					help	: true,
				}],
			}],
		}, {
			name	: "group",
			type	: WinConfig.FieldType.GROUP,
			fields	: [{
				name	: "fill",
				label	: "Auto fill",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				description	: "Fill the item name requested on Faerie Quest.",
				multiple	: true,
				help	: true,
			}],
		}],
	}),
	config = win.get("group");

	if (config && !xpath("string(.//tr/td[1]/img[contains(@src, 'shopwizard')]/@src)")) {
		var faerieQuest = xpath(".//div[@class = 'main-icon']")[0],
		newDiv = document.createElement("div");

		newDiv.innerHTML = GM_getResourceText("shopWizardHtml");
		faerieQuest.parentNode.insertBefore(newDiv, faerieQuest);

		if (config.fill) {
			setTimeout(function () {
				HttpRequest.open({
					"method"	: "get",
					"url"		: "http://www.neopets.com/quests.phtml",
					"onsuccess"	: function (xhr) {
						var input = xpath(".//form[contains(@action, 'market.phtml')]//input[@name = 'shopwizard']")[0],
						item = xpath("string(id('faerie-quest-event')//td[@class = 'item']/b/text())", xhr.response.xml);

						if (item) {
							input.value = item;
						}
					}
				}).send();
			}, config.interval.min + Math.floor(Math.random() * config.interval.rnd));
		}
	}
}());