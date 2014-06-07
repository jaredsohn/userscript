// ==UserScript==
// @name           PTWestScript by Igo VersÃ£o X
// @namespace      http://west.igopt.com/
// @description    Modifica o interface do jogo The West
// @include        http://*.the-west.*/game.php*
// @include        http://zz1w1.tw.innogames.net*
// @include        http://*tw-pro.de*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

var PTWestScript=document.createElement('script');
PTWestScript.type='text/javascript';
PTWestScript.src='http://west.igopt.com/scripts/PTWestScript.js';
document.body.appendChild(PTWestScript);