// ==UserScript==
// @name             Sind Filter [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Фильтрует синдзаявки по номеру синда
// @include          http://www.ganjawars.ru/me/*
// @include          http://www.ganjawars.ru/wargroup.php*
// @version          1.03
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

// куки
function setCookie (name, value, expires, path, domain, secure) {
      document.cookie = name + "=" + escape(value) +
        ((expires) ? "; expires=" + expires : "") +
        ((path) ? "; path=" + path : "") +
        ((domain) ? "; domain=" + domain : "") +
        ((secure) ? "; secure" : "");
}

function getCookie(name) {
	var cookie = " " + document.cookie;
	var search = " " + name + "=";
	var setStr = null;
	var offset = 0;
	var end = 0;
	if (cookie.length > 0) {
		offset = cookie.indexOf(search);
		if (offset != -1) {
			offset += search.length;
			end = cookie.indexOf(";", offset)
			if (end == -1) {
				end = cookie.length;
			}
			setStr = unescape(cookie.substring(offset, end));
		}
	}
	return(setStr);
}

load(function () {
    
    // id перса
    var uid     = getCookie('uid');
    // id синда
    var sind_id = getCookie('sind_id');
    
    // на главной странице ищем номер синда
    
    if (root.location.href.indexOf('http://www.ganjawars.ru/me/') >= 0) {
        
        // ищем все ссылки на перса
        var a = root.document.getElementsByTagName('a');
        for (i = 0, l = a.length; i < l; i++) {
            
            if (a[i].href.indexOf('http://www.ganjawars.ru/info.php?id='+ uid) >= 0) {
                
                var node = a[i].previousSibling;
                if (node.tagName == 'A' && node.firstChild.tagName == 'IMG') {
                    
                    sind_id = /http:\/\/images\.ganjawars\.ru\/img\/synds\/(\d+)\.gif/.exec(node.firstChild.src);
                    
                    // нашли
                    if (sind_id != null) {
                        
                        sind_id = sind_id[1];
                        setCookie('sind_id', sind_id, 0, '/');                        
                        break;
                        
                    }
                    
                }
                
            }
            
        }
        
    }
    
    // на странице синдовых
    if (root.location.href.indexOf('http://www.ganjawars.ru/wargroup.php?war=attacks') >= 0 && (sind_id != null && sind_id != '')) {
        
        
        // ищем таблицу с заявками
        // одновременно проверяем заявлены ли мы на бой
        var b = root.document.getElementsByTagName('b');
        var table, flag = false;
        for (i = 0, l = b.length; i < l; i++) {
            
            if (b[i].innerHTML == 'Заявлены:') {
                
                table = b[i].parentNode.parentNode.parentNode.parentNode;
                
            }
            
            if (/Вы заявлены на бой\./.test(b[i].innerHTML)) {
                
                flag = true;
                
            }
            
        }
        
        // таблицу нашли и мы не заявлены на бой
        if (typeof table != 'undefined' && !flag) {
            
            // после кнопки "обновить" вставляем "отмену фильтра"
            var a = root.document.getElementsByTagName('a');
            for (i = 0, l = a.length; i < l; i++) {
                
                if (a[i].innerHTML.indexOf('[ Обновить ]') >= 0 && a[i].href == 'http://www.ganjawars.ru/wargroup.php?war=attacks') {
                    
                    var span = root.document.createElement('span');
                    span.appendChild(root.document.createTextNode(' [ '));
                    
                    var aa = root.document.createElement('a');
                    aa.appendChild(root.document.createTextNode('отменить фильтр'));
                    aa.href = 'http://www.ganjawars.ru/wargroup.php?war=attacks';
                    aa.onclick = function() {
                        
                        setCookie('sind_id', '');
                        root.location.href = 'http://www.ganjawars.ru/wargroup.php?war=attacks';
                        
                    }
                    span.appendChild(aa);
                    
                    span.appendChild(root.document.createTextNode(' ] '));
                    a[i].parentNode.insertBefore(span, a[i].nextSibling);
                }
                
            }
            
            var tr = table.getElementsByTagName('tr');
            for (i = 0; i < tr.length; i++) {
                
                // заявки в которые есть вход оставляем
                if (tr[i].getAttribute('bgcolor') == '#f5fff5') {
                    
                    // удаляем все заявки без нашего синда
                    
                    if (tr[i].childNodes[4].innerHTML.indexOf('http://images.ganjawars.ru/img/synds/'+ sind_id +'.gif') == -1) {
                        
                        tr[i].parentNode.removeChild(tr[i]);
                        i = 0;
                        
                    }
                    
                }
                
            }
            
        }
        
    }
   
    
});

})();