// ==UserScript==
// @name community link in homepage
// @author SHASHI-http://www.orkut.com/Profile.aspx?uid=6423165137229677325
// @description community link in HomePage
// @include http://www.orkut.com/*
// ==/UserScript==

var oh=document.getElementsByTagName("ul")[1];oh.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Community.aspx?cmm=33010909'>The invisible community</a>&nbsp;|&nbsp;</li>";