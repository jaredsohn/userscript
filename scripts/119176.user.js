// ==UserScript==
// @name             forumPages [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Дублирование снизу верхнего списка страниц на форуме.
// @include          http://www.ganjawars.ru/threads.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {
    
    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
    
    if (root.location.href.indexOf('http://www.ganjawars.ru/threads.php') >= 0) {
        
        // ищем ссылки на переключение странц
        var a = root.document.getElementsByTagName('a');
        for (i = 0, l = a.length; i < l; i++) {
            
            // нашли
            if (/http:\/\/www\.ganjawars\.ru\/threads\.php\?fid=\d+&page_id/i.test(a[i].href)) {
                
                a[i].style.fontSize = '10pt';
                var pages = a[i].parentNode.parentNode.cloneNode(true);
                
            }
            
            // нашли место куда вставить страницы
            if (a[i].innerHTML == 'К списку форумов') {
                
                var table = a[i].parentNode.parentNode.parentNode.parentNode;
                table.parentNode.insertBefore(pages, table);
                
                break;
                
            }
            
        }
    
    }
    
})();