// ==UserScript==
// @name           Neopets : The Faeries' Ruin : Shhhhhhh! (Step 4)
// @namespace      http://gm.wesley.eti.br/neopets
// @description    Sorts the books automatically
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2010+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.1
// @language       en
// @include        http://www.neopets.com/medieval/archives.phtml*
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

(function()
{	// script scope
	var categories = {
		"p" : [1, 1],	// symbol, order
		"Mortog Toxicology Reports" : [2, 0],
		"Harmless Faerie Artefacts" : [3, 2],
		"Harmful Faerie Artefacts" : [4, 3],
		"Cake and Pastries" : [5, 2],
		"Stained Glass" : [6, 0],
		"Histories" : [7, 2],
		"Prophecies" : [8, 2],
		"Forbidden Lasagna Recipes" : [9, 4],
		"Korbat Psychology" : [10, 4],
		"Ancient Shenkuuvian Curses" : [11, 4],
		"Transmogrification" : [12, 0],
		"Theory of Warfare" : [13, 1],
		"History of Jazzmosis" : [14, 1],
		"Doomsday Weapons" : [15, 3],
		"Implausible Revenge Scenarios" : [16, 4],
		"Miscellaneous" : [17, 5],
		"Unnecessarily Slow-Moving Dipping Mechanisms" : [18, 2],
		"Incorrectly Labeled Books" : [19, 0],
		"Potent Potables" : [20, 5],
		"Potpourri" : [21, 4],
		"'S' Words" : [22, 5],
		"Things You Find In a Kitchen" : [23, 3],
		"Ineffective Teleportation Spells" : [24, 5],
		"Terror Mountain Vacation Journals" : [25, 1],
		"Rhymes With 'Jurple'" : [26, 5],
		"Look Behind You!" : [27, 3],
		"Help! I'm Trapped in a Bookshelf Factory" : [28, 3],
		"Things Skeiths Won't Eat" : [29, 1],
		"Inedible Legumes of Brightvale" : [30, 0]
	},
	shelfs = xpath(".//div[contains(@class,'catLabel')]/text()");

	function arraySum(t)
	{
		var s = 0;
		for (var ai = 0, at = t.length; ai < at; ++ai)
		s -= -t[ai];	// s += t[ai] (concat)

		return s;
	}
	
	function sortByCategory(c, a, b)
	{
		var cA = xpath("./div", a),
		cB = xpath("./div", b);

		switch (c)
		{
			case 0:	// geometric shapes -> side
			case 2:	// geometric shapes -> rainbow colors
				var c1 = parseInt(cA[1].getAttribute("class").match(/\d+/), 10) - 1,
				c2 = parseInt(cB[1].getAttribute("class").match(/\d+/), 10) - 1,
				colors = [3, 7, 1, 5, 0, 9, 8, 2, 4, 6];
				
				if (!c)
				return c1 - c2;
				else
				return colors[c1] - colors[c2];
			case 3:	// book spines -> rainbow colors
				return parseInt(a.getAttribute("class").match(/\d$/), 10) - parseInt(b.getAttribute("class").match(/\d$/), 10);
			case 1:	// lowest to highest
			case 4:	// sum of every digit
			case 5:	// number backwards
				var n1 = cA[3].textContent,
				n2 = cB[3].textContent;

				if (c == 1)
				return parseInt(n1, 10) - parseInt(n2, 10);
				else if (c == 4)
				return arraySum(n1.split("")) - arraySum(n2.split(""));
				else
				return parseInt(n1.split("").reverse().join(""), 10) - parseInt(n2.split("").reverse().join(""), 10);
		}
		
		return 0;
	}
	
	for (var key in shelfs)
	{
		var cat = categories[shelfs[key].textContent],
		books = xpath(".//div[contains(@class, 'book') and div[contains(@class, 'symbol"+cat[0]+"') and not(substring-after(@class, 'symbol"+cat[0]+"'))]]").sort(function(a, b) // contains() and not(substring-after()) -> ends-with()
		{
			return sortByCategory(cat[1], a, b);
		});

		for (var ai = 15 * key, bi = 60 + Math.floor(60 * Math.random()), at = ai + books.length ; ai < at ; ++ai)
		{
			var spot = unsafeWindow.spots[ai],
			book = books[ai % 15].id.match(/\d+/);

			if (spot != book)
			{
				if (spot)
				{
					while (unsafeWindow.spots[bi])
					bi = 60 + (bi + Math.floor(60 * Math.random())) % 60;

					unsafeWindow.markSpot(bi);
					unsafeWindow.markBook(spot);
				}
				
				unsafeWindow.markSpot(ai);
				unsafeWindow.markBook(book);
			}
		}
	}
})();