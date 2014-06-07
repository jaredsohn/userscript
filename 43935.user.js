// ==UserScript==
// @name           HWM_Battle_Add_Chat_Link
// @namespace      http://amse.ru
// @include        http://www.heroeswm.ru/war.php?warid=*
// @include        http://www.heroeswm.ru/warlog.php?warid=*
// ==/UserScript==

var url_cur = location.href;
var id = url_cur.match(/warid=\d+/)[0].split("=")[1];

var p = document.getElementsByTagName('p')[0];
p.innerHTML += "<br/><a style=\"color: black;\" href=\"http://www.heroeswm.ru/battlechat.php?warid=" + id + "\">>>Battlechat<<</a>";