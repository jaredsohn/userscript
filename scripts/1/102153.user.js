// ==UserScript==
// @name           SevenLands Monsterkampf-Starter
// @namespace      socke
// @description    Startet SevenLands Monsterkämpfe nach bestimmten Kriterien
// @include        http://*.sevenlands.net/*
// @license        GPL 3
// @author         socke-99
// @version        0.01
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

/************ Konfiguration **************/

/* Hier werden die automatisch anzugreifenden Monster eingetragen. Ich habe
 * schon mal ein paar eingetragen, damit das Schema ersichtlich wird.
 * Aufpassen: Ein häufiger Fehler ist es, nach dem letzten Eintrag noch ein 
 *   Komma einzufügen. Das ist ein Syntaxfehler und dann geht das ganze Script
 *   nicht.
 * Den Namen erfährst du aus dem Angriffslink:
 * 1. Rechtsklick auf das Monster -> Link kopieren
 * 2. Die URL irgendwo einfügen und den Monsternamen kopieren
 * 3. Den Monsternamen dann hier einfügen
 */
var monsters = [
	"ooze_brown_fs",
	"cyclops_mine",
	"winged_horror_2",
	"winged_horror3",
	"horned_horror5",
	"manticor",
	"avalanche_devil",
	"ice_elemental",
	"vampire_shadow",
	"catoblepas"
];

/********* Ende der Konfiguration ********
 *** Ab hier bitte nichts mehr ändern. ***/

function init() {
	var currentHP = parseInt(unsafeWindow.Health.hp);
	var maxHP = parseInt(unsafeWindow.Health.maxhp);
	var HPPerSec = parseFloat(unsafeWindow.Health.hppersecond);
	var wait = Math.random() * 2000 + 1000;

	if (currentHP < maxHP) {
		var heal = (1000.0 * (maxHP - currentHP)) / HPPerSec;
		wait += heal;

	}
	window.setTimeout(startFight, wait);
}

function startFight() {
	var links = document.getElementsByTagName("A");
	for (var im = 0; im < monsters.length; im++) {
		var pat = "fight/monster/"+monsters[im];
		for (var il = 0; il < links.length; il++) {
			if (links[il].href.match(pat)) {
				document.location.href = links[il].href;
				return;
			}
		}
	}
}

init();
