// ==UserScript==
// @name           Globale Firmensuche
// @namespace      http://www.morgil.de
// @include        http://*kapiland.de/main.php4?page=*
// @description    Fügt links im Menü bei Kapiland ein Suchfeld für Firmen ein.
// ==/UserScript==

var uin;
for(var i = 10; i < 100; i++) {
if(uin = document.getElementsByTagName("a")[i].getAttribute("href").match(/UIN=(.[0-9a-f]*)/i)[1]) {
  break;
}
}
var html = "<br><br><b>Suche</b><br><FORM METHOD='POST' ACTION='main.php4?page=suche&UIN=" + uin + "'><input type='text' name='suche' maxlength='100' size='22' value=''> <INPUT TYPE='submit' VALUE='ok' class='send'></form>";

var zellen = document.getElementsByTagName("td");
for(var i = 25; i < 35; i++) {
  if(zellen[i].innerHTML.match(/Bargeld/i) && !zellen[i].innerHTML.match(/nachricht/i)) { var zelle = zellen[i]; break; }
}

zelle.innerHTML += html;
//zelle.getElementsByTagName("table")[0].innerHTML += html;