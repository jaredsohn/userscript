// ==UserScript==
// @name           Zedge autohide policy
// @namespace      Zedge
// @description    Automatically hides policy on www.zedge.net
// @include        http://www.zedge.net/*
// @exclude        http://www.zedge.net/*/?hidepolicy
// @exclude        http://www.zedge.net/?hidepolicy
// ==/UserScript==

(function (){
var adresa = location.href
location.href=adresa+"?hidepolicy"; 
})();
