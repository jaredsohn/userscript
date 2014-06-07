// ==UserScript==
// @name        Neopets : Neopoints
// @namespace   http://gm.wesley.eti.br
// @description Shows the score needed to get 1000 NP
// @author      w35l3y
// @email       w35l3y@brasnet.org
// @copyright   2012+, w35l3y (http://gm.wesley.eti.br)
// @license     GNU GPL
// @homepage    http://gm.wesley.eti.br
// @version     1.0.0.3
// @include     http://www.neopets.com/games/game.phtml?game_id=*
// @icon        http://www.gravatar.com/avatar.php?gravatar_id=81269f79d21e612f9f307d16b09ee82b&r=PG&s=92&default=identicon
// @require     http://userscripts.org/scripts/source/63808.user.js
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
	var score = xpath("id('gr-ctp-scores')/div[3]/div[2]")[0];

	if (score)
	score.innerHTML = score.innerHTML.replace(/(\d+(?:[,.]\d+)?)/g, function ($0, $1) {
		var result = (1000 * parseFloat($1.replace(",", "."))).toFixed();

		if (~$1.indexOf(",")) {
			result = result.replace(".", ",");
		}

		return result;
	});
}());