// ==UserScript==

// @name           Partyboerse Text 2 YouTube Link

// @namespace      Partyboerse

// @include        http://www.partyboerse.net/playlist_*

// ==/UserScript==


var Tabelle = document.getElementsByTagName('tbody');
var Zeilen = Tabelle[6].getElementsByTagName('tr');

var i = 1;
//Zeilen.length
while(i<Zeilen.length) {
var td = Zeilen[i].getElementsByTagName('td');
var td0 = td[0].innerHTML.replace(/ /, "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+");
var td1 = td[1].innerHTML.replace(/ /, "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+").replace(" ", "+");
var text = "" + td0 + "+" + td1 + "";

td[0].innerHTML = td[0].innerHTML.replace(td[0].innerHTML, "<a href=http://www.youtube.com/results?search_query=" + text + " target=blank>"+ td[0].innerHTML +"</a>");
//alert(td[0].innerHTML);
//alert(td[1].innerHTML);
  i++;
}

