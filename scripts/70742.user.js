// ==UserScript==
// @name           Clodogame (Paris, Marseille, Enfer) et Bumrise USA: Avertisseur d'attaque
// @author         sageo[http://berlin.pennergame.de/profil/id:1146285/]
// @description    Version pour Clodogame (Paris, Marseille, Enfer) et Bumrise ! Vous avertit lorsque vous êtes attaqué ! Version de Sageo (merci) pour Pennergame, adapté par Zyra pour Clodogame et Bumrise par Lordclodo avec la fonction Bataille de Bande en moins ! 
// @include        http://www.clodogame.fr/overview/
// @include        http://www.clodogame.fr/skills/
// @include        http://www.clodogame.fr/skills/pet/
// @include        http://www.clodogame.fr/stock/
// @include        http://www.clodogame.fr/news/
// @include        http://www.clodogame.fr/friendlist/
// @include        http://www.clodogame.fr/change_please/statistics/
// @include        http://www.clodogame.fr/stock/*
// @include        http://www.clodogame.fr/profil/*
// @include        http://www.clodogame.fr/fight/*
// @include        http://www.clodogame.fr/gang/*
// @include        http://www.clodogame.fr/messages/*
// @include        http://www.clodogame.fr/city/*
// @include        http://www.clodogame.fr/activities/*
// @include        http://marseille.clodogame.fr/*
// @include        http://www.bumrise.com/*
// @include        http://enfer.clodogame.fr/*
// ==/UserScript==

var THISSCRIPTVERSION = "1.1.5";
var THISSCRIPTNAME = "Avertisseur d'attaque !";
var THISSCRIPTSOURCE_URL = 'http://userscripts.org/scripts/show/70742';

// URLs Warn-Icons 
var ICON_WARNING = 'warning.gif';

// Größe des Warn-Icons in Pixeln
var ICON_WIDTH = '35';

// Array für Warn-Icons (unterschiedliche Anzahl eingehender Kämpfe)
var ICON_FIGHT = new Array();
	ICON_FIGHT[0] = 'http://www.noelshack.com/up/aac/1-16b7227f65.png';
	ICON_FIGHT[1] = 'http://www.noelshack.com/up/aac/2-69b4051d0.png';
	ICON_FIGHT[2] = 'http://www.noelshack.com/up/aac/3-3dd0b53d74.png';
	ICON_FIGHT[3] = 'http://www.noelshack.com/up/aac/4-f63433e156.png';
	ICON_FIGHT[4] = 'http://www.noelshack.com/up/aac/5-67c0735570.png';
	ICON_FIGHT[5] = 'http://www.noelshack.com/up/aac/6-9fb942e515.png';


// ***********************************************************************************************
// ***********************************************************************************************
// Formatiert ein Datum um in das Format "YYYY-MM-DD"
// ***********************************************************************************************
// ***********************************************************************************************
function FormatDate(DateToFormat) {
	var year = "";
	var month = "";
	var day = "";

	year = DateToFormat.getFullYear();
	month = DateToFormat.getMonth() + 1;
	month = "0" + month;
	if (month.length == 3) { 
		month = month.substr(1,2);
	}
	day = "0" + DateToFormat.getDate();
	if (day.length == 3) {
		day = day.substr(1,2);
	}

	return year + "-" + month + "-" + day;
}

// ***********************************************************************************************
// ***********************************************************************************************
// Supprime les espaces d'une chaîne (début et fin)
// ***********************************************************************************************
// ***********************************************************************************************
function trimString(s) {
	return s.replace(/^\s+|\s+$/g,'');
}


// **********************************************************************************
// **********************************************************************************
// Fonction détermine le nombre de bagarres entrants
// **********************************************************************************
// **********************************************************************************
function GetNumberOfFights(content) {
	try {
		// Seiteninhalt aufsplitten mit dem Namen des Icons, das für eintreffende Kämpfe verwendet wird;
		// Anzahl der Teile des Splittings - 1 ist die Anzahl eintreffender Kämpfe
		return content.split(ICON_WARNING).length - 1;
	} catch(err) {
		GM_log("Impossible de déterminer le nombre de bagarres entrants: " + err);
	}
}

// ********************************************************************************************************************
// ********************************************************************************************************************
// START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM * START PROGRAMM *START PROGRAMM *START PROGRAMM * 
// ********************************************************************************************************************
// ********************************************************************************************************************


// Wenn in Berlin gespielt wird
if (location.toString().indexOf("www.clodogame") != -1) {
	var FIGHT_URL = 'http://www.clodogame.fr/fight/';
// sonst: Es wird in Hamburg gespielt
} else if (location.toString().indexOf("marseille.clodogame") != -1) {
	var FIGHT_URL = 'http://marseille.clodogame.fr/fight/';} else if (location.toString().indexOf("enfer.clodogame") != -1) {
	var FIGHT_URL = 'http://enfer.clodogame.fr/fight/';} else {
	var FIGHT_URL = 'http://www.bumrise.com/fight/';
}

// Referenz auf Tabelle speichern
var table = document.getElementById('topmenu');


// Platzhalter für Kampf-Warner einfügen
var fightli = document.createElement('li');
table.getElementsByTagName('ul')[0].appendChild(fightli);


// **********************************************************************************
// Demander si il y a des bagarres entrantes
// **********************************************************************************
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
			newlink.setAttribute('href', '/fight/#form1');
			newlink.setAttribute('style', 'margin-left:5px');
			// Wenn mehr als ein Kampf eingeht
			if (NrOfFights > 1) {
				newlink.setAttribute('title', GetNumberOfFights(content) + ' clodo essayent de te casser les dents !');
			// sonst: Es gibt nur einen eingehenden Kampf
			} else {
				newlink.setAttribute('title', ' Un clodo essaye de te casser les dents !');
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

			// Grafik mit Link dem Platzhalter zuweisen
			fightli.innerHTML += newTextNode.innerHTML;
		}
	}
});

