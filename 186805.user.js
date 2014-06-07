// ==UserScript==
// @name        Seenthis Same Windows
// @namespace   seenthis
// @include     http://seenthis.net/*
// @include     https://seenthis.net/*
// @version     1
// @grant       none
// ==/UserScript==


$("a.spip_out").live("click",function(){
window.open($(this).attr("href"),_self,false);
return false});
