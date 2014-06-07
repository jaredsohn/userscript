// ==UserScript==
// @name        DshinZilla Bot
// @namespace   http://dshini.net
// @description Change to something useful
// @include     http://*.dshini.net/de/game/play_dshinzilla*
// @version     1.0
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// @grant       unsafeWindow
// ==/UserScript==

unsafeWindow = this['unsafeWindow'] || window;
unsafeWindow.$$$$ = jQuery.noConflict();
unsafeWindow.$$$$(document).ready(
    function()
    {
        unsafeWindow.$$$$('a[title="neues Spiel starten"]').first().children('div').first().children('div').first().click();
        setTimeout(execute, 150);
    }
);

function execute()
{
    var cards = unsafeWindow.$$$$('a[title="Finde Dshini!"]');
    cards.eq(getRandom(0, (cards.length - 1))).click();
}

function getRandom(min, max) {
 if(min > max) {
  return -1;
 }
 
 if(min == max) {
  return min;
 }
 
 var r;
 
 do {
  r = Math.random();
 }
 while(r == 1.0);
 
 return min + parseInt(r * (max-min+1));
}