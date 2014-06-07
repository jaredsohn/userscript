// ==UserScript==
// @name           Google´s Hax
// @namespace      Google haking jack
// @description    Google haking jack
// @include        http://www.google.es/
// ==/UserScript==

botonmenu = document.createElement("input");
botonmenu.setAttribute("type","submit");
botonmenu.setAttribute("name","botonmenu");
botonmenu.setAttribute("value",'ConfiguraciÃ³n');
botonmenu.setAttribute("onclick",function(){Menu()});
botonmenu.addEventListener("click", function(){Menu()}, true);
