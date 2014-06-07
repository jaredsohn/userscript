// ==UserScript==
// @name       豆瓣新首页::广播间距调整
// @namespace  https://tonyseek.com/
// @version    0.1.1
// @match      http://www.douban.com
// @match      http://www.douban.com/people/*/statuses
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @run-at	   document-start
// ==/UserScript==
$(function() {
    $(".status-item .mod").attr("style", "margin-bottom: 20px");
    $(".status-item .bd").attr("style", "padding-bottom: 20px");
});