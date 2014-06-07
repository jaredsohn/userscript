// ==UserScript==
// @name        Dota 2 Lounge trade bumper
// @namespace   http://userscripts.org/users/WernieBert
// @include     http://dota2lounge.com/mytrades
// @version     1
// @grant       none
// ==/UserScript==


var buttons = document.getElementsByClassName("buttonright");

for (var i = 0; i < buttons.length; i++)
    buttons[i].click();