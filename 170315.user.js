// ==UserScript==
// @name        Kill The Red Pixel
// @author	Intermittence
// @namespace   http://userscripts.org/users/intermittence
// @description Kills the annoying red pixel on the AdviceAnimals subreddit.
// @include     *reddit.com/r/AdviceAnimals/*
// @version     1.0
// @grant	GM_addStyle
// @source	http://userscripts.org/scripts/show/170315
// @identifier	http://userscripts.org/scripts/source/170315.user.js
// ==/UserScript==


GM_addStyle(".title:before, .titlebox:before, .side:before, .content:before, .title:after, .titlebox:after, .side:after, .content:after { display: none!important; }");