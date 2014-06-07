// ==UserScript==
// @name cmm link in homepage
// @author trojan;abujug
// @description Cmm link in HomePage
// @include http://www.orkut.com/*
// ==/UserScript==

var oh=document.getElementsByTagName("ul")[1];oh.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/CommTopics.aspx?cmm=38670707'>OH</a>&nbsp;|&nbsp;</li>";
