// ==UserScript==
// @name	Babiole
// @author	Lordclodo
// @description	Affiche la babiole équipée au dessus de l'avatar (Script Original Infozentrale de Sageo, adapté par Lordclodo)
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
// @exclude	http://board.clodogame.fr*
// ==/UserScript==


/* Update proc */
var SCRIPT={SCRIPTED:"Babiole",VERSION:"1.3",SCRIPT_URL:"http://userscripts.org/scripts/source/78006.user.js"}
function updateCheck(){try{GM_xmlhttpRequest({method:'GET',url:SCRIPT.SCRIPT_URL+"?rnd="+Math.random(),onload:function(result){if(result.status!=200)throw"status="+result.status;var tmp=/VERSION[\s=]+"(.*?)"/.exec(result.responseText);if(tmp==null)throw"parse error";if(SCRIPT.VERSION!=tmp[1]){window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");if(window.confirm("New version "+tmp[1]+" is available. Update ?"))location.href=SCRIPT.SCRIPT_URL}else{window.open("https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=TN6HCAP9DUT2N&lc=FR&item_name=Dons&currency_code=EUR&bn=PP%2dDonationsBF%3abtn_donate_SM%2egif%3aNonHosted");alert("Latest version\n\""+SCRIPT.SCRIPTED+"\"\nVersion: "+SCRIPT.VERSION+" ")}}})}catch(error){alert('Error updating: '+error)}}GM_registerMenuCommand("Check for update for  "+SCRIPT.SCRIPTED+"",updateCheck);
/* end Update */

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



