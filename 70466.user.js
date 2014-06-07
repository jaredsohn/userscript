// ==UserScript==
// @name           Flaaschenverkaufsbot pennergame 4.0(neuer bot)
// @author         basti1012 ( pennerhack )
// @description    Verkauft automatisch die Flaschen ab einen bestimmten Kurs
// @include        http://*serserionline.com*
// @include        http://*clodogame.fr*
// @include        http://*mendigogame.es*
// @include        http://*pennergame.de*
// @include        http://*dossergame.co.uk*
// @include        http://*menelgame.pl*
// @include        http://*bumrise.com*
// @include        http://*pennergame.de*
// @version				 1.1
// @license        Creative Commons by-nc-sa
// ==/UserScript==

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
if (GM_getValue("top") == null){
GM_setValue("top", "100")
};

if (GM_getValue("top") == null){
GM_setValue("left", "100")
};
addGlobalStyle('div#flaschenbot { position:absolute; top:'+GM_getValue("top")+'px; left:'+GM_getValue("left")+'px; width:10%;}')

//Linkadressen fuer Hamburg
var url = document.location.href;
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
var sig = 'http://inodes.pennergame.de/de_DE/signaturen/';
}
//Linkadressen fuer Berlin
if (url.indexOf("berlin")>=0) {
var link = "http://berlin.pennergame.de"
var sig = 'http://inodes.pennergame.de/bl_DE/signaturen/';
}
//Linkadressen fuer Muenchen
if (url.indexOf("http://muenchen.pennergame")>=0) {
var link = "http://muenchen.pennergame.de"
var sig = 'http://inodes.pennergame.de/mu_DE/signaturen/';
}

//Linkadressen fuer Dossergame
if (url.indexOf("dossergame")>=0) {
var link = "http://www.dossergame.co.uk"
var sig = 'http://inodes.dossergame.co.uk/en_EN/signaturen/';
}
//Linkadressen fuer Menelgame
if (url.indexOf("menelgame")>=0) {
var link = "http://www.menelgame.pl"
var sig = 'http://inodes.clodogame.fr/pl_PL/signaturen/';
}
//Linkadressen fuer Clodogame
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
var sig = 'http://inodes.clodogame.fr/fr_FR/signaturen/';
}
//Linkadressen fuer Mendigogame
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
var sig = 'http://inodes.mendigogame.es/es_ES/signaturen/';
}
//Linkadressen fuer Serserionline
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
var sig = 'http://inodes.pennergame.de/tr_TR/signaturen/';
}
//Linkadressen fuer Bumrise
if (url.indexOf("bumrise")>=0) {
var link = "http://www.bumrise.com"
var sig = 'http://inodes.pennergame.de/us_EN/signaturen/';
}




function kursscheck(){

GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/stock/bottle/',
	onload: function(responseDetails){
		var content = responseDetails.responseText;
		var text1 = content.split('name="max" value="')[1];
		var text2 = text1.split('"')[0];
		var kurs1 = content.split('name="chkval" value="')[1];
		var kurs = kurs1.split('"')[0];
		win = ((text2*kurs)/100);




try{
var Weiterbildung = document.createElement('div');
	document.body.appendChild(Weiterbildung);
	Weiterbildung.innerHTML = '<div id="flaschenbot" ><font style=\"color:red; font-size:100%;\">'+text2+' Flaschen<input type="button" id="einstell" value="Einstellungen"><br>Kurs '+kurs+'<br>Win '+win+' &euro; <b id="status"</b></font></div>';


document.getElementById("status").innerHTML = '<font style=\"color:green; font-size:100%;\">Status OK</font>';

document.getElementById('einstell').addEventListener('click', function einstell () {
	GM_xmlhttpRequest({
		method: 'GET',
		url: 'http://hamburg.pennerzone.de/highscore/bottlechart.html',
		onload: function(responseDetails){
			var content = responseDetails.responseText;
			var feld = content.split('<h3>Pfandflaschenpreise</h3>')[1];
			var feld2 = feld.split('</div>')[0];

			var NewXtraMenueDiv = document.createElement('div');
			NewXtraMenueDiv.innerHTML = '<span name="PlunderInfoScreen" style="position:absolute;top:111px;left:111px;font-size:x-small;-moz-border-radius:20px;-moz-opacity:2.0;opacity:2.0;border:5px solid red; background-Color:orange;background-position:-10px -5px;;">Flaschen Menge die nicht verkauft werden soll :<input type="text" id="menge" value="'+GM_getValue("menge")+'"> Verkaufen bei  Kurs :<input type="text" id="kurss" value="'+GM_getValue("menge")+'"><br>Position: Left: <input type="text" id="left" value="'+GM_getValue("left")+'"> Top: <input type="text" id="top" value="'+GM_getValue("top")+'"><input type="button" id="speichern" value="Speichern"><br><input type="button" id="closee" value="Fenster schliessen"><b id="bilder"</b></span>';
			document.body.appendChild(NewXtraMenueDiv);

			for(i=1;i<=6;i++){
				var kur = feld2.split('src="/highscore/bottlechart_')[i];
				var ki = kur.split('.png')[0];
				document.getElementById("bilder").innerHTML += '<img src="http://hamburg.pennerzone.de/highscore/bottlechart_'+ki+'.png">';
			}

			document.getElementById('closee').addEventListener('click', function einstell () {
				location.reload();
			},false);

			document.getElementById('speichern').addEventListener('click', function einstell () {
				var menge = document.getElementById("menge").value;
				var kurss = document.getElementById("kurss").value;
				GM_setValue("menge", menge);
				GM_setValue("kurss", kurss);
				var left = document.getElementById("left").value;
				var top = document.getElementById("top").value;
				GM_setValue("left", left);
				GM_setValue("top", top);
				alert("ab sofort wird bei einen Pfandkurs von "+kurss+" deine Flaschen verkauft .\nUnd zwar alle bis auf "+menge+" Flaschen");
			},false);
		}
	});
},false);

abkurs = GM_getValue("kurss");
rest = GM_getValue("menge");
if(kurs>= abkurs){

	verkauf = text2-rest;
	won = (verkauf*kurs)/100;
	if(verkauf<=1){
		
	}else{

		GM_xmlhttpRequest({
  			 method: 'POST',
   			 url: ''+link+'/stock/bottle/sell/',
   			 headers: 
   			 {'Content-type': 'application/x-www-form-urlencoded'},
  	        	 data: encodeURI('chkval='+kurs+'&max='+text2+'&sum='+verkauf+''),
      	        	 onload: function(responseDetails) { 
				document.getElementById("status").innerHTML = '<font style=\"color:green; font-size:100%;\">'+verkauf+' Flaschen f&uuml;r '+won+' &euro; verkauft</font>';
				}
  			});
	}
}
}catch(e){}
}});
}
re ='10000';
window.setInterval(kursscheck, re);

// Copyright (c) by basti1012 @ Pennerhack ( visit: http://www.pennerhack.de.tc )
// Dieses Werk ist durch eine Creative Commons by-nc-sa Lizenz geschuetzt.
// Bearbeiten oder Vervielfaeltigen ist nur nach Absrache mit dem Autor gestattet.
// Bei Nichtbeachtung werden rechtliche Schritte eingeleitet.

