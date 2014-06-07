// ==UserScript==
// @name             Stairway To Heaven [Led Zeppelin] 
// @namespace        http://worm.vline.ru/gw/
// @description      При передаче предмета показывает список ваших объявлений.
// @include          http://www.ganjawars.ru/home.senditem.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

// писал этот скрипт под Led Zeppelin
// кто "нуб и опозорилсо" и не знает кто такие втыкает сюда http://ru.wikipedia.org/wiki/Led_Zeppelin

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

// ajax
function ajax(url, method, onload) {
    
    // только FF. Maxthon лесом.
    if (typeof GM_xmlhttpRequest != 'undefined'  && typeof document.all == 'undefined') {
        
        GM_xmlhttpRequest({
            
            method: method,
            url: url,
            onload: onload
            
        });
    // все остальное через Prototype
    } else if (typeof Ajax != 'undefined') {
        
        new Ajax.Request(url, {
            
            method: method,
            onComplete: onload
            
        });
    // ожидаем загрузки библиотеки        
    } else if (root.document.getElementById('fwprototype') == null) {
        
        var script = root.document.createElement('script');
        script.id   = 'fwprototype';
        script.type = 'text/javascript';
        //script.src  = 'http://ajax.googleapis.com/ajax/libs/jquery/1.2.6/jquery.min.js';
        script.src = 'http://www.prototypejs.org/assets/2007/1/18/prototype.js';
        root.document.body.appendChild(script);
        
        root.setTimeout(function() { ajax(url, method, onload); }, 100);
        
    } else {
        
        root.setTimeout(function() { ajax(url, method, onload); }, 100);
        
    }

}

// индикатор загрузки
function showLoader() {
    
    // индикатор
    var div = root.document.createElement('div');
    div.id = 'loader';
    with (div.style) {
        
        width = '100%';
        height = '20px';
        backgroundImage = 'url("http://worm.vline.ru/gw/img/ajax2.gif")';
        backgroundPosition = 'center';
        backgroundRepeat = 'no-repeat';
        
    }
    root.document.body.appendChild(div);
    
}

// убрать нафик его
function hideLoader() {
    
    var loader = root.document.getElementById('loader');
    if (loader != null) {
        
        loader.parentNode.removeChild(loader);
        
    }
    
}

if (root.location.href.indexOf('http://www.ganjawars.ru/home.senditem.php') >= 0) {
    
    // убираем нафик ненужную таблицу
    var b = root.document.getElementsByTagName('b');
    for (var i = 0; i < b.length; i++) {
        
        if (b[i].innerHTML.indexOf(':: Важно ::') >= 0) {
            
            var table = b[i].parentNode.parentNode.parentNode.parentNode;
            table.parentNode.removeChild(table);
            
            delete table;
            
            break;
            
        }
        
    }
    
    if (typeof table != 'undefined') {
        
        showLoader();
    
        ajax('http://www.ganjawars.ru/market-l.php', 'GET', function(req) {
        
            // здесь хранить будем
            var div = root.document.createElement('div');
            div.innerHTML = req.responseText;
            
            // ищем таблицу
            var font = div.getElementsByTagName('font');
            for (var i = 0, l = font.length; i < l; i++) {
                
                if (font[i].innerHTML == 'Ваши объявления') {
                    
                    var table = font[i].parentNode.parentNode.parentNode.parentNode.parentNode;
                    
                    break;
                    
                }
                
            }
            
            if (typeof table != 'undefined') {
                
                hideLoader();
                
                root.document.body.appendChild(table);
                
            }            
    
        });
    
    }

}

})();