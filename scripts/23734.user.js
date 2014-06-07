// ==UserScript==
// @name cmm link in homepage
// @author UMER KHAN
// @description Cmm link in HomePage
// @include http://www.orkut.com/*
// ==/UserScript==

var oh=document.getElementsByTagName("ul")[1];oh.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Community.aspx?cmm=39413525'>DW</a>&nbsp;|&nbsp;</li>";