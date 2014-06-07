// ==UserScript==
// @name             Fuck off Karma! 
// @namespace        http://worm.vline.ru/gw/
// @description      Карма - зло. Убирает карму на форуме и в инфе персонажа.
// @include          http://www.ganjawars.ru/*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

// убираем карму со страницы персонажа
if (document.location.href.indexOf('http://www.ganjawars.ru/info.php?id=') >= 0) {
    var b = document.getElementsByTagName('B');
    for (i = 0, l = b.length; i < l; i++) {
        if ((window.opera ? /\u041a\u0430\u0440\u043c\u0430:/ : /Карма:/).test(b[i].innerHTML)) {
            b[i].parentNode.parentNode.parentNode.removeChild(b[i].parentNode.parentNode);
            break;
        }
    }
}

// убираем карму тем
if (document.location.href.indexOf('http://www.ganjawars.ru/threads.php?fid') >= 0) {
    var fonts = document.getElementsByTagName('FONT');
    for (i = 0, l = fonts.length; i < l; i++) {
        if (/[\+\-]+\d+/.test(fonts[i].innerHTML)) {
            fonts[i].innerHTML = '';
        }
    }
}

// убираем карму постов
if (document.location.href.indexOf('http://www.ganjawars.ru/messages.php?fid=') >= 0) {
    var div = document.getElementsByTagName('DIV');
    for (i = 0, l = div.length; i < l; i++) {
        if (/vote\d+/.test(div[i].id)) {
            div[i].innerHTML = '';
        }
    }
}