// ==UserScript==
// @name           Ostrzeganie przed walka
// @namespace      Ostrzganie przed walką
// @description    Skrypt ostrzega przed zbliżającą się walką
// @include        http://*menelgame.pl/*
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
// Linkadresse menelgame
if (url.indexOf("menelgame.pl")>=0) {
var gamelink = "http://www.menelgame.pl"
}
// Linkadresse menelgame
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
					newimg.setAttribute('src', 'http://img200.imageshack.us/img200/8154/sexp.gif');
					newimg.setAttribute('width', '24');
  				newimg.setAttribute('height', '20');
  				newimg.setAttribute('border', '0');
    			document.getElementById("options").insertBefore(newa, document.getElementsByTagName("counter1")[0]);
				}
    }
});

//Copyright by Basti 1012 and Agent_0700