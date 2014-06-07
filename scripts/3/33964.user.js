// ==UserScript==
// @name           Neopets : Quickstock
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Only checks the first 70 items whether you click Check All
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        4.2.6
// @language       en
// @include        http://www.neopets.com/quickstock.phtml
// @include        http://www.neopets.com/quickstock.phtml?r=*
// @icon           http://gm.wesley.eti.br/icon.php?desc=33964
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @resource       meta http://userscripts.org/scripts/source/33964.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/144996.user.js
// @require        http://userscripts.org/scripts/source/163374.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @cfu:version    version
// @history        4.2.6 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        4.2.5 Fixed language Korean
// @history        4.2.1 Fixed a major bug ( Thanks <a href="http://userscripts.org/topics/75987#posts-505912">Weasel</a> )
// @history        4.1.0 Added missing @require#56489
// @history        4.0.0 Added Quickstock Settings
// @history        3.1.0 Added Queued Events ( @require#144996 )
// @history        3.0.0.0 Updated @require#87942
// @history        2.0.1.4 Added option "Neodeck"
// @history        2.0.1.2 Fixed NC items
// @history        2.0.1.1 Fixed header labels
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

/*
	Stock		0x000001
	Deposit		0x000002
	Donate		0x000004
	Discard		0x000008	(disabled by default)
	Gallery		0x000010
	Closet		0x000020	(disabled by default)
	Shed		0x000040	(disabled by default)

	Feed		0x001000
	Read		0x002000
	Play		0x004000	(disabled by default)
	Equip		0x008000	(disabled by default)
	Give		0x010000	(disabled by default)
	Neodeck		0x020000	(disabled by default)
	Bless		0x040000	(disabled by default)
	
	Normal		0x000FFF
	Show all	0xFFFFFF
*/

(function () {	// script scope
	I18n.locale = document.querySelector("select[name = 'lang'] option[selected]").getAttribute("value").replace("zh", "zh-TW").replace("ch", "zh-CN");

	var normal = xpath(".//td[@class = 'content']//form//tr[1]/th[position() > 1]/b").map(function (value, index) {
		return [Math.pow(2, index), value.textContent, -1];
	});
	
	if (normal.length > 12) {
		alert("[Neopets : Quickstock]\n\n" + __("Woah! There are too many options."));
	} else if (normal.length) {
		var custom = [
			[0x001000, "Feed", 1, "Feed to"],
			[0x002000, "Read", 1, "Read to"],
			[0x004000, "Play", 1, "Play with"],
			[0x008000, "Equip", 1, "Equip"],
			[0x010000, "Give", 2, "", "or_name"],
			[0x020000, "Neodeck", 0, "neodeck"],
			[0x040000, "Bless", 1, "Bless"],
		],
		options = [
			[0x000FFF, "Normal"],
			[0xFFFFFF, "Show all"],
		];

		Array.prototype.unshift.apply(options, custom);
		Array.prototype.unshift.apply(options, normal);

		var win = new WinConfig({
			title		: "Quickstock : Settings",
			store		: true,
			size		: ["350px", 0],
			load		: function () {
				location.replace("http://www.neopets.com/quickstock.phtml");
			},
			fields		: [{
				name		: "settingsHotKey",
				label		: __("Settings HotKey"),
				key			: "hotkey",
				callback	: function (event, win) {
					win.open();
				},
			}, {
				label		: __("Columns"),
				type		: WinConfig.FieldType.CHECK,
				format		: WinConfig.FieldFormat.NUMBER,
				multiple	: true,
				unique		: true,
				name		: "activate",
				empty		: 0x000000,
				default		: 0x003017,
				value		: options.map(function (value) {
					return {
						value	: value[0],
						label	: (!~value[2]?value[1]:__(value[1])),
					};
				}),
			}],
		}),
		visible = win.get("activate", 0x000FFF),
		isFirstRow = true,
		form = xpath(".//form[@name = 'quickstock']")[0],
		add = 0;
		rows = xpath(".//td[@class = 'content']//form/table/tbody/tr"),
		colspan = 8,
		addEvent = function (elem) {
			if ("checkall" == elem.name) {
				elem.removeAttribute("onclick");
				elem.addEventListener("click", checkAll, false);
			} else {
				elem.removeAttribute("ondblclick");
				elem.addEventListener("dblclick", uncheckAll, false);
			}
		},
		checkAll = function (e) {
			e.target.checked = true;
			location.assign("javascript:void(check_all(" + e.target.parentNode.cellIndex + "));");
		},
		uncheckAll = function (e) {
			e.target.checked = false;
			xpath(".//td[position() = " + (1 + e.target.parentNode.cellIndex) + "]/input[@name = 'checkall']")[0].checked = false;
		},
		wait = false;

		for each (var row in rows) {
			if (row.cells.length > 5) {
				for each (var action in custom) {
					if (visible & action[0]) {
						var cell = row.appendChild(row.cells[1].cloneNode(true)),
						elem = cell.firstElementChild;

						if (elem instanceof HTMLInputElement) {
							addEvent(elem);

							if ("checkall" == elem.name) {
								colspan = row.cells.length;
							} else {
								elem.value = action[1].toLowerCase();
							}
						} else if (elem) {
							elem.textContent = __(action[1]);
						}
					}
				}

				var removed = -1;
				for each (var cell in Array.prototype.slice.apply(row.cells, [1, 1 + normal.length])) {
					if (visible & Math.pow(2, removed + cell.cellIndex)) {
						var elem = cell.firstElementChild;

						if (elem instanceof HTMLInputElement) {
							addEvent(elem);
						}
					} else {
						row.deleteCell(cell.cellIndex);
						++removed;
					}
				}
			} else {
				var cell = row.cells[row.cells.length - 1];
				cell.setAttribute("colspan", colspan - row.cells.length + 1);
			}
		}

		form && form.addEventListener("submit", function (e) {
			if (wait) {
				e.preventDefault();
				alert("Please, be patient!");
			} else {
				wait = true;

				var hasCustom = false,
				hasErrors = false,
				hasNormal = false,
				name = [],
				useObject = function (id, data, elem) {
					elem.checked = false;
					//elem.parentNode.parentNode.parentNode.removeChild(elem.parentNode.parentNode);

					return [id, data, GM_xmlhttpRequest({
						"method"		: "POST",
						"url"			: "http://www.neopets.com/useobject.phtml",
						"headers"		: {
							"Content-Type"	: "application/x-www-form-urlencoded",
							"Referer"		: "http://www.neopets.com/iteminfo.phtml?obj_id=" + id,
						},
						"onload"		: function (xhr) {
							var text = xhr.responseText,
							doc = document.implementation.createHTMLDocument("");

							doc.documentElement.innerHTML = text.replace(/<(style|script)[^]+?<\/\1>/g, "").replace(/\s{2,}/g, " ");

							var trimmedText = doc.documentElement.textContent.trim();

							elem.parentNode.setAttribute("title", trimmedText);

							if (~text.indexOf("errorOops") || ~text.indexOf("/3/2.png") || !trimmedText) {
								elem.parentNode.textContent = "N/A";

								hasErrors = true;
							}
						},
						"data"			: data,
						"synchronous"	: true,
					})];
				},
				ql = new QueuedList();

				for each (var elem in Array.prototype.slice.apply(e.target.elements)) {
					if (elem.checked && /^radio_arr\[(\d+)\]$/.test(elem.name)) {
						var rid = RegExp.$1,
						isNormal = true;

						for each (var action in custom) {
							if (action[1].toLowerCase() == elem.value) {
								var nmkey = action[2] - 1,
								obj_id = xpath("string(.//input[@name = 'id_arr[" + rid + "]']/@value)");

								if (~nmkey && undefined === name[nmkey]) {
									name[nmkey] = prompt.apply(null, (nmkey ? [__("Username:"), GM_getValue("name", "")] : [__("Petname:"), xpath("string(.//a[contains(@href, 'quickref.phtml')]/b/text())")])) || "";

									if (nmkey) {
										GM_setValue("name", name[nmkey]);
									}
								}

								if (obj_id && (!~nmkey || name[nmkey])) {
									var content = "obj_id=" + encodeURIComponent(obj_id) +
										"&action=" + encodeURIComponent(action[3]);

									if (~nmkey) {
										content += (action[4] ? "&" + encodeURIComponent(action[4]) + "=" : "%20") +
										encodeURIComponent(name[nmkey]);
									}

									ql.add([useObject, [obj_id, content, elem]]);

									hasCustom = true;
									isNormal = false;
								} else {
									elem.checked = false;
								}

								break;
							}
						}

						if (isNormal) {
							hasNormal = true;
						}
					}
				}
				
				if (hasCustom) {
					e.preventDefault();

					ql.add([function (target) {
						target.removeAttribute("onsubmit");

						if (hasNormal) {
							target.submit();
						} else {
							wait = false;

							if (hasErrors) {
								alert(__("Some errors occurred when executing custom actions."));
							}
						}
					}, e.target]);

					ql.run();
				}
			}
		}, false);
	}

	// overwrites check_all function
	unsafeWindow.check_all = function (col) {
		var total = 0;

		for each (var elem in xpath(".//form[@name = 'quickstock']//tr[position() != last() - 1]/td/input[@type = 'radio']")) {
			elem.checked = (elem.parentNode.cellIndex == col && ++total <= 70);
		}
	};
}());