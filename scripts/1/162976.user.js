// ==UserScript==
// @name        ArcGIS 帮助
// @namespace   com.ljl.arcgis
// @include     http://resources.arcgis.com/zh-CN/help/main/10.1/*
// @require       http://code.jquery.com/jquery-1.9.1.min.js
// @grant       none
// @version     1
// ==/UserScript==

// 得到头部高度
var hh = $("#rc-header").height();

// 隐藏头部
$("#rc-header").css("display", "none");
$("div.rc-header-bg").removeClass("rc-header-bg");
$("div.rc-bread-subnav-con").css("display", "none");

// 重设内容高度
$("#leftPanel").css("height", $("#leftPanel").height() + hh + 23);
$(".vsplitbar").css("height", $(".vsplitbar").height() + hh + 23);
$("#rightPanel").css("height", $("#rightPanel").height() + hh + 23);