// ==UserScript==
// @name       伪·转换贴吧 ed2k 链接
// @version    1.3
// @description  将贴吧里提醒“贴吧安卓客户端可直接观看影片”的 ed2k 链接转换为可点击下载的链接……
// @match      *://tieba.baidu.com/*
// @author 864907600cc
// @grant	none
// @icon	http://1.gravatar.com/avatar/147834caf9ccb0a66b2505c753747867
// @include      *://tieba.baidu.com/*
// @updateURL	https://userscripts.org/scripts/source/172974.meta.js
// @downloadURL	https://userscripts.org/scripts/source/172974.user.js
// ==/UserScript==

var x=document.getElementsByClassName('j_d_post_yingyin_url');
for(var i=0;i<x.length;i++){
    x[i].outerHTML=x[i].outerHTML.replace('<span','<a').replace('</span','</a');
    x[i].setAttribute('href',x[i].innerHTML);
}