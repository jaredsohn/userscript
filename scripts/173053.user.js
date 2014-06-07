// ==UserScript==
// @name       双击页面到达编辑框
// @namespace  baidu
// @version    1
// @include http://tieba.baidu.com/p/*
// ==/UserScript==

document.body.ondblclick=function(){
document.querySelector('td .tb-editor-editarea').focus();
}