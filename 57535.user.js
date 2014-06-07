// ==UserScript==
// @name        Memberlist bei Basti1012 ( Wer wahr zulezt online farbig unterteilt )Acoundleichen schecker
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

var AAAA = document.getElementsByClassName("tiername")[0];
AAAA.innerHTML += '<br>'
+'Die Mitgliederliste wird Farblich unterteilt ,die Mitglieder die l&auml;nger nicht mehr online wahren,'
+'werden in andere farben angezeigt.Je l&auml;nger um so dunkler.'

+'<br><font style=\"color:whithe; font-size:100%;\"><b> Bis 10 Tage zur&uuml;ck</b></font>'
+'<br><font style=\"color:yellow; font-size:100%;\"><b> Von 10 - 20 Tage zur&uuml;ck</b></font>'
+'<br><font style=\"color:green; font-size:100%;\"><b> 20 - 30 Tage zur&uuml;ck</b></font>'
+'<br><font style=\"color:red; font-size:100%;\"><b> 30 - 40 tage zur&uuml;ck</b></font>'
+'<br><font style=\"color:blue; font-size:100%;\"><b> 40 oder mehr Tage zur&uuml;ck</b></font>'
+'<br><font style=\"color:black; font-size:100%;\"><b>Spieler die gel&ouml;scht wurden</b></font>';
var my_table = document.getElementsByTagName("table")[1];
var info_td = my_table.getElementsByTagName("td")[6];

info_td.width = 300;
info_td.innerHTML = '<strong>Zuletzt online</strong>';

//for(var x=1; x<=30; x++) {






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

if(endergeb<10){
farbe = 'whithe';
}
if(endergeb>10){
farbe = 'yellow';
}
if(endergeb>20){
farbe = 'green';
}
if(endergeb>30){
farbe = 'red';
}
if(endergeb>40){
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






