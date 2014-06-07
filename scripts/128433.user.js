// ==UserScript==
// @name           Index Forum Big Image
// @namespace      http://vector.extra.hu/vec/still_new031.user.js
// @description    Change all THM_ characters to IMG_ characters
// @include        http://forum.index.hu/Article/*
// ==/UserScript==

   
function x() {
	document.getElementsByTagName("body")[0].innerHTML=document.getElementsByTagName("body")[0].innerHTML.replace(/THM_/gm,'IMG_');
}

x(); 