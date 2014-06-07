// ==UserScript==
// @name           Caribic Islands Loginhilfe
// @namespace      Caribic Islands
// @description    Erleichtert den Login durch Voreinstellung des Serverauswahlfeldes
// @include        http://caribicislands.de/*
// @include        http://www.caribicislands.de/*
// @include        http://s*.caribicislands.org/
// @include        http://s*.caribicislands.org/index.php*
// ==/UserScript==


var server = 20; // Dieser Server wird vorausgewaehlt beim login ueber   http://caribicislands.de oder http://www.caribicislands.de


// Die URL wird ueberprueft ob sich der Server herleiten laesst auf dem man sich einloggen will.
var getserver = parent.document.URL.match(/http:\/\/([0-9a-z]+)\./)[1];      //Trennen des URL in einen String und nur wiedergeben was vor dem ersten . steht  Beispiel Ergebnis: (http://www oder http://s19)
    getserver = getserver.substr(1, getserver.length);                       // Loeschen des ersten Zeichens aus dem bisherigen Strings                        Beispiel Ergebnis: (ww oder 19)

// ueberpruefen des URL-Strings und zuordnen 
if (parseInt(getserver))  var server_nr = parseInt(getserver) // Wenn String ein Zahlenstring ist wird dieser als Server ausgewaehlt
else                      var server_nr = server;             // Wenn String kein Zahlenstring ist, wird der vordefinierte String als Server ausgewaehlt

for (var i=0; i<document.getElementsByTagName('option').length; i++) {
  if(document.getElementsByTagName('option')[i].value == server_nr)  document.getElementsByTagName('option')[i].selected = 'selected';  // Auswahl des Servers im Dropdown
  else                                                               document.getElementsByTagName('option')[i].selected = '';
}