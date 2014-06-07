// ==UserScript==
// @name           Torrent Damage Ad remover
// @namespace      TD
// @description    Torrent Damage - removes the ads
// @include        http://www.torrent-damage.net/*.php
// ==/UserScript==

 function zapifr(){
var 

doc=document,ifras=doc.getElementsByTagName('iframe'),rempr=function(obj){obj.parentNode.removeChild

(obj);};
if(ifras.length){for(var i=ifras.length; i--;){rempr(ifras[i]);}}
 }
   document.addEventListener('load',zapifr(),false);
/*]]>*/