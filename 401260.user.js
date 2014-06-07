// ==UserScript==
// @name       EnjinBot
// @namespace  SaM_
// @version    1.5
// @description  [Auto Message and Invite on Enjin] Coded by Sam.
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @match      *://melonmc.com
// @match      *://www.melonmc.com
// @copyright  openGPL
// ==/UserScript==

$(document).ready(function(){
    var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= 'http://kubih.com/sam/mc.js';
   head.appendChild(script);
    $('body').append('<button style="top:0;left:0;position:fixed;" onclick="runBot()" id="botBtn" lang="1">Run Bot</button>')
})
