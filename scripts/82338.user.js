// ==UserScript==
// @name          解除网页右键菜单和复制限制
// @include        *
// @exclude       http*://mail.google.com/*
// @exclude       http://maps.google.com/*
// @author         tomchen1989
// @version        0.2
// @description   Fixes pages that disable context menus and text selection.
// ==/UserScript==

// This is a Greasemonkey user script. To install it, you need Greasemonkey: http://www.greasespot.net/. Then restart Firefox and revisit this script.
// 本脚本用于Firefox的扩展Greasemonkey, 您需要先安装Greasemonkey: http://www.greasespot.net/. 然后重启Firefox并打开此脚本文件.

// Some of this script is from the Greasemonkey hacks book.
// 部分脚本来自于Greasemonkey hacks书籍.
// Tell me if you find any site on which this userscript doesn't works or it should not be applied.
// 如果发现有此脚本作用不了或不需要用此脚本的的网页, 请告诉我.

// ver 0.1 @ 2008-12-12
// Restore context menus (right-click menus) and text selection on sites that disable them.
// 恢复某些网页禁用了的右键菜单和文本选择功能.
// ver 0.2 @ 2008-12-16
// Works after window.onload.
// 针对window.onload时的禁用的修正.


function restore(){
with (document.wrappedJSObject || document) {
onmouseup = null;
onmousedown = null;
oncontextmenu = null;
}
var arAllElements = document.getElementsByTagName('*');
for (var i = arAllElements.length - 1; i >= 0; i--) {
var elmOne = arAllElements[i];
with (elmOne.wrappedJSObject || elmOne) {
onmouseup = null;
onmousedown = null;
}
}
}

window.addEventListener('load',restore,true);

function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

addGlobalStyle("html, * {-moz-user-select:text!important;}");