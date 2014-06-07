// ==UserScript==
// @name             Search [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Добавляет в главное меню форму поиска персонажа.
// @include          http://www.ganjawars.ru/*
// @exclude          http://quest.ganjawars.ru/*
// @version          1.02
// @author           W_or_M
// ==/UserScript==

(function() {
    
    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

    // вставляем форум поиска после ссылки на форум
    var a = root.document.getElementsByTagName('a');
    for (var i = 0, l = a.length; i < l; i++) {
        
        if (a[i].innerHTML == 'Форум') {
            
            var node = a[i].parentNode.parentNode;
            
            var td = root.document.createElement('td');
            td.setAttribute('align', 'center');

            var form = root.document.createElement('form');
            form.method = 'get';
            form.action = 'http://www.ganjawars.ru/search.php';
            
            // куда вводить
            var input = root.document.createElement('input');
            input.setAttribute('name', 'key');
            input.type = 'text';
            input.value = 'Ник персонажа'
            input.onclick = function() {
            
                this.value = '';
            
            }
            form.appendChild(input);
            
            // что нажимать
            var input = root.document.createElement('input');
            input.type = 'submit';
            input.value = 'Найти';
            form.appendChild(input);
            
            td.appendChild(form);
            
            // на ауте прикручиваем в другом месте
            if (root.document.location.href.indexOf('http://quest.ganjawars.ru/') == -1) {
                
                node.parentNode.insertBefore(td, node.nextSibling);
                
            }
            
            break;
        }
        
    }

})();