// ==UserScript==
// @name           ShowImage
// @description    移除zxmh.cc的img样式标签
// @match          http://*.zxmh.cc/*
// @author         iwege
// @version        2012.11.2.8
// ==/UserScript==

document.onmousedown = function(){};
document.oncontextmenu = function(){};
var $loading = document.getElementById('loading');
if ($loading) {
	$loading.style.display = 'none';
};
var $iphoto = document.getElementById("iphoto");
if ($iphoto) $iphoto.style.display = "block";