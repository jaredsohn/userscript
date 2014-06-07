// ==UserScript==
// @name B站移动广告屏蔽
// @version 0.1
// @namespace 定义
// @description B站移动广告屏蔽
// @include http://*.bilibili.tv/*
// @include http://bilibili.tv/*
// ==/UserScript==
//@小柯_小哀
if(!location.href.match(/\?/))
location.href=location.href+"?";
window.onload = function(){$(document).ajaxSend( function(event, jqXHR, ajaxOptions){ajaxOptions.url =ajaxOptions.url+"?" ;})}