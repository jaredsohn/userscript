// ==UserScript==
// @name			StudiVZ: Geburtstagserinnerung
// @namespace		http://hanjo-net.de/downloads/
// @description		Fuegt der Erinngerung an Geburtstage von Freunden den Wochentag hinzu
// @include			http://www.studivz.net/Start
// @include			http://www.schuelervz.net/Start
// @include			http://www.meinvz.net/Start
// ==/UserScript==
//

function makeMenuToggle(key, defaultValue, toggleOn, toggleOff, prefix) {
	// Load current value into variable
	window[key] = GM_getValue(key, defaultValue);
	// Add menu toggle
	GM_registerMenuCommand((prefix ? prefix+": " : "") + (window[key] ? toggleOff : toggleOn), function() {
		GM_setValue(key, !window[key]);
		location.reload();
	});
}

var ae = String.fromCharCode(228);

makeMenuToggle("heute_ist", true, "heutigen Wochentag anzeigen", "heutigen Wochentag verbergen", "StudiVZ: Geburtstagserinnerung");
makeMenuToggle("zeitspanne", true, "verbliebene Zeitspanne anzeigen", "verbliebene Zeitspanne verbergen", "StudiVZ: Geburtstagserinnerung");
makeMenuToggle("heutemorgen", true, "'heute' und 'morgen' erg"+ae+"nzen", "'heute' und 'morgen' unver"+ae+"ndert lassen", "StudiVZ: Geburtstagserinnerung");

(function() {
	var node = document.getElementsByTagName("h2");
	for (var i=0; i<node.length; i++) {
		if (node[i].parentNode.innerHTML.match(/Geburtstage Deiner Freunde/i)) {
			var Wochentage = new Array('Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag');
			var jetzt = new Date();
			var heute = jetzt.getDay()

			var geburtstage = node[i].parentNode.getElementsByTagName("ul")[0];
			if (heute_ist) {
				var heuteist = document.createElement("li");
				//heuteist.style.listStyleType = "circle";
				heuteist.class = "clearFix";
				heuteist.innerHTML = "<i>heute&nbsp;ist&nbsp;"+Wochentage[heute]+"</i>";
				geburtstage.insertBefore(heuteist,geburtstage.firstChild);
			}

			var friends = geburtstage.getElementsByTagName("li");
			for (var j=0; j<friends.length; j++) {
				var tage = null;
				var regexp = /in&nbsp;(\d)&nbsp;Tagen/;
				var match = regexp.exec(friends[j].innerHTML);
				if (match != null && match.length > 1) {
					tage = parseInt(match[1]);
				}
				else if (friends[j].innerHTML.match(/morgen!/)) {
					tage = 1;
				}
				else if (friends[j].innerHTML.match(/heute!/)) {
					tage = 0;
				}
				if (tage != null) {
					var geb = (heute + tage) % 7;
					if (zeitspanne) {
						if (tage > 1)
							friends[j].innerHTML = friends[j].innerHTML.replace(/(in)&nbsp;(\d)&nbsp;(Tagen)/g, "$1&nbsp;$2&nbsp;$3&nbsp;am&nbsp;"+Wochentage[geb]);
						else if (heutemorgen)
							friends[j].innerHTML = friends[j].innerHTML.replace(/(morgen|heute)!/g, "$1&nbsp;am&nbsp;"+Wochentage[geb]+"!");
					}
					else
						if (heutemorgen)
							var tmpregexp = /(in \d Tagen)|morgen!|heute!/g
						else
							var tmpregexp = /in \d Tagen/g
						friends[j].innerHTML = friends[j].innerHTML.replace(tmpregexp, Wochentage[geb]);
				}
			}
		}
	}
}
)();