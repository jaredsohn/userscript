// ==UserScript==
// @name         易语言论坛免登录下附件
// @namespace    http://jixun.org/
// @version      β1.1
// @description  测试用。
// @include      *://bbs.eyuyan.com/*
// @copyright    2012+, Jixun

// @updateURL	https://userscripts.org/scripts/source/166189.meta.js
// @downloadURL	https://userscripts.org/scripts/source/166189.user.js
// ==/UserScript==

// 直接下载附件。

(function () {
    var und = 'undefined';
    if (und != typeof(unsafeWindow)) {
        var w = unsafeWindow;
    } else if (und != typeof(window)) {
        var w = window;
    } else {
        console.log ('Can\'t access to window object, exiting..');
        return false;
    }
    
    var ajaxurl_old = w.ajaxurl;
    w.ajaxurl = function (o, ep) {
        if (/\/job\.php/.test(o.href)) {
            location.href = 'eyybbs://' + o.href;
            return false;
        }
        return ajaxurl_old (o, ep);
    }
})();