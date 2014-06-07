// ==UserScript==
// @name           Membres connectés
// @namespace      My Prizee
// @include        http://www.prizee.com/forum/index.php?/index
// ==/UserScript==

document.getElementById('content').innerHTML=document.getElementById('content').innerHTML.replace("<div id='board_statistics'","--><div id='board_statistics'").replace("<div id='cal_bdays'","<!--<div id='cal_bdays'");