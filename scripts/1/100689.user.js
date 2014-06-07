// ==UserScript==
// @name           SevenLands Taktikwahl
// @namespace      socke
// @include        http://*.sevenlands.net/fight/monster/*
// @include        http://*.sevenlands.net/fight/arena/*
// @description    Wählt die Taktik anhand bestimmter Kriterien.
// @license        GPL 3
// @version        0.02
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

/*
 * === Anleitung ===
 * 
 * +++ Syntax der Taktikblöcke +++
 * Für die, die mit JavaScript nicht vertraut sind: Jeder Eintrag besteht aus 
 * einem Schlüssel gefolgt von einem : und dem Wert in Anführungszeichen ("").
 * Einträge werden durch Kommata voneinander getrennt. Der Übersicht halber 
 * beginnt man üblicherweise bei jedem Eintrag eine neue Zeile, das ist aber 
 * nicht Pflicht.
 * 
 * +++ Spielertaktik +++
 * Taktiken gegen andere Spieler werden im spielerTaktiken-Block festgelegt.
 * Sie können anhand der Rasse und des Schadenstyps ausgewählt werden.
 * Wenn mehrere Einträge passen, wird der Eintrag genommen, bei dem Rasse und
 * Schadenstyp festgelegt sind.
 * Die Syntax ist:
 *   RASSE_SCHADENSTYP: "Taktik" 
 * oder 
 *   RASSE: "Taktik"
 * Beispiele: 
 *   ork_schlag: "Gegen schlagende Orks",
 *   mensch: "Gegen alle Menschen"
 * Rassen sind: mensch, elf, ork, gnom
 * Schadenstypen sind: schlag, stich, schnitt
 * 
 * +++ Monstertaktik +++
 * kommt in einer späteren Version
 * 
 */

//Die Beispieleinträge können gelöscht werden
var spielerTaktiken = {
	ork_schlag: "Gegen schlagende Orks",
	mensch: "Gegen alle Menschen"
};

var monsterTaktiken = {
};


//******** Ab hier bitte nichts ändern **********
var path = document.location.pathname; //URL.replace(/^[a-z]+:\/\/[^\/]+/i, "");

function clickIt(element) {
	var evt = document.createEvent("MouseEvents");
	evt.initMouseEvent("click", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
	return element.dispatchEvent(evt);
}

function trim (str) {
  return str.replace (/^\s+/, '').replace (/\s+$/, '');
}

function setTaktik(taktikName) {
	//GM_log("set taktik: "+taktikName);
	if (!taktikName)
		return;
	var el = document.getElementById("character_active_strategy_id");
	while (el && el.tagName != "DIV")
		el = el.previousSibling;
	clickIt(el);
	var links = el.getElementsByTagName("a");
	for (var i = 0; i < links.length; i++) {
		//GM_log("*"+links[i].innerHTML+"*");
		if (links[i].innerHTML == taktikName) {
			clickIt(links[i]);
			return;
		}
	}
	alert("Taktik \""+taktikName+"\" nicht gefunden");
}

function getDamageType() {
	var elWeapon = document.getElementsByClassName("item_name")[1].parentNode;
	var dmgList = elWeapon.getElementsByClassName("item_attack_properties")[0].getElementsByTagName("li");
	
	for (var i = 0; i < dmgList.length; i++) {
		var x = dmgList[i].innerHTML;
		if (x.match("Schlagschaden")) 
			return "schlag";
		else if (x.match("Stichschaden")) 
			return "stich";
		else if (x.match("Schnittschaden"))
			return "schnitt";
	}
	GM_log("nix schaden gefunden");
	return undefined;
}

function getRace() {
	var elDef = document.getElementsByClassName("defender")[0];
	var elClass = elDef.getElementsByClassName("class")[0];
	var race = trim(elClass.innerHTML).toLowerCase();
	switch(race) {
		case "orkin": return "ork";
		case "gnomin": return "gnom";
		case "elfin": return "elf";
		default: return race;
	}
}

function selectPlayerTaktik() {
		
	var dmgType = getDamageType();
	var race = getRace();
	//GM_log("|" + race + "|" + dmgType + "|");
		
	if (spielerTaktiken[race+"_"+dmgType]) 
		return spielerTaktiken[race+"_"+dmgType];
	if (spielerTaktiken[race])
		return spielerTaktiken[race];
}

function init() {
	//GM_log("SL taktikwalh aktiv");
	if (path.match(new RegExp("^/fight/arena/"))) {
		setTaktik(selectPlayerTaktik());
	}
}

window.addEventListener("load", init, false);
