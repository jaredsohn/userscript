// ==UserScript==
// @name Ur Community Link in Home Page..
// @description puts ur community link in ur homepage..edit script source with ur community
// @include http://www.orkut.com/*
// ==/UserScript==
  
   var td=document.getElementsByTagName("ul")[1];
   td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/Community.aspx?cmm=48839994'><font style=text-decoration:blink>?RFG???°Real Friends Group°??™<</font></a></a>&nbsp;|&nbsp;</li>";