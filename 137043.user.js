// ==UserScript==
// @name           plus28 index
// @description    make plus28 lighter
// @author         Whany K. Thunder
// @include        http://18plus.plus28.com/*
// @match          index.php
// @version        1.0
// ==/UserScript==

$("#header").remove();

$("div#mainWrapper>div:eq(0)").remove();

$("div#rightContent").remove();
$("div#announcement").remove();
$("div#mainTheme").remove();

$("div#categoryWrap>div:eq(0)>ul").hide();
$("div#categoryWrap>div:eq(0)>ul:eq(2)").show();
$("div#categoryWrap>div:eq(0)>ul:eq(4)").show();

$("div#categoryWrap>div:eq(1)>ul").hide();

//$("div#categoryWrap>div:eq(2)>ul").hide();

$("div#categoryWrap>div>font[color=blue]:eq(0)>font[color=blue]>font[color=blue]>ul").hide();

$("font[color=blue]>font[color=blue]>font[color=blue]>font[color=green]>font[color=green]>font[color=green]>div").hide();