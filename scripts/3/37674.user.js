// ==UserScript==
// @name           Kapi-Regnum.nl global search
// @namespace      http://userscripts.org/users/48567/scripts
// @description    inserts the possibility to search for other cities in dutch Kapi Regnum without having to use the statistics 
// @include        http://*kapi-regnum*.nl*main.php4?page=*
// ==/UserScript==


var uin;
for(var i = 10; i < 100; i++) {
if(uin = document.getElementsByTagName("a")[i].getAttribute("href").match(/UIN=(.[0-9a-f]*)/i)[1]) {
  break;
}
}
var html = "<br><br><b>Search</b><br><FORM METHOD='POST' ACTION='main.php4?page=suche&UIN=" + uin + "'><input type='text' name='suche' maxlength='100' size='22' value=''> <INPUT TYPE='submit' VALUE='ok' class='send'></form><br><br> <img src=http://www.kapi-regnum.de/pics/trenner.gif>";

var zellen = document.getElementsByTagName("td");
for(var i = 25; i < 35; i++) {
  if(zellen[i].innerHTML.match(/contant/i) && !zellen[i].innerHTML.match(/berichten/i)) { var zelle = zellen[i]; break; }
}

zelle.innerHTML += html;
//zelle.getElementsByTagName("table")[0].innerHTML += html;