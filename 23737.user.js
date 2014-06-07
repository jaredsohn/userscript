// ==UserScript==
// @name          direct_linkyfy
// @namespace     direct_linkyfy
// @source
// @description   Quita el molesto mensaje "redirigiendo a..." de (reemplaza todos los links externos a links directos)
// @include       *

for(var i=0; i<document.links.length;i++) {
   if(/url=/i .test(document.links[i].href)) {
     document.links[i].href = unescape(document.links[i].href.replace(/^.*url=(.*)$/gi, "$1"));
   }
   if(/\.(jpg|png)$/i .test(document.links[i].href)) {
     document.links[i].innerHTML='<img src="'+document.links[i].href+'">';
   }
}