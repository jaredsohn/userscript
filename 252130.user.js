// ==UserScript==
// @name        delCSLimit
// @namespace   perzer.com
// @description del chuangshi.com limit
// @include     http://chuangshi.qq.com/read/bk/ds/*.html
// @include		http://chuangshi.qq.com/read/bk/js/*.html
// @include		http://chuangshi.qq.com/read/bk/ls/*.html
// @version     1
// ==/UserScript==

window.onload = function() {
document.oncontextmenu=function(){return   true;}//屏蔽右键菜单
document.onpaste=function(){return   true;}//屏蔽粘贴
document.oncopy=function(){return   true;}//屏蔽复制
document.oncut=function(){return   true;}//屏蔽剪切
document.onselectstart=function(){return   true;}//屏蔽选择
};