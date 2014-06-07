// ==UserScript==
// @name        RDB Anti-Logout
// @namespace   http://userscripts.org/users/507621
// @description Verhindert, dass man im Hintergrund von der RDB ausgelogged wird, indem die Seite einfach regelmäßig aktualisiert wird
// @include     http*://*rdb.at*
// @version     1
// ==/UserScript==

// 1 sec * seconds * minutes * hours 
var time_to_reload = (1000*60*20*1);
setTimeout(function(){location.reload();}, time_to_reload);
