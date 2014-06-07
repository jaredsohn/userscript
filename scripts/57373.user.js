// ==UserScript==
// @name           Skip Tapuz Maavaron
// @namespace      http://hatul.info
// @description    Skip Page of Ad (Ma'avaron) in Tapuz
// @version 0.1
// @include        http://www.tapuz.co.il/*Maavaron.aspx?*
// ==/UserScript==

setTimeout("document.location.href=document.getElementById('ctl00_ctl00_ContentPlaceHolderMain_ContentPlaceHolderMain_SkipLink').href;",500);
