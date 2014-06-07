// ==UserScript==
// @name           Ostrzganie przed walką by H3Po4 v.Kraków
// @namespace      Ostrzganie przed walką
// @description    Skrypt ostrzega przed zbliżającą się walką
// @include        http://*serserionline.com/*
// @include        http://*clodogame.fr/*
// @include        http://*mendigogame.es/*
// @include        http://*krakow.menelgame.pl/*
// @include        http://*dossergame.co.uk/*
// @include        http://*pennergame.de/*
// @include        http://*mendigogame.es/*
// ==/UserScript==

// seitenadresse ermitteln
var url = document.location.href;

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var gamelink = "http://www.pennergame.de"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var gamelink = "http://berlin.pennergame.de"
}
// Linkadressen fuer Frankreich
if (url.indexOf("clodogame")>=0) {
var gamelink = "http://www.clodogame.fr"
}
// Linkadressen fuer Spanien
if (url.indexOf("mendigogame")>=0) {
var gamelink = "http://www.mendigogame.es"
}
// Linkadresse tuerkei
if (url.indexOf("serserionline")>=0) {
var gamelink = "http://www.serserionline.com"
}
// Linkadresse dossergame
if (url.indexOf("dossergame.co.uk")>=0) {
var gamelink = "http://www.dossergame.co.uk"
}
// Linkadresse krakow
if (url.indexOf("krakow.menelgame.pl")>=0) {
var gamelink = "http://www.krakow.menelgame.pl"
}

GM_xmlhttpRequest({
    method: 'GET',
    url: ''+gamelink+'/fight/overview/',
    onload: function(responseDetails) {
				var content = responseDetails.responseText;																		//Copyright by Basti 1012 and Agent_0700
			  if(content.match(/warning/)){
			    newa = document.createElement('a');
					newa.setAttribute('class', 'new_msg_infoscreen');
 					newa.setAttribute('href', '/fight/overview/#');
					newa.setAttribute('title', 'Jestes atakowany!');
					newa.setAttribute('style', 'margin-right:35px');
    			newimg = newa.appendChild(document.createElement('img'));
					newimg.setAttribute('src', 'http://media.pennergame.de/img/attackwarning.png');
					newimg.setAttribute('width', '35');
  				newimg.setAttribute('height', '35');
  				newimg.setAttribute('border', '0');
    			document.getElementById("options").insertBefore(newa, document.getElementsByTagName("counter1")[0]);
				}
    }
});

//Copyright by Basti 1012 and Agent_0700