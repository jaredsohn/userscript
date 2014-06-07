// ==UserScript==
// @name           mf8链接修复
// @namespace      UserScript
// @description    自动将老贴中的域名更改为新域名
// @include        http://bbs.mf8-china.com/*
// ==/UserScript==

var a = document.getElementsByTagName('a');
for(var i = 0; i < a.length; i++) {
	a[i].href = a[i].href.replace(/bbs.mf8.com.cn/, 'bbs.mf8-china.com');
	a[i].innerHTML = a[i].innerHTML.replace(/bbs.mf8.com.cn/, 'bbs.mf8-china.com');
}