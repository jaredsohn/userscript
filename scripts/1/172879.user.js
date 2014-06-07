// ==UserScript==
// @name        Hide AddToAnything
// @icon        http://cubeworldwiki.net/favicon.ico
// @namespace   net.lg188.hidea2a
// @description Hides a crappy box
// @include     http://cubeworldwiki.net/*
// @version     1
// @grant       none

// ==/UserScript==

var Box = $(".a2a_dd");
Box.remove();