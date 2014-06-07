// ==UserScript==
// @name          Experts Free Exchange
// @namespace     http://userscripts.org/users/47405
// @description   Removes all of the crap blocking the answers on experts-exchange.com - making all answers free!
// @include       http://*.experts-exchange.com/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.4.2/jquery.min.js
// ==/UserScript==

$(function(){
$('#startFreeTrialEcho, .vqpsdBlurredAnswers, .allZonesMain, #expertScrollContainer, #expertScrollContainer').hide();
})