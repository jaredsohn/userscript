// ==UserScript==
// @name           Dopravny servis radia Expres
// @namespace      http://userscripts.org/scripts/review/61181
// @description    odstranenie nepotrebnych casti stranky
// @include        http://www.expres.sk/dopravny-servis
// ==/UserScript==
var d;
var x = document.getElementsByTagName("H1");
for (i = 0; i < x.length; i++) {
  if (x[i].innerHTML == "Dopravný servis") {
    d = x[i].parentNode.parentNode;
  }
}
    
var b = document.getElementsByTagName("BODY")[0];
var c = b.childNodes;
b.replaceChild( d, c[0]);
for (i = 1; i < c.length; i++) {
  if (c[i].tagName == 'DIV') b.removeChild(c[i]);
}

