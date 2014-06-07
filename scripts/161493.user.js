// ==UserScript==
// @name       美味爱读++
// @namespace  http://www.g2w.me/
// @version    0.1
// @description  改进美味爱读的使用体验
// @match      http://readwise.net/article/*
// @copyright  2012+, greatghoul
// ==/UserScript==

// 查找工具栏
var article_title_wrapper = document.getElementsByClassName('article-title')[0];
var article_title = article_title_wrapper.getElementsByTagName('a')[0];
var article_url = document.getElementsByTagName('iframe')[0].src;
article_title.href = article_url;
article_title.title = '点击转到原文地址';