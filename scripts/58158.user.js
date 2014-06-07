// ==UserScript==
// @name           Orkut Messages Title Bar
// @namespace      by Yash
// @description    Orkut Messages Title Bar
// @include        http://www.orkut.*/CommMsgs*
// ==/UserScript==

var head=document.getElementsByTagName("h1")[0];
document.title="Orkut - "+head.innerHTML;