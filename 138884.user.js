// ==UserScript==
// @id             www.nicovideo.jp-99208883-44d9-42cc-96a3-c76de2d0ff00@http://lpha38.net/
// @name           Niconico, 追従サイドバー
// @version        0.4.0
// @namespace      http://www.nicovideo.jp/user/12768857
// @author         lpha38
// @description    ユーザーページでサイドバーを追従させます
// @include        http://www.nicovideo.jp/my*
// @include        http://www.nicovideo.jp/user/*
// @run-at         document-end
// @homepageURL    http://userscripts.org/scripts/show/138884
// @updateURL      http://userscripts.org/scripts/source/138884.user.js
// ==/UserScript==
(function () {
    var w = typeof unsafeWindow == "undefined" ? window : unsafeWindow, document = w.document;
    var VERSION = "0.4.0", TAG = "[fsiup]", DEBUG_MODE = false;
    var log = function () { if (DEBUG_MODE) return w.console.log.apply(w.console, Array.prototype.concat.apply([TAG], arguments)); };
    var $ = w.jQuery;
    
    log("start");

    var $window = $(w);
    var $wrapper = $("div.wrapper");
    var $sidebar = $("div.wrapper div.sidebar ul:first");
    
    log($window, $wrapper, $sidebar);
    
    var scrolled = function () {
        log("call scrolled()");
        
        var wh = $window.height();
        var sh = $sidebar.height();
        var wt = $window.scrollTop();
        var st = $sidebar.offset().top;
        var rt = $wrapper.offset().top;
        
        log("wh:", wh, "sh:", sh, "wt:", wt, "st:", st, "rt:", rt);
        
        var mt;
        if (wt < rt) {
            mt = 0;
        } else if (wt > st + sh || wt + wh < st) {
            mt = wt - rt + 5;
        } else {
            return;
        }
        
        $sidebar.animate({ "margin-top": mt + "px" }, 500);
        
        log("move to margin-top:", mt);
    }
    
    var threadId;
    $window.scroll(function (ev) {
        $sidebar.stop();
        threadId = clearTimeout(threadId);
        threadId = setTimeout(scrolled, 500);
    });
    
    log("end");
})();