// ==UserScript==
// @name cmm link in homepage
// @author devil
// @description Cmm link in HomePage
// @include http://www.orkut.com/*
// ==/UserScript==

var oh=document.getElementsByTagName("ul")[1];oh.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Community.aspx?cmm=43925962'>df</a>&nbsp;|&nbsp;</li>";