// ==UserScript==
// @name       RYM: bump button always on
// @version    0.1
// @match      http://rateyourmusic.com/release/*
// @match      https://rateyourmusic.com/release/*
// @copyright  2013+, You
// ==/UserScript==

var $ = unsafeWindow.jQuery;

$(".my_catalog_bump:eq(0)").find(">:first-child").attr("style","display: block;")