// ==UserScript==
 // @name           iGoogle Chat Remover
 // @namespace      Sewar
 // @description    Removes chat tab from iGoogle page, very helpful if you don't use Google Talk.
 // @include        http*://www.google.tld/ig*
 // @exclude        http*://www.google.tld/ig/*
 // @version         1.2
// ==/UserScript==

document.getElementById("chat_nav").parentNode.removeChild(document.getElementById("chat_nav"));
