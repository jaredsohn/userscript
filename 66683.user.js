// ==UserScript==
// @name           PTWestScript by Igo Versão X Opera
// @namespace      http://west.igopt.com/
// @description    Modifica o interface do jogo The West no Opera
// @include        http://*.the-west.*/game.php*
// @exclude        http://www.the-west.*
// @exclude        http://forum.the-west.*
// ==/UserScript==

var PTWestScript=document.createElement('script');
PTWestScript.type='text/javascript';
PTWestScript.src='http://west.igopt.com/scripts/PTWestScript_Opera.js';
document.body.appendChild(PTWestScript);