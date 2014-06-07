// ==UserScript==
// @name             Logout [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Добавляет ссылку на выход из игры в главное меню
// @include          http://www.ganjawars.ru/*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;
    
    // ищем ссылку на чат
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
        
        if (/<b>Чат<\/b>/i.test(a[i].innerHTML)) {
            
            var parent = a[i].parentNode;
            
            // разделитель
            parent.appendChild(root.document.createTextNode(' | '));
            
            // ссылка
            var a = root.document.createElement('a');
            a.setAttribute('href', 'http://www.ganjawars.ru/logout.php');
            a.setAttribute('style', 'text-decoration: none');
            a.innerHTML = ' <b>Выход</b> ';
            parent.appendChild(a);
            
            break;
            
        }
        
    }
    


})();