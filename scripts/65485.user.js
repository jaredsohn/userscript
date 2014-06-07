// ==UserScript==
// @name 		Pennergame 4.0 Kampfwertanzeige ( berechnung ) 
// @namespace 		http://pennerhack.foren-city.de by basti1012-pennerhack
// @description 	Zeigt deinen Kampfwert an.(wird errechnet durch deinen att def und dex werte) Der Faktor kann selber angegeben werden  
// @include 		http://*pennergame.de*
// @include 		http://*berlin.pennergame.de*
// @include 		http://*menelgame.pl*
// @include 		http://*dossergame.co.uk*
// @include 		http://*mendigogame.es*
// @include 		http://*clodogame.fr*
// @include 		http://*serserionline.com*
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


// um eure angaben zu loeschen einmal die spßerren raus nehmen und seite reloden 
//danach wieder zu machen und ihr koennt neue faktoren eingeben

/*
GM_deleteValue("Dex");
GM_deleteValue("Att");
GM_deleteValue("Def");
*/










Wunsch()

function Wunsch () {
for(a=0; a<=3;a++){
if(GM_getValue("Att") == null){
var Att  = window.prompt("Gebe einen Att Faktor ein (zb 0.76 ) um euren Kampfwert auszurechnen:", ""+GM_getValue("Att")+"");
GM_setValue("Att",Att);

}else
if(GM_getValue("Def") == null){
var Def  = window.prompt("Gebe einen Def Faktor ein (zb 0.76 ) um euren Kampfwert auszurechnen:", ""+GM_getValue("Def")+"");
GM_setValue("Def",Def);

}else
if(GM_getValue("Dex") == null){
var Dex  = window.prompt("Gebe einen Dex Faktor ein (zb 0.76 )(Gebe 0 in das  Feld wenn Dex nicht mit berecnet werden soll) um euren Kampfwert auszurechnen:", ""+GM_getValue("Dex")+"");
GM_setValue("Dex",Dex);

}else{
weiter()
}
}
}


function weiter(){

GM_xmlhttpRequest({
	method: 'GET',
	url: ''+link+'/activities/',
	onload: function(responseDetails) {
		var content = responseDetails.responseText;
		dex = content.split('Deine Geschicklichkeit: ')[1].split('<')[0];

GM_xmlhttpRequest({
method: 'GET',
url: ''+link+'/fight/',
onload: function(responseDetails) { 
	var cont = responseDetails.responseText;

	id = cont.match(/avatare\/(\d+)_small\.jpg/)[1];
	
  	var newcont = cont.replace(/\s+/g,'');
	var vals = newcont.match(/>(\d+)<aclass="tooltip"/g);

	var att = vals[0].match(/(\d+)/)[0];

	var def = vals[1].match(/(\d+)/)[0];


a = GM_getValue("Dex");

if(a == 0){

	kampfwert = (Number(att)*GM_getValue("Att"))	+	(Number(def)*GM_getValue("Def"));
}else{

	kampfwert = (Number(att)*GM_getValue("Att"))    +	(Number(def)*GM_getValue("Def"))	+	(Number(dex)*GM_getValue("Dex"));
}
	



document.getElementById('logo').innerHTML = '<br><b>Kampfwert : '+kampfwert+'';
document.getElementById('logo').style.backgroundColor = "#606060";	




}
});
}});
}

// copyright by basti1012