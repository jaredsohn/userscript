// ==UserScript==
// @name           Z0r AntiAdblock Message Remover
// @version 1.0
// @namespace      zor_antiblock_gonna_hate
// @description    Z0r AntiAdblock Message Remover
// @include        http://z0r.de/*
// ==/UserScript==

/*
Info - Blocking "http://z0r.de/inc/adb.js" in your Adblock Browser Plugin does the same (remove the message)!
*/



document.body.onload = function()
{
 document.getElementsByClassName(ads)[0].innerHTML=" "; 
}