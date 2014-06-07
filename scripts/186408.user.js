// ==UserScript==
// @name       google translate 网页翻译书签版 + 去头部白条
// @namespace  http://userscripts.org/users/liuxiang
// @version    0.1
// @description  google translate 网页翻译书签版 + 去头部白条
// @match      http://translate.google.com.hk/*
// @match      https://translate.google.com.hk/*
// @require     http://ajax.googleapis.com/ajax/libs/jquery/1.9.1/jquery.min.js
// @updateURL	https://userscripts.org/scripts/source/
// @downloadURL	https://userscripts.org/scripts/source/
// @copyright  2012+, You
// ==/UserScript==

// 配合书签使用
// 书签名:翻译-diy 地址: javascript:void(window.open( 'http://translate.google.com.hk/translate?hl=zh-CN&ie=UTF8&prev=_t&sl=en&tl=zh-CN&u='+window.location.href, "_blank"));

// 去 google translate 头部白条
document.getElementById('wtgbr').attributes["style"].value = 'margin-top: -60px;'
document.getElementById('gt-c').style.display='none';
document.getElementById('contentframe').attributes["style"].value = "top: 0px; left: 0px;"
