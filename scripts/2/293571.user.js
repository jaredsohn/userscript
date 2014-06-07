// ==UserScript==
// @name        The Courier H4XXXX
// @namespace   http://userscripts.org/users/476788
// @Descriptions Remove the stupid subscribe box
// @include     http://thecourier.com/*
// @require http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @version     1
// @grant       none
// ==/UserScript==

var annoying;

setInterval(function() { kill() }, 2000);

function kill() {
    annoying = $("#ta_background, #ta_invisible");
    if (annoying.length) annoying.remove();
}