// ==UserScript==
// @name           textareas2inputs
// @namespace      D0han
// @description    Zmienia wszystkie pola textarea na pola input podczas przelewu na https://login.vwbankdirect.pl/
// @include        *przelew_zwykly_dodanie_krok_1*
// ==/UserScript==

var allTextareas ,thisTextarea, gmatch;

//alert('start');
allTextareas = document.getElementsByTagName('textarea');

for (var i = 0; allTextareas.length != 0; i++) {
//  alert(i);
  gmatch = document.createElement('input');
  thisTextarea = allTextareas[0];
//  alert((i+1) + " of " + allTextareas.length + ": " + thisTextarea.name);
  
  gmatch.setAttribute('name', thisTextarea.name);
  gmatch.setAttribute('maxlength', '140');
  gmatch.setAttribute('class', 'wideform');
  
  thisTextarea.parentNode.replaceChild(gmatch, thisTextarea);
//  alert('ok');
}

var linki, adres, przycisk, polecenie;

polecenie = "javascript:document.forms['przelewZwyklyDodanieForm'].submit();";
//polecenie = polecenie.replace(/\+/g, '%20');
//polecenie = decodeURIComponent(polecenie);
//polecenie = polecenie.toString();

linki = document.getElementsByTagName('a');
//alert(linki.length + ' linkow');
//alert(polecenie);

for (var x = 0; x < linki.length; x++) {
  adres = linki[x].getAttribute('href');
//  alert(adres);
  if (adres == "javascript:submitCheckSpecChar('przelewZwyklyDodanieForm');") {
//    alert(adres);
    przycisk = linki[x];
//    alert('adas');
    przycisk.setAttribute('href', polecenie);
//    alert('ok');
  }
}