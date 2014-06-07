// ==UserScript==
// @id             Position fix Google menu bar
// @name           固定 Google 导航栏及搜索框
// @version        1.0
// @namespace      http://www.zfanw.com/blog
// @author         chenxsan
// @description    将 Google 页面顶部导航栏及搜索框固定下来
// @include        http://*.google.com/*
// @include        https://*.google.com/*
// @exclude        http*://plus.google.com/*
// @run-at         document-end
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.7.1/jquery.min.js
// @updateURL      
// ==/UserScript==
$("#mngb").css({
            "position":"fixed",
            "width":"100%"
            }
            );
$("#main").css({
            "position":"relative",
            "top":"102px"
            });

