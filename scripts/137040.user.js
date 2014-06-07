// ==UserScript==
// @name           Netme 
// @description    make netme lighter
// @author         Whany K. Thunder
// @include        http://www.netme.cc/*
// @mathc          airways
// @version        1.0
// ==/UserScript==

$("#ad_text").remove();
$("#header").remove();

$("div#postlist>div:gt(0)").remove();

$("div#ad_thread2_0").remove();
$("div#ad_thread3_0").remove();

$(":contains('如果您喜歡')")

$("img[src^=http://ads").hide();

$("iframe[src^=http://adserver").hide();

$("div#ad_thread4_0").remove();
$("td.ostcontent.postbottom).remove();