// ==UserScript==
// @name           Neopets : Cliffhanger
// @namespace      http://gm.wesley.eti.br
// @description    Plays Chiffhanger as much as possible
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        5.0.0
// @language       en
// @include        http://www.neopets.com/games/cliffhanger/cliffhanger.phtml
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_openInTab
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=28760
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       random_events http://pastebin.com/download.php?i=839tCaQh
// @resource       randomEventsHtml http://pastebin.com/download.php?i=nPMWZeHY
// @resource       meta http://userscripts.org/scripts/source/28760.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/154322.user.js
// @require        http://userscripts.org/scripts/source/154363.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @contributor    cnwcentral (http://www.cnwcentral.com/neopets/cliffhanger.shtml)
// @cfu:version    version
// @history        5.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        4.1.0 Changed the order of @require#56489
// @history        4.0.0.0 Added Random Events History
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

(function () {	//script scope
	var options = JSON.parse(GM_getValue("options", JSON.stringify({
		at_once	: true,
		random	: [5000, 1500],
		repeat	: 10,
	}))),
	current = -1,
	get_answers = function (obj) {
		if (obj.source.length) {
			var s = obj.source.shift();

			HttpRequest.open({
				method		: "get",
				url			: s[0],
				onsuccess	: function (xhr) {
					var answers = xpath(s[1], xhr.response.xml).map(function (v) {
						return v.textContent.replace(/^\s+|\s+$/g, "");
					});

					if (answers.length) {
						GM_setValue("answers", JSON.stringify(answers));
						obj.callback(obj);
					} else {
						get_answers(obj);
					}
				},
			}).send();
		} else {
			alert("No answer was found.");
		}
	},
	next = function (obj) {
		return (wait = window.setTimeout(function () {
			HttpRequest.open({
				method	: obj.form.method || "get",
				url		: obj.form.action,
				headers : {
					Referer : obj.referer,
				},
				onsuccess : function (xhr) {
					RandomEvents.process({
						document	: xhr.response.xml,
					});
					
					var x = ".//td[@class = 'content']",
					module = xpath(x)[0],
					nmodule = xpath(x, xhr.response.xml)[0];
					
					if (nmodule) {
						module.parentNode.replaceChild(nmodule, module);
					}

					obj.referer = xhr.response.raw.finalUrl;
					obj.callback(obj);
				},
			}).send(obj.form.elements);
		}, options.random[0] + Math.floor(options.random[1] * Math.random())));
	},
	wait;

	window.addEventListener("keypress", function (e) {
		switch (e.keyCode) {
			case 27:
				console.log("Force Stop!");
				window.clearTimeout(wait);
				break;
		}
	}, false);
	
	window.addEventListener("unload", function (e) {
		window.clearTimeout(wait);
	}, false);

	RandomEvents.title = "Random Events - Cliffhanger";
	RandomEvents.location = "/games/cliffhanger/cliffhanger.phtml";
	
	(function recursive (obj) {
		var skill = xpath(".//form[contains(@action, 'process_cliffhanger.phtml')]/input[@name = 'game_skill' and @value = '3']")[0];

		obj.callback = recursive;

		if (skill) {
			if (-1 > options.repeat || ++current < options.repeat) {
				skill.click();
				
				obj.form = skill.form;

				next(obj);
			}
		} else {
			var answers = JSON.parse(GM_getValue("answers", "[]"));

			if (answers.length) {
				var pattern = new RegExp("^" + xpath(".//tbody/tr/td[@bgcolor= 'skyblue' and @colspan = '2' and contains(b/text(), '_')]")[0].innerHTML.replace(/<br>/g, "&nbsp;").replace(/\s+|<(?:\/?\w+|\w+(?:\s+\w+="\w+")+)>/g, "").replace(/_/g, "\\w").replace(/(?:&nbsp;|<br(?: *\/?)>)/g, " ").replace(/^\s+|\s+$/g, "") + "$", "gim"),
				x = pattern.exec(answers.join("\n").toUpperCase()),
				t = x && x.length || 0;

				if (1 < t || !options.at_once) {
					var letters = xpath(".//a[contains(@href, 'process_cliffhanger.phtml?choice=') and b]").sort(function () {
						return Math.floor(3 * Math.random()) - 1;
					}),
					list = {};

					for each (var v in letters) {
						var letter = v.textContent.toUpperCase();
						list[letter] = [0, v.href];
						
						for (var ai = 0;ai < t;++ai) {
							if (-1 != x[ai].indexOf(letter)) {
								++list[letter][0];
							}
						}
					}

					for (var tt = t;tt;--tt) {
						for (var v in list) {
							if (list[v][0] == tt) {
								obj.form = {
									method		: "get",
									action		: list[v][1],
									elements	: [],
								};

								return next(obj);
							}
						}
					}
				}
				
				if (t == 1) {
					var solve = xpath(".//form[contains(@action, 'process_cliffhanger.phtml')]/input[@name = 'solve_puzzle']")[0];

					solve.value = x[0];
					obj.form = solve.form;

					return next(obj);
				}
			}

			get_answers(obj);
		}
	}({
		referer : location.href,
		source	: [
			["http://www.cnwcentral.com/neopets/cliffhanger.shtml", "id('main')/ul/li/text()"],
		],
	}));
}());