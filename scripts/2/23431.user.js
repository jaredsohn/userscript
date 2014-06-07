// ==UserScript==
// @name Ur Community Link in Home Page..
// @description puts ur community link in ur homepage..edit script source with ur community
// @include http://www.orkut.com/*
// ==/UserScript==
  
   var td=document.getElementsByTagName("ul")[1];
   td.innerHTML+="<li>&nbsp;|&nbsp;</li><li><a href='http://www.orkut.com/CommMsgs.aspx?cmm=39133825&tid=2572586797958046239'>Tom and jerry video links</a>&nbsp;|&nbsp;</li>";