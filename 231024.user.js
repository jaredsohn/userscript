// ==UserScript==
// @name       去除Gamersky广告
// @namespace  
// @version    0.1
// @description 
// @match      http://www.gamersky.com/*
// @copyright  2012+, Jast
// ==/UserScript==

$('iframe[name="T9501"],iframe[name="9501"],iframe[name="T9502"],iframe[name="main2"]').remove();