// ==UserScript==
// @name       Reddit Next Button Remover
// @namespace  http://github.com/wiLD0kl
// @version    0.9
// @description  Removes the 'next page' controls in the name of great productivity.
// @match      http*://*.reddit.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  Creative Commons CC0 1.0
// ==/UserScript==

$('.nextprev').hide();
