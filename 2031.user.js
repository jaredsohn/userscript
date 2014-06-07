/* vim: ts=4 noet ai :
$Id: $

Kilometerdeclaratie - (c) 2005-2007 J.Q. la Poutre

Dit Greasemonkey user script gebruikt de routeplanner van ANWB
om de afstand (in kilometers) tussen twee postcodes op te zoeken.

Op de pagina van de routeplanner wordt een extra formulier
toegevoegd, met een tekstveld en de knop "Opzoeken".

Deze knop "Opzoeken" gebruikt het originele formulier met vertrek- 
en bestemmingsgegevens om de reisafstand in kilometers op te zoeken.

De resultaten worden toegevoegd aan het tekstveld. Ieder resultaat
wordt op een nieuwe regel weergegeven, waarbij de kolommen (van, 
naar en afstand) met TAB's gescheiden zijn.

Deze resultaten kunnen vervolgens eenvoudig gekopieerd worden naar
een spreadsheet pagina (getest met MS Excel). Maak op basis van
deze tabel je kilometerdeclaratie!

N.B. Deze versie van Kilometerdeclaratie werkt alleen met de
postcode velden.

LICENSE
=======

This program is free software; you can redistribute it and/or modify it
under the terms of the GNU General Public License as published by the
Free Software Foundation; either version 2 of the License, or (at your
option) any later version.

This program is distributed in the hope that it will be useful, but
WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General
Public License for more details.

You should have received a copy of the GNU General Public License along
with this program; if not, write to the Free Software Foundation, Inc.,
59 Temple Place, Suite 330, Boston, MA 02111-1307 USA


CHANGELOG
=========

Version 1.01
    - fixed for new site layout


Version 1.00
    - initial release

*/
// ==UserScript==
// @name           Kilometerdeclaratie
// @namespace      http://joe.lapoutre.com/BoT/Javascript/ANWB
// @description    Bepaal reisafstanden op basis van de ANWB routeplanner
// @include        http://route.anwb.nl/*
// @exclude        
// @version	       1.01
// ==/UserScript==

function addForm() {
	var fm = document.createElement("form");
	fm.setAttribute("action", "return lookUp()");
	fm.style.position = "absolute";
	fm.style.top = "0px";
	fm.style.left = "0px";
	fm.style.paddingLeft = "10px";
	fm.style.opacity = "0.9";
	fm.style.backgroundColor = "white";
	fm.style.borderBottom = "1px solid black";
	var res = document.createElement("textarea");
	res.setAttribute("id", "res_output");
	res.setAttribute("wrap", "soft");
	res.setAttribute("title", "Kopieer resultaten en plak in spreadsheet programma...");
	res.style.width = "680px";
	res.style.height = "140px";
	res.addEventListener("focus", function(t) { t.target.select(); }, false);
	res.appendChild(document.createTextNode("Van\tNaar\tKilometers\n"));
	fm.appendChild(res);
	fm.appendChild(document.createElement("br"));
	var btn = document.createElement("input");
	btn.setAttribute("id", "lookup_btn");
	btn.setAttribute("value", "Opzoeken");
	btn.setAttribute("type", "button");
	btn.addEventListener("click", function() { lookUp(); }, false);
	btn.style.backgroundColor = "lightgreen";
	fm.appendChild(btn);
	var resline = document.createElement("span");
	resline.setAttribute("id", "resline");
	resline.style.padding = "2px 10px";
	resline.style.color = "green";
	resline.style.fontFamily = "sans-serif"
	resline.appendChild(document.createTextNode("Vul postcode (van, naar) in formulier in en klik \"Opzoeken\" hiernaast."));
	fm.appendChild(resline);
	var top = document.getElementsByTagName("body")[0];
	top.appendChild(fm);
	//top.replaceChild(fm, top.firstChild);
}

req = null;

function lookUp() {
	var fm = get_fm();
	var strReq = serialize_fm(fm);

	var btn = document.getElementById("lookup_btn");
	btn.setAttribute("value", "Bezig...");
	btn.setAttribute("disabled", "disabled");
	GM_xmlhttpRequest(
		{
			method: "POST", 
			url: fm.action, // "http://route.anwb.nl/routeplanner/servlet/rp",
			headers: {
				"Referer": fm.action, // "http://route.anwb.nl/routeplanner/servlet/rp",
				"Content-Type": "application/x-www-form-urlencoded",
				"User-Agent": "Mozilla/4.0 (compatible)"
					},
			data: strReq,
			onload: handle_response,
			onerror: function(res) { logMsg("Error: " + res.statusText); },
		}
	);
}

function handle_response(res) {
	var strRes = res.responseText;
	var rEx = /De\s+snelste\s+route\s+van.*?(\d{4}\s?\w{2}),.*?\s+naar\s+.*?(\d{4}\s?\w{2}),.*?\s+over\s+([\d,]+)\s+(km|m)\s+in\s+ongeveer/im;
	var match = rEx.exec(strRes);
    if (match) {
		var dist = (match[4] == "km") ? match[3] : "0." + match[3];
		logMsg(format_pc(match[1]) + "\t" + format_pc(match[2]) + "\t" + dist + "\n");
	} else {
		rEx = new RegExp("var foutmelding='(.*?)';");
		var match = rEx.exec(strRes);
			if (match) {
			logMsg("Fout: " + match[1], true);
		} else if (strRes.indexOf("Server error") > -1) {
			logMsg("Fout: Server Error.\n", true);
		} else {
			logMsg("Fout: ongeldig resultaat.\n", true);
		}
	}
	var btn = document.getElementById("lookup_btn");
	btn.setAttribute("value", "Opzoeken");
	btn.removeAttribute("disabled");
}

function logMsg(msg, isError) {
	var msgBox = document.getElementById("res_output");
	var resLine = document.getElementById("resline");
	if (isError) {
		resLine.firstChild.nodeValue = msg;
	} else {
		msgBox.value += msg;
		resLine.firstChild.nodeValue = "OK";
	}
	resLine.style.color = (isError) ? "red" : "green";
}

function format_pc(pc) {
	return pc.substring(0,4) + " " + pc.substring(4).toUpperCase();
}

function serialize_fmnode(n) {
    return escape(n.name) + "=" + escape(n.value) + "&";
}
function serialize_fm(fm) {
    var s = "";
    for (var i=0; i<fm.elements.length; i++) {
        var n = fm.elements[i];
        switch (n.type) {
            case "checkbox":
            case "radio":
                s += (n.checked) ? serialize_fmnode(n) : "";
                break;
            case "select":
                s += (n.selected) ? serialize_fmnode(n) : "";
                break;
            case undefined:
            case "button":
                break;
            default:
                s += serialize_fmnode(n);
        }
    }
    return s.substring(0, s.length -1);
}
function get_fm() {
	return document.evaluate("//form[@name='frm']", document, null, 
		XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}
function cleanup() {
	var allObs = document.evaluate("//iframe | //object", document, null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < allObs.snapshotLength; i++) {
		allObs.snapshotItem(i).style.display = "none";
	}	
}
window.addEventListener("load", cleanup, false);
addForm();

// end user script

