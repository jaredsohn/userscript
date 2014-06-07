// ==UserScript==
// @id             rozzlobenimuzi remove ad
// @name           rozzlobenimuzi remove ad
// @version        1.0
// @namespace      
// @author         daemonicky
// @description    skryje reklamy z rozzlobenimuzi
// @include        http://www.rozzlobenimuzi.com/*
// @run-at         document-end
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$("div[id=top]").remove();
$("div[id=topbg]").remove();
$("div[id=topb]").remove();
$("body").css("background-color","black");