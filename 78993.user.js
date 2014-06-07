// ==UserScript==
// @name Millanos.pl with no ads!
// @description Script hides annoying banner at site milanos.pl! 
// @namespace rrobinn@tlen.pl
// @include http://www.milanos.pl/*
// @match http://www.milanos.pl/*
// ==/UserScript==

var banner = document.getElementById("bmone2n-2295.3.1.30");
banner.style.display = "none";