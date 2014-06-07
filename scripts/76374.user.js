// ==UserScript==
// @name	       Avertisseur d'attaque Clodogame
// @version	       1.2
// @namespace	   lkaiman
// @description   Avertisseur d'atatque simple pour Clodogame Paris et Marseille
// @include         http://*.clodogame.fr/*
// @exclude        http://board.clodogame.fr*
// @exclude        http://*.clodogame.fr/*change_please/*
//@exclude		   http://*.marseille.clodogame.fr/
// @updateURL	https://userscripts.org/scripts/source/76374.meta.js
// @downloadURL	https://userscripts.org/scripts/source/76374.user.js
// ==/UserScript==



// URLs Warn-Icons 
var ICON_WARNING = 'warning.gif';

// Größe des Warn-Icons in Pixeln
var ICON_WIDTH = '50';

// Array für Warn-Icons (unterschiedliche Anzahl eingehender Kämpfe)
var ICON_FIGHT = new Array();
	ICON_FIGHT[0] = 'http://www.noelshack.com/up/aac/1-16b7227f65.png'; // 1 vert
	ICON_FIGHT[1] = 'http://www.noelshack.com/up/aac/2-69b4051d0.png'; // 2 vert
	ICON_FIGHT[2] = 'http://www.noelshack.com/up/aac/3-3dd0b53d74.png'; // 3 bleu
	ICON_FIGHT[3] = 'http://www.noelshack.com/up/aac/4-f63433e156.png'; // 4 bleu
	ICON_FIGHT[4] = 'http://www.noelshack.com/up/aac/5-67c0735570.png'; // 5 rouge
	ICON_FIGHT[5] = 'http://www.noelshack.com/up/aac/6-9fb942e515.png'; // +5 plein la tronche


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
if (location.toString().indexOf("marseille") != -1) {
	var FIGHT_URL = 'http://marseille.clodogame.fr/fight/';
// sonst: Es wird in Hamburg gespielt
} else {
	var FIGHT_URL = 'http://www.clodogame.fr/fight/';
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
		
			var titre = '';
			var FightIcon = 0;
			
			if (NrOfFights > 1)
				   titre = GetNumberOfFights(content) + ' clodo essayent de te casser les dents !';
			else titre =' Un clodo essaye de te casser les dents !';
				
			// Wenn weniger als 6 Angriffe eingehen
			if (NrOfFights < 6)
				   FightIcon = NrOfFights - 1;
			else FightIcon = 5;
			
		//ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid)
			ShowImg('/fight/#form1', ICON_FIGHT[FightIcon], titre, ICON_WIDTH, ICON_WIDTH, '780', '5', '101');
			
			//_______________
			// Textelement erzeugen
			var newTextNode = document.createElement("p");

			/* // Link zusammenbauen
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
			fightli.innerHTML += newTextNode.innerHTML; */
		}
	}
});

function ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid) {
	if (imglink != '') {
		var newlink = document.getElementById("wrap").appendChild(document.createElement('a'));
		newlink.setAttribute('href', imglink);
		if (imgid != "") {
			newlink.setAttribute('id', imgid);
		}
		var newimg = newlink.appendChild(document.createElement('img'));

	} else {

		var newimg = document.getElementById("wrap").appendChild(document.createElement('img'));
	}

	newimg.setAttribute('src', imgsource);
	newimg.setAttribute('border', '0');
	if (imgwidth != '') {
		newimg.setAttribute('width', imgwidth);
	}
	if (imgheight != '') {
		newimg.setAttribute('height', imgheight);
	}
	newimg.setAttribute('title', imgtitle);
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}