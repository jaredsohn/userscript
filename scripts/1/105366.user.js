// ==UserScript==
// @name           Everyeye Clean
// @namespace      *forum.everyeye.it*
// @description    Sega via l'iframe in cima alla pagina
// @include        *forum.everyeye.it*
// @author         kache
// ==/UserScript==

v = document.getElementsByTagName('iframe');
document.getElementById("wrapper_br").removeChild( v[0] );


