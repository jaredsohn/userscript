// ==UserScript==
// @name	rupieć
// @author	Lordclodo
// @description	Pokazuje aktualnie założony rupieć obok avatara. (Script Original Infozentrale de Sageo, adapté par Lordclodo)
// @include	http://*.menelgame.pl/overview/
// @include	http://*.menelgame.pl/skills/*
// @include	http://*.menelgame.pl/stock/
// @include	http://*.menelgame.pl/news/
// @include	http://*.menelgame.pl/friendlist/
// @include	http://*.menelgame.pl/change_please/statistics/
// @include	http://*.menelgame.pl/stock/*
// @include	http://*.menelgame.pl/profil/*
// @include	http://*.menelgame.pl/fight/*
// @include	http://*.menelgame.pl/gang/*
// @include	http://*.menelgame.pl/messages/*
// @include	http://*.menelgame.pl/city/*
// @include	http://*.menelgame.pl/activities/*
// @exclude	http://board.menelgame.pl*
// @version	1.0
// ==/UserScript==


// Icones
var PLUNDER_URL = 'http://www.menelgame.pl/stock/plunder/';
var PLUNDERCHANGE_URL = 'http://www.menelgame.pl/stock/plunder/change/';


// URL des babioles
var PLUNDERIMAGE_URL = "http://static.pennergame.de/img/pv4/plunder/";


//Recup babiole actuelle
function GetCurrentPlunder(doc) {
	var plunderbox = doc.getElementsByClassName("box special")[0];
	var plunderimg = plunderbox.getElementsByTagName("img")[0].getAttribute('src');
	var plundername = plunderbox.innerHTML.split('</h4>')[0];
	plundername = plundername.split('alt=" "> ')[1];
	ShowImg('/stock/plunder/', plunderimg, 'Twój rupieć', '35', '', '830', '60', '101');
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