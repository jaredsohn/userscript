// ==UserScript==
// @name           GaiaOnline - Highlight Empty Threads
// @namespace      http://userscripts.org/users/126924
// @description    Colors threads with 0 replies gold.
// @include        http://www.gaiaonline.com/*
// @include        http://gaiaonline.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(".forum-list .replies").filter(function(){return $(this).text()=="0";}).parent().css("background","#f7e35f");