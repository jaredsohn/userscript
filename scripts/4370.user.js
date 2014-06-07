// ==UserScript==
// @name	  Antilayerads
// @namespace	  http://userscripts.org/scripts/show/4370
// @description   Removes Layerads (by Dicope)
// @version       1.0
// @include       *
// ==/UserScript==

var divs = document.getElementsByTagName("div");
var i = 0;
while(i < divs.length) {
  if((divs[i].className == "spMain" && divs[i].id.match(/^[0-9a-f]{32}$/)) || (divs[i].className == "layer_main" && divs[i].id.match(/^f[0-9]*$/))) {
    document.getElementsByTagName("body")[0].removeChild(divs[i]);
    break;
  }
  i++;
}