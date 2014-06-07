// ==UserScript==
// @name           Mobile01
// @description    make Mobile01 lighter
// @author         Whany K. Thunder
// @include        http://www.mobile01.com/*
// @match          mobile01
// @version        1.0
// ==/UserScript==

$("#header").remove();
$("#news").remove();
$("div.navbar").remove();
$("div.navad").remove();
$("div.sidebar>div.inner").remove();
$("div.forum-content>div.contentfoot").remove();
$("div[class^=double_ad]").remove();