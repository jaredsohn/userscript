// ==UserScript==
// @name           Follow in Tweader
// @namespace      http://refael.name/
// @homepage       http://userscripts.org/scripts/show/48595
// @version        1.0.3
// @description    Adds a button on Twitter time line pages to follow users' conversations with Tweader.com
// @include        *twitter.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

// 1.0.1 - Thanks to splintor - added support for single twit pages
// 1.0.2 - Now you can follow your own twits
// 1.0.3 - Fixed a bug in single twit pages

var icon = "data:image/gif,GIF89a%0E%00%07%00%D5%23%00%BB%BB%BB%CA%CA%CA%F7%F7%F7%DA%DA%DA%D9%D9%D9%F6%F6%F6%E3%E3%E3%EA%EA%EA%C9%C9%C9%B8%B8%B8%F8%F8%F8%D1%D1%D1%D7%D7%D7%C7%C7%C7%B5%B5%B5%EF%EF%EF%CB%CB%CB%DC%DC%DC%C0%C0%C0%DB%DB%DB%E8%E8%E8%F1%F1%F1%BA%BA%BA%C4%C4%C4%B4%B4%B4%C1%C1%C1%BE%BE%BE%C8%C8%C8%BF%BF%BF%E9%E9%E9%E7%E7%E7%F4%F4%F4%FB%FB%FB%BC%BC%BC%D5%D5%D5%FF%FF%FF%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00%00!%F9%04%01%00%00%23%00%2C%00%00%00%00%0E%00%07%00%00%06%3C%C0%D1%C3%D2(%8C%8E%9D%09%E8%C8d%60%10%14%C5%A8%83%11%7D%98%23%C1%22%C1%09%0CD%99%D0%C6%83%05E8%00%8D%E4r%09i%0E%D8Q%C5%20%82%84%C7q%2C%C1a%CDcE%22KGA%00%3B"
$(".status").each(function() {
	$(".reply").css("padding-bottom", 0);
	tmparr = this.id.split("_");
	statusID = tmparr[1];
	if(!statusID) statusID = location.href.replace(/.*status(es)?\//, '');
	$("span.actions div, div.actions", this).append("<a href='http://tweader.com/conversation.php?id=" + statusID + "' title='Follow on Tweader' target='_blank' style='text-indent:0;padding-top:0;'><img src='" + icon + "' width='14' height='7'/></a>");
});
