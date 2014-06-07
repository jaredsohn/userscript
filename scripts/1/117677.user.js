// ==UserScript==
// @name           Neopets : Fetch! Helper
// @namespace      http://gm.wesley.eti.br
// @description    Automatically draws the parts of the map you've seen.
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        3.0.0
// @language       en
// @include        http://www.neopets.com/games/maze/maze.phtml*
// @grant          GM_log
// @grant          GM_addStyle
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_deleteValue
// @grant          GM_xmlhttpRequest
// @grant          GM_getResourceText
// @icon           http://gm.wesley.eti.br/icon.php?desc=117677
// @resource       includes http://pastebin.com/download.php?i=eArANXdm
// @resource       meta http://userscripts.org/scripts/source/117677.meta.js
// @resource       i18n http://pastebin.com/download.php?i=ULrVTsSg
// @resource       updaterWindowHtml http://pastebin.com/download.php?i=3gr9tRAT
// @resource       updaterWindowCss http://pastebin.com/download.php?i=C1qAvAed
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/56489.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @require        http://pastebin.com/download.php?i=P6VTBRRK
// @history        3.0.0 Added <a href="http://userscripts.org/guides/773">Includes Checker</a>
// @history        2.0.0.0 Updated @require#87942
// @history        1.0.4.0 Prevents from going to inaccessible directions
// @history        1.0.3.4 Improved queued directions
// @history        1.0.3.2 Fixed minor bug
// @history        1.0.3.1 Code refactoring
// @history        1.0.3.0 Fixed "hidden" div
// @history        1.0.2.1 Fixed @resource i18n
// @history        1.0.2.0 Fixed updater
// @history        1.0.1.1 Code refactoring
// @history        1.0.1.0 Fixed some bugs
// @history        1.0.0.1 Fixed insane mode
// ==/UserScript==

/**************************************************************************

    Author's NOTE

    This script was made from scratch.

    Based on http://userscripts.org/scripts/show/46415 (by nungryscpro)

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

GM_addStyle("#fetch_map td { font-size: 11px; line-height:1px; }");

var table, queue = [], pending = {
	"status" : false,
	"show" : function() {
		this.status = true;

		var div = document.createElement("div"),
		compass = xpath(".//tbody/tr/td[3]/div[.//img[@id = 'thecompass']]", table)[0];
		div.setAttribute("style", "position:relative;");
		div.innerHTML = '<div style="position: absolute;">&nbsp;Processing...</div>';
		
		compass.insertBefore(div, compass.firstElementChild.nextElementSibling);
	},
	"hide" : function() {
		this.status = false;
	}
};

function getCellPath(cell) {
	return /\/path_(\w+)\./.test(cell.getAttribute("background")) && RegExp.$1;
}

function innerText(s, t, tt, c) {
	return '<div style="position:relative;top:-' + Math.floor((s + 3) / 2) + 'px;"><div style="position:absolute;font-weight:bold;text-align:center;top:0px;width:' + s + 'px;height:' + s + 'px;color:' + (c ? c : 'white') + ';cursor:' + (tt ? 'help;" title="' + tt : 'default;') + '">' + t + '</div></div>';
}

function recursive (obj) {
	var old = xpath(".//td[@class = 'content']//table[.//img[contains(@src, '/maze/blumaroo')]]", document)[0];

	table = xpath(".//td[@class = 'content']//table[.//img[contains(@src, '/maze/blumaroo')]]", obj.document || document)[0];
	pending.hide();

	if (old && table) {
		var div = document.createElement("div"),
		texts = xpath(".//td[3]/div/b/text()", table),
		moves = /\d+/.test(texts[0].textContent) && parseInt(RegExp["$&"], 10),
		err = xpath("string(.//div[contains(@style, 'solid red;')]/text())", table),
		compass = xpath(".//tbody/tr/td[3]/div[.//img[@id = 'thecompass']]", table)[0];

		div.setAttribute("style", "border:1px solid black;padding:3px 0px;");

		var map = JSON.parse(GM_getValue("map", '{"x":0,"y":0,"start":[2,2],"limit":[0,0,0,0],"data":[]}'));
		
		if (map.moves != moves && !(err.replace(/[^!]+/g, "").length % 2) && /movedir=(\d+)/.test(obj.referer)) {
			// 0 1 2 3 : up down right left
			var movedir = parseInt(RegExp.$1, 10);
			
			map[movedir & 2 ? "x" : "y"] += movedir & 1 ? 1 : -1;
			//map.start[movedir & 2] += movedir & 1 ? 1 : -1;
			
			if (!~map.y) {	// -1 up (add row)
				map.data.unshift([]);
				map.y = 0;
				map.start[1]++;
				if (map.item) {
					map.item[1]++;
				}
				if (map.exit) {
					map.exit[1]++;
				}
			} else if (!~map.x) {	// -1 left (add col)
				for each (var row in map.data) {
					row.unshift(undefined);
				}
				map.x = 0;
				map.start[0]++;
				if (map.item) {
					map.item[0]++;
				}
				if (map.exit) {
					map.exit[0]++;
				}
			}
		} else {
			queue = [];
		}
		map.moves = moves;
		map.iso = [0, 0];
		
		for each (var cell in xpath(".//td[@background]", table)) {
			var cr = [cell.parentNode.rowIndex, cell.cellIndex],
			r = map.y + cr[0],
			c = map.x + cr[1],
			path = getCellPath(cell),
			img = /\/maze\/item_/.test(xpath("string(./img/@src)", cell));
			
			if (!(r in map.data)) {
				map.data[r] = [];
			}
			map.data[r][c] = path;

			if (path == "iso" ||
			("lr" == path && 2 == cr[0] && "iso" == map.data[r - 1][c] && "iso" == getCellPath(cell.parentNode.parentNode.rows[cr[0] + 1].cells[cr[1]])) ||
			("ud" == path && 2 == cr[1] && "iso" == map.data[r][c - 1] && "iso" == getCellPath(cell.parentNode.cells[cr[1] + 1]))) {
				for (var ai = 0;ai < 2;++ai) {
					if (2 == cr[ai]) {
						var ni = (1 + ai) % 2, cr2 = 1 * (cr[ni] > 2), fn = Math[cr2 ? "max" : "min"];
						map.iso[ni] = fn(map.iso[ni], (cr2 ? 1 : -1) * (cr[ni] & 1 ? 2 : 1));
						map.limit[2 * ai + cr2] = -fn(-map.limit[2 * ai + cr2], map.iso[ni]);
					}
				}
			}
			
			if (img) {
				map.item = [c, r];
			}
		}

		var data = '<table id="fetch_map" border="0" cellspacing="0" cellpadding="0">',
		max = 0;

		for each (var row in map.data) {
			if (max < row.length) {
				max = row.length;
			}
		}

		var limits = [
			[/^(?:x|t_[dlu]|l[urd]?)$/, 0],	// left
			[/^(?:x|t_[dru]|lr|r[ud]?)$/, max - 1],	//right
			[/^(?:x|t_[lru]|ud|[rl]?u)$/, 0],	// up
			[/^(?:x|t_[dlr]|[url]?d)$/, map.data.length - 1]	// down
		];
		a:for (r = 4 + map.y;r >= map.y;--r)
		for (c = 4 + map.x;c >= map.x;--c) {
			path = map.data[r][c];

			for (var x in limits) {
				if (map.limit[x] && (x > 1 ? r : c) == map.limit[x] + limits[x][1] && limits[x][0].test(path)) {
					map.exit = [c, r];
					break a;
				}
			}
		}

		var map_str = JSON.stringify(map);

		map = JSON.parse(map_str);

		var size = Math.min(Math.floor(391 / (max - map.limit[0] + map.limit[1])), 20);
		for (var row in map.data) {
			if (map.limit[2] <= row && row < map.data.length + map.limit[3]) {
				data += "<tr>";
				for (var cell in map.data[row]) {
					if (map.limit[0] <= cell && cell < max + map.limit[1]) {
						var col = map.data[row][cell];
						if (col) {
							data += '<td><img style="position:relative" border="0" width="' + size + '" height="' + size + '" src="http://images.neopets.com/games/maze/path_' + col + '.gif" /></td>';
						} else {
							data += '<td>&nbsp;</td>';
						}
					}
				}
				data += "</tr>";
			}
		}
		div.innerHTML = data += "</table>";
		
		GM_setValue("map", map_str);

		var bx = map.x + 2, by = map.y + 2,
		cy = - map.limit[2], cx = - map.limit[0],
		points = [
			[map.exit, ["E", "You have found the exit!"]],
			[map.item, (texts.length > 1 ? ["O", "You have got the item!", "yellowgreen"] : ["X", "You haven't got the item."])],
			[map.start, ["S", "This is where you started."]],
			//[[2,8], ["•"]],	// -2 -1 0 1 : left up down right
		], pp = {
			"added" : [[bx, by]],
			"test" : function (point) {
				for each (var p in this.added) {
					if (point[0] == p[0] && point[1] == p[1]) {
						return false;
					}
				}
				return true;
			}
		};
		if (queue.length - 1 > 0) {
			var sum = [by, bx];
			for (var i in queue) {
				var x = queue[i];
				if (i!=0)
				sum[x&2?1:0] += (x%2?1:-1);
			}
			points.unshift([[sum[1], sum[0]], ["Y", "Here is where you were supposed to be."]]);
		}
		div.firstElementChild.rows[by + cy].cells[bx + cx].innerHTML += '<div style="position:relative;top:-' + size + 'px;"><div style="position:absolute;top:0px;left:0px;"><img src="http://images.neopets.com/games/maze/blumaroo_s.gif" border="0" width="' + size + '" height="' + size + '" /></div></div>';
		
		for each (var p in points) {
			if (p[0] && pp.test(p[0])) {
				pp.added.push(p[0]);
				p[1].unshift(size);
				try {
					div.firstElementChild.rows[p[0][1] + cy].cells[p[0][0] + cx].innerHTML += innerText.apply(this, p[1]);
				} catch (e) {
					console.log("Position not found", " X = " + (p[0][0] + cx), " Y = " + (p[0][1] + cy));
				}
			}
		}

		compass.parentNode.insertBefore(div, compass.nextElementSibling);
		div.parentNode.insertBefore(document.createElement("br"), div);
		
		if (obj.document) {
			old.parentNode.replaceChild(table, old);
		}

		function click (e) {
			if (queue.length < moves) {
				if (/movedir=(\d+)/.test(e.target.href)) {
					var sum = [by, bx];
					for each (var x in queue) {
						sum[x&2?1:0] += (x%2?1:-1);
					}
					x = RegExp.$1;

//					alert(map.data[sum[0]][sum[1]]);
					if (limits[[2, 3, 0, 1][x]][0].test(map.data[sum[0]][sum[1]])) {
						queue.push(x);
						sum[x&2?1:0] += (x%2?1:-1);

						try {
							div.firstElementChild.rows[sum[0] + cy].cells[sum[1] + cx].innerHTML += innerText.apply(this, [size, "•"]);
						} catch (e) {
							console.log("Position not found", " X = " + sum[1], " Y = " + sum[0]);
						}

						recursiveQueue({
							"target" : e.target,
							"referer" : obj.referer
						});
					} else {
						alert("You can not go that way.");
					}
				}
			}

			e.preventDefault();
		}		

		for each (var area in xpath(".//map[@name = 'navmap']/area", table)) {
			area.addEventListener("click", click, false);
		}

		return true;
	} else {
		if (old && obj.document) {
			old.parentNode.replaceChild(xpath(".//td[@class = 'content']//center[img[contains(@src, '/games/maze/')]]", obj.document)[0], old);
		}

		GM_deleteValue("map");
		
		return false;
	}
}

function recursiveQueue(e) {
	if (!pending.status) {
		pending.show();

		HttpRequest.open({
			"url" : e.target.href,
			"method" : "get",
			"headers" : {
				"Referer" : e.referer
			},
			"onsuccess" : function(xhr) {
				if (recursive({
					"referer" : xhr.response.raw.finalUrl,
					"document" : xhr.response.xml
				})) {
					queue.shift();
					
					if (queue.length) {
						var area = xpath(".//map[@name = 'navmap']/area[contains(@href, 'movedir=" + queue[0] + "&')]", table)[0];
						
						if (area) {
							recursiveQueue({
								"target" : area,
								"referer" : xhr.response.raw.finalUrl
							});
						}
					}
				}
			},
			"onerror" : function (xhr) {
				pending.hide();
			}
		}).send();
	}
}

recursive({
	"referer" : location.href
});

document.addEventListener("keypress", function (e) {
	switch (e.keyCode) {
		case 37:	// 2	left
		case 38:	// 0	up
		case 39:	// 3	right
		case 40:	// 1	down
			var area = xpath(".//map[@name = 'navmap']/area[contains(@href, 'movedir=" + [2, 0, 3, 1][e.keyCode - 37] + "&')]", table)[0];

			if (area) {
				area.click();
			}

			e.preventDefault();
			break;
	}
}, false);