// ==UserScript==
// @name        USAA annoyances
// @description Remove annoying image carousel from the new USAA home page.
// @namespace   http://blakeley.com/
// @include     https://www.usaa.com/inet/ent_home/CpHome
// @version     1
// ==/UserScript==

// remove annoying portal junk
var list = document.getElementsByClassName("gadgets-gadget-closed");
for (var i=0; i<list.length; i++) list[i].style["display"] = "none";

// end