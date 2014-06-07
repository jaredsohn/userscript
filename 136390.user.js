// ==UserScript==
// @id             移除百度贴吧广告
// @name           百度贴吧广告移除脚本
// @version        1.0
// @namespace      http://www.zfanw.com/blog
// @author         chenxsan
// @description    移除百度贴吧广告
// @include        http://tieba.baidu.com*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL      http://userscripts.org/scripts/source/136144.user.js
// ==/UserScript==
$("div.l_banner").remove();
$("div#rightAd").remove();