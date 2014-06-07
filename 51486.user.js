// ==UserScript==
// @name           bastis hightec Lose bot Neue version 1.1 Pennergame
// @namespace      by basti1012
// @description    Kauft alle 500 Lose automatisch. schneller als alle anderen bots
// @include        *pennergame.de/city/games/*
// @include        *berlin.pennergame.de/city/games/*
// @include        *menelgame.pl/city/games/*
// @include        *dossergame.co.uk/city/games/*
// ==/UserScript==

if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
var pgurl = 'http://berlin.pennergame.de/';
}
else if(document.location.href.indexOf('pennergame.de/')>=0) {
var pgurl = 'http://www.pennergame.de/';
}
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
var pgurl = 'http://menelgame.pl/';
}
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
var pgurl = 'http://dossergame.co.uk/';
};

GM_xmlhttpRequest(
   {
   method: 'POST',
   url: ''+pgurl+'/city/games/buy/',
   headers: 
   {'Content-type': 'application/x-www-form-urlencoded'},
  	  data: encodeURI('menge=10&id=1&preis=1.00&preis_cent=100&submitForm=F%C3%BCr+%E2%82%AC10+kaufen'),
      onload: function(responseDetails) 
	  { 
		 window.location.reload();//alert("Du hast gerade "+NochLose+" Lose gekauft viel Glueck beim gewinnen \mfg basti1012");
      }
  });

