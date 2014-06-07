// ==UserScript==
// @name             Item2Market [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Дополнительные ссылки в рюкзаке. "Продать/Сдать" предмет на доске объявлений. + Возможность быстрой починки предметов
// @include          http://www.ganjawars.ru/items.php*
// @version          1.01
// @author           W_or_M
// ==/UserScript==

function item2market(transport) {
    
    // аякс
    function ajax(url, method, onload) {
        
        if (typeof GM_xmlhttpRequest != 'undefined') {
            
            GM_xmlhttpRequest({
                method: method,
                url: url,
                onload: onload
            });
        
        } else if (Ajax) {
            
            new Ajax.Request(url, {
                
                method: method,
                onComplete: onload
                
            });
        
        }
        
    }
       
    
    // ищем предметы с возможностью передачи
    var a = root.document.getElementById('itemsbody').getElementsByTagName('a');
    for (i = 0; i < a.length; i++) {
        
        var id = /http:\/\/www\.ganjawars\.ru\/home\.senditem\.php\?item=(\d+)&item_tag=(.*)&iuid=\d+/i.exec(a[i].href);
        if (id != null) {
            
            item_id = id[1];
            id      = id[2];
            
            // починка
            var aa = a[i].parentNode.previousSibling.getElementsByTagName('a');
            for (k = 0; k < aa.length; k++) {
                
                if (aa[k].innerHTML == 'чинить') {
                    
                    aa[k].href += '?repair=' + item_id;
                    var url = aa[k].href;
                    
                    aa[k].onclick = function() {
                        
                        ajax(url, 'GET', function(req) {
                            
                            // а предметик то, отремонтирован успешно
                            if (req.responseText.indexOf('Предмет успешно отремонтирован!') >= 0) {}
                            
                            root.location.href = 'http://www.ganjawars.ru/items.php';
                            
                        });
                        
                        
                        return false;
                        
                    }
                    
                }
                
            }
            
            // объявление
            var li = root.document.createElement('li');
            li.innerHTML = 'Объявление: <a href="http://www.ganjawars.ru/market-p.php?stage=2&item_id='+ id +'&action_id=1">Продать</a> | <a href="http://www.ganjawars.ru/market-p.php?stage=2&item_id='+ id +'&action_id=3">Сдать</a>';
            a[i].parentNode.parentNode.insertBefore(li, a[i].parentNode);
            
            i += 2;
            
        }
        
    }

}

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;


(function() {

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


// на странице предметов
if (root.location.href.indexOf('http://www.ganjawars.ru/items.php') >= 0) {
    
    load(function() {
        
        item2market();
        
        postdo = function(url) {
            
            new Ajax.Updater('itemsbody', url, {onComplete:item2market});
            return false;
            
        };
   
    });
    
}


})();