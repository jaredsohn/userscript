// ==UserScript==
// @name        Hide pixiv bookmark count
// @namespace   pixivhidebookmark
// @description a Greasemonkey script to hide pixiv bookmark count
// @include     http://www.pixiv.net/*
// @exclude     http://www.pixiv.net/member_illust.php
// @version     1
// @grant       none
// ==/UserScript==

$(function() {
    $(".bookmark-count").text("★?");
});

