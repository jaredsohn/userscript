// ==UserScript==
// @name           Neopets : Shop Wizard : Improved Search
// @namespace      http://gm.wesley.eti.br
// @description    Improves the Shop Wizard
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.1
// @language       en
// @include        http://www.neopets.com/market.phtml?type=wizard
// @include        http://www.neopets.com/market.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @resource       meta http://userscripts.org/scripts/source/164819.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       winConfigCss http://pastebin.com/download.php?i=Ldk4J4bi
// @resource       neopetsMessageJson http://pastebin.com/download.php?i=yFSPiWT7
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/56503.user.js
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://userscripts.org/scripts/source/56562.user.js
// @require        http://userscripts.org/scripts/source/163374.user.js
// @history        2.0.1 Updated Group Algorithm
// @history        2.0.0 Added WinConfig Settings + Updater + Column Group
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

GM_addStyle(".winConfig_ShopWizardImprovedSearchSettings .body .fieldName_group > fieldset .fieldClass_default > label {width: 50%}.winConfig_ShopWizardImprovedSearchSettings .fieldName_group > fieldset .fieldType_0 input {width: 20%}");

(function () {
	var win = new WinConfig({
		title	: "Shop Wizard : Improved Search : Settings",
		type	: WinConfig.WindowType.CUSTOM,
		default	: {
			group	: {
				punct	: ",",
				buyMax	: false,
				askBuys	: true,
				columns	: 0x3D,
			}
		},
		fields	: [{
			name	: "settingsHotKey",
			label	: "Settings HotKey",
			key		: "hotkey",
			callback: function(event, win) {
				win.open();
			},
		}, {
			name	: "group",
			nogroup	: true,
			type	: WinConfig.FieldType.GROUP,
			fields	: [{
				name	: "columns",
				label	: "Columns",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.NUMBER,
				multiple: true,
				unique	: true,
				empty	: 0,
				value	: [{
					value: 0x01,
					label: "Owner",
				}, {
					value: 0x02,
					label: "Item",
				}, {
					value: 0x04,
					label: "Stock",
				}, {
					value: 0x08,
					label: "Price",
				}, {
					value: 0x10,
					label: "Buy",
				}, {
					value: 0x20,
					label: "Group",
				}, {
					value: 0x0F,
					label: "Normal",
				}, {
					value: 0x3F,
					label: "All",
				}],
			}],
		}, {
			name	: "group",
			type	: WinConfig.FieldType.GROUP,
			fields	: [{
				name	: "punct",
				label	: "Thousand separator",
				description: "Character used to separate thousands.",
				help	: true,
			}, {
				name	: "buyMax",
				label	: "Buy maximum",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				description: "Buys all of the same item at once.",
				multiple: true,
				help	: true,
			}, {
				name	: "askBuys",
				label	: "Ask before buying",
				type	: WinConfig.FieldType.CHECK,
				format	: WinConfig.FieldFormat.BOOLEAN,
				description: "Asks before buying more than one of the same item at once.<br />It won't ask if only one item is available.",
				multiple: true,
				help	: true,
			}],
		}],
	}),
	config = win.get("group");

	if (config)
	if (/type=wizard/.test(location.search)) {
		GM_deleteValue("search");
	} else {
		/*
			0x00	normal
			0x01	bold
			0x02	link (2)
			0x04	np
			0x08	plain text
			0x10	align center
			0x20	align right
			0x40	event handler (3)
		*/

		var doc = Wizard.convert({
			doc		: document,
		}),
		lang = xpath("string(.//select[@name = 'lang']/option[@selected]/@value)") || "en",
		msgs = JSON.parse(GM_getResourceText("neopetsMessageJson"))[lang],
		notFound = [msgs.itemNotFound, msgs.shopIsEmpty],
		isWhite = true,
		isWhite2 = false,
		priceColumnIndex = -1,
		attrs = [
			[0x03, "Owner", "Link"],
			[0x08, doc.search],
			[0x10, "Stock"],
			[0x25, "Price"],
			[0x5A, "$$", "Link", function (e, params) {
				e.preventDefault();
				var o = params.item;

				Shop.list({
					link		: o.Link || e.target.href,
					onsuccess	: function (obj) {
						(function buyItem (obj, qnty) {
							if (obj.list.length && qnty) {
								for (var ai in obj.list) {
									var i = obj.list[ai];

									if (i.Id == o.Id) {
										if (-1 == qnty) {
											qnty = (config.buyMax?i.Quantity:1);

											if (i.Quantity > 1 && config.askBuys) {
												qnty = prompt("How many items to buy?", qnty);
											}

											if (qnty > i.Quantity) {
												qnty = i.Quantity;
											}
										}

										if (0 < qnty) {
											if (o.Stock != i.Quantity) {
												o.Stock = i.Quantity;

												for (var ai in search) {
													if (search[ai].Link == o.Link) {
														search[ai].Stock = o.Stock;

														if (~priceColumnIndex) {
															params.row.cells[priceColumnIndex].innerHTML = o.Stock;
														}

														GM_setValue("search", JSON.stringify(search));

														break;
													}
												}
											}

											obj.onsuccess = function (obj) {
												if (--qnty) {
													buyItem(obj, qnty);
												} else {
													if (0 <= --o.Stock && (!obj.message || ~notFound.indexOf(obj.message.textContent) && !(o.Stock = 0))) {
														for (var ai in search) {
															if (search[ai].Link == o.Link) {
																search[ai].Stock = o.Stock;

																if (~priceColumnIndex) {
																	params.row.cells[priceColumnIndex].innerHTML = o.Stock;
																}

																GM_setValue("search", JSON.stringify(search));

																break;
															}
														}

														if (!o.Stock) {
															for (var ai in params.row.cells) {
																var cell = params.row.cells[ai];
																cell.innerHTML = "<del>" + cell.innerHTML + "</del>";
															}
														}
													}

													alert("Item(s) bought successfully!");
												}
											}
											obj.onerror = function (obj) {
												alert(obj.message.textContent);
											};
											obj.link = i.Link;

											GM_log("[" + qnty + "] Buying " + obj.referer + "...");
											setTimeout(Shop.buy, 1000, obj);
										}

										return;
									}
								}
							}

							if (obj.message) {
								if (0 < o.Stock && ~notFound.indexOf(obj.message.textContent)) {
									o.Stock = 0;

									for (var ai in search) {
										if (search[ai].Link == o.Link) {
											params.row.cells[2].innerHTML = search[ai].Stock = o.Stock;

											GM_setValue("search", JSON.stringify(search));

											break;
										}
									}

									for (var ai in params.row.cells) {
										var cell = params.row.cells[ai];
										cell.innerHTML = "<del>" + cell.innerHTML + "</del>";
									}
								}

								alert(obj.message.textContent);
							} else {
								GM_log(obj.response.text);

								alert("Unknown error while listing items.");
							}
						}(obj, -1));
					}
				});
			}],
			[0x10, "Group"],
		],
		search = JSON.parse(GM_getValue("search", "[]")),
		updateAttrs = function (obj) {
			for (var bi in attrs) {
				if ((Math.pow(2, bi) & config.columns) && obj.index <= bi) {
					(function (attr) {
						var cell = obj.row.insertCell(-1),
						x = (attr[0] & 0x08?attr[1]:obj.item[attr[1]]);
						cell.setAttribute("bgcolor", obj.bgcolor);

						if (attr[0] & 0x10) {
							cell.setAttribute("align", "center");
						} else if (attr[0] & 0x20) {
							cell.setAttribute("align", "right");
						}

						if (attr[0] & 0x04) {	// NP
							x = ("" + x).replace(/\d(?=(?:\d{3})+(?:\D|$))/g, "$&" + config.punct) + ' NP';
						}
						if (attr[0] & 0x01) {	// bold
							x = '<b>' + x + '</b>';
						}
						if (attr[0] & 0x02) {	// link
							x = '<a href="' + obj.item[attr[2]] + '">' + x + '</a>';
						}
						if (!obj.item.Stock) {
							x = '<del>' + x + '</del>';
						}
						cell.innerHTML = x;
						if (attr[0] & 0x40) {
							cell.firstChild.addEventListener("click", function (e) {
								attr[3](e, obj);
							});
						}
					}(attrs[bi]));
				}
			}
		},
		table = xpath(".//td[@class = 'content']/div[2]/table[.//tr[1][td[@class = 'contentModuleHeaderAlt']]][position() = last()]")[0];
		
		if (0x04 & config.columns) {
			for (var ai = 3;ai--;) {
				priceColumnIndex += !!(Math.pow(2, ai) & config.columns);
			}
		}

		if (!table) {
			var t = document.createElement("div"),
			anchor = xpath(".//td[@class = 'content']/div[2]/table[1]/following-sibling::br[2]")[0];
			t.innerHTML = '<table width="600" cellspacing="0" cellpadding="3" border="0" align="center"><tbody><tr><td class="contentModuleHeaderAlt"><b>Shop Owner</b></td><td class="contentModuleHeaderAlt"><b>Item</b></td><td width="40" class="contentModuleHeaderAlt"><b>Stock</b></td><td width="80" class="contentModuleHeaderAlt"><div align="right"><b>Price</b></div></td></tr></tbody></table>';

			isWhite = false;
			table = anchor.parentNode.insertBefore(t.firstChild, anchor);
		}

		var hh = ["Buy", "Group"];
		for (var ai in hh) {
			var h = table.rows[0].insertCell(-1);
			h.setAttribute("class", "contentModuleHeaderAlt");
			h.setAttribute("style", "text-align: center");
			h.innerHTML = "<b>" + hh[ai] + "</b>";
		}

		for (var ai = table.rows.length;ai--;)
		for (var bi = table.rows[ai].cells.length;bi--;) {
			if (!(Math.pow(2, bi) & config.columns)) {
				table.rows[ai].deleteCell(bi);
			}
		}

		if (doc.list.length) {
			var currentGroup = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_".indexOf(doc.list[0].Owner[0].toUpperCase()) % 13,
			users = [];
			
			a:for (var ai in doc.list) {
				doc.list[ai].Group = currentGroup;

				for (var bi in search) {
					if (search[bi].Owner == doc.list[ai].Owner && search[bi].Id == doc.list[ai].Id) {
						users.push(bi);

						continue a;
					}
				}

				doc.list[ai].Search = search.push(JSON.parse(JSON.stringify(doc.list[ai]))) - 1;
				users.push(doc.list[ai].Search.toString());
			}

			// removes all shops that used to be in the list but isn't anymore (item bought or removed)
			for (var ai in search) {
				if (currentGroup == search[ai].Group && !~users.indexOf(ai)) {
					search[ai].Stock = 0;
				}
			}

			console.log("Group", currentGroup);

			search.sort(function (a, b) {
				if (a.Id == b.Id) {
					if (a.Price == b.Price) {
						if (a.Stock == b.Stock) {
							return (a.Owner > b.Owner?1:-1);
						} else {
							return (a.Stock > b.Stock?1:-1);
						}
					} else {
						return (a.Price > b.Price?-1:1);
					}
				} else {
					return (a.Item > b.Item?-1:1);
				}
			});

			GM_setValue("search", JSON.stringify(search));

			var list = xpath(".//tbody/tr[position() > 1]", table);
			for (var ai in doc.list) {
				updateAttrs({
					index	: 4,
					item	: doc.list[ai],
					row		: list[ai],
					bgcolor	: (isWhite2?"#FFFFFF":"#F6F6F6"),
				});
				
				isWhite2 = !isWhite2;
			}
		}

		var fsearch = search.filter(function (element, index, array) {
			if (element.Item == doc.search && (!doc.list.length || element.Price <= doc.list[0].Price)) {
				for (var ai in doc.list) {
					var i = doc.list[ai];

					if (i.Owner == element.Owner && i.Id == element.Id) {
						return false;
					}
				}

				return true;
			}

			return false;
		});

		b:for (var ai in search) {
			var element = search[ai];

			if (element.Item == doc.search && (!doc.list.length || element.Price <= doc.list[0].Price)) {
				for (var ai in doc.list) {
					var i = doc.list[ai];

					if (i.Owner == element.Owner && i.Id == element.Id) {
						continue b;
					}
				}

				updateAttrs({
					index	: 0,
					item	: element,
					row		: table.insertRow(1),
					bgcolor	: (isWhite?"#FFFFFF":"#FDEDFD"),
				});

				isWhite = !isWhite;
			}
		}
	}
}());