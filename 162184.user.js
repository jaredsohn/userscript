// ==UserScript==
// @name         Tieba no AD at top
// @namespace    http://jixun.org/
// @version      1.0.1.0
// @description  隐藏来自『贴吧公告』的广告
// @include      http://tieba.baidu.com/*
// @copyright    2012+, Jixun
// @run-at       document-start
// ==/UserScript==

// 修正误杀? 嘛看还有没有误杀的…
var cssCode = '.thread_notice.thread_1st, /* 后面那些是兼容旧版贴吧用的w */#thread_list_table tr { display: none } #thread_list_table tr[tid] { display: table-row }';

var eStyle = document.createElement ('style');
eStyle.innerHTML = cssCode;
document.querySelector ('head').appendChild (eStyle);
