// ==UserScript==
// @name        Clean GAG
// @namespace   http://userscripts.org/users/simoes
// @description Simple script that cleans 9gag look
// @include     http://9gag.com/*
// @include     https://9gag.com/*
// @version     1
// @grant		none
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
// ==/UserScript==

$("div.side-dock").remove();

$("div.feedback-button").remove();

$("p.green-pea").hide();

$("div#container").css({"width":"740px"});

$("div#content").css({"background-color":"#EEE"});

$("body").css({"min-width":"740px", "background-color":"#444"});

$("div#post-control-bar").remove();

$("div.sharing-box").remove();