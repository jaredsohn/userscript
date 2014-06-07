// ==UserScript==
// @name           Kapiland AlleFertigenMarkieren
// @namespace      http://userscripts.org 
// @description    Markiert in der Premiumansicht alle fertigen Gebäude
// @include        http://www.welt*-kapiland.de/main.php4?page=verw_*
// @include        http://www.*.kapiland.de/main.php4?page=verw_*
// ==/UserScript==

var pn = window.document.getElementsByName("alle")[0].parentNode.parentNode.parentNode; 
pn.innerHTML=pn.innerHTML+"<tr><td class=white2 width='25%' valign='top' align='left'>alle fertigen</td><td class=white2 colspan=3></td><td class=white2 width='5%' valign='top' align='right'><input type='checkbox' name='alle2' value='' onClick='doc2=window.document;gR2=doc2.getElementsByName(\"vgeb[]\");for(j=0;j<gR2.length;j++){if(gR2[j].parentNode.previousSibling.childNodes[0].nodeValue==\"fertig\") gR2[j].checked=document.form1.alle2.checked;}'></td></tr>";

