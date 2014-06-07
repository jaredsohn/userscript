// ==UserScript==
// @name           Shakes & Fidget- Performance Tuning
// @namespace      body
// @description    It sets the quality of the game slightly lower than normal, but that makes the game match faster.
// @version        1.0
// @include        *.sfgame.*
// @exclude        www.sfgame.*
// @exclude        sfgame.*
// @copyright      2009-2010 Marco Pfeiffer (www.sett.xe.cx)
// ==/UserScript==
window.addEventListener('load',function(){
var body = document.getElementsByTagName("body")[0];
body.innerHTML = body.innerHTML.replace(/quality\="best"/,'quality="medium"');
},fals
e);