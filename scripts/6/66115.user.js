// ==UserScript==
// @name          Mikseri.net Lainaa- nappi
// @description   Iskee "Lainaa"- napin Mikseri.netin forumin "Uusi viestiketju", "Vastaa" ja "Muokkaa" sivuille.
// @version       1.0
// @author        Jaycob
// @include       http://www.mikseri.net/clubs/post.php*
// ==/UserScript==

var postform = document.getElementById("post");
var table1 = postform.getElementsByTagName("table");
var table2 = table1[0].getElementsByTagName('tbody');
var trs = table2[0].getElementsByTagName('tr');

if(trs[0].innerHTML.match("Otsikko:"))
var td = trs[5].getElementsByTagName('td');
else
var td = trs[4].getElementsByTagName('td');

td[1].innerHTML = td[1].innerHTML + "<a href=\"javascript:void(0);\" onClick=\"javascript:addQuote();\">Lainaus</a>";

var jsfunktio = document.createElement("script");
jsfunktio.setAttribute("type", "text/javascript");
jsfunktio.innerHTML = "function addQuote() { addTags(\"[lainaus]\", \"[/lainaus]\"); }";
var sijainti = document.childNodes[1].childNodes[0];
sijainti.appendChild(jsfunktio);