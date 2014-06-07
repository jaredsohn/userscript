// ==UserScript==
// @name           Pennergame forum letzte Seite klicker
// @author         http://pennerhack.foren-city.de
// @namespace      basti1012
// @description    Dieses Script geht automatisch auf der letzten seite wenn man in banden forum ein thema beztretten tut . auch nach schreiben eines beitrag zeigt er dann die letzte seite an nicht wie von pg aus die erste 
// @include        */gang/forum/viewthread/*
// ==/UserScript==


var urlspliter = document.URL.split('/gang/forum/viewthread/')[1].split('/')[0];
var ausgabe = document.getElementsByClassName('tieritemA')[0].innerHTML;
var namen = ausgabe.split('&nbsp;Seite:')[1].split('</td>')[0];
var namen1 = namen.split('<strong>');
var letzte_seite = namen1.length-1;
if (document.location.href.indexOf('/gang/forum/viewthread/'+urlspliter+'/'+letzte_seite+'/')>=0) {
}else{
letztes = '/gang/forum/viewthread/'+urlspliter+'/'+letzte_seite+'/';
location.href = 'http://'+document.location.hostname+'/gang/forum/viewthread/'+urlspliter+'/'+letzte_seite+'/';
}