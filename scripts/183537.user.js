// ==UserScript==
// @name	IkaLogs
// @description Send Ikariam battle reports to IkaLogs.com.
// @updateUrl   http://ikalogs.ru/js/etc/script.meta.js
// @downloadUrl http://ikalogs.ru/js/etc/script.user.js
// @version	1.1.2
// @date	2013.09.16
// @author	Zig
// @homepage    http://ikalogs.ru/#scripts/
// @namespace   ikalogs.ru
// @icon        http://ikalogs.ru/themes/default/img/icons/scriptIkalogs.png
// @include	http://s*.ikariam.gameforge.com/*
// @require     http://ikalogs.ru/js/jquery/jquery-2.0.3.min.js
// @require	http://ikalogs.ru/js/etc/script2.js
// ==/UserScript==

(function (window, undefined) {
    var w = unsafeWindow || window;
    if (w.self != w.top) {
        return;
    }
                    
    window.addEventListener ("load", init, false);
})(window);                  
                        