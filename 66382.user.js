// ==UserScript==
// @name 		Speicherbarer Link Button  alle Pennergame s (by Basti1012 ) 
// @namespace 		basti1012 erstellt fuer Pennergame ,wunsch aus Pennergame Forum
// @description 	Unter Pennergame Settings kann man den Button einen Link zu odnen und somit hat man ueberall den button und kann jeder zeit zu seinen favoriten link wechseln
// @include *pennergame.de*
// ==/UserScript==

var url = document.location.href;
//if (document.location.href.indexOf('berlin.pennergame.de/')>=0) {

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


if(GM_getValue("LINK")==null){
GM_setValue("LINK", 'http://pennerhack.foren-city.de')
}

if(GM_getValue("LINKNAME")==null){
GM_setValue("LINKNAME", 'Ihr TEXT')
}

if (url.indexOf("/settings/")>=0) {
document.getElementsByClassName('cbox')[0].innerHTML += '<br><br><strong>Hier kannst du den Link speichern den du mit den Klick des Buttons erreichen kannst .<br><input type="text" name="ExtraButtonlink" id="ExtraButtonlink"  size="32" value="'+GM_getValue("LINK")+'"><br>Name des Buttons(Was auf den Button stehen soll):<input type="text" name="LINKNAME" id="LINKNAME" value="'+GM_getValue("LINKNAME")+'"><input type="button" id="ExtraButton" name="ExtraButton" value="Name und Link Speichern">';

document.getElementsByName('ExtraButton')[0].addEventListener('click', function kassse () {
var LINKNAME = document.getElementsByName('LINKNAME')[0].value;
var LINK = document.getElementsByName('ExtraButtonlink')[0].value;

GM_setValue("LINK", LINK)
GM_setValue("LINKNAME", LINKNAME)
location.reload();
},false);
}



var table = document.getElementById('topmenu');
var li = document.createElement('li');
table.getElementsByTagName('ul')[0].appendChild(li);
li.innerHTML = '<input type="button" id="ExtraButton1" name="ExtraButton1" value="'+GM_getValue("LINKNAME")+'">';

document.getElementsByName('ExtraButton1')[0].addEventListener('click', function kassse () {
LINK = GM_getValue("LINK")
window.location.href = ''+LINK+''

//window.open(LINK, "Zweitfenster", "scrollbars=yes");
//width=800,height=700,left=100,top=100,
},false);




