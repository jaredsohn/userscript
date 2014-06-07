// ==UserScript==
// @name           Neopets : Cheeseroller
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Gives you all the cheese options
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        2.0.0.0
// @language       en
// @include        http://www.neopets.com/medieval/cheeseroller.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/34088.meta.js
// @resource       i18n http://pastebin.com/download.php?i=1F0jQb5L
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
// @cfu:version    version
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

(function () {	// script score
	var cheese = {
		"default" : GM_getValue("cheese", "Tyrannian Dung"),
		"group" : ["Recommended", "Others"],
		"order" : [2, 1], // from the most generic to the most specific
		"option" : [
			// group, name, np
			[1, "Spicy Juppie Cheese", 150],
			[1, "Smoked Snorkle Cheese", 300],
			[1, "Triple Mustard Cheese", 450],
			[1, "Honey Cheese", 600],
			[1, "Big Beefy Cheese", 750],
			[1, "Purple Spotted Cheese", 900],
			[0, "Brain Cheese", 1050],
			[1, "Alkenore Cheese", 1200],
			[1, "Mutated Cheese", 1350],
			[1, "Bubbling Blueberry Cheese", 1500],
			[0, "Tyrannian Dung Cheese", 1650],
			[0, "Quadruple Fudge Cheese", 1800],
			[0, "Brick Cheese", 1950],
			[1, "Gooey Snot Cheese", 2100],
			[1, "Peppermint Cheese", 2250],
			[1, "Overgrown Cheese", 2400],
			[1, "Heavy Bark Cheese", 2550],
			[1, "Warty Blue Cheese", 2700],
			[1, "Fragrant Ummagcheese", 2850],
			[1, "Furry Chocomint Cheese", 3000],
			[1, "Mummified Cheese", 3150],
			[1, "Nimmo Tube Cheese", 3300],
			[0, "Space Cheese", 3450],
			[0, "Angelpuss Cheese", 3600],
			[1, "Meaty Cheese", 3750],
			[1, "Fishy Cheese", 4200],
			[1, "Shiny Golden Cheese", 4350]
		]
	},
	input = xpath(".//input[@name = 'cheese_name' and @type = 'text'][1]")[0],
	order = {
		index : 0,
		asc : function (a, b) {
			if (a[order.index] == b[order.index]) return 0;
			return (a[order.index] > b[order.index]?1:-1);
		}
	};

	cheese.order.push(0);

	for (var ai = 0, at = cheese.order.length; ai < at; ++ai) {
		order.index = cheese.order[ai];
		cheese.option.sort(order.asc);
	}

	if (input) {
		var select = document.createElement("select"),
		hidden = xpath(".//input[@name = 'cheese_name' and @type = 'hidden'][1]")[0],
		dc = new RegExp(cheese["default"], "i");

		input.form.insertBefore(select, input);
		input.form.removeChild(input);
		select.setAttribute("name", "cheese_name");

		for (var ai = 0, at = cheese.group.length; ai < at; ++ai) {
			var grp = document.createElement("optgroup");
			grp.setAttribute("label", cheese.group[ai]);
			select.appendChild(grp);
		}

		if (hidden) {
			GM_setValue("cheese", hidden.value);
		}

		for (var ai = 0, at = cheese.option.length; ai < at; ++ai) {
			var co = cheese.option[ai],
			opt = document.createElement("option");
			
			opt.setAttribute("value", co[1]);
			opt.appendChild(document.createTextNode(co[1] + " - " + co[2] + " NP"));

			if (dc.test(co[1])) {
				opt.setAttribute("selected", "selected");
			}

			select.childNodes[co[0]].appendChild(opt);
		}
	}
})();