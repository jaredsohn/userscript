// ==UserScript==
// @name           TianyaJS
// @namespace      Tianya
// @description    天涯网脚本JS，整合所有的优秀版本的天涯JS
// @author        G9901,www.35dalu.com,ALL
// @homepage      http://www.35dalu.com/
// @version       1.0
// @include       http://*.tianya.cn/*
// @require        http://code.jquery.com/jquery-1.7.1.min.js
// ==/UserScript==

var $CSS = " body ,#forumContentDiv,#adsp_content_replybox_area ,.allpost,#forumContentDiv td *,.posttitle ,.faceblue ,.subtab-bar , .subtab-bar a,a { font-family: '微软雅黑',Microsoft YaHei !important; } "
+ ".allpost { border:0 solid #CCC; text-align:left; } "
+ ".post {font-size:14px; text-align: justify;line-height: 28px; maring-bottom: 5px; padding: 10px 20px !important; } "
+ ".fromwap u { } "
+ "#tianyaBrandSpan1,#adsp_content_banner_1 { } "
+ "#adsp_content_replybox_area { font-size: 16px; line-height: 26px;}"
+ ".shouji { background: url(http://801.tianyaui.com/res/2010/1130/1291094730345.gif) no-repeat left center; } "
+ "#newmainmidleft , #forumContentDiv ,#forumContentDiv table { width: 100%; }"
+ "#postlistwrapper .listtable  { width: 100%; }"
;

var $AdID = '#adContentDiv'
+ ',#adsp_content_top_banner'
+ ',#tianyaBrandSpan1'
+ ',#adsp_content_banner_1'
+ ',#adsp_content_banner_2'
+ ',#adsp_content_banner_3'
+ ',#adsp_content_adtopic'
+ ",#adsp_content_replybox_img_1"
+ ",#adsp_list_left_floatDiv"
+ ",#adsp_list_leftSmall_floatDiv"
+ ",#adsp_list_right_banner_1"
+ ",#newmainmidright"
;


try {
  document.title += " ::JS:";
  $('head').append('<style type="text/css">'+$CSS+'</style>');
 // $('.fromwap u').text('3g.tianya.cn');

  /* 去除广告 */
  $($AdID).remove();

  document.title += ":OK:: ";

} catch(e){ }
