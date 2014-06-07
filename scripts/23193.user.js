// ==UserScript==
// @name ur community link in home page
// @author trojan:abujug ORKUT DON
// @description puts ur community link in ur homepage..edit script source with ur community
// @include http://www.orkut.com/*
// ==/UserScript==

var td=document.getElementsByTagName("ul")[1];
td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Community.aspx?cmm=42029403'>HACKING BY GODJILA</a>&nbsp;|&nbsp;</li>";