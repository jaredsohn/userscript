// ==UserScript==
// @name           Gondal Charakter
// @namespace      socke
// @description    Hilft beim Eigenschaften-Steigern
// @include        http://*.gondal.de/characters/index
// @author         socke-99
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
 * Anleitung:
 * Die Zahlen im wichtung-Objekt (s. unten) den eigenen Vorlieben entsprechend
 * anpassen. Dann speichern und Charakterseite laden.
 * 
 * str = Stärke
 * int = Intelligenz
 * ges = Geschicklichkeit
 * aus = Ausdauer
 */
var wichtung = {
	str: 95,
	int: 60,
	ges: 100,
	aus: 90
};

//in welcher Reihenfolge soll gesteigert werden?
var attrib = [ 'ges', 'str', 'aus', 'int' ];

//============== ab hier bitte nichts ändern ===============

var ids = {
	str: "attribute_sum_strength",
	int: "attribute_sum_intelligence",
	ges: "attribute_sum_skill",
	aus: "attribute_sum_endurance"
};

function max_arr(v1, arr) {
	if (arr.length == 0)
		return v1;
	var v2 = arr.shift();
	var m = (v1 < v2)? v2 : v1;
	return max_arr(m, arr);
}

function max(obj) {
	var a = new Array();
	for (var k in obj) {
		a.push(obj[k]);
	}
	if (a.length < 1)
		return NaN;

	return max_arr(a.shift(), a);
}

function getVal(id) {
	var el = document.getElementById(id);
	if (!el)
		return null;
	//GM_log(id+": "+ el.innerHTML);
	return parseInt(el.innerHTML);
}

function hl(id) {
	var el = document.getElementById(id);
	el = el.parentNode;
	el.style.background = "#321";
}

function init() {
	var aktuell = {};
	for (var i = 0; i < attrib.length; i++) {
		aktuell[attrib[i]] = getVal(ids[attrib[i]]);
	};

	var wmax = max(wichtung);
	var amax = max(aktuell);
	
	var markiert = false;
	for (var i = 0; i < attrib.length; i++) {
		var target = amax*wichtung[attrib[i]]/wmax;
		//GM_log(attrib[i] + ": " + aktuell[attrib[i]] + "/" + target);
		if (aktuell[attrib[i]] < target) {
			if (!markiert) {
				hl(ids[attrib[i]]);
				markiert = true;
			}
			var n = document.createElement("span");
			n.innerHTML = " (+"+Math.round(target-aktuell[attrib[i]])+"="+Math.round(target)+")";
			//GM_log(attrib[i]+n.innerHTML);
			n.style.fontSize = "80%";
			var el = document.getElementById(ids[attrib[i]]);
			if (el) {
				if (el.nextSibling)
					el.parentNode.insertBefore(n, el.nextSibling);
				else
					el.appendChild(n);
			}
		}
	}
	
	if (!markiert) {
		hl(ids[attrib[0]]);
	}
}

window.setTimeout(init, 100);		

