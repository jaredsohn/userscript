// ==UserScript==
// @name        百度音乐自动下载
// @namespace   noe132
// @include     /http://music\.baidu\.com/song/[0-9]{1,11}/download/
// @version     1
// ==/UserScript==

document.getElementById("download").click();
setTimeout("window.close()",1000);

/*
--------------注意--------------
请把about:config中的dom.allow_scripts_to_close_windows的值设置为true。
*/