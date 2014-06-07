// ==UserScript==
// @name           Readability Cleaner
// @namespace      readability_cleaner
// @description    清除Readabiliy生成的阅读页面中的无关元素(Ads remover for Firefox Addon Readability, which is a eBook Reader for Web content)
// @include        http://www.readability.com/articles/*
// @require        http://ajax.aspnetcdn.com/ajax/jquery/jquery-1.6.2.js
// ==/UserScript==
$("#rdb-article-meta").remove();
$("#article-footer-actions-wrap").remove();
$(".article-pitch").remove();
