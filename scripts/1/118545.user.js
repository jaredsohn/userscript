// ==UserScript==
// @name           Google Ort
// @description    Google Ort ändern
// ==/UserScript==

var link012 = document.getElementsByTagName("div");
for (var i123=0; link012.length>i123; i123++)
  {
  if(link012[i123].innerHTML=='Deutschland')
    link012[i123].innerHTML=='Rannungen';
  }