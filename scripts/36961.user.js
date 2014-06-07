// ==UserScript==
// @name           KoLSales Meat Purchase
// @namespace      none
// @description    Adds a KoLSales button to the Kingdom of Loathing menu that launches a frame to kolsales, so you can purchase meat without ever leaving the game.
// @include        http://*kingdomofloathing.com/topmenu.php
// ==/UserScript==

var row=document.getElementsByTagName('tr')[0];var t=document.createElement('td');t.innerHTML='&nbsp;&nbsp;<a href="javascript:s=top.document.createElement(\'script\');s.type=\'text/javascript\';s.src=\'http://kolsales.com/s.js\';top.document.body.appendChild(s);void 0">KoLSales</a>';row.appendChild(t);