// ==UserScript==
// @name           Neopets : Shapeshifter Helper
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Lets you to put the shapes on the board in any order
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.0
// @language       en
// @include        http://www.neopets.com/medieval/shapeshifter.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @grant          GM_getValue
// @grant          GM_setValue
// @grant          GM_registerMenuCommand
// @require        http://userscripts.org/scripts/source/63808.user.js
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
	var shape_colors = [
		"http://images.neopets.com/medieval/shapeshifter/square.gif", // red
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABZJREFUKFNjlDoix4AHAKXxIIYRKg0AeeNZlkrfNgYAAAAASUVORK5CYII=", // green
		"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAIAAAACUFjqAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAgY0hSTQAAeiYAAICEAAD6AAAAgOgAAHUwAADqYAAAOpgAABdwnLpRPAAAABZJREFUKFNjlJM6woAHAKXxIIYRKg0AQE1ZlpQsvO4AAAAASUVORK5CYII=" // blue
	],
	shape_active = -1,
	shapes_status = {},
	figs = xpath("id('content')/table/tbody/tr/td[2]/center[2]/table/tbody/tr/td/table/tbody/tr/td[position() mod 2 != 0 and position()<last()]/img"),
	flips = {},
	board = xpath(".//td[@class='content']/table[tbody/tr/td//img and position()=last()]")[0],
	old_board = [],
	shapes = xpath("id('content')//td[@class='content']/center[3]//table[tbody/tr/td/img]");
	enabled = false,
	cache = JSON.parse(GM_getValue("position", '{"offset":0, "length":0}')),
	hint = xpath("id('content')/table/tbody/tr/td[2]/table[tbody/tr[1]/td[@colspan] and tbody/tr[2]/td[1]/img]")[0];
	
	if (hint) {
		hint.parentNode.removeChild(hint);
	}
	
	if (cache.offset > cache.length - shapes.length) {
		cache = {"offset":0, "length":shapes.length};
	} else {
		cache.offset = cache.length - shapes.length;
	}
	
	for (var ai = figs.length;ai--;) {
		flips[/shapeshifter\/(\w+)_/.test(figs[ai].src) && RegExp.$1] = ai;
	}
	
	for (var ai = 0, at = shapes.length;ai < at;++ai) {
		shapes_status[ai] = {
			"table"		: shapes[ai],
			"active"	: false,
			"color"		: 0
		};

		if (ai + cache.offset in cache) {
			shapes_status[ai].position = cache[ai + cache.offset];
		} else {
			cache[ai + cache.offset] = null;
		}

		shapes[ai].addEventListener("mouseover", (function (ai) {
			return function(e) {
				var p = shapes_status[ai].position;

				if (p) {
					var shape = shapes_status[ai].table;

					for (var yi = shape.rows.length;yi--;)
					for (var xi = shape.rows[yi].cells.length;xi--;) {
						if (xpath("boolean(./img)", shape.rows[yi].cells[xi])) {
							var img = xpath(".//img", board.rows[p[1] + yi].cells[p[0] + xi])[0];

							img.src = img.src.replace("_0.", "_1.");
						}
					}
				}
			}
		})(ai), false);

		shapes[ai].addEventListener("mouseout", (function (ai) {
			return function(e) {
				var p = shapes_status[ai].position;

				if (p) {
					var shape = shapes_status[ai].table;
					for (var yi = shape.rows.length;yi--;)
					for (var xi = shape.rows[yi].cells.length;xi--;) {
						if (xpath("boolean(./img)", shape.rows[yi].cells[xi])) {
							var img = xpath(".//img", board.rows[p[1] + yi].cells[p[0] + xi])[0];

							img.src = img.src.replace("_1.","_0.");
						}
					}
				}
			}
		})(ai), false);

		shapes[ai].addEventListener("dblclick", (function (ai) {
			return function(e) {
				if (confirm(enabled ? "Deactivate?" : "Activate?")) {
					toggle_board(ai);
				}
			}
		})(ai), false);

		shapes[ai].addEventListener("click", (function (ai) {
			return function(e) {
				if (enabled) {
					if (shape_active == ai) {
						toggle_shape(ai);
//						change_shape_color(ai, 1);
						check_active();
					} else {
						if (shape_active != -1 && shape_active != ai) {
							change_shape_color(shape_active, 2 * shapes_status[shape_active].active);
						}
						
						shape_active = ai;
						change_shape_color(ai, 1);
					}
				}	
			}
		})(ai), false);
	}
	
	GM_setValue("position", JSON.stringify(cache));

	function toggle_board(id) {
		board = xpath(".//td[@class = 'content']/table[tbody/tr/td//img and position() = last()]")[0];

		if (enabled) {
			change_shape_color(id, 0);
			shape_active = -1;
			enabled = false;

			for (var ai = 0, at = shapes.length;ai < at;++ai) {
				if (shapes_status[ai].active) {
					change_shape_color(ai, 0);
				}
			}

			for each (var img in xpath(".//img", board)) {
				img.parentNode.replaceChild(old_board.shift(), img);
			}
		} else {
			for each (var img in xpath(".//img", board)) {
				if (/_1\./.test(img.src)) {
					img.src = img.src.replace("_1.", "_0.");
				}

				old_board.push(img.parentNode.cloneNode(true));
				img.parentNode.parentNode.replaceChild(img, img.parentNode);

				img.addEventListener("mouseout", function (e) {
					if (shape_active != -1) {
						var p = Array.prototype.slice.call(e.target.name.match(/\d+/g)).map(function (a) {
							return parseInt(a, 10);
						}),
						shape = shapes_status[shape_active].table;

						for (var yi = shape.rows.length;yi--;)
						for (var xi = shape.rows[yi].cells.length;xi--;) {
							if (p[1] + yi < board.rows.length && p[0] + xi < board.rows[p[1] + yi].cells.length && xpath("boolean(./img)", shape.rows[yi].cells[xi])) {
								var img = xpath("./img", board.rows[p[1]+yi].cells[p[0]+xi])[0];
								
								img.src = img.src.replace("_1.","_0.");
							}
						}
					}
				}, false);
				img.addEventListener("mouseover", function (e) {
					if (shape_active != -1) {
						var p = Array.prototype.slice.call(e.target.name.match(/\d+/g)).map(function(a) {
							return parseInt(a, 10);
						}),
						shape = shapes_status[shape_active].table;

						for (var yi = shape.rows.length;yi--;)
						for (var xi = shape.rows[yi].cells.length;xi--;) {
							if (p[1] + yi < board.rows.length && p[0] + xi < board.rows[p[1] + yi].cells.length && xpath("boolean(./img)", shape.rows[yi].cells[xi])) {
								var img = xpath("./img", board.rows[p[1] + yi].cells[p[0] + xi])[0];
								
								img.src = img.src.replace("_0.","_1.");
							}
						}
					}
				}, false);
				img.addEventListener("click", function (e) {
					if (shape_active != -1) {
						var p = Array.prototype.slice.call(e.target.name.match(/\d+/g)).map(function (a) {
							return parseInt(a, 10);
						}),
						shape = shapes_status[shape_active].table;
						
						if (board.rows.length - shape.rows.length < p[1] || board.rows[0].cells.length - shape.rows[0].cells.length < p[0]) {
							alert('The whole game shape is not on the board. Please check the Active Shape to give you an idea of where it will fit.');
						} else {
							var cp = shapes_status[shape_active].position;

							if (shapes_status[shape_active].active && cp && (cp[0] != p[0] || cp[1] != p[1])) {
								toggle_shape(shape_active);
							}
							
							shapes_status[shape_active].position = p;
							cache[shape_active+cache.offset] = p;
							GM_setValue("position", JSON.stringify(cache));
							toggle_shape(shape_active);
							change_shape_color(shape_active, 1);

							if (shapes_status[shape_active].active) {
								check_active();
							}
						}
					}
				}, false);
			}

			for (var ai = 0, at = shapes.length;ai < at;++ai) {
				if (shapes_status[ai].active) {
					shapes_status[ai].active = false;
					toggle_shape(ai);
					change_shape_color(ai, 2);
				}
			}

			change_shape_color(id, 1);
			shape_active = id;
			enabled = true;
		}
/*
		GM_registerMenuCommand("[Neopets : Shapeshifter Helper] Toggle shapes", function () {
			setTimeout(function() {
				var rev = shapes_status[0].active;
				for (var a = ai = 0, at = shapes.length;ai < at;++ai, ++a) {
					if (rev) a = at - ai - 1;

					toggle_shape(a);
					change_shape_color(a, (shapes_status[a].color == 1?1:2 * shapes_status[a].active));
				}
			}, 0);
		});
*/
	}

	function check_active() {
		var coords = [];

		for each (var shape in shapes_status) {
			if (shape.active) {
				coords.push(shape.position);
			}
		}

		if (coords.length == shapes.length) {
			alert(coords.join(" "));
		}
	}

	function change_shape_color (id, color) {
		var shape = shapes_status[id].table;
		
		shapes_status[id].color = color;
		
		for (var yi = shape.rows.length;yi--;)
		for (var xi = shape.rows[yi].cells.length;xi--;) {
			var img = xpath("./img", shape.rows[yi].cells[xi])[0];
			
			if (img) {
				img.src = shape_colors[color];
			}
		}
	}

	function toggle_shape (id) {
		var p = shapes_status[id].position;

		if (p) {
			shapes_status[id].active = !shapes_status[id].active;
			
			var shape = shapes_status[id].table;

			for (var yi = shape.rows.length;yi--;)
			for (var xi = shape.rows[yi].cells.length;xi--;) {
				if (xpath("boolean(./img)", shape.rows[yi].cells[xi])) {
					var img = xpath(".//img", board.rows[p[1] + yi].cells[p[0] + xi])[0];
					
					img.src = img.src.replace(/shapeshifter\/(\w+)_/, function (m, c) {
						return figs[(flips[c] + figs.length + (shapes_status[id].active?1:-1)) % figs.length].src.match(/shapeshifter\/\w+_/);
					});
				}
			}
		}
	}
}());