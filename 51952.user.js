// ==UserScript==
// @name           rv max weapon qtl sell
// @namespace      file:///home/jell/Dane/src/userscripts/rv-1.js
// @description    set max sell qtl in rv sell weapon
// @include        http://www.roguevampires.net/sell*
// ==/UserScript==

re = /\(max: (\S+)\)/;
val = document.body.innerHTML;
if (vals = re.exec(val)) {
  inp = document.getElementsByTagName("input")[1];
  inp.value = vals[1];
}
