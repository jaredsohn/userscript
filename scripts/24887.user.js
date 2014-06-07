// Konwerter RaportĂłw
// version 0.1 BETA
// 2007-12-29
// Copyright (c) 2007, plemiona.one.pl
// http://plemiona.one.pl
//
// --------------------------------------------------------------------
//
// Skrypt umieszcza link "Konwerter RaportĂłw" (kierujÄ?cy na adres 
// http://plemiona.one.pl) w menu w zakĹ?adce Raporty.
// 
//
// Przetestowany na Ĺ?wiecie 7 i 3, prawdopodobnie dziaĹ?a na inny rĂłwnieĹź,
// prosze o wszelkie uwagi na adres netdreamer@inbox.com
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name          Konwertator raportow KRUK
// @namespace     http://plemiona.one.pl
// @description   Link do Konwertera w menu 'Raporty'
// @include       http://*.plemiona.pl/game.php*screen=report*
// @include       http://plemiona.one.pl*
// @include       http://*.plemiona.one.pl*
// ==/UserScript==

var all, table, update;
if(window.location.host == "http://www.myzlab.pl/plemiona/" || window.location.host == "http://www.myzlab.pl/plemiona/") {
  var install_info = document.getElementById('install_info');
  install_info.style.display = 'none';
  update = document.getElementById('new_script_version');
  if(update.innerHTML > 0.1) {
    var info = document.getElementById('update_info');
    info.style.display = 'block';
  }
}
else {
  all = document.evaluate("//table[@class='vis']",document,null,XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,null);
  table = all.snapshotItem(0);
  if(table.innerHTML) table.innerHTML += '<tr><td width="100"><a href="http://www.myzlab.pl/plemiona/" target="_blank">Konwerter RaportĂłw KRUK</a></td></tr>';
}