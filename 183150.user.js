// ==UserScript==
// @name       Remove Dota-Trading.com #branding
// @namespace  http://markussss.net/
// @version    1.0
// @description  Removes the #branding-div on dota-trading.com, as it's obnoxious and moves the interesting parts of the website further down than it has to be.
// @match      http://dota-trade.com/*
// @copyright  2013+, do whatever you want
// ==/UserScript==

var $ = unsafeWindow.jQuery;
$('body').append($('#wrap').detach());
$('#branding').remove();