// ==UserScript==
// @name           Entertainment14 post
// @description    make Entertainment14 lighter
// @author         whany77511
// @include        http://entertainment14.pixnet.net/*
// @match          post
// @version        1.0
// ==/UserScript==

$("div[id=header]").hide();
$("[id=links-row-1]").hide();

$("div#spotlight-text").remove();
$("div#spotlight").remove();

$("div.bookmark").remove();

$("div.article-content>div:gt(0)").remove();

$(".fb-comments").remove();

$("#pixblogad").remove();
$("div.article-footer").remove();

$("#user-post").remove();

var post = $("meta[content^=http://entertainment14.pixnet.net/blog/]").attr("content").replace("http://entertainment14.pixnet.net/blog/","");