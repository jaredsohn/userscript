// ==UserScript==
// @name				taobao_nextpage_images
// @description 		淘宝网(www.taobao.com)自动使用 AutoPager 加载下一页时自动修复不显示的图片.
// @version			1.0
// @author 			jijihome
// @namespace		http://jijihome.googlecode.com
// @include			http://*.taobao.com/*
// @require			http://jijihome.googlecode.com/files/jquery.1.42.for.gm.js
// ==/UserScript==
(function(){function b(){clearTimeout(a);var c=window.scrollY;a=setTimeout(function(){c==window.scrollY&&d()},300)}function d(){$("[data-lazyload-src]").attr("src",function(){return $(this).attr("data-lazyload-src")})}var a;a=setTimeout(function(){},10);$("#ajaxtable a").attr("target","blank");$(document).ready(function(){$(window).bind("scroll",function(){b()})})})(unsafeWindow);
