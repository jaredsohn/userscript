// ==UserScript==
// @name           Deviant Gallery Link
// @namespace      JRice
// @description    Add a direct link to a deviant's gallery.
// @include        http://www.deviantart.com/deviation/*
// ==/UserScript==

links = document.getElementsByTagName('a');

for (i=0;i<links.length;i++) {
  if (links[i].className == 'u') {
    newlink = document.createElement('a');
    newlink.href = links[i].href + 'gallery/';
    newlink.innerHTML = " (gallery)";
    links[i].parentNode.appendChild(newlink);
  }
}
