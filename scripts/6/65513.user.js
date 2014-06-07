// ==UserScript==
// @name SpielePlunder Verkaufs Bot Pennergame 4.0 By Basti1012
// @namespace http://pennerhack.foren-city.de by basti1012-pennerhack
// @description Einfach die zu verkaufende Anzahl des Spiele Plunder angeben und das Script verkauft in milli Sekunden den Spiele Plunder 
// @include http://*pennergame.de/stock/ug_plunder/*
// @include http://*berlin.pennergame.de/stock/ug_plunder/*
// @include http://*menelgame.pl/stock/ug_plunder/*
// @include http://*dossergame.co.uk/stock/ug_plunder/*
// @include http://*mendigogame.es/stock/ug_plunder/*
// @include http://*clodogame.fr/stock/ug_plunder/*
// @include http://*serserionline.com/stock/ug_plunder/*
// ==/UserScript==
// seitenadresse ermitteln
var url = document.location.href;

// Linkadressen fuer hamburg
if (url.indexOf("http://www.pennergame")>=0) {
var link = "http://www.pennergame.de"
}
// Linkadressen fuer Berlin
if (url.indexOf("http://berlin")>=0) {
var link = "http://berlin.pennergame.de"
}
// Linkadressen fuer Frankreich
if (url.indexOf("clodogame")>=0) {
var link = "http://www.clodogame.fr"
}
// Linkadressen fuer Spanien
if (url.indexOf("mendigogame")>=0) {
var link = "http://www.mendigogame.es"
}
// Linkadresse tuerkei
if (url.indexOf("serserionline")>=0) {
var link = "http://www.serserionline.com"
}
// Linkadresse dossergame
if (url.indexOf("dossergame.co.uk")>=0) {
var link = "http://www.dossergame.co.uk"
}
// Linkadresse menelgame
if (url.indexOf("menelgame.pl")>=0) {
var link = "http://www.menelgame.pl"
}

host = 'http://'+window.location.hostname
var donationul1 = document.getElementById("myugplunder");

var newp1 = document.createElement("p");
newp1.innerHTML = '<font color="white">'
+'<div id="status1" name="status1"</div>'
+'Menge Plunder :<input type="text name="h" id="h" value="15">'
+'<input type="button" name="verkaufe" id="verkaufe" value="Anzahl Plunder Verkaufen"></font>';

donationul1.appendChild(newp1);







document.getElementsByName('verkaufe')[0].addEventListener('click', function wechseln2() {
	pmenge = document.getElementById('h').value;

durch5 = Math.round(pmenge/5);


	GM_setValue("pmenge",pmenge)
	GM_setValue("ee",1)
	h=1;

	GM_setValue("durch5",durch5)

	eins(h)
},false);










function eins(h){

	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+link+'/stock/ug_plunder/'+h+'/',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;


			if(h<=GM_getValue("durch5")){
				h++;
				eins(h)
			}else{
				alert("Ende des Verkaufens/nSeite wird neu geladen");
				window.location.href = ''+host+'/stock/ug_plunder/1/';
			}

			zwei(content)
		}
	});
}



function zwei(content){
	for(y=1;y<=50;y++){
		try{
			var seitenmenge = content.split('class="pagenum">')[y].split('</a>')[0];
		}catch(e){
			GM_setValue("y",y)

			drei(content)
			break;
		}
	}
}




function drei(content){
	for(x=1;x<=5;x++){
try{
		ee = GM_getValue("ee");
		ee++;
		GM_setValue("ee",ee)
		GM_setValue("x",x)
		var plunder = content.split('/stock/ug_plunder/sell/')[x].split('/')[0];
		vier(plunder,x)
}catch(e){
//alert("Es ist ein Fehler aufgetretten oder es ist kein Plunder mehr zu verkaufen vorhanden! Seite wird neu geladen");
//window.location.href = ''+host+'/stock/ug_plunder/1/';
}
	}

}



function vier(plunder,x){

	GM_xmlhttpRequest({
		method: 'GET', 
		url: ''+link+'/stock/ug_plunder/sell/'+plunder+'/',
		onload: function(responseDetails) {
			var content = responseDetails.responseText;

			document.getElementsByName("status1")[0].innerHTML = '<a style=\"color:orange; font-size:80%;\">'
			+'<b>Noch '+GM_getValue("y")+' Seiten <br>'
			+'Verkaufe Plunder Id : '+plunder+'<br>'
			+'Scan ; '+x+'<br>'
			+'Verkaufte Menge : '+GM_getValue("ee")+'<br>'
			+'von : '+GM_getValue("pmenge")+'</b>';


		}
	});
}

// copyright By Basti1012