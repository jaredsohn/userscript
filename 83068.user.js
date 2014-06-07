// ==UserScript==
// @name           banden punkte rechnen pennergame alle Games by Boggler kleines Wunschscript
// @namespace      Boggler @ Pennerhack ( visit:http://pennerhack.de.tc/ )
// @description    banden punkte rechnen
// @include        http://*/profil/bande:*/*
// ==/UserScript==

//var mitgliedzahl = Number(document.getElementsByTagName('body')[0].innerHTML.split('"><b>')[1].split(' Mitglieder')[0]);
var rechner = 0;
for(i=0; i<=30; i++){
try{
var einzelzahl = Number(document.getElementsByTagName('table')[2].getElementsByTagName('tr')[i].getElementsByTagName('td')[2].textContent);
rechner += einzelzahl;
}catch(e){}
}
//alert(rechner);
document.getElementsByTagName('tr')[12].getElementsByTagName('b')[0].innerHTML += '(Aktuell: '+rechner+' Punkte)';