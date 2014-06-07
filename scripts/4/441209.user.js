// ==UserScript==
// @name         Let Confirm Go Away
// @description  去除qq共享qq旋风弹窗
// @author       陌百百<feng_zilong@163.com>
// @include      http://qun.qzone.qq.com/*
// @version      1.0
// ==/UserScript==
unsafeWindow.confirm = function(msg){return false;};
unsafeWindow.downloadFileByIframe = function(a,d){window.open(QZFL.userAgent.ie <= 8 && /(html|xhtml|htm|sgml|shtml|dhtml|shtm)$/.test(d.filename) ? a.url + "/" + d.filename + ".txt" : a.url + "/" + d.filename)};