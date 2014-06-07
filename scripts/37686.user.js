// ==UserScript==
// @name           travian : suppression des messages
// @namespace      suppression messages
// @description    supression message
// @include        http://s8.travian.fr/nachrichten.php*
// ==/UserScript==

var tr = document.getElementsByTagName("form")[0].getElementsByTagName("table")[0].getElementsByTagName("tr");


tr[tr.length-1].getElementsByTagName("td")[1].innerHTML=tr[tr.length-1].getElementsByTagName("td")[1].innerHTML+'&nbsp;<input class="std" name="delmsg" type="submit" value="tout effacer" onclick="tr=document.getElementsByTagName(\'form\')[0].getElementsByTagName(\'table\')[0].getElementsByTagName(\'tr\');for (i=1;i<tr.length-1;i++){ tr[i].getElementsByTagName(\'td\')[0].getElementsByTagName(\'input\')[0].checked=1}">';