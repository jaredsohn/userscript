// ==UserScript==
// @name D2L Trade Auto Bump
// @description Automatically bump D2L Trade page when refreshed.
// @author tc89
// @copyright tc89, 2014
// @version 1.0
// @include http://dota2lounge.com/mytrades
// @include http://dota2lounge.com/mytrades?sec=*
// ==/UserScript==


var btnTrade= document.getElementsByClassName("buttonright");

for (var i = 0; i < btnTrade.length; i++)
    btnTrade[i].click();