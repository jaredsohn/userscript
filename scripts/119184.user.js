// ==UserScript==
// @name             Search [NY edition] [GW] 
// @namespace        http://gw.heymexa.net/
// @description      Добавляет в главное меню форму поиска персонажа.
// @include          http://www.ganjawars.ru/*
// @include          http://ganjawars.ru/*
// @version          1.02
// @author           W_or_M
// ==/UserScript==

(function() {
    
var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('ganjawars.ru') >= 0) {

    // вставляем форум поиска после ссылки на форум
    var a = root.document.getElementsByTagName('a');
    for (var i = 0, l = a.length; i < l; i++) {
        
        if (a[i].innerHTML == 'Форум') {
            
            var node = a[i].parentNode.parentNode;
            
            // снеговик
            var td = root.document.createElement('td');
            var img = new Image();
            img.src = 'http://gw.heymexa.net/wp-content/uploads/snegovik3_r.gif';
            img.title = 'С наступающим Новым Годом!';
            td.appendChild(img);
            node.parentNode.insertBefore(td, node.nextSibling);
            node = node.nextSibling;
            
            
            // форма
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
            input.value = 'Заказать снеговикам';
            form.appendChild(input);
            
            td.appendChild(form);
            
            // на ауте прикручиваем в другом месте
            if (root.document.location.href.indexOf('http://quest.ganjawars.ru/') == -1) {
                
                node.parentNode.insertBefore(td, node.nextSibling);
                
            }
            
            break;
        }
        
    }

}

})();