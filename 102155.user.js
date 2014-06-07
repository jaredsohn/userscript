// ==UserScript==
// @name Clodogame - Avertisseur d'attaque
// @author Memphis007
// @description Version pour Clodogame Paris et Marseille, Bumrise et Reloaded ! Vous avertit lorsque vous êtes attaqué ! Version de Sageo (merci) pour Pennergame, adapté par Zyra pour Paris, Marseille et Bumrise par Lordclodo avec la fonction Bataille de Bande en moins ! 
// @version 1.2
// @include http://www.clodogame.fr/overview/
// @include http://www.clodogame.fr/skills/
// @include http://www.clodogame.fr/skills/pet/
// @include http://www.clodogame.fr/stock/
// @include http://www.clodogame.fr/news/
// @include http://www.clodogame.fr/friendlist/
// @include http://www.clodogame.fr/change_please/statistics/
// @include http://www.clodogame.fr/stock/*
// @include http://www.clodogame.fr/profil/*
// @include http://www.clodogame.fr/fight/*
// @include http://www.clodogame.fr/gang/*
// @include http://www.clodogame.fr/messages/*
// @include http://www.clodogame.fr/city/*
// @include http://www.clodogame.fr/activities/*
// @include http://marseille.clodogame.fr/*
// @include http://www.bumrise.com/*
// @include http://reloaded.clodogame.fr/*
// ==/UserScript==

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
} else if (location.toString().indexOf("marseille.clodogame") != -1) {
	var FIGHT_URL = 'http://marseille.clodogame.fr/fight/';
} else if (location.toString().indexOf("reloaded.clodogame") != -1) {
	var FIGHT_URL = 'http://reloaded.clodogame.fr/fight/';
} else {
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

// Debut autoupdate
// Copyleft Michael Medley <medleymind@gmail.com>, All Wrongs Reserved
CheckScriptForUpdate = {
  // Config values, change these to match your script
 name: 'Clodogame - Avertisseur d\'attaque', // Script Name
 version: '1.2', // Version
 id: '102155', // Script id on Userscripts.org
 quartdays: 1, // Days to wait between update checks

 // Don't edit after this line unless, you know what you're doing :-)
 time: new Date().getTime().toString(),
 call: function(response) {
    GM_xmlhttpRequest({
      method: 'GET',
	  url: 'http://userscripts.org/scripts/source/'+this.id+'.meta.js',
	  headers: {
	  'User-agent': window.navigator.userAgent,
	    'Accept': 'application/atom+xml,application/xml,text/xml',
	    },
	  onload: function(xpr) {CheckScriptForUpdate.compare(xpr,response);}
      });
  },
 compare: function(xpr,response) {
    this.xversion=/@version\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    this.xname=/@name\s*(.*)\s*\n/i.exec(xpr.responseText)[1];
    if ( (this.xversion != this.version) && (confirm('Une nouvelle version de '+this.xname+' (V'+this.xversion+') est disponible. Voulez-vous mettre à jour ?')) ) {
      GM_setValue('updated', this.time);
      GM_openInTab('http://userscripts.org/scripts/source/'+this.id+'.user.js');
    } else if ( (this.xversion) && (this.xversion != this.version) ) {
      if(confirm('Voulez vous stoppez les mises à jour automatique ?')) {
	GM_setValue('updated', 'off');
	GM_registerMenuCommand("Auto Update "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
	alert('Les mises à jour automatiques peuvent être réactivées à partir du menu commandes de scripts.');
      } else {
	GM_setValue('updated', this.time);
      }
    } else {
      if(response == 'return') alert('Pas de mise à jour disponible');
      GM_setValue('updated', this.time);
    }
  },
 check: function() {
if (GM_getValue('updated', 0) == 0) GM_setValue('updated', this.time);
if ( (parseInt(this.time) > (parseInt(GM_getValue('updated', 0)) + (1000*60*60*6*this.quartdays))) && (GM_getValue('updated', 0) != 'off') ) {
      this.call('none');
    } else if (GM_getValue('updated', 0) == 'off') {
      GM_registerMenuCommand("Activer les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    } else {
      GM_registerMenuCommand("Vérifier les mises à jour pour "+this.name, function(){GM_setValue('updated', new Date().getTime().toString());CheckScriptForUpdate.call('return');});
    }
    }
};
if (self.location == top.location) CheckScriptForUpdate.check();
// Fin script de mise à jour