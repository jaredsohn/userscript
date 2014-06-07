// ==UserScript==
// @author Tim Weinitz
// @name   Tv4 Play anti adblock disabler
// @include  http://www.tv4play.se/program/*
// @version     1
// ==/UserScript==
document.getElementsByTagName("body")[0].setAttribute("data-anti-b", "false")
