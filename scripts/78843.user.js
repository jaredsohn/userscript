// ==UserScript==
// @name           imagemap linker
// @namespace      bjgood
// @description    changes image links to full size image + html code
// @include        *endoftheinter.net*
// ==/UserScript==
var divs = document.getElementsByTagName("div");
for (var i=0; i<divs.length; i++){
  if (divs[i].className == 'imgs'){
    divs[i].innerHTML = divs[i].innerHTML.replace(/\/imap\//g, "/img/");
  }
}
