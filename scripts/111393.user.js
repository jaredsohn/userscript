// ==UserScript==
// @name             BattleNumbers [GW] 
// @namespace        http://gw.heymexa.net/
// @description      Ставит порядковый номер противника рядом с его ником. Полный лог бой в не js-версии.
// @include          http://www.ganjawars.ru/b0/b.php*
// @version          1.03
// @author           W_or_M
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

var chat;

function getXmlHttp(){
  var xmlhttp;
  try {
    xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
  } catch (e) {
    try {
      xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    } catch (E) {
      xmlhttp = false;
    }
  }
  if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
    xmlhttp = new XMLHttpRequest();
  }
  return xmlhttp;
}


function ajax(url, onload) {
    
    var xmlhttp = getXmlHttp();
    xmlhttp.open('GET', url, true);
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4) {
            if(xmlhttp.status == 200) {
                onload(xmlhttp);
            }
        }
    };
    xmlhttp.send(null);
    
}


// возвращает список врагов
function getEnemyList() {
    
    var o = root.document.getElementsByName('enemy');
    var enemy = false;
    if (o.length) {
        
        o = o[0];
        
        enemy = [];
        
        // составляем массив id перса => его дистанция
        for (var k = 0; k < o.childNodes.length; k++) {
            
            if ((position = /(\d+)\. (.*)\[(\d+)\] - (\d+)/.exec(o.childNodes[k].innerHTML)) != null) {
                
                enemy[o.childNodes[k].value] = position[1];
                
            }
            
        }
        
    }
    
    return enemy;
    
}

// устанавливает порядковые номера вражинам
function setEnemyPosition(enemyList) {
    
    // ищем противников справа
    // найденым добавляем порядковый номер
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
        
        var id = /userheader(\d+)/.exec(a[i].id);
        if (id != null) {
            
            if (typeof enemyList[id[1]] != 'undefined') {
                
                a[i].innerHTML = enemyList[id[1]] +'. '+ a[i].innerHTML;
                    
            }
            
        }
        
    }
    
}

// возвращает id боя
function getBattleId() {
    
    var form = root.document.getElementsByName('battlechat');
    
    if (form.length) {
        
        form = form[0];
        
        // кастрированный лог
        if (form.parentNode.nextSibling.tagName == 'TABLE') {
            
            chat = form.parentNode.nextSibling.firstChild.firstChild.firstChild.firstChild;
            
        } else {
            
            chat = form.parentNode.nextSibling.nextSibling.firstChild.firstChild.firstChild.firstChild;
            
        }
        
        // id боя
        var battle_id = /http:\/\/www\.ganjawars\.ru\/b0\/b\.php\?bid=(\d+)/i.exec(root.location.href);
        
        // типа сделали ход и айдишник из ссылки фик получили
        // значит получаем из ссылки "обновить"
        if (/^http:\/\/www\.ganjawars\.ru\/b0\/b\.php$/.test(root.location.href) && battle_id == null) {
            
            var a = root.document.getElementsByTagName('a');
            
            for (k = 0; k < a.length; k++) {
                
                battle_id = /http:\/\/www\.ganjawars\.ru\/b0\/b\.php\?bid=(\d+)/.exec(a[k].href);
                if (battle_id != null) {
                    
                    return battle_id[1];
                    
                }
                
            }
            
        } else if (battle_id != null) {
            
            return battle_id[1];
            
        }
        
    }
    
    return false;
}

// получение div[id=log]
function getChatLog(div) {
    
    if (div.getElementById) {
        
        return div.getElementById('log').innerHTML;
        
    } else {
        
        var divs = div.getElementsByTagName('div');
        for (k = 0; k < divs.length; k++) {
        
            // лог нашли и заменям им кастрированный лог
            if (divs[k].id == 'log') {
                
                return divs[k].innerHTML;
                    
            }
                        
        }
    
    }
    
    return false;
    
}

// на странице боя
if (root.location.href.indexOf('http://www.ganjawars.ru/b0/b.php') >= 0) {
    
    // список врагов
    if ((enemy = getEnemyList()) !== false) {
        
        setEnemyPosition(enemy);
        
    }
    
    // полный лог чата
    if ((battleId = getBattleId()) !== false) {
        
        // получаем лог чата
        ajax('http://www.ganjawars.ru/b0/btk.php?bid='+ battleId +'&lines=-1&turn=-1', function(req) {
            
            var div = root.document.createElement('div');
            div.innerHTML = req.responseText;
            
            if ((log = getChatLog(div)) != false) {
                
                chat.innerHTML = log;
                
            }
            
       });
       
    }
    
}
})();