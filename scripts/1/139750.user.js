// ==UserScript==
// @name           Crunchyroll.com - Remove Alerts and make 1080p links
// @namespace      http://chrishaines.net
// @description    Removes all alerts and make 1080p links
// @include        http://www.crunchyroll.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.js
// @author         Christopher Haines
// @version        1.3
// ==/UserScript==
GM_addStyle("#message_box {display: none !important}");
$("div.collection-carousel-media a.link.block").each(function(){
  $(this).attr("href",$(this).attr("href")+"?p1080=1");
});
$("li.queue-item a.block-link.episode").each(function(){
  $(this).attr("href",$(this).attr("href")+"&p1080=1");
});