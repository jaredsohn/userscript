// ==UserScript==
// @name             Advanced Sind [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      Расширяет возможности страницы синдиката.
// @include          http://www.ganjawars.ru/syndicate.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

// кроссбраузерная функция для ajax-запросов
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


// id синда
var sindId = /http:\/\/www\.ganjawars\.ru\/syndicate\.php\?id=(\d+)/.exec(root.location.href);
if (sindId != null) {
    
    sindId = sindId[1];
    
}

// Контролируемые объекты
if (/http:\/\/www\.ganjawars\.ru\/syndicate\.php\?id=\d+&page=control/.test(root.location.href)) {
    
    // ищем таблицу
    var td = root.document.getElementsByTagName('td');
    for (var i = 0, l = td.length; i < l; i++) {
        
        if (/Контролируемая недвижимость/.test(td[i].innerHTML)) {
            
            var table = td[i].parentNode.parentNode;
            
        }
        
    }
    
    // нашли
    if (typeof table != 'undefined') {
        
        // увеличиваем размер таблицы
        table.parentNode.style.width = '720px';
        
        var tr = table.getElementsByTagName('tr');
        
        // увеличиваем colspan
        tr[0].firstChild.setAttribute('colSpan', '4');
        
        // столбец "время"
        var td = root.document.createElement('td');
        td.style.width = '120px';
        td.style.fontWeight = 'bold';
        td.style.textAlign = 'center';
        td.className = 'wb';
        td.appendChild(root.document.createTextNode('Время'));
        tr[1].insertBefore(td, tr[1].childNodes[1]);
        
        // добавляем кнопки
        for (var i = 2, l = tr.length; i < l; i++) {
            
            var offset = typeof tr[i].childNodes[0].innerHTML != 'undefined' ? 0 : 1;
            
            var td = root.document.createElement('td');
            td.className = 'wb';
            td.style.textAlign = 'center';
            
            var input = root.document.createElement('input');
            input.type = 'button';
            input.value = 'Узнать';
            input.onclick = function() {
                
                var objectId = /\/object\.php\?id=(\d+)/.exec(this.parentNode.parentNode.childNodes[offset].innerHTML);
                
                if (objectId != null) {
                    
                    objectId = objectId[1];
                    
                    // родитель
                    var parent = this.parentNode;
                    
                    // =)
                    if (objectId == '4214') {
                        
                        alert('А по рогам?');
                        parent.innerHTML = 'неизвестно';
                        return;
                        
                    }
                    
                    // идикатор загрузки
                    parent.innerHTML = '<img src="http://worm.vline.ru/gw/img/ajax.gif" alt="Загрузка" title="Загрузка" />';
                    
                    // получаем время
                    ajax('http://www.ganjawars.ru/objectworkers.php?id='+ objectId, 'GET', function(req) {
                        
                        var time = /Следующее нападение возможно после ([\d\.:\s]+)\./i.exec(req.responseText);
                        
                        if (time != null) {
                            
                            time = time[1];
                            
                            var stime = time.replace(/(\d+)\.(\d+).(\d+)/g, '$2/$1/20$3');
                            var objTime = Date.parse(stime + ' GMT+0300');
                            var curTime = Date.parse(new Date().toUTCString()) + 3 * 60 * 60 * 1000;
                            
                            var strTime = objTime <= curTime ? 
                                '<span style="color: green;font-weight: bold">'+ time +'</span>' : 
                                '<span style="color: red;font-weight: bold">'+ time +'</span>';
                            
                        }
                        
                        parent.innerHTML = time != null ? strTime : 'неизвестно';
                        
                    });
                    
                }
                
            }
            
            td.appendChild(input);
            tr[i].insertBefore(td, tr[i].childNodes[offset + 1]);
            
        }
        
        
    }
    
}
    

})();