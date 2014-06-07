// ==UserScript==
// @name           mail.ru videosaver
// @namespace      some stupid script from fleandr
// @include        http://video.mail.ru/*
// ==/UserScript==



 desc = document.getElementById("link_addFriend");
 descP = desc.parentNode;
 dv = document.createElement("a");
 myref=document.location.href;
 myref=myref.replace(/\.html.*/,".flv")  ;
 dv.innerHTML="<a href="+myref+"> DOWNLOAD </a>";
 descP.insertBefore(dv, desc);