// ==UserScript==
// @name        Downvote!
// @namespace   Robert Dole
// @include     http://www.reddit.com/user/*
// @version     1.0
// @grant       none
// ==/UserScript==

$("div.titlebox>h1").after("<button style='background-color:#FF5BB0;' onclick='$(\"div.arrow.down.login-required\").each(function(i){$(this).click();});'>Remove Internet Points</button><br>");