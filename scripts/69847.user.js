// ==UserScript==
// @name	Babiole+
// @author	Lordclodo modifié LeonBuzz
// @description	Affiche la babiole équipée au dessus de l'avatar (Script Original Infozentrale de Sageo, adapté par Lordclodo, modifié LeonBuzz pour GTH)
// @include	http://*.clodogame.fr/overview/*
// @include	http://*.clodogame.fr/skills/*
// @include	http://*.clodogame.fr/news/*
// @include	http://*.clodogame.fr/stock/*
// @include	http://*.clodogame.fr/friendlist/*
// @include	http://*.clodogame.fr/change_please/statistics/
// @include	http://*.clodogame.fr/stock/*
// @include	http://*.clodogame.fr/profil/*
// @include	http://*.clodogame.fr/fight/*
// @include	http://*.clodogame.fr/gang/*
// @include	http://*.clodogame.fr/messages/*
// @include	http://*.clodogame.fr/city/*
// @include	http://*.clodogame.fr/activities/*
// @include	http://*.clodogame.fr/daily/*
// @include	http://*.pennergame.de/overview/*
// @include	http://*.pennergame.de/skills/*
// @include	http://*.pennergame.de/news/*
// @include	http://*.pennergame.de/stock/*
// @include	http://*.pennergame.de/friendlist/*
// @include	http://*.pennergame.de/change_please/statistics/
// @include	http://*.pennergame.de/stock/*
// @include	http://*.pennergame.de/profil/*
// @include	http://*.pennergame.de/fight/*
// @include	http://*.pennergame.de/gang/*
// @include	http://*.pennergame.de/messages/*
// @include	http://*.pennergame.de/city/*
// @include	http://*.pennergame.de/activities/*
// @include	http://*.pennergame.de/daily/*
// @exclude	*board*
// @version	1.4
// ==/UserScript==
// v1.4: nettoyage du header (pour PG)
// v1.3: portage sur PG Muenchen (et autres)
// v1.2: fond blanc et cadre; header GTH 
// v1.1: taille et position de la babiole modifié 

// Icones
var PLUNDER_URL = 'http://'+document.location.hostname+'/stock/plunder/';
var PLUNDERCHANGE_URL = 'http://'+document.location.hostname+'/stock/plunder/change/';

// URL des babioles
var PLUNDERIMAGE_URL = "http://static.pennergame.de/img/pv4/plunder/";

// on vide le header
function cleanHead(foo)
{	if(document.location.hostname.match('pennergame')) 
	{	var xtra = document.getElementById('xtra-nav').getElementsByTagName('li')[foo];
		xtra.innerHTML = '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;';	}
}

//Recup babiole actuelle
function GetCurrentPlunder(doc) {
	var plunderbox = doc.getElementsByClassName("box special")[0];
	var plunderimg = plunderbox.getElementsByTagName("img")[0].getAttribute('src');
	var plundername = plunderbox.innerHTML.split('</h4>')[0];
	plundername = plundername.split('alt=" "> ')[1];
	ShowImg('/stock/plunder/', plunderimg, 'Babiole équipée', '25', '25', '832', '62', '101');
}

//Affichage de l'image babiole
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
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex+'; padding:2px; background-color:white; border: 1px solid black; -moz-border-radius: 5px;');
}

function HTML2DOM(content) {

	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;

	return dummyDiv;
}

cleanHead(0);
GM_xmlhttpRequest({method: 'GET', url: PLUNDER_URL,	onload: function(responseDetails) {
			// Aus dem Responsetext ein Document machen
			var doc = HTML2DOM(responseDetails.responseText);
	
			// Aktuellen Plunder emitteln und Image und Name speichern
			GetCurrentPlunder(doc);

		} 
	});