// ==UserScript==
// @name           Da-Anime.biz - Cleanup
// @description    Cleans up alot of crap
// @include        http://da-anime.biz/*
// @include        http://*.da-anime.biz/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @namespace      http://chrishaines.net
// @version        1.0
// ==/UserScript==

GM_addStyle("#HTML1, #BlogList1, #Image1, #comments, #sidebar-wrapper {display: none !important;}");
GM_addStyle("#sidebar-wrapperL {float: right !important; margin-right: 10px !important;}");
GM_addStyle("#main-wrapper {width: 710px !important;}");
$("#HTML1, #BlogList1, #Image1, #comments, #sidebar-wrapper").remove();