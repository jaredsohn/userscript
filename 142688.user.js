// ==UserScript==
// @name           Includes : Neopets : Neggbreaker
// @namespace      http://gm.wesley.eti.br
// @description    Neggbreaker Function
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2012+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.1.1
// @language       en
// @include        nowhere
// @exclude        *
// @require        http://images.neopets.com/js/jquery-1.7.1.min.js?v=1
// @require        http://userscripts.org/scripts/source/144996.user.js
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

Neggbreaker = function () {};
Neggbreaker.solver = function (params) {
	var list = [];
	$(params.clues + " table").each(function (index, node) {
		var table = {
			area	: 1,
			nodes	: [],
			width	: 1,
			height	: 1,
		};
		$(params.cells, node).each(function(index, node) {
			if (/clue[-_]s(\w)c(\w)/.test(node.getAttribute("class"))) {
				var pos = [node.parentNode.cellIndex, node.parentNode.parentNode.rowIndex],
				s = parseInt(RegExp.$1, 10),
				c = parseInt(RegExp.$2, 10);

				table.width = Math.max(table.width, 1 + pos[0]);
				table.height = Math.max(table.height, 1 + pos[1]);
				table.area = table.width * table.height;
				table.nodes.push({
					symbol	: (isNaN(s)?-1:s),
					color	: (isNaN(c)?-1:c),
					column	: pos[0],
					row	: pos[1],
				});
			}
		});
		list.push(table);
	});

	list.sort(function (a, b) {
		if (a.area == b.area) {
			var x = [[0,0], [0,0]],
			l = [a, b];

			for (var nx in l) {
				for each (var xx in l[nx].nodes) {
					if (~xx.symbol && ~xx.color) {
						++x[nx][0];
					} else if (~xx.symbol || ~xx.color) {
						++x[nx][1];
					}
				}
			}

			if (x[0][0] == x[1][0]) {
				if (x[0][1] == x[1][1]) {
					if (a.nodes.length == b.nodes.length) {
						return 0;
					} else {
						return (a.nodes.length > b.nodes.length?-1:1);
					}
				} else {
					return (x[0][1] > x[1][1]?-1:1);
				}
			} else {
				return (x[0][0] > x[1][0]?-1:1);
			}
		} else {
			return (a.area > b.area?-1:1);
		}
	});
	
	(function recursive (obj) {
		if (obj.index < list.length) {
			var next = true;
			while (9 > obj.position) {
				var c = obj.position % 3,
				r = Math.floor(obj.position / 3),
				peace = list[obj.index];
				
				if (peace.width + c > 3) {	// next line
					obj.position = 3 * (1 + r);
				} else if (peace.height + r > 3) {	// next peace
					break;
				} else {
					var copy = JSON.parse(JSON.stringify(obj.table)),
					cabe = true;

					a:for each (var n in peace.nodes) {
						var i = 3 * (n.row + r) + n.column + c;
						if ((~n.symbol && (!~copy[i][0] || copy[i][0] == n.symbol) && (!~copy[i][1] || !~n.color || copy[i][1] == n.color)) ||
						(~n.color && (!~copy[i][1] || copy[i][1] == n.color) && (!~copy[i][0] || !~n.symbol || copy[i][0] == n.symbol))) {
							if (~n.symbol)
							copy[i][0] = n.symbol;
							if (~n.color)
							copy[i][1] = n.color;
							
							var f = {};
							for each (var x in copy) {
								if (~x[0] && ~x[1]) {
									var pp = 3 * x[0] + x[1];
									if (pp in f && f[pp] != i) {
										cabe = false;
										break a;
									} else {
										f[pp] = i;
									}
								}
							}
						} else if (~n.symbol || ~n.color) {
							cabe = false;
							break;
						}
					}

					var w = [[],[],[]];
					for (var wn in copy) {
						var x = (~copy[wn][0]?"X":"x"),
						y = (~copy[wn][1]?"Y":"y");
						w[Math.floor(wn / 3)][wn % 3] = x + y;
					}
					if (cabe) {
						var obj2 = JSON.parse(JSON.stringify(obj));
						obj.peaces.unshift(obj2);
						++obj.index;
						obj.position = 0;
						obj.table = copy;
						recursive(obj);
						next = false;
						break;
					} else {
						++obj.position;
					}
				}
			}

			if (next) {
				var obj2 = obj.peaces.shift();
				++obj2.position;
				recursive(obj2);
			}
		} else {
			var missing = 0x1FF,	// symbol, color
			missing2 = [[0,0,0],[0,0,0]],
			changed = true;

			for (var index in obj.table) {
				var p = obj.table[index];

				if (~p[0] && ~p[1]) {
					missing -= 1 << (3 * p[0] + p[1]);
					++missing2[0][p[0]];
					++missing2[1][p[1]];
				}
			}

			a:while (changed) {
				changed = false;
				for (var index in obj.table) {
					var p = obj.table[index];

					if (~p[0] && ~p[1]) {
					} else if (~p[0]) {
						if (2 == missing2[0][p[0]])
						for (var a = 2;~a;--a) {
							if (missing & (1 << (3 * p[0] + a))) {
								missing -= 1 << (3 * p[0] + a);
								obj.table[index][1] = a;
								++missing2[1][a];
								++missing2[0][p[0]];
								changed = true;
								continue a;
							}
						}
					} else if (~p[1]) {
						if (2 == missing2[1][p[1]])
						for (var a = 2;~a;--a) {
							if (missing & (1 << (3 * a + p[1]))) {
								missing -= 1 << (3 * a + p[1]);
								obj.table[index][0] = a;
								++missing2[0][a];
								++missing2[1][p[1]];
								changed = true;
								continue a;
							}
						}
					} else {
						for (var b = 2;~b;--b)	// symbol
						for (var a = 2;~a;--a) {	// color
							if (2 == missing2[0][b] && missing & (1 << (3 * b + a))) {
								missing -= 1 << (3 * b + a);
								obj.table[index][0] = b;
								obj.table[index][1] = a;
								++missing2[0][b];
								++missing2[1][a];
								changed = true;
								continue a;
							} else if (2 == missing2[1][a] && missing & (1 << (3 * a + b))) {
								missing -= 1 << (3 * a + b);
								obj.table[index][0] = b;
								obj.table[index][1] = a;
								++missing2[0][b];
								++missing2[1][a];
								changed = true;
								continue a;
							}
						}
					}
				}
			}

			var table = obj.table.map(function (v, i) {
				return {
					index	: i,
					symbol	: v[0],
					color	: v[1],
				};
			});
			table.sort(function () {
				return Math.floor(3 * Math.random()) - 1;
			});

			var ql = new QueuedList([474, 351]),
			l = [,],
			pieces = function (a, b) {
				if (a.symbol == b.symbol) {
					if (a.symbol % 2) {
						return (a.color < b.color?1:-1);
					} else {
						return (a.color > b.color?1:-1);
					}
				} else {
					return (a.symbol > b.symbol?1:-1);
				}
			};
			ql.add([params.negg.clickClear, [], [423, 319]]);
			for each (var p in table.sort(pieces)) {
				if (l[0] !== p.symbol) {
					l[0] = p.symbol;
					ql.add([params.negg.clickSymbol, [p.symbol], [352, 197]]);
				}
				if (l[1] !== p.color) {
					l[1] = p.color;
					ql.add([params.negg.clickColor, [p.color], [391, 163]]);
				}
				ql.add([params.negg.colorCell, [Math.floor(p.index / 3), p.index % 3], [481, 283]]);
			}
			ql.run();
		}
	}({
		index		: 0,
		position	: 0,
		peaces		: [],
		table		: (function () {
			var t = [];
			for (var a = 9;a;--a)
			t.push([-1,-1]);
			
			return t;
		}()),
	}));
};