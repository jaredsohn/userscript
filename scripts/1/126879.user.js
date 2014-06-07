// ==UserScript==
// @id             c2d91551-40da-480e-bc08-6c0ce65b801d
// @name           自动点击QQ邮箱收信箱
// @version        1.1
// @namespace      
// @author         idragonet
// @description    自动点击QQ邮箱收信箱
// @include        http://m*.mail.qq.com/cgi-bin/*
// @include        https://m*.mail.qq.com/cgi-bin/*
// @include        https://mail.qq.com/cgi-bin/*
// @include        http://mail.qq.com/cgi-bin/*
// @run-at         document-end
// ==/UserScript==


if (document.getElementById('folder_inbox'))
		document.getElementById('folder_inbox').click();