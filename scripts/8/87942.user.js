// ==UserScript==
// @name           Includes : Updater
// @namespace      http://gm.wesley.eti.br/includes
// @description    Updater Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.2.3
// @language       en
// @include        nowhere
// @exclude        *
// @icon           http://gm.wesley.eti.br/icon.php?desc=87942
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @resource       meta http://userscripts.org/scripts/source/87942.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @history        1.0.3.0 Removed multiline strings due to recent firefox update
// ==/UserScript==

/**************************************************************************

    Author's NOTE

    This script was made from scratch.

    Based on http://userscripts.org/scripts/show/52251 (by Buzzy)

***************************************************************************

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

// for compatibility only
var Updater = {};

(function () {	// script scope
	var parseHeader = function (text) {
		var output = {"resources" : {}, "histories" : {}},
		re = /^\/\/ @([\w:]+)\s+(.+)$/gm,
		item;

		while (item = re.exec(text)) {
			var k = item[1].toLowerCase();

			if ("resource" == k) {
				if (/^([\w:.]+)\s+(.+)/.test(item[2])) {
					output.resources[RegExp.$1] = RegExp.$2;
				}
			} else if ("history" == k) {
				if (/^([\w:.]+)\s+(.+)/.test(item[2])) {
					if (RegExp.$1 in output.histories) {
						output.histories[RegExp.$1].push(RegExp.$2);
					} else {
						output.histories[RegExp.$1] = [RegExp.$2];
					}
				}
			} else {
				if (~["include", "exclude"].indexOf(k)) {
					k += "s";
				} else if (~["match"].indexOf(k)) {
					k += "es";
				}

				if (k in output) {
					if (!(output[k] instanceof Array)) {
						output[k] = [output[k]];
					}

					output[k].push(item[2]);
				} else {
					output[k] = item[2];
				}
			}
		}

		return output;
	};

	if (GM_getValue("cfuw_enabled", true)) {
		(function recursive (new_header) {
			var last = Date.parse(GM_getValue("cfuw_last_check", "Sat Oct 9 2010 20:10:26 GMT-0300")),
			curr = new Date(),
			interval = 86400000; // 24 * 60 * 60 * 1000 = 1 day
			
			if (curr - interval > last) {
				var old_header = null;

				try {
					old_header = parseHeader(GM_getResourceText("meta"));
				} catch (e) {
					console.warn('Resource META is required for the script "' + GM_info.script.name + '".\nUpdate checking was ignored!');
				}

				if (old_header) {
					GM_setValue("cfuw_last_check", (last = new Date(curr - interval + 310000)).toString());

					function nextstep(new_header) {
						var parent = document.createElement("div"),
						params = {
							"id" : old_header["uso:script"] || "",
							"name" : old_header.name || "",
							"old_version" : old_header.version || old_header["uso:version"] || I18n.get("cfuw.version.unknown"),
							"new_version" : new_header.version || new_header["uso:version"] || I18n.get("cfuw.version.unknown"),
							"history" : "",
							"i18n.title" : I18n.get("cfuw.title"), //New version available for 
							"i18n.cversion" : I18n.get("cfuw.cversion.label"), //Current version
							"i18n.lversion" : I18n.get("cfuw.lversion.label"), //Lastest version
							"i18n.install" : I18n.get("cfuw.install.label"), // Install
							"i18n.visit" : I18n.get("cfuw.visit.label"), // Visit
							"i18n.cancel" : I18n.get("cfuw.cancel.label"), // Cancel
							"i18n.disable" : I18n.get("cfuw.disable.label"), // Don't ask me again for this script
						};

						for (var key in old_header.histories) {
							if (key in new_header.histories) {
								delete new_header.histories[key];
							}
						}

						for (var key in new_header.histories) {
							params.history += "<span>" + key + "</span><ul>";

							for each (var item in new_header.histories[key]) {
								params.history += "<li>" + item + "</li>";
							}

							params.history += "</ul>";
						}

						parent.innerHTML = GM_getResourceText("updaterWindowHtml").replace(/{([\w.]+)}/g, function ($0, $1) {
							return ($1 in params ? params[$1] : $0)
						});
					
						document.body.appendChild(parent);
					
						var closeWin = setTimeout(function (w) {
							if (w) {
								w.parentNode.removeChild(w);
							}
						}, 120000, parent),
						win = "id('cfuw_" + old_header["uso:script"] + "')";

						if (params.history.length) {
							xpath(win + "//div[@class='history']")[0].style.visibility = "visible";
						}
					
						if (old_header.name + old_header.namespace != new_header.name + new_header.namespace) {
							xpath(win + "//a[contains(@class,'install')]")[0].addEventListener("click", function (e) {
								I18n.get("cfuw.uninstall.msg.error", alert); // The script name/namespace has changed.\nYou will need to uninstall the old version manually.
							}, true);
						}

						for each (var btn in xpath(win + "//a[contains(@class,'close')]")) {
							btn.addEventListener("click", function (e) {
								parent.parentNode.removeChild(parent);
								clearTimeout(closeWin);
								GM_setValue("cfuw_last_check", new Date().toString());
							}, false);
						}
					
						xpath(win+"//td[@class='disable']/input")[0].addEventListener("click", function (e) {
							GM_setValue("cfuw_enabled", !e.target.checked);
						}, false);

						setTimeout(recursive, last - curr + interval, new_header);
					}

					if (new_header) {
						nextstep(new_header);
					} else {
						GM_xmlhttpRequest({
							"method" : "get",
							"url" : old_header.resources.meta,
							"onerror" : function (xhr) {
								setTimeout(recursive, last - curr + interval);
							},
							"onload" : function (xhr) {
								var new_header = parseHeader(xhr.responseText),
								curr = new Date();

								if (/^2/.test(xhr.status) && "" + old_header["uso:hash"] != "" + new_header["uso:hash"]) {
									GM_addStyle(GM_getResourceText("updaterWindowCss"));

									nextstep(new_header);
								} else {
									GM_setValue("cfuw_last_check", curr.toString());

									setTimeout(recursive, interval);
								}
							}
						});
					}
				}
			} else {
				setTimeout(recursive, last - curr + interval);
			}
		}());
	}
}());
