// ==UserScript==
// @name             hi, rulet4igi =) [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Нефиг бабло на рулетку тратить! Заменяет ссылку на рулетку на выход из игры.
// @include          http://www.ganjawars.ru/*
// @author           W_or_M
// ==/UserScript==

(function() {

    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
    
    // =)
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
        
        if (/<b>Рулетка<\/b>/i.test(a[i].innerHTML)) {
            
            a[i].href = 'http://www.ganjawars.ru/logout.php';
            
            break;
            
        }
        
    }
    
    if (root.document.location.href.indexOf('http://www.ganjawars.ru/roulette.php') >= 0) {
        
        root.document.location.href = 'http://www.ganjawars.ru/logout.php';
        
    }
    

})();