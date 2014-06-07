// ==UserScript==
// @name             Advanced Outland [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      На ауте добавляет ссылки: "На себя", "Магазин лицензий". В FireFox проверяет рюкзак на наличие сломанных вещей и активных синдикатных бох.
// @include          http://quest.ganjawars.ru/walk.php*
// @include          http://www.ganjawars.ru/object.php*
// @version          1.03
// @author           W_or_M
// ==/UserScript==

(function() {
    
// таймаут перед показом подсказки (в сек.)
var timeout = 0;


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


function ajax(url, method, onload) {
    
    if (typeof GM_xmlhttpRequest != 'undefined') {
        
        GM_xmlhttpRequest({
            
            method: method,
            url: url,
            onload: onload
            
        });
        
    }
    
    return false;

}

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

// поиск ссылки на форум, для вставки других ссылок перед ней
function getForum() {
    
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
        
        if (a[i].href.indexOf('http://www.ganjawars.ru/forum.php') >= 0) {
            
            return a[i];
            
        }
        
    }
    
    return false;
    
}

// смотрим есть ли лицуха туриста
function getItems() {
    
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
        
        if (a[i].href == 'http://www.ganjawars.ru/items.php') {
            
            return a[i];
            
        }
        
    }
    
    return false;
    
}



// мы на ауте
if (root.location.href.indexOf('http://quest.ganjawars.ru/walk.php') >= 0) {
    
    
 
    
        // ссылка на форум
        var forum = getForum();
        
        // ссылка на рюкзак
        var items = getItems();
        
        // узнаем че там нового появилось
        ajax('http://www.ganjawars.ru/workshop.php', 'GET', function(req) {
            
            var div = root.document.createElement('div');
            div.innerHTML = req.responseText;
            
            // результат
            var result = { repair : [], sind : 0 };
            
            // составляем список сломанных предметов
            var aa = div.getElementsByTagName('a');
            for (k = 0; k < aa.length; k++) {
                
                // ремонт
                if (/<b>Ремонтировать<\/b>/i.test(aa[k].innerHTML)) {
                    
                    var o = aa[k].parentNode.previousSibling.previousSibling.previousSibling;
                    if (typeof o.firstChild != 'undefined' && o.firstChild.tagName == 'FONT') {
                        
                        result.repair.push(o.firstChild.innerHTML);
                    
                    } else if (typeof o.lastChild != 'undefined' && o.lastChild.tagName == 'B') {
                        
                        result.repair.push(o.lastChild.firstChild.innerHTML);
                        
                    }
                
                }
                
                // синдбой
                if (aa[k].getAttribute('title') == 'Ваш синдикат заявлен на бой') {
                    
                    result.sind = 1;
                    
                }
            
            }
            
            // есть сломанные предметы
            if (result.repair.join(', ') != '') {
                
                // показываем алерт всего 1 раз
                if (typeof getCookie('result_repair') != 'undefined' && getCookie('result_repair') != 1) {
                    
                    alert("Сломанные предметы:\n\n"+ result.repair.join(', '));
                    
                }
                
                // добавляем ссылку на ремонтную мастерскую
                var span = root.document.createElement('span');
                span.innerHTML = '<a style="font-weight: bold;color: red;" href="http://www.ganjawars.ru/workshop.php" target="_blank">Ремонт</a> | ';
                forum.parentNode.insertBefore(span, forum);
                
                // пишем в печеньку, что типа уже показывали алерт
                setCookie('result_repair', 1);
                
            } else {
                
                setCookie('result_repair', 0);
                
            }
            
            
            // есть синдбой
            if (result.sind == 1) {
                
                // показываем алерт всего 1 раз
                if (typeof getCookie('result_sind') != 'undefined' && getCookie('result_sind') != 1) {
                    
                    alert('Ваш синдикат заявлен на бой');
                    
                }
                
                // добавляем ссылачку
                var span = root.document.createElement('span');
                span.innerHTML = '<a style="font-weight: bold;color: red;" href="http://www.ganjawars.ru/wargroup.php?war=attacks" target="_blank">Бой</a> | ';
                forum.parentNode.insertBefore(span, forum);
                
                setCookie('result_sind', 1);
                
            } else {
            
                setCookie('result_sind', 0);
            
            }
        
        });
            
        
        // просто вставляем ссылки
        if (forum) {
            
            root.setTimeout(function() {
                
                // ссылка на меня
                var span = root.document.createElement('span');
                span.innerHTML = '<a href="http://www.ganjawars.ru/info.php?id='+ getCookie('uid') +'" target="_blank">алка</a> | ';
                forum.parentNode.insertBefore(span, forum);
                    
                // магазин лицензий
               // var span = root.document.createElement('span');
               // span.innerHTML = '<a href="http://www.ganjawars.ru/shopl.php" target="_blank">Магазин лицензий</a> | ';
               // forum.parentNode.insertBefore(span, forum);
                    
            }, timeout * 1000);
        
        }
    
    
    
}

// нажимаем "Начать бой"
var input = root.document.getElementsByTagName('input');
    for (i = 0, l = input.length; i < l; i++) {

        if (input[i].value == 'Начать бой через 15 секунд') {
            	input[i].click()}}

// нажимаем "Взять"
var input = root.document.getElementsByTagName('input');
    for (i = 0, l = input.length; i < l; i++) {

        if (input[i].value == 'Взять') {
            	input[i].click()}}				

// делает аут первым список портов
var s = root.document.getElementsByName('sectorin');
if (s.length) {
    
    for (i = 0, l = s[0].length; i < l; i++) {
        
        if (s[0].options[i].innerHTML.indexOf('Ejection Point') >= 0) {
            
            s[0].options[i].selected = true;
            
        }
    
    }
}
// делает E1 первым список портов na aute
var s = root.document.getElementsByName('sectorin');
if (s.length) {
    
    for (i = 0, l = s[0].length; i < l; i++) {
        
        if (s[0].options[i].innerHTML.indexOf('Sheever place') >= 0) {
            
            s[0].options[i].selected = true;
// нажимаем "отплыть"
root.document.forms[1].submit()  
        }
    
    }
}
})();