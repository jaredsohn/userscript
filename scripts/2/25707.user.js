// ==UserScript==
// @name Ur bestfriend Link in Home Page..
// @description puts ur bestfriend link in ur homepage..edit script source with ur best friend uid
// @include http://www.orkut.com/*
// ==/UserScript==

var td=document.getElementsByTagName("ul")[1];
td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Profile.aspx?uid=17525692649344931546'>Rajputgal</a>&nbsp;|&nbsp;</li>";