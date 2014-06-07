// ==UserScript==
// @version	       1.4
// @name            Babiole utilisée Clodogame
// @namespace     lkaiman
// @description   Affiche la babiole utilisée pourClodogame Paris et Marseille
// @include         http://*.clodogame.fr/*
// @exclude        http://board.clodogame.fr*
// @exclude        http://*.clodogame.fr/*change_please/*
//@exclude		   http://*.marseille.clodogame.fr/
// @updateURL	https://userscripts.org/scripts/source/76375.meta.js
// @downloadURL	https://userscripts.org/scripts/source/76375.user.js
// ==/UserScript==

var url = document.location.href;


if (url.indexOf("www.clodogame.fr")>=0) {
	// Icones
	var PLUNDER_URL = 'http://www.clodogame.fr/stock/plunder/';
}


if (url.indexOf("marseille.clodogame")>=0) {
	// Icones
	var PLUNDER_URL = 'http://marseille.clodogame.fr/stock/plunder/';
}


// URL des babioles
var PLUNDERIMAGE_URL = "http://static.pennergame.de/img/pv4/plunder/";








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

function HTML2DOM(content) {

	var host = document.location.host;
	var dummyDiv = document.createElement('div');
	dummyDiv.innerHTML = content;
	return dummyDiv;
}

//Recup babiole actuelle
function GetCurrentPlunder(doc) {
	var plunderbox = doc.getElementsByClassName("odd ztipfull trhover ")[0];
	var plunderimg = plunderbox.getElementsByTagName("img")[0].getAttribute('src');
	//var plundername = plunderbox.innerHTML.split('<strong style="font-size:13px;">')[0];
	//plundername = plundername.split('</strong></a>')[1];

 //ShowImg(imglink, imgsource, imgtitle, imgwidth, imgheight, imgleft, imgtop, imgzindex, imgid)
	ShowImg('/stock/plunder/', plunderimg, 'Babiole équipée', '35', '', '940', '57', '101');
}




GM_xmlhttpRequest({method: 'GET', url: PLUNDER_URL,	onload: function(responseDetails) {
			// Aus dem Responsetext ein Document machen
			var doc = HTML2DOM(responseDetails.responseText);
	
			// Aktuellen Plunder emitteln und Image und Name speichern
			GetCurrentPlunder(doc);

		} 
	});
	
	
	
	
	
	
	
	