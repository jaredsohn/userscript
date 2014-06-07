// ==UserScript==
// @name       Mistrzowie przycisk Słabe
// @namespace  http://mistrzowie.org/
// @version    1.2
// @description  Skrypt przywraca przycisk Słabe do Mistrzów
// @include    http://mistrzowie.org/*
// @exclude    http://mistrzowie.org/pocze*
// @copyright  2011+, karakar
// ==/UserScript==

var slabe, x, idx;
//tablica tagów
var allHTMLTags = new Array();
allHTMLTags=document.getElementsByTagName('div');
//pętla przechodząca po każdym polu
for (i=0; i<allHTMLTags.length; i++) {
    if(allHTMLTags[i].className=="buttons"){
    //policzenie wystapien vote (formularz z samym przyciskiem dobre powinien miec 3)
    x=0;
    idx = allHTMLTags[i].innerHTML.indexOf('vote');
 while (idx != -1) {
   x++; //zwieksz licznik
    idx = allHTMLTags[i].innerHTML.indexOf('vote', idx + 1);
 }
     //jeśli formularz z przyciskiem dobre
 if (x==3) {
 //w zmiennej słabe utwórz kopię przycisku dobre
   slabe=allHTMLTags[i].innerHTML;
 //popraw wartosci z przycisku dobre podmieniając 'up' na 'down', a dobre.png na slabe.png
   slabe=slabe.replace('value="up"','value="down"');
   slabe=slabe.replace('voteup','votedown');
   slabe=slabe.replace('dobre.png','slabe.png');
 //wygenerowany przycisk wyświetl za przyciskiem dobre
   allHTMLTags[i].innerHTML=allHTMLTags[i].innerHTML+slabe;
  }
}
}