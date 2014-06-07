// ==UserScript==
// @name           hs.fi_heippa_urheilu_uutiset
// @namespace      hs.fi_heippa_urheilu_uutiset
// @description    Maalaa hs.fi:n "Uusimmat uutiset" -sivun urheilu-uutiset melkein näkymättömäksi 
// @include        http://hs.fi/uutiset/*
// @version        1
// ==/UserScript==

var links = document.getElementsByTagName('a');
var total_links = 0;
var faded_links = 0;

for(x in links){
  var link = links[x];
  if (link.innerHTML == 'Urheilu' && link.className == 'department') {

    
    // Värjää kategorianimen "urheilu"
    link.style.color = '#ddd';
    

    // Värjää uutisotsikkotekstin
    nodes = link.parentNode.parentNode.childNodes;
    for(y in nodes){
     if (nodes[y].tagName == 'H2') {
       childnodes = nodes[y].childNodes;
       for (z in childnodes) {
         if (childnodes[z].tagName == 'A') {
           childnodes[z].style.color = '#eee';
         }
       }
     }
    }

    // Värjää kellonajan
    nodes = link.parentNode.parentNode.childNodes;
    for(y in nodes){
     if (nodes[y].tagName == 'DIV') {
       childnodes = nodes[y].childNodes;
       for (z in childnodes) {
         if (childnodes[z].tagName == 'TIME') {
           if (childnodes[z].childNodes[0].style !== undefined) {
             childnodes[z].childNodes[0].style.color = '#ddd'
           }
         }
       }
     }
    }
    faded_links++;
  }
  total_links++;
}

alert("Yhteensä " + total_links + " linkkiä. Värjätty " + faded_links + " linkkiä lähes valkoiseksi.");