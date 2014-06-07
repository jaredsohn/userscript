// ==UserScript==
// @name             Move2Sector [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Рядом с ссылкой на сектор добавляет ссылку на перемещение в этот сектор.
// @include          http://www.ganjawars.ru/*
// @exclude          http://www.ganjawars.ru/map.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {
    
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

function load(func) {
    
    var obj = /opera/i.test(navigator.userAgent) ? root.document : root;
        
    if (obj.addEventListener) {
        
        obj.addEventListener('load', func, false);
        
    } else {
        
        if (/Maxthon/i.test(navigator.userAgent)) {
            
            func();
            
        } else {
            
            obj.attachEvent('onload', func);
            
        }
        
    }
    
}

load(function () {
    
    // исключаем карту
    if (root.location.href.indexOf('http://www.ganjawars.ru/map.php') == -1 ) {
        
        // ищем все ссылки на сектора
        var a = root.document.getElementsByTagName('a');
        for (i = 0; i < a.length; i++) {
            
            // нашли
            var sector = /^http:\/\/www\.ganjawars\.ru\/map\.php\?sx=(\d+)&sy=(\d+)$/.exec(a[i].href);
            if (sector != null) {
                
                var aa = root.document.createElement('a');
                aa.appendChild(root.document.createTextNode(' [ move ] '));
                aa.style.textDecoration = 'none';
                aa.href = 'http://www.ganjawars.ru/map.move.php?gps=1&sxy=' + sector[1] + 'x' + sector[2];
                a[i].parentNode.insertBefore(aa, a[i].nextSibling);
                
            }
            
        }
    
    }
    
});

})();