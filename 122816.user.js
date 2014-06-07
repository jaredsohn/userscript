// ==UserScript==
// @name          auto ajit fogad
// @namespace     
// @description   Elfogadja az ajandekokat 5+-1 percenkent!
// @version       1.00
// @include       http://www.minigame123.com/*
// @include       http://www.heronow.com/*
// ==/UserScript==

setTimeout(fogad, 10000);

function fogad(){
location.href = "javascript:void(receiveMyGift());";
setTimeout(fogad, (300000 + Math.floor(Math.random()*60000)));
}