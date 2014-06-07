// ==UserScript==
// @name	Babiole
// @author	Lordclodo
// @description	Affiche la babiole équipée au dessus de l'avatar (Script Original Infozentrale de Sageo, adapté par Lordclodo pour toutes les versions clodogame)
// @include	http://*.clodogame.fr/overview/
// @include	http://*.clodogame.fr/skills/*
// @include	http://*.clodogame.fr/stock/
// @include	http://*.clodogame.fr/news/
// @include	http://*.clodogame.fr/friendlist/
// @include	http://*.clodogame.fr/change_please/statistics/
// @include	http://*.clodogame.fr/stock/*
// @include	http://*.clodogame.fr/profil/*
// @include	http://*.clodogame.fr/fight/*
// @include	http://*.clodogame.fr/gang/*
// @include	http://*.clodogame.fr/messages/*
// @include	http://*.clodogame.fr/city/*
// @include	http://*.clodogame.fr/activities/*
// @include	http://*.clodogame.fr/activities/*
// @include	http://enfer.clodogame.fr/*

// @exclude	http://board.clodogame.fr*
// @version	1.3
// ==/UserScript==

var url = document.location.href;


if (url.indexOf("www.clodogame.fr")>=0) {
// Icones
var PLUNDER_URL = 'http://www.clodogame.fr/stock/plunder/';
var PLUNDERCHANGE_URL = 'http://www.clodogame.fr/stock/plunder/change/';
}


if (url.indexOf("marseille.clodogame")>=0) {
// Icones
var PLUNDER_URL = 'http://marseille.clodogame.fr/stock/plunder/';
var PLUNDERCHANGE_URL = 'http://marseille.clodogame.fr/stock/plunder/change/';
}

if (url.indexOf("enfer.clodogame")>=0) {
// Icones
var PLUNDER_URL = 'http://enfer.clodogame.fr/stock/plunder/';
var PLUNDERCHANGE_URL = 'http://enfer.clodogame.fr/stock/plunder/change/';
}


// URL des babioles
var PLUNDERIMAGE_URL = "http://static.pennergame.de/img/pv4/plunder/";




//Recup babiole actuelle
function GetCurrentPlunder(doc) {
	var plunderbox = doc.getElementsByClassName("box special")[0];
	var plunderimg = plunderbox.getElementsByTagName("img")[0].getAttribute('src');
	var plundername = plunderbox.innerHTML.split('</h4>')[0];
	plundername = plundername.split('alt=" "> ')[1];

	ShowImg('/stock/plunder/', plunderimg, 'Babiole équipée', '35', '', '830', '60', '101');
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
	newimg.setAttribute('style', 'position:absolute; left:' + imgleft + 'px; top:' + imgtop + 'px; z-index:' + imgzindex);
}




GM_xmlhttpRequest({method: 'GET', url: PLUNDER_URL,	onload: function(responseDetails) {
			// Aus dem Responsetext ein Document machen
			var doc = HTML2DOM(responseDetails.responseText);
	
			// Aktuellen Plunder emitteln und Image und Name speichern
			GetCurrentPlunder(doc);

		} 
	});



function HTML2DOM(content) {

	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;
	return dummyDiv;
}



