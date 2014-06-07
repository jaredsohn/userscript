// ==UserScript==
// @name Linker
// @editor unknown egunda [only editing]
// @description make link for my own orkut fav communities
// @include http://www.orkut.co.in/*
// ==/UserScript==


var cmmlist=document.getElementsByTagName('div')[10];
cmmlist.innerHTML+="<b>"+"<em>"+"<u>"+
"&nbsp;$&nbsp;Favourite Communities&nbsp;$&nbsp;"+"<br><br>"
+"&nbsp;$&nbsp;<a href='http://www.orkut.co.in/Community.aspx?cmm=48636221'>Cool Person</a>"+"<br><br>"
+"&nbsp;$&nbsp;<a href='http://www.orkut.co.in/Main#Community.aspx?cmm=48703924'>I love life</a>"+"<br><br>"
+"&nbsp;$&nbsp;<a href='http://www.orkut.co.in/Main#Community.aspx?cmm=47546008'>Spongebob </a>"+"<br><br>"
+"&nbsp;$&nbsp;<a href='http://www.orkut.co.in/Main#Community.aspx?cmm=50813044'>Rumi...</a>"+"<br><br>"
+"&nbsp;$&nbsp;<a href='http://www.orkut.co.in/Main#Community.aspx?cmm=62552305'>jaane Tu Ya janee na</a>"+"<br><br>"
+"&nbsp;$&nbsp;<a href='http://www.orkut.co.in/Main#Community.aspx?cmm=53722202'>html test </a>";