// ==UserScript==
// @name           4chan CSS Hack
// @namespace      Doogie1012
// @description    Fixes 4chan boards when m00t screws with them.
// @include        http://boards.4chan.org/*
// ==/UserScript== 

var d,c,b;for(d=0;(c=document.getElementsByTagName("link")[d]);d++){if(c.getAttribute("rel").indexOf("style")!=-1&&c.getAttribute("title")){c.setAttribute("href","http://static.4chan.org/css/yotsuba.9.css");}}