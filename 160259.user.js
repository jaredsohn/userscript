// ==UserScript==
// @name vargan.spb.ru mp3 downloader
// @description Облегчает скачивание mp3 с vargan.spb.ru/forum/
// @grant none
// @author Ivan Boldyrev
// @license MIT
// @version 1.0.1
// @include http://vargan.spb.ru/forum/*
// @include http://oberton-pro.ru/forum/*
// @include http://www.vargan.spb.ru/forum/*
// @include http://www.oberton-pro.ru/forum/*
// ==/UserScript==
// [1] Оборачиваем скрипт в замыкание, для кроссбраузерности (opera, ie)
(function (window, undefined) {  // [2] нормализуем window
    var w;
    if (typeof unsafeWindow != undefined) {
        w = unsafeWindow;
    } else {
        w = window;
    }
    // [3] не запускаем скрипт во фреймах
    // без этого условия скрипт будет запускаться несколько раз на странице с фреймами
    if (w.self != w.top) {
        return;
    }

    function getFileUrl(params) {
        for (var i = 0; i<params.length; ++i) {
            if (params[i].name=='flashvars') {
                var vars = params[i].value.split('&');
                for (var j = 0; j < vars.length; ++j) {
                    if (vars[j].startsWith('file=')) {
                        return unescape(vars[j].substring(5));
                    }
                }
            }
        }
        return null;
    }

    // [4] дополнительная проверка наряду с @include
    if (/^http:\/\/vargan.spb.ru\/forum\//.test(w.location.href)
       || /^http:\/\/oberton-pro.ru\/forum\//.test(w.location.href)
       || /^http:\/\/www.vargan.spb.ru\/forum\//.test(w.location.href)
       || /^http:\/\/www.oberton-pro.ru\/forum\//.test(w.location.href)) {
        //Ниже идёт непосредственно код скрипта
        var players = document.getElementsByTagName('OBJECT');
        var len = players.length;
        for (var i = 0; i < len; ++i) {
            var pl = players[i];
            var labelLookup = pl.parentNode;
            while (labelLookup && (labelLookup.nodeType != 1 || labelLookup.tagName != 'STRONG')) {
                labelLookup = labelLookup.nextSibling;
            }

            if (labelLookup) {
                // We have found normal node
                var text = labelLookup.textContent;
                var url = getFileUrl(pl.children);
                if (url) {
                    var a = document.createElement('a');
                    a.setAttribute('href', url);
                    a.appendChild(labelLookup.childNodes[0]);
                    labelLookup.appendChild(a);
                }
            }
        }
    }
})(window);
