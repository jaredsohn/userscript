// ==UserScript==
// @name           sevenlands.skipmonsterfight
// @version        0.1a
// @namespace      sevenlands
// @description    Startet Monsterkämpfe sofort, überspringt die Animation und geht sofort zur Questseite zurück.
// @include        http://de1.sevenlands.net/fight/monster/*
// ==/UserScript==

/*
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
*/

(function(){
	
	var skipFightInterval = 0;
	
	function clickIt(element) {
		var evt = document.createEvent("MouseEvents");
		evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
		element.dispatchEvent(evt);
	}
	
	function init() {
		window.setTimeout(startFight, 200+Math.floor(Math.random()*1500));
	}
	
	function startFight() {
		var el = document.getElementById("attack_button");
		if (el) {
			clickIt(el);
			skipFightInterval = window.setInterval(skipFight, 100);
		}
	}
	
	function skipFight() {
		var el = document.getElementById("skipfight");
		if (el) {
			window.clearInterval(skipFightInterval);
			//GM_log("Ergebnisbutton gefunden.");
			clickIt(el.firstChild);
			window.setTimeout(
				function() {
					document.location.href="/locations";
				},
				1250+Math.floor(Math.random()*1000)
			);
		}
		else {
			//GM_log("Ergebnis-Button noch nicht vorhanden");
		}
	}
	
	
	window.addEventListener("load", init, false);
	
})();

