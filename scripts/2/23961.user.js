// ==UserScript==
// @name My link in homepage
// @author Natraj
// @description My link in HomePage
// @include http://www.orkut.com/*
// ==/UserScript==

var oh=document.getElementsByTagName("ul")[1];oh.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Profile.aspx?uid=12104562956028501111'>Natraj</a>&nbsp;|&nbsp;</li>";

