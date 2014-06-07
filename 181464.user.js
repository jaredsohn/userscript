// ==UserScript==
// @name            Hack Forums Test Logo
// @namespace       Snorlax
// @description     Test
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js
// @include         *hackforums.net/*
// @version         1.0
// ==/UserScript==

$(".logo").find("img").attr("src", "http://x.hackforums.net/images/modern/logo.png");