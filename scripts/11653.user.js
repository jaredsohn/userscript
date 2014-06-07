// ==UserScript==
// @name           mailto:
// @namespace      mailto:
// @description    mailto: -> alert
// @include        *.*
// ==/UserScript==
for(i=0;i<document.links.length;i++){
  if(document.links[i].protocol=="mailto:"){
document.links[i].href="javascript:prompt('mailto:','"+document.links[i].href.substring(7)+"');void(0);"
  }
}
