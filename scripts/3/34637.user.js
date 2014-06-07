// ==UserScript==
// @name           Joe's Goals 2.0 Tweak
// @namespace      http://userscripts.org/users/58245
// @description    Gets rid of everything but your goals!
// @include        http*://www.joesgoals.com/*
// ==/UserScript==

var header = document.getElementById("headJG");
header.style.display="none";

var search = document.getElementById("tagBox");
search.style.display="none";

var footer = document.getElementById("details");
footer.style.display="none";