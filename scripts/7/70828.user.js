// ==UserScript==
// @name        e-castig linkleri ayiklama aparati
// @namespace   e-castig linkleri ayiklama aparati
// @description itina ile e-castig linkleri alinir
// @include     http://sozluk.sourtimes.org/show.asp*
// @version     0.1
// ==/UserScript==

var allLinks;

allLinks = document.getElementsByTagName("a");

for(var i=0; i<allLinks.length; i++){
  if(allLinks[i].href.search("e-castig.com") >= 0){
    if(allLinks[i].innerHTML.search("e-castig") == -1){
      allLinks[i].innerHTML += " [e-castig]";
    }
  }
}
