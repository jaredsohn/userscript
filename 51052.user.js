// ==UserScript==
// @name           Hot Or Not ==> AutoVote random(4..8)
// @namespace      #essl
// @description    AutoVote random
// @include        http://www.hotornot.com/
// @version        1
// ==/UserScript==
var rand = Math.floor(Math.random()*4)+4;
unsafeWindow.document.getElementById("r"+rand).onclick()