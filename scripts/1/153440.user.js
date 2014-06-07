// ==UserScript==
// @name       让你的微博看起来舒服些
// @namespace  http://userscripts.org/users/486286
// @version    0.2
// @description  去掉了新版的头顶大红线、使中间内容区与旁边信息区的背景颜色区分开来，突出了内容区，让人看起来不那么闹心
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js 
// @match      *weibo.com/*
// @copyright  2012+, PolarBear
// ==/UserScript==
$("div").find(".gn_bg").css({"background-position-y": "100px"});
var wmaina = $("div").find(".W_main_a");
var oldBgColor = wmaina.css("background-color");
wmaina.css("background-color", "transparent");
$("div").find(".W_main_c").css("background-color", oldBgColor);