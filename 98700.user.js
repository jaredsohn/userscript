// ==UserScript==
// @name           Kill The Theater
// @namespace      http://www.userscripts.org/
// @include        http://www.facebook.com/photo.php?fbid=*
// @include        https://www.facebook.com/photo.php?fbid=*
// @include        *
// @exclude        http://*
// @version        0.6 beta
// ==/UserScript==
var url=document.location.href;
var condition=url.match("&theater");
if (condition=="&theater")          
     {
       url=url.replace("&theater", "");
       document.location.href=url;
     }
else
     {
       break;
     }
