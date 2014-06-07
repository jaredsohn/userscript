// ==UserScript==
// @name           plus28 viewthread
// @description    make plus28 lighter
// @author         Whany K. Thunder
// @include        http://18plus.plus28.com/*
// @match          viewthread
// @version        1.0
// ==/UserScript==

$("#header").remove();
$("div.wrap>table").remove();
$("div#ad_text").remove();

$("div.mainbox.viewthread:gt(0)").remove();

$("div#ad_thread3_0").remove();
$("ad_interthread").remove();


$("img[src^=http://pagead2.googlesyndication.com/]").remove();