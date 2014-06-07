// ==UserScript==
// @name           socialwall direct link
// @namespace      http://socwall.com
// @include        http://*socwall.com/browse*
// ==/UserScript==

for(i=0; i<document.images.length; i++) {
 if(document.images[i].className == "wpImage") { 
  newSrc = document.images[i].src.replace(/tb_/, "");
  document.images[i].parentNode.href = newSrc;
 }
}