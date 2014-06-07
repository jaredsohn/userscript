// ==UserScript==
// @name        BT文件自动下载
// @namespace   wuji2004
// @include    http://www1.kidown.com/*
// @include    http://www1.17domn.com/*
// @include    http://www1.97down.info/*
// @include    http://www1.pidown.info/*
// @include    http://www1.wkdown.info/*
// @include    http://aaa.wkdown.info/*
// @include    http://aaa.kidown.com/*
// @include    http://aaa.17domn.com/*
// @include    http://aaa.97down.info/*
// @include    http://aaa.pidown.info/*


// @version     3
// ==/UserScript==

document.getElementById("down_btn").click();
setTimeout("window.close()",1530);

/*
--------------注意--------------
请把about:config中的dom.allow_scripts_to_close_windows的值设置为true。
*/