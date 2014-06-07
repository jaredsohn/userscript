// ==UserScript==
// @name           360docCopyIsRight
// @description    让复制文章内容在没有登录360doc的情况下也可以使用
// @grant          none
// @version        1.0
// @run-at         document-start
// @match          http://*.360doc.com/*
// ==/UserScript==
if(document.cookie.indexOf('360doc1=') === -1) {
  document.cookie = '360doc1=cnmb;path=/;domain=.360doc.com;';
}
