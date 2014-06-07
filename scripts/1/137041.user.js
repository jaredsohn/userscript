// ==UserScript==
// @name           Netme index
// @description    make Netme lighter
// @author         Whany K. Thunder
// @include        http://www.netme.cc/*
// @match          airways/index.php
// @version        1.0
// ==/UserScript==

$(".pages_btns s_clear").remove();
$("#ann").remove();

$("div.itemtitle s_clear").remove();

$("div[id^=ad_intercat]").remove();


$("div.mainbox.list").hide();

$("div.mainbox.list:eq(1)").show();
$("div.mainbox.list:eq(18)").show();
$("div.mainbox.list:eq(19)").show();
$("div.mainbox.list:eq(20)").show();
$("div.mainbox.list:eq(21)").show();

$("div:hidden").remove();