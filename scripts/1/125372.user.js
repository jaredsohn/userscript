// ==UserScript==
// @name           JsForCSDN
// @namespace      CSDNScript
// @description    CSDN程序员论坛JS脚本
// @include        *://topic.csdn.net/u/*
// @include        *://community.csdn.net/HomePage.aspx
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==

var $CSS = "body,.msgfont,fieldset,legend,.nav_top_2011,ul,li { font-family: '微软雅黑',Microsoft YaHei !important; }"
+ " .msgfont {  font-size: 16px; line-height: 28px; }"
+ " .msgfont table.mframe   { box-shadow: 0 0 4px #DDD; } "
+ " .df { font-size: 12px; } "
+ " .df dfn a { text-shadow:1px 1px 1px #444; } "
+ ""
;

var $AdID = ""
+ ",#Topic_Top"
+ ",#ad_left"
+ ",#ad_right"
+ ",#tad2"
+ ",#_popup_msg_container"
;


try {
  document.title += " ::JS:";
  $('head').append('<style type="text/css">'+$CSS+'</style>');

  /* 去除广告 */
  $($AdID).remove();

  document.title += ":OK:: ";

} catch(e){ }
