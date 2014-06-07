// ==UserScript==
// @name           Chat2Duel by Uhutaf
// @namespace      http://www.wojbork.pl/gm/chatduel.user.js
// @description    Dodatek przesuwa chat poza forum umożliwiając normalną gadkę przy expie.
// @copyright      Uhutaf
// @version        1.0
// @include        http://www.mgduel.com/
// @include        http://www.mgduel.pl/
// @include        http://mgduel.com/
// @include        http://mgduel.pl/
// ==/UserScript== 

var fileref=document.createElement('script');
fileref.setAttribute("type","text/javascript");
fileref.setAttribute("src", "http://www.wojbork.pl/gm/chatduel.js");
document.getElementsByTagName("head")[0].appendChild(fileref);