// ==UserScript==
// @name             ATATA [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Ссылки на персонажей и недвигу заменяются ссылками нападения.
// @include          http://www.ganjawars.ru/*
// @include          http://battles0.ganjawars.ru/*
// @include          http://battles.ganjawars.ru/*
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
        
        func();
        
    }
    
}

load(function() {
    
    // пробегаем по всем ссылкам
    // для нужных присобачиваем параметры для нападения
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
    
        // перс
        if (/^http:\/\/www\.ganjawars\.ru\/info\.php\?id=(\d+)$/.test(a[i].href)) {
            
            a[i].href += '&showattack=1&pampam=1';
            
        }
        
        // недвига
        if (/^http:\/\/www\.ganjawars\.ru\/object\.php\?id=(\d+)$/.test(a[i].href)) {
            
            a[i].href += '&attack=1';
            
        }
    }

});

})();