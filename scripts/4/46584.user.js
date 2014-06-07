// ==UserScript==
// @name           VQH: Poznan Internet Free
// @version        2.0.0
// @autor          tVoreQ & Hadogenes
// @description    Logowanie do sieci Poznan Internet Free
// @namespace      VQHPIF2
// @include        http://10.100.0.1/*
// ==/UserScript==

var adres = window.location.search;
var przek = adres.substring(adres.indexOf('redirect') + 'redirect'.length + 1, adres.length);

var wartosci = new Array(3);
wartosci[0] = GM_getValue("PIF_IMIE","Jan");
wartosci[1] = GM_getValue("PIF_NAZWISKO","Kowalski");
wartosci[2] = GM_getValue("PIF_AUTO",0);

function logowanie() {
  var imie = document.getElementById('imie');
  var nazwisko = document.getElementById('nazwisko');
  var mojCheckBox = document.getElementById('check_box-0');
  var przekierowanie = document.getElementsByName('redirect');

  imie.value = wartosci[0];
  nazwisko.value = wartosci[1];
  mojCheckBox.checked = true;
  przekierowanie[0].value = unescape(przek);
  if(wartosci[2] == 1)
    document.forms[0].submit();
}
function zapytanie(i,nazwa,pif) {
      var newWartosc = prompt("PoznanInternetFree: \nWpisz "+nazwa+": (Obecnie: " +wartosci[i]+")");
      GM_setValue(pif,newWartosc);
      wartosci[i] = newWartosc;

      logowanie();
}

GM_registerMenuCommand("Poznan Internet Free: Ustaw imie", function() {
zapytanie(0,"imie","PIF_IMIE")
});
GM_registerMenuCommand("Poznan Internet Free: Ustaw nazwisko", function() {
zapytanie(1,"nazwisko","PIF_NAZWISKO")
});
GM_registerMenuCommand("Poznan Internet Free: Ustaw autologowanie", function() {
zapytanie(2,"0 lub 1\nAutologowanie (0 - OFF, 1 - ON)","PIF_AUTO")
});

logowanie();

//(c) Copyright by tVoreQ & Hadogenes 2008