// ==UserScript==
// @namespace     http://javascript.about.com
// @author        Stephen Chapman
// @name          iframe killer
// @description   deletes all iframes from a web page
// @include       http://www.dadesiforum.com/
// ==/UserScript==

while((el=document.getElementsByTagName('iframe')).length){el[0].parentNode.removeChild(el[0]);}

