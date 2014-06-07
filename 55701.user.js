// ==UserScript==
// @name           SpielePlunder anzeige alle games pennergame 4.0 
// @namespace      by basti121o http://pennerhack.foren-city.de.  zeigt den spiele pülunder immer an ,in den kleinen kasten wo man sein avater bild sehen tut .so kann man immer shene was man gerade fuer spiele plunder angeldegt hat 
// @include        *pennergame.de/highscore/gang/*
// @include        *clodogame.fr/highscore/gang/*
// @include        *berlin.pennergame.de/highscore/gang/*
// @include        *menelgame.pl/highscore/gang/*
// @include        *dossergame.co.uk/highscore/gang/*
// @include        *mendigogame.es/highscore/gang/*
// @include        *serserionline.com/highscore/gang/*
// @include        *bumrise.com/highscore/gang/*
// @include        *muenchen.pennergame.de/highscore/gang/*
// ==/UserScript==

var url = document.location.href;
if (url.indexOf("http://www.berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}

if (url.indexOf("http://berlin.pennergame")>=0) {
var link = "http://www.berlin.pennergame.de"
var siglink = 'http://imgberin.pennergame.de';
}
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var siglink = 'http://img.pennergame.de';
}
if (url.indexOf("http://www.dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var siglink = 'http://img.dossergame.co.uk';
}
if (url.indexOf("http://www.menelgame")>=0) {
var link = "http://www.menelgame.pl"
var siglink = 'http://img.menelgame.pl';
}
if (url.indexOf("http://www.clodogame")>=0) {
var link = "http://www.clodogame.fr"
var siglink = 'http://img.clodogame.fr';
}
if (url.indexOf("http://www.mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var siglink = 'http://img.mendigogame.es';
}
if (url.indexOf("muenchen.pennergame")>=0) {
var link = "http://www.muenchen.pennergame.de"
var siglink = 'http://img.muenchen.pennergame.de';
}
if (url.indexOf("http://www.bumrise")>=0) {
var link = "http://www.bumrise.com"
var siglink = 'http://img.bumrise.com';
}





	try{
		var bodya = document.getElementById("my-profile").innerHTML;
		body = bodya.split('/profil/id:')[1];
		var id = body.split('/')[0];
	}catch(e){
	}





















var neu = document.getElementById("my-profile");

SubmitButtonHTML = '<a class="tooltip" href="#"><font color=\"black\">Spieleplunder</font><span><strong></strong><br><b id="plu" </b></span></a><br>';

var newp = document.createElement("table");
newp.innerHTML = ''


var newli = document.createElement("tr");
newli.appendChild(newp);
newli.innerHTML = newli.innerHTML + SubmitButtonHTML + "<br>";
neu.appendChild(newli);



























GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/profil/id:'+id+'/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
 
				var splunderfeld = content.split('Angelegter Spieler Plunder')[1].split('width="48%"')[0];

for(a=2;a<=30;a++){
try{


var plunders2 = splunderfeld.split('src="')[a].split('"')[0];
var plunders1 = splunderfeld.split('<strong>')[a].split('</strong>')[0];





document.getElementById("plu").innerHTML += '<br><img src="'+plunders2+'"</img>'+plunders1+'';

                    


}catch(e){

break;
}

}









		}});	













