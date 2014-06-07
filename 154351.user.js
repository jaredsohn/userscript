// ==UserScript==
// @name        douban_top_menu
// @namespace   
// @description align top menu
// @include     http://*.douban.com/*
// @updateURL      https://userscripts.org/scripts/source/154351.meta.js
// @downloadURL    https://userscripts.org/scripts/source/154351.user.js
// @version     2.1
// ==/UserScript==

var top_bd = document.getElementsByClassName("bd")[0];
top_bd.style.width = "980px";	
top_bd.style.margin = "0 auto";
top_bd.style.padding = "0 0 0 10px";
var top = document.getElementById("db-global-nav");
top.style.borderBottom = "3px solid #F8D575";