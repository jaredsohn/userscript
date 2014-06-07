// ==UserScript==
// @name           Neopets : Infinite Neoboard Pens
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Simulates the neoboard pens
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0
// @language       en
// @include        http://www.neopets.com/neoboards/preferences.phtml*
// @include        http://www.neopets.com/neoboards/topic.phtml?topic=*
// @include        http://www.neopets.com/neoboards/create_topic.phtml*
// @include        http://www.neopets.com/guilds/guild_board.phtml?id=*&action=*
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=161705
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta http://userscripts.org/scripts/source/161705.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        2.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
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

(function () {
	var config = JSON.parse(GM_getValue("config", JSON.stringify({
		custom	: 2,
	}))),
	u = "-" + (xpath("string(id('header')//a[contains(@href, 'userlookup')]/text())") || "@"),
	pens = JSON.parse(GM_getValue("pens" + u, "[]")),
	active_pens = JSON.parse(GM_getValue("active_pens" + u, '{"d":0}')),
	active_pen = (/\bsetpen=(\d+)/.test(location.hash)?RegExp.$1:active_pens["d"]);

	if (/^\/neoboards\/preferences\.phtml/i.test(location.pathname)) {
		var form = xpath(".//form[contains(@action, 'process_preferences.phtml')]")[0],
		pens_list = "<table align='center' cellpadding='3' cellspacing='0' border='0'><tr>",
		container = document.createElement("div");
		
		form.addEventListener("submit", function (e) {
			GM_setValue("active_pens" + u, JSON.stringify(active_pens));

			for ( var ai = form.elements.length - 1 ; ~ai ; --ai ) {
				var input = form.elements[ai];
				switch (input.type.toLowerCase()) {
					case "text":
						pens[active_pen].form[input.name] = input.value || "";
						break;
					case "select":
					case "select-one":
						for each (var option in input.options) {
							if (option.selected) {
								pens[active_pen].form[input.name] = option.value;
								break;
							}
						};
						break;
					case "radio":
						if (input.checked) {
							pens[active_pen].form[input.name] = input.value;
						}
						break;
				}
			}

			if (pens.length - 1 != active_pen) {
				pens.pop();
			}

			GM_setValue("pens" + u, JSON.stringify(pens));

			var pn = document.getElementById("pen_name");
			if (pn) {
				pn.parentNode.removeChild(pn);
			}
		}, false);

		pens.push(pens.length?{
			"large" : "http://images.neopets.com/items/mall_thinpen_green.gif",
			"medium" : "http://images.neopets.com/items/mall_thinpen_green_40.gif",
			"small" : "http://images.neopets.com/neoboards/mall_sm_thinpen_green.gif",
			"form" : {"pen_name":"Add new"}
		}:{
			"large" : "http://images.neopets.com/neoboards/mall_notebook.gif",
			"medium" : "http://images.neopets.com/items/mall_notepad_40.gif",
			"small" : "http://images.neopets.com/neoboards/mall_sm_notebook.gif",
			"form" : {"pen_name":"Default"}
		});

		GM_addStyle("td.activePen {color:red}\ntd.activePen img {opacity:0.25};");
		for (var pen in pens) {
			pens_list += "<td align='center'><a href='/neoboards/preferences.phtml#setpen=" + pen + "'><img src='" + pens[pen].medium + "' border='0'></a><br><br><b>" + pens[pen].form.pen_name + "</b></td>";
		}
		
		container.innerHTML = pens_list += "</tr></table><br /><br />";
		form.parentNode.insertBefore(container, form.previousSibling.previousSibling.previousSibling.previousSibling);
		
		container = document.createElement("div");
		container.innerHTML = '<table width="*" cellpadding="4" cellspacing="0" border="0" style="border: 1px solid #000000;"><tr><td class="contentModuleHeaderAlt" style="border-bottom: 1px solid #000000;"><strong>Pen Name</strong></td></tr><tr><td align="center"><b>Select a name for your pen: <input type="text" value="" name="pen_name" size="16" maxlength="11" id="pen_name">&nbsp;&nbsp;</td></tr></table><br /><br />';
		form.insertBefore(container, form.elements.namedItem("pen_type").nextSibling);
		
		var pens_link = xpath(".//td[a[contains(@href, '#setpen=')]]");

		function changePen (penNode) {
			for (var ai in pens_link) {
				pens_link[ai].removeAttribute("class");
			}

			if (/\bsetpen=(\d+)/.test(penNode.firstElementChild.href)) {
				penNode.setAttribute("class", "activePen");
				active_pens["d"] = active_pen = parseInt(RegExp.$1, 10);

				for (var ai = form.elements.length - 1;~ai;--ai) {
					var input = form.elements[ai],
					value = pens[active_pen].form[input.name];

					if (input.name in pens[active_pen].form) {
						switch (input.type.toLowerCase()) {
							case "text":
								input.value = value || "";
								break;
							case "select":
							case "select-one":
								for each (var option in input.options) {
									if (option.value == value && (option.index > 0 || "activeAv" != input.name) && !/^-+$/.test(option.textContent)) {
										location.href = "javascript:void(document.images['avatar'].src = 'http://images.neopets.com/neoboards/avatars/" + input.options[option.index].value + ".gif')";
										option.selected = true;
										break;
									}
								}
								break;
							case "radio":
								if (input.value == value) {
									input.checked = true;
								}
								break;
						}
					}
				}
			}
		}

		for (var ai in pens_link) {
			pens_link[ai].addEventListener("click", function (e) {
				changePen(xpath("./ancestor::td[1]", e.target)[0]);

				e.preventDefault();
			}, false);
			
			if (ai == active_pen) {
				changePen(pens_link[ai]);
			}
		}
	} else {
		var page = (function (path) {
			switch (path) {
				case "/neoboards/create_topic.phtml":
					return [".//td[@class = 'content']/form[@name = 'message_form']/table[2]", function () {
						var sel = xpath(".//select[@name = 'board_id']")[0];
						
						return ["n", ~sel.selectedIndex && ("n" + sel.options[sel.selectedIndex].value)];
					}];
				case "/neoboards/topic.phtml":
					return [".//td[@class = 'content']/div/form[@name = 'message_form']/table", function () {
						var opt = xpath("string(.//a[contains(@href, 'boardlist.phtml?board=')]/@href)");

						return ["n", /\bboard=(\d+)/.test(opt) && ("n" + RegExp.$1)];
					}];
				default:
					return [".//td[@class = 'content']//tr[4]/td/table", function () {
						var opt = xpath("string(.//form[@name = 'message_form' and contains(@action, '?id=')]/@action)");

						return ["g", /\bid=(\d+)/.test(opt) && ("g" + RegExp.$1)];
					}];
			}
		}(location.pathname)),
		table = xpath(page[0])[0];

		if (table) {
			var keys = page[1]();
			
			for (var k in keys) {
				var key = keys[k];

				if (key && !(key in active_pens)) {
					active_pens[key] = active_pen;
				}
			}
			
			active_pen = active_pens[(config.custom & 2) && keys[1] || (config.custom & 1) && keys[0] || "d"];

			var cell = table.insertRow(table.rows.length - 1).insertCell(0),
			output = '<table cellspacing="0" cellpadding="10" border="0" align="center" style="border: 1px solid black;"> <tbody><tr>';

			cell.setAttribute("align", "center");
			if (!/^\/guilds\/guild_board\.phtml/i.test(location.pathname)) {
				cell.setAttribute("colspan", "2");
			}

			for (var pen in pens) {
				output += '<td width="64" align="center"><img width="16" height="16" border="0" src="' + pens[pen].small + '" /><br />' + pens[pen].form.pen_name + '<br /><input type="radio"' + (active_pen == pen?' checked="checked"':'')+' value="' + pen + '" name="select_pen" /></td>';
			}

			output += '</tr></tbody></table>';

			cell.innerHTML = output;
			
			function selectRadio (target, e) {
				if (active_pens["d"] != target.value) {
					e.preventDefault();

					delete pens[target.value].form.pen_name;

					var list = Array.prototype.slice.apply(e.target.elements);
					for (var ai in list) {
						if (/^submit$/i.test(list[ai].type)) {
							list[ai].setAttribute("disabled", "disabled");

							HttpRequest.open({
								"method"	: "post",
								"url"		: "http://www.neopets.com/neoboards/process_preferences.phtml",
								"headers"	: {
									"Referer" : "http://www.neopets.com/neoboards/preferences.phtml",
								},
								"onsuccess"	: function () {
									active_pens[keys[0]] = active_pen = parseInt(target.value, 10);
									if (keys[1]) {
										active_pens[keys[1]] = active_pen;
									}

									GM_log("Neopen changed from " + active_pens["d"] + " to " + active_pen);

									active_pens["d"] = active_pen;

									GM_setValue("active_pens" + u, JSON.stringify(active_pens));
									
									e.target.submit();
								},
								"onerror"	: function () {
									GM_log("Unable to change neopen from " + active_pens["d"] + " to " + target.value);

									e.target.submit();
								}
							}).send(pens[target.value].form);

							break;
						}
					}
				}
			}

			var radio = cell.getElementsByTagName("input")[0];
			(radio && radio.form || xpath(".//form[@name = 'message_form']")[0]).addEventListener("submit", function (e) {
				var opts = xpath(".//input[@type = 'radio' and @name = 'select_pen']", cell);

				for (var ai in opts) {
					var opt = opts[ai];
					
					if (opt.checked) {
						selectRadio(opt, e);

						opt.checked = false;
					}
				}
			}, false);
		}
	}
}());