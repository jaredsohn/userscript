// ==UserScript==
//
// @name           Better Shanbay
//
// @description    1.新闻列表右对齐，使无图片的新闻更好用 2.支持用ABCD代替1234选单词，减少手指移动距离
//
// @namespace      http://greenmoon55.com
//
// @author         greenmoon55
//
// @homepage       http://greenmoon55.com
//
// @version        0.2
//
// @include        http://www.shanbay.com/*
//
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js
//
// ==/UserScript==
$(document).ready(function() {
  if (window.location.pathname.match("read")) {
    $(".article .span2").css("height", "120px");
  } else if (window.location.pathname.match("review")) {
    $("html").keydown(function(e) {
      if (!$(".answer.no-touch")) {
        return; 
      }
      if (e.which === 65) {
        $(".answer.no-touch")[0].click();
      }
      if (e.which === 66) {
        $(".answer.no-touch")[1].click();
      }
      if (e.which === 67) {
        $(".answer.no-touch")[2].click();
      }
      if (e.which === 68) {
        $(".answer.no-touch")[3].click();
      }
    })
  }
});
