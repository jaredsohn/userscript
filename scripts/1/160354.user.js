// ==UserScript==
// @name             BuhloNaKarte [GW]
// @namespace        http://gw.heymexa.net/
// @description      Выносит фильтры «Бар» и «Кофе» в общее меню.
// @include          http://www.ganjawars.ru/map.php*
// @include          http://ganjawars.ru/map.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

// >(o)__
//  (_~_/ — это талисман защиты от банов! скопируй его себе в скрипт на удачу.
(function(){

var root = typeof unsafeWindow == 'undefined' ? window : unsafeWindow;
if (root.location.href.indexOf('ganjawars.ru/map.php') == -1) return;

function getMenu() {
    var a = root.document.getElementsByTagName('a');
    for (var i = 0, l = a.length; i < l; i++) {
        if (/Рабочие места/i.test(a[i].innerHTML)) {
            return a[i].parentNode;
        }
    }
};

function getXY() {
    var a = root.document.getElementsByTagName('a');
    for (var i = 0, l = a.length; i < l; i++) {
        if (/Рабочие места/i.test(a[i].innerHTML)) {
            try {
                var r = /map\.php\?sx=(\d+)&sy=(\d+)/.exec(a[i].href);
                // остров
                var island = '';
                if (r[2] >= 75 && r[2] <= 79) {
                    island = 'p';
                } else if (r[2] >= 148 && r[2] <= 152) {
                    island = 'z';
                }
                
                return { sx : r[1], sy : r[2], island : island };
            } catch (e) {};
        }
    }
    return false;
};

function addToMenu(text, url) {
    var menu = getMenu();
    if (!menu) return;
    
    // жирненьким выделяем
    if (root.location.href == url) {
        text = '<b>'+ text +'</b>';
    }
    
    var span = root.document.createElement('span');
    span.innerHTML = ' | <a href="'+ url +'">'+ text +'</a>';
    menu.appendChild(span);
}

var coords = getXY();
addToMenu('Бары', 'http://www.ganjawars.ru/map.php?sx='+ coords.sx +'&sy='+ coords.sy +'&bt=bar2'+ coords.island);
addToMenu('Кофий', 'http://www.ganjawars.ru/map.php?sx='+ coords.sx +'&sy='+ coords.sy +'&bt=bar1'+ coords.island);

})();