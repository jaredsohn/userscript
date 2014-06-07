// ==UserScript==
// @name        delZHLimit
// @namespace   perzer
// @description 删除纵横中文网选择限制
// @include     http://book.zongheng.com/chapter/*
// @version     1
// ==/UserScript==
jQuery("div[class=readcon]").attr("style","");
$.fn.contextMenu=function() {};
document.oncontextmenu = function(){return true};