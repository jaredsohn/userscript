// ==UserScript==
// @name           Angriffswarner 1.1.0
// @author         sageo[http://www.pennergame.de/profil/id:1146285/]
// @description    Warnt dich, sobald Du angegriffen wirst und/oder ein Bandenkampf gestartet wurde (HH und B, PG-Version 4.0)
// @include        http://*.pennergame.de/overview/
// @include        http://*.pennergame.de/skills/
// @include        http://*.pennergame.de/stock/
// @include        http://*.pennergame.de/news/
// @include        http://*.pennergame.de/friendlist/
// @include        http://*.pennergame.de/change_please/statistics/
// @include        http://*.pennergame.de/stock/*
// @include        http://*.pennergame.de/profil/*
// @include        http://*.pennergame.de/fight/*
// @include        http://*.pennergame.de/gang/*
// @include        http://*.pennergame.de/messages/*
// @include        http://*.pennergame.de/city/*
// @include        http://*.pennergame.de/activities/*
// @version        1.1.0 Erweiterung um Bandenkämpfe
// ==/UserScript==

// URLs Warn-Icons 
var ICON_GANGFIGHT = 'http://img4.imageshack.us/img4/1756/bluefq.png';

// Array für Sperrstufen-Grafiken
var ICON_FIGHT = new Array();
	ICON_FIGHT[0] = 'http://img69.imageshack.us/img69/3448/kugel1.png';
	ICON_FIGHT[1] = 'http://img163.imageshack.us/img163/2882/kugel2.png';
	ICON_FIGHT[2] = 'http://img690.imageshack.us/img690/1202/kugel3.png';
	ICON_FIGHT[3] = 'http://img109.imageshack.us/img109/3320/kugel4.png';
	ICON_FIGHT[4] = 'http://img109.imageshack.us/img109/4379/kugel5.png';
	ICON_FIGHT[5] = 'http://img4.imageshack.us/img4/5066/kugeltotenkopf.png';

// Wenn in Berlin gespielt wird
if (location.toString().match(/berlin/) != null) {
	var FIGHT_URL = 'http://berlin.pennergame.de/fight/overview/';
	var GANGFIGHT_URL = 'http://berlin.pennergame.de/gang/fight/';
// sonst: Es wird in Hamburg gespielt
} else {
	var FIGHT_URL = 'http://www.pennergame.de/fight/overview/';
	var GANGFIGHT_URL = 'http://www.pennergame.de/gang/fight/';
}

// **********************************************************************************
// **********************************************************************************
// Funktion ermittelt die Anzahl eintreffender Kämpfe
// **********************************************************************************
// **********************************************************************************
function GetNumberOfFights(content) {
	try {
		// Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird
		warnings = content.split("warning.gif");
		
		// Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe
		return warnings.length - 1;
	} catch(err) {
		alert("Fehler beim Ermitteln der Zahl eintreffender Kämpfe!");
	}
}

var ICON_WIDTH = '35';

// Abfragen, ob es einen eingehenden Kampf gibt
GM_xmlhttpRequest({
	method: 'GET',
	url: FIGHT_URL,
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		
		// Anzahl eingehender Kämpfe ermitteln
		var NrOfFights = GetNumberOfFights(content);
		
		// Wenn es eingehende Kämpfe gibt
		if(NrOfFights > 0){
			// Textelement erzeugen
			var newTextNode = document.createElement("p");

			// Link zusammenbauen
			var newlink = newTextNode.appendChild(document.createElement('a'));
			newlink.setAttribute('href', '/fight/overview/#form1');
			newlink.setAttribute('style', 'margin-left:5px');
			// Wenn mehr als ein Kampf eingeht
			if (NrOfFights > 1) {
				newlink.setAttribute('title', GetNumberOfFights(content) + ' eingehende Angriffe!');
			// sonst: Es gibt nur einen eingehenden Kampf
			} else {
				newlink.setAttribute('title', ' 1 eingehender Angriff!');
			}

			// Wenn weniger als 6 Angriffe eingehen
			if (NrOfFights < 6) {
				var FightIcon = NrOfFights - 1;
			// sonst: Es gehen 6 oder mehr Angriffe ein
			} else {
				var FightIcon = 5;
			}

			// Grafik zusammenbauen
			var newimg = newlink.appendChild(document.createElement('img'));
			newimg.setAttribute('src', ICON_FIGHT[FightIcon]);
			newimg.setAttribute('width', ICON_WIDTH);
			newimg.setAttribute('height', ICON_WIDTH);
			newimg.setAttribute('border', '0');

			// Link mit Grafik einfügen
			var table = document.getElementById('topmenu');
			var li = document.createElement('li');
			table.getElementsByTagName('ul')[0].appendChild(li);
			li.innerHTML += newTextNode.innerHTML;
		}
	}
});

// Abfragen, ob es einen Bandenkampf gibt
GM_xmlhttpRequest({
	method:"GET",
	url: GANGFIGHT_URL,
	onload:function(responseDetails) {
		var content = responseDetails.responseText;
	
		// Wenn es laufende Bandenkämpfe gibt
		if(content.indexOf("Keine laufenden K&auml;mpfe.") == -1) {
			// Textelement erzeugen
			var newTextNode = document.createElement("p");
	
			// Link zusammenbauen
			var newlink = newTextNode.appendChild(document.createElement('a'));
			newlink.setAttribute('href', GANGFIGHT_URL);
			newlink.setAttribute('title', 'Es läuft ein Bandenkampf!');
			newlink.setAttribute('style', 'margin-left:5px');

			// Grafik zusammenbauen
			var newimg = newlink.appendChild(document.createElement('img'));			
			newimg.setAttribute('src', ICON_GANGFIGHT);
			newimg.setAttribute('width', ICON_WIDTH);
			newimg.setAttribute('height', ICON_WIDTH);
			newimg.setAttribute('border', '0');

			// Link mit Grafik einfügen
			var table = document.getElementById('topmenu');
			var li = document.createElement('li');
			table.getElementsByTagName('ul')[0].appendChild(li);
			li.innerHTML += newTextNode.innerHTML;
		}
	}
});