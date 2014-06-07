// ==UserScript==
// @name           weibo.com
// @namespace      jaunty.weibo
// @description    修正新浪微博的微博显示页面在 ubuntu 11.04 + firefox 4.0.1 下评论向右偏移的问题
// @include        http://weibo.com/*
// @include        http://t.sina.com.cn/*
// ==/UserScript==

GM_addStyle(".commendBox { overflow: inherit;}");