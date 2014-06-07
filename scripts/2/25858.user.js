// ==UserScript==
// @name           Kapi-Regnum.com global search
// @namespace      http://userscripts.org/scripts/show/24408
// @description    inserts the possibility to search for other cities in Kapi Regnum without having to use the statistics
// @include        http://*kapi-regnum*.com*main.php4?page=*
// ==/UserScript==

var uin;
for(var i = 10; i < 100; i++) {
if(uin = document.getElementsByTagName("a")[i].getAttribute("href").match(/UIN=(.[0-9a-f]*)/i)[1]) {
  break;
}
}
var html = "<br><br><b>search</b><br><FORM METHOD='POST' ACTION='main.php4?page=suche&UIN=" + uin + "'><input type='text' name='suche' maxlength='100' size='22' value=''> <INPUT TYPE='submit' VALUE='ok' class='send'></form><br><br> <img src=http://www.kapi-regnum.com/pics/trenner.gif>";

var zellen = document.getElementsByTagName("td");
for(var i = 25; i < 35; i++) {
  if(zellen[i].innerHTML.match(/cash/i) && !zellen[i].innerHTML.match(/nachricht/i)) { var zelle = zellen[i]; break; }
}

zelle.innerHTML += html;
//zelle.getElementsByTagName("table")[0].innerHTML += html;