// Zombie Unrecruiter by Johnny Treehugger (#1427059)
//
// ==UserScript==
// @name           Zombie Unrecruiter
// @namespace      http://kol.coldfront.net/thekolwiki/index.php/User:Johnny_Treehugger
// @description    Version 1.0 - Removes Recruit Zombie from the skills dropdown
// @include        http://*kingdomofloathing.com/skills.php*
// @include        http://*127.0.0.1:*/skills.php*
// @include        http://*localhost:*/skills.php*
// ==/UserScript==

// Version 1.0	09/21/2012	IT BEGINS!

var x = document.evaluate("//select/option[@value='12031']", document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
x.disabled = true;
//x.parentNode.removeChild(x);
