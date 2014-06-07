// ==UserScript==
// @name Przycisk do zbierania puszek T�umaczenie Agent_0700
// @namespace http://pennnergame-basti1012.foren-city.de basti1012
// @description Dodaje przycisk wysy�aj�cy menela na 10 minut zbierania puszek
// @include http://*menelgame.pl/*
// @include http://*menelgame.pl/news/
// @include http://*dossergame.co.uk/*
// @include http://*mendigogame.es*
// @include http://*berlin.pennergame.de/*
// @include http://*pennergame.de/*
// @include http://*clodogame.fr/*
// ==/UserScript==

var VonOben = 80; //px
var VonRechts = 175; //px
var div = document.getElementById('footer');
var navi = div.getElementsByTagName('li')[6];
function fclick(ev) {
GM_setValue("fsave","true")
top.location.href= '/activities/';
}/*     
fbutton = document.createElement("input");
fbutton.type = 'button';
fbutton.value = '10 minuten sammeln';
fbutton.addEventListener('click',fclick,false);
navi.appendChild(fbutton);
*/
   fbutton = document.createElement("input");
   fbutton.type = 'button';
   fbutton.value = 'Puchy 10 min.';
   fbutton.addEventListener('click',fclick,false);
   fbutton.setAttribute('id', 'news_info');
   fbutton.setAttribute('name', 'news__info');
   fbutton.setAttribute('align', 'left');
   fbutton.setAttribute('style', 'position:absolute;top:'+VonOben+'px;right:'+VonRechts+'px;');
   var navigation = document.getElementById("navigation");
   navi.appendChild(fbutton);


var fnow = GM_getValue("fsave", "false");
if (fnow  == "true")
{
var fnow = "false";
GM_setValue("fsave", "false");	
var finputButton = document.getElementsByName("Submit2")[0];
finputButton.click();
}
// Copiright By Basti1012
//Translation By Agent_0700
