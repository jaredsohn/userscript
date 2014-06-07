// ==UserScript==
// @name           Neopets : Altador Cup : Improved Standings
// @namespace      http://gm.wesley.eti.br
// @description    Improves Standings page
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2011+, w35l3y (http://gm.wesley.eti.br)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br
// @version        1.0.0.1
// @language       en
// @include        http://www.neopets.com/altador/colosseum/standings.phtml
// @icon           http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @resource       meta http://userscripts.org/scripts/source/105955.meta.js
// @resource       i18n http://pastebin.com/download.php?i=1F0jQb5L
// @require        http://userscripts.org/scripts/source/63808.user.js
// @require        http://userscripts.org/scripts/source/85618.user.js
// @require        http://userscripts.org/scripts/source/87940.user.js
// @require        http://userscripts.org/scripts/source/87942.user.js
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

(function() {
	var value = [9, 3, 0],	// YYB : win, draw, lose
	teams = [];

	for each (var team in xpath("id('standings')//tr/td/span/img[contains(@src, '_50')]")) {
		var id = parseInt(team.getAttribute("onclick").match(/\d+/)[0], 10),
		sum = [[0, 0, 0], [0, 0, 0]],
		points = document.createElement("sup"),
		row = xpath("./ancestor::tr[1]/td[position()> 1]", team).map(function(a, i) {
			var x = parseInt(a.textContent, 10);
			sum[Math.floor(i/3) > 0 ? 1 : 0][i % 3] += x;

			return x;
		}),
		round = Math.pow(10, 5),
		s = 0,
		pxs;

		for (pxs in sum[0])	{	// yyb
			s += sum[0][pxs] * value[pxs];
		}
		for (pxs in sum[1])	{	// side games
			s += sum[1][pxs] * value[pxs] * 1/3;
		}

		if (teams.length) {
			points.textContent = "(" + (s - teams[teams.length - 1]) + ")";
			points.setAttribute("title", s + " (" + (s - teams[0]) + ")");
		} else {
			points.textContent = s;
			points.setAttribute("title", s + " (0)");
		}

		teams.push(s);

		team.parentNode.parentNode.appendChild(points);
	}
}());