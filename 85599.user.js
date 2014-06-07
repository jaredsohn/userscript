// ==UserScript==
// @name          Urlaubsvertretungsanzeige
// @namespace     http://www.efceka.de/
// @description   Zeigt an, wie viele UVs man zu verwalten hat.
// @include       http://*.die-staemme.de/*php?*
// ==/UserScript==

var url = document.location.href;

if (url.match('vacation')) {  // UV-Seite:
  
  // Tabelle mit den UVs:
  var uv_table = document.getElementsByTagName('table')[document.getElementsByTagName('table').length - 1];
  
  // Anzahl der UVs:
  var uv_amount = uv_table.getElementsByTagName('tr').length - 1;
  
  // speichern des wertes:
  GM_setValue('uv',uv_amount);
  
}

// bild in der Schnellleiste ersetzen:
var images = document.getElementsByTagName('img');
for (var i = 0; i <= images.length; i++) {
  if (images[i].src.match('xXx')) {
    images[i].src = 'http://c1b1se.c1.funpic.de/staemme/uv.php?n='+GM_getValue('uv','');
  }
}