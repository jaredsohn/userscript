// ==UserScript==
// @name           Torrents.ru: reload page on server overload
// @namespace      http://tntlab.com/mozilla/greasemonkey/
// @description    Torrents.ru: reload page on server overload
// @include        http://torrents.ru/forum/*
// ==/UserScript==

(function() {
    var timeout = 10 * 1000; // In ms
    //var msg = ">Извините, в данный момент сервер перегружен.<";
    var msg = ">\u0418\u0437\u0432\u0438\u043D\u0438\u0442\u0435\u002C\u0020\u0432\u0020\u0434\u0430\u043D\u043D\u044B\u0439\u0020\u043C\u043E\u043C\u0435\u043D\u0442\u0020\u0441\u0435\u0440\u0432\u0435\u0440\u0020\u043F\u0435\u0440\u0435\u0433\u0440\u0443\u0436\u0435\u043D.<";

        if (document.body.innerHTML.indexOf(msg) >= 0) {
            (unsafeWindow || window.wrappedJSObject || window).setTimeout(function() { location.reload(true) }, timeout);
        }
})();