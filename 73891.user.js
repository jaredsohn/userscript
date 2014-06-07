// ==UserScript==
// @name           178 navigation bar sucks
// @namespace      *.178.com
// @description    去掉 178 顶部工具栏恶心的悬停效果.
// @include        http://*.178.com/*
// ==/UserScript==
var navAll = document.getElementById("NavAll");
if(navAll){
    navAll.style.cssText = "position : static !important";
    document.body.style.margin = "0 0 0";
}