// ==UserScript==
// @name           Neopets : The Perilous Catacombs
// @namespace      http://gm.wesley.eti.br
// @description    Shows the most probable answers
// @author         w35l3y
// @email          w35l3y@brasnet.org
// @copyright      2013+, w35l3y (http://gm.wesley.eti.br/includes)
// @license        GNU GPL
// @homepage       http://gm.wesley.eti.br/includes
// @version        2.0.0
// @language       en
// @include        http://www.neopets.com/halloween/sfc/catacombs/*
// @icon           http://gm.wesley.eti.br/icon.php?desc=180618
// @grant          none
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

(function () {	//script scope
	var cues = [
		[],			//	?1
		[13, 7],	//
		[1, 5],		//
		[5, 6],		//
		[12],		//	5
		[11],		//
		[7],		//
		[6],		//
		[12],		//
		[8],		//	10
		[2],		//
		[12, 6, 2],	//
		[12, 2],	//
		[2],		//
		[3, 2],		//	15
		[2],		//
		[11, 2],	//
		[9, 2],		//
		[14],		//
		[4, 2],		//	20
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],
		[],			//	30
		[102],
		[203],
		[301],
		[402],
		[503],
		[603],
		[701],
		[802],
		[901],
		[1003],		//	40
	],
	newDoor = [null, []];
	
	(new MutationObserver(function (mutations) {
		mutations.forEach(function (v, i) {
			Array.prototype.slice.apply(v.addedNodes).forEach(function (node) {
				var door = MPCat.doors.find(MPCat.activeDoorId),
				cue = (cues[door.cue - 1]||[]),
				id = parseInt(node.getAttribute("data-optid"), 10),
				opt = cue.indexOf(id);
				
				node.style.backgroundColor = ["#FFAAAA", "#AAFFAA", "#FFFFAA"][Math.min(1 + opt, 2)];

				if (!cue.length) {
					var o = id + " " + MPCat.options.find(id).copy;
					if (!newDoor[1].length) {
						newDoor = [door.cue + " " + MPCat.cues.getCopy(door.cue), [o]];
					} else {
						newDoor[1].push(o);

						if (3 == newDoor[1].length) {
							alert("[Neopets : The Perilous Catacombs]\n\nUnexpected door!\nPlease send the following text to the administrator of the script:\n\n" + JSON.stringify(newDoor));
							newDoor = [null, []];
						}
					}
				}
			});
		});
	})).observe(document.querySelector("#mpcatPopup div.subpop.doorOption div.options ul"), {
		childList	: true,
	});

	MPCat.renderEffects = function () {};
}());