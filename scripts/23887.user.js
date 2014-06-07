// ==UserScript==
// @name My link in homepage
// @author SHASHI
// @description My link in HomePage
// @include http://www.orkut.com/*
// ==/UserScript==

var oh=document.getElementsByTagName("ul")[1];oh.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Profile.aspx?uid=6423165137229677325'>Shashi</a>&nbsp;|&nbsp;</li>";