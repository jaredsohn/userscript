// ==UserScript==
// @name           darkthread
// @description    make darkthread lighter
// @author         Whany K. Thunder
// @include        http://blog.darkthread.net/*
// @match          darkthread
// @version        1.0
// ==/UserScript==

$("#header").remove();
$("BlogCalendar").remove();
$("div.Not_accordionContent").remove();
$("div#BlogCalendar").remove();
$("div#StyleZone").remove();
$("div#SearchSideBar~div:lt(2)").remove();
$("div.entryview>div:last").remove();
$("div.entryview~dl").remove();
$("div.entryview~a").remove();
$("div.entryview~h4").remove();