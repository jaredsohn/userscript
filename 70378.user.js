// ==UserScript==
// @name           CybozuTextAreaWide
// @namespace      http://cybozu.makesoft.local/scripts/cbag
// @description    サイボウズのテキストエリアを拡大する
// @include        http://cybozu.makesoft.local/scripts/cbag/*
// ==/UserScript==

(function(d, func) {
    var check = function() {
        if (typeof unsafeWindow.jQuery == 'undefined') return false;
        func(unsafeWindow.jQuery); return true;
    }
    if (check()) return;

    var s = d.createElement('script');
    s.type = 'text/javascript';
    s.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js';
    d.getElementsByTagName('head')[0].appendChild(s);
    (function() {
        if (check()) return;
        setTimeout(arguments.callee, 100);
    })();
})(document, function($) {
    // 社内メールフォームモード
    if ($('textarea#Data').length) {
        $('textarea#Data').css({
            width: 600,
            height: 400
        });
    }
});
