// ==UserScript==
// @name           Better Looking Joe's Goals
// @namespace      http://userscripts.org/users/467230
// @description    Joe's Goals design revamped (wip)
// @include        http*://www.joesgoals.com/*
// ==/UserScript==

var header = document.getElementById("headJG");
header.style.display="none";

var search = document.getElementById("tagBox");
search.style.display="none";

var footer = document.getElementById("details");
footer.style.display="none";

var hrs = document.getElementsByTagName('hr');
hrs.style.display="none";
