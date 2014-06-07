// ==UserScript==
// @name           Pennergame ( Pennerzone Fight Hilfe)
// @author         http://pennerhack.foren-city.de
// @namespace      basti1012
// @description    Dieses Script fuegt einen button bei pennerzon ein der euch alle gegner von euren such ergebniss in neue tabs auf macht . holiday und 36 stunden gegner werden die tabs nach klicken wieder geschlossen.bei nicht treffen der zahl von capacha wird der name in feld gespeichert
// @include        *pennerzone.de*
// @include        *pennergame.de*
// ==/UserScript==








if (document.location.href.indexOf('berlin.pennerzone.de')>=0) {
var url = 'berlin';
start(url)
}
if(document.location.href.indexOf('hamburg.pennerzone.de')>=0) {
var url = 'www';
start(url)
}






var fenster = new Array();


function start(url){

document.getElementsByClassName('menuelinks')[0].innerHTML += '<input type="button" id="allelinks" value="Alle Gegner in neue Tabs &ouml;ffnen">';
document.getElementById('allelinks').addEventListener('click', function einstell () {
var ausgabe = document.getElementsByClassName('search_result')[0].innerHTML;
var namen = ausgabe.split('/fight/?to=')[1].split('"')[0];
var name = namen.length;
for(a=1;a<=name;a++){
fight11 = ausgabe.split('/fight/?to=');
oeffnen(a)
}

function oeffnen(a){
   fight = fight11[a].split('"')[0];
fight1 = 'http://'+url+'.pennergame.de/fight/?to='+fight+'';
   fenster[a] = window.open(fight1);

}

},false);

}


if (document.URL.search(/fight/) != -1){
   document.getElementsByName('Submit2')[0].addEventListener('click', function name_speichern(){
	wer = document.getElementsByName('f_toid')[0].value;
      GM_setValue('angriffspeicherung', wer);
   },false);
}

//if (document.URL.split('.de')[1] == '/login/'){

//for(j=1;j<=20;j++){
//fenster[j].close();
//}
//}

if (document.URL.split('/fight/?status=')[1] == 'holiday') {
window.close();
}



if (document.URL.split('/fight/?status=')[1] == 'locked36h'){
 window.close();
}
if (document.URL.split('/fight/?status=')[1] == 'notfound') {
//alert("NOT FOUND")
window.close();
}

if (document.URL.split('/fight/?status=')[1] == 'limitexceed') {
window.close();
}

if (document.URL.split('/fight/?status=')[1] == 'captcha'){
   document.getElementsByName('f_toid')[0].attributes[1].nodeValue = GM_getValue('angriffspeicherung');
} 