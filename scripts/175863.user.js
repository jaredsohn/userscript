// ==UserScript==
// @name          强制豆瓣黑条本标签打开
// @namespace     https://zr.is/
// @description   强制豆瓣黑条本标签打开
// @require       http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.7.2.min.js
// @match       http://*.douban.com/*
// ==/UserScript==

$(document).ready(function() {
  $(".global-nav-items li a").attr("target", "");
});