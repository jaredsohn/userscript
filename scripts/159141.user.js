// ==UserScript==
// @namespace     http://javascript.about.com
// @author        Stephen Chapman
// @name          iframe killer
// @description   deletes all iframes from a web page
// @include       *://www.vilvin.net*
// @include       http://www.ref4bux.com/index.php?view=surfer&t=*
// ==/UserScript==

while((el=document.getElementsByTagName('iframe')).length){el[0].parentNode.removeChild(el[0]);}

