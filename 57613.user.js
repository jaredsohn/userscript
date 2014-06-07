// ==UserScript==
// @name        Memberlist bei Basti1012 ( Wer wahr zu lezt online farbig unterteilt )acoundleichen schecker(version2 Tage selber einstellbar )
// @description    Zeigt wann das Bandenmitglied online war.Je laender der spieler offline wahr um so dunkeler wird es bei einer schwarzen schrieft wurde der spieler gebannt
// @include        *pennergame.de/gang/memberlist*
// @include        *dossergame.co.uk/gang/memberlist*
// @include        *menelgame.pl/gang/memberlist*
// @include        *clodogame.fr/gang/memberlist*
// @include        *mendigogame.es/gang/memberlist*
// @include        *pennergame.de/gang/memberlist*
// ==/UserScript==
if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {
  var version = 'berlin';
  var link = 'http://berlin.pennergame.de/';
 }
else if(document.location.href.indexOf('dossergame.co.uk/')>=0) {
  var version = 'dossergame';
  var link = 'http://www.dossergame.co.uk/';
 }
else if(document.location.href.indexOf('pennergame.de/')>=0) {
  var version = 'hamburg';
  var link = 'http://www.pennergame.de/';
 }
else if(document.location.href.indexOf('menelgame.pl/')>=0) {
  var version = 'menelgame';
  var link = 'http://www.menelgame.pl/';
  }
else if(document.location.href.indexOf('clodogame.fr/')>=0) {
  var version = 'clodogame';
  var link = 'http://www.clodogame.fr/';
 }
else if(document.location.href.indexOf('mendigogame.es/')>=0) {
  var version = 'mendigogame';
  var link = 'http://www.mendigogame.es/';
 };



var jetzt = new Date();
var Stunde = jetzt.getHours();
var StundeA = ((Stunde < 10) ? "0" + Stunde : Stunde);

var Minuten = jetzt.getMinutes();
var MinutenA = ((Minuten < 10) ? "0" + Minuten : Minuten);

var Sek = jetzt.getSeconds();
var SekA = ((Sek < 10) ? "0" + Sek : Sek);

var Jahr = jetzt.getFullYear();

var Tag = jetzt.getDate();
var TagA = ((Tag < 10) ? "0" + Tag : Tag);

var Jahresmonat = jetzt.getMonth();
var Monat = (Number (Jahresmonat) + Number (1))
var MonatA = ((Monat < 10) ? "0" + Monat : Monat);


	var weis = GM_getValue("weis", 0);
	var weis1 = GM_getValue("weis1", 4);
	var gelb = GM_getValue("gelb", 5);
	var gelb1 = GM_getValue("gelb1", 7);
	var gruen = GM_getValue("gruen", 8);
	var gruen1 = GM_getValue("gruen1", 11);
	var rot = GM_getValue("rot", 12);
	var rot1 = GM_getValue("rot1", 16);
	var blau = GM_getValue("blau", 17);
	var blau1 = GM_getValue("blau1", 22);


var AAAA = document.getElementsByClassName("tiername")[0];
AAAA.innerHTML += '<br>'
+'Die Mitgliederliste wird Farblich unterteilt ,die Mitglieder die l&auml;nger nicht mehr online wahren,'
+'werden in andere farben angezeigt.Je l&auml;nger um so dunkler.'

+'<br><font style=\"color:whithe; font-size:100%;\"><b> Von  '+weis+'   - '+weis1+'  Tage zur&uuml;ck</b></font>          Ab :<input type="text" id="weis1" name="weis1" maxlength="2" size="2" value="'+weis1+'"> Tage'
+'<br><font style=\"color:yellow; font-size:100%;\"><b> Von  '+gelb+'   - '+gelb1+'  Tage zur&uuml;ck</b></font>          Ab :<input type="text" id="gelb1" name="gelb1" maxlength="2" size="2" value="'+gelb1+'"> Tage'
+'<br><font style=\"color:green; font-size:100%;\"> <b> Von  '+gruen+'  - '+gruen1+' Tage zur&uuml;ck</b></font>          Ab :<input type="text" id="gruen1" name="gruen1" maxlength="2" size="2" value="'+gruen1+'"> Tage'
+'<br><font style=\"color:red; font-size:100%;\">   <b> Von  '+rot+'    - '+rot1+'   Tage zur&uuml;ck</b></font>          Ab :<input type="text" id="rot1" name="rot1" maxlength="2" size="2" value="'+rot1+'"> Tage'
+'<br><font style=\"color:blue; font-size:100%;\">  <b> Von  '+blau+'   - '+blau1+'  Tage zur&uuml;ck</b></font>          Ab :<input type="text" id="blau1" name="blau1" maxlength="2" size="2" value="'+blau1+'"> Tage'
+'<br><font style=\"color:black; font-size:100%;\"> <b>Spieler die gel&ouml;scht wurden</b></font><input type="button" id="klicken" name="klicken" value="Angaben Speichern">';
var my_table = document.getElementsByTagName("table")[1];
var info_td = my_table.getElementsByTagName("td")[6];
info_td.width = 300;
info_td.innerHTML = '<strong>Zuletzt online</strong>';

document.getElementById('klicken').addEventListener('click', function linktklickerone() {

GM_setValue("weis1",document.getElementsByName('weis1')[0].value);
GM_setValue("gelb1",document.getElementsByName('gelb1')[0].value);
GM_setValue("gruen1",document.getElementsByName('gruen1')[0].value);
GM_setValue("rot1",document.getElementsByName('rot1')[0].value);
GM_setValue("blau1",document.getElementsByName('blau1')[0].value);

var weis3 = document.getElementsByName('weis1')[0].value;
var gelb3 = document.getElementsByName('gelb1')[0].value;
var gruen3 = document.getElementsByName('gruen1')[0].value;
var rot3 = document.getElementsByName('rot1')[0].value;

gelb =Math.round(Number(weis3)+Number(1));
gruen =Math.round(Number(gelb3)+Number(1));
rot =Math.round(Number(gruen3)+Number(1));
blau =Math.round(Number(rot3)+Number(1));

GM_setValue("blau",blau);
GM_setValue("rot",rot);
GM_setValue("weis",weis);
GM_setValue("gelb",gelb);
GM_setValue("gruen",gruen);

alert("Alle Daten gespeichert");
},false);


x=1;
leichensuchen();
function leichensuchen(){
if(x<=30){
try{

var my_table = document.getElementsByTagName("table")[1];
var my_td = my_table.getElementsByTagName("tr")[x];
var linki = my_td.innerHTML.split('href="/profil/id:')[1].split('/"')[0];




GM_xmlhttpRequest({
  method: 'GET',
url: ''+link+'/profil/id:'+linki+'/',
onload: function(responseDetails) {
var profil = responseDetails.responseText;
var suche = profil.search("oder vom Spiel verbannt");
if (suche != -1) {

//alert("spieler"+linki+" geloscht");
var farbe = 'black';



var my_table = document.getElementsByTagName("table")[1];
var my_td = my_table.getElementsByTagName("tr")[x];
var my_tda = my_td.getElementsByTagName("td")[6];

my_tda.innerHTML = '<font style=\"color:'+farbe+'; font-size:100%;\"><b>Gel&ouml;scht</b></font>';
x++;
leichensuchen(x);
}else{


var my_table = document.getElementsByTagName("table")[1];
var my_td = my_table.getElementsByTagName("tr")[x];
var my_tda = my_td.getElementsByTagName("td")[6];
var datum = my_tda.innerHTML.split("<br>")[2].split("<br>")[0];
var wanntag = my_tda.innerHTML.split("<br>")[2].split(".")[0];
var wannmonat = my_tda.innerHTML.split(".")[1].split(".")[0];

ergebnisheute =MonatA+TagA;
ergebniss =wannmonat+wanntag;
endergeb = ergebnisheute-ergebniss;

if(endergeb<Number(weis1)){
farbe = 'whithe';
}
if(endergeb>Number(gelb1)){
farbe = 'yellow';
}
if(endergeb>Number(gruen1)){
farbe = 'green';
}
if(endergeb>Number(rot1)){
farbe = 'red';
}
if(endergeb>Number(blau1)){
farbe = 'blue';
}
if (x%2 == 0){
my_td.setAttribute('style', 'background:#222222;');
}
my_tda.innerHTML = '<font style=\"color:'+farbe+'; font-size:100%;\"><b>'+datum+'</b></font>';
x++;
leichensuchen(x);
}

}});
}catch(e){}
}

}






