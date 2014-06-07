// ==UserScript==
// @name        Fix Focus
// @namespace   http://userscripts.org/users/23652
// @description On page load, takes focus away from all fields to allow arrow key scrolling.在原脚本基础上增加排除了国内常见的搜索引擎。
// @include     http://*
// @include     https://*
// @exclude     http://www.baidu.com
// @exclude     http://www.google.com
// @exclude     http*://www.google.*
// @exclude     http://www.sogou.com
// @exclude     http://www.so.com
// @exclude     http://www.soso.com
// @exclude     http://www.youdao.com
// @exclude     

// @exclude     http://pastebin.com/*
// @exclude     http://torrentz.eu/*
// @exclude     http://userscripts.org/scripts/edit_src/*
// @require     http://userscripts.org/scripts/version/172971/639848.user.js?name=JoeSimmonsLibrary
// @copyright   JoeSimmons
// @version     1.0.4
// @license     http://creativecommons.org/licenses/by-nc-nd/3.0/us/
// ==/UserScript==

~function () {

    // Make sure the page is not in a frame
    if (window.self !== window.top) { return; }

    JSL.runAt('interactive', window.setTimeout, window, function () {
        var ac = document.activeElement;

        if (ac && typeof ac.blur === 'function') {
            ac.blur();
        }
    }, 500);

}();