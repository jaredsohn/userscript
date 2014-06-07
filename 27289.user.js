// ==UserScript==
// @name Ur Community Link in Home Page..By Sohail
// @description puts ur community link in ur homepage..edit script source with ur community
// @include http://www.orkut.com/*
// ==/UserScript==

var td=document.getElementsByTagName("ul")[1];
td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/community.aspx?cmm=52058606'>I m D BEST</a>&nbsp;|&nbsp;</li>";
