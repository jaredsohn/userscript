// ==UserScript==
// @name             SendMoney-pics [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      Добавляет на страницу персонажа ссылку для передачи денег/предмета этому персонажу, а также добавить в друзья/ в черный список.
// @include          http://www.ganjawars.ru/info.php*
// @include          http://www.ganjawars.ru/send.php*
// @include          http://www.ganjawars.ru/home.senditem.php*
// @include          http://www.ganjawars.ru/items.php*
// @version          1.02 (1.03)
// @author           W_or_M, редакция sp3ctr3
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

function convert(text) {
    
    var utext = unescape(text.replace(/\+/g, '%20'));
    var buffer = [];
    
    for (k = 0; k < utext.length; k++) {
        
        var code = utext.charCodeAt(k);
            
            if (code >= 192) {
                
                buffer[k] = String.fromCharCode(code + 848);
            
            } else {
                
                buffer[k] = utext.charAt(k);
            
        }
    
    }
    
    return buffer.join('');
    
}

//load(function() {

// на странице персонажа
var login_id = /http:\/\/www\.ganjawars\.ru\/info\.php\?id=(\d+)/.exec(root.location.href);

if (login_id != null) {
    
    login_id = login_id[1];
    
    // вставляем передачу после "отправить письмо"
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
        
        var login = /^http:\/\/www\.ganjawars\.ru\/sms-create.\php\?mailto=(.*)$/.exec(a[i].href);
        
        if (login != null) {
            
            var parent = a[i].parentNode.parentNode.parentNode.parentNode;
            
            login = login[1];
            
            // меню
            var s = '';
            
            // передать $
            s += '<a style="text-decoration: none; font-weight: bold;" href="http://www.ganjawars.ru/send.php?login='+ login +'"><img src=http://images.ganjawars.ru/i/home/cashsend.gif border=0 title="Передать деньги"></a>';
            
            // передать предмет
            s += '&nbsp;&nbsp;<a style="text-decoration: none; font-weight: bold;" href="http://www.ganjawars.ru/items.php?login='+ login +'"><img src=http://images.ganjawars.ru/i/home/weapon.gif border=0 title="Передать предмет"></a>';
			
            // добавить в друзья
            s += '&nbsp;&nbsp;<form name="friendList" style="display: none;" action="/home.friends.php" method="post"><input type="hidden" id="blop" name="blop" value="0"><input type="hidden" name="addfriend" value="'+ convert(login) +'"></form><a style="text-decoration: none; font-weight: bold;" href="http://www.ganjawars.ru/me/" onclick="document.getElementById(\'blop\').value=0;document.forms[\'friendList\'].submit();return false;"><img src=http://images.ganjawars.ru/i/home/friends.gif border=0 title="В друзья"></a>';
            
            // добавить во враги
            s += '&nbsp;&nbsp;<a style="text-decoration: none; font-weight: bold;" href="http://www.ganjawars.ru/me/" onclick="document.getElementById(\'blop\').value=1;document.forms[\'friendList\'].submit();return false;"><img src=http://images.ganjawars.ru/i/home/last_fight.gif border=0 title="В чёрный список"></a>';
			
            // судебные иски
            s += '&nbsp;&nbsp;<a style="text-decoration: none; font-weight: bold;" href="http://www.ganjawars.ru/isks.php?sid='+ login_id +'&st=1&period=4"><img src=http://images.ganjawars.ru/i/home/iski.gif border=0 title="Иски"></a>';
            
            // аренда
            s += '&nbsp;&nbsp;<a style="text-decoration: none; font-weight: bold;" href="http://www.ganjawars.ru/info.rent.php?id='+ login_id +'"><img src=http://images.ganjawars.ru/i/home/market.gif border=0 title="Аренда предметов"></a>';
			
            // аналик грома
            s += '&nbsp;&nbsp;<a style="text-decoration: none; font-weight: bold;" href="http://gw.gromslab.com/progress/index.php?id='+ login_id +'"><img src=http://images.ganjawars.ru/i/home/cashlog.gif border=0 title="Анализатор gw.gromslab.com"></a>';
			
			// аналик ganjastats
            s += '&nbsp;&nbsp;<a style="text-decoration: none; font-weight: bold;" href="http://ganjastats.ru/players/item/'+ login_id +'"><img src=http://images.ganjawars.ru/i/home/warlog.gif border=0 title="Анализатор ganjastats.ru"></a>';       

			
            var tr = root.document.createElement('tr');
            var td = root.document.createElement('td');
            td.innerHTML = '<img src="http://images.ganjawars.ru/i/tbg.gif" border="0" width="18" height="11">&nbsp; '+ s;
            tr.appendChild(td);
            parent.appendChild(tr);
            break;
            
        }
        
    }
    
}

// на странице передачи денег
var login = /^http:\/\/www\.ganjawars\.ru\/send\.php\?login=(.*)$/.exec(root.location.href);
if (login != null) {
    
    login = login[1];
    
    var input = root.document.getElementsByTagName('input');
    for (i = 0, l = input.length; i < l; i++) {

        if (input[i].name == 'key') {
            
            //alert(login.replace(/\%([A-F0-9]{2})/g, function (a, b, c) { alert(String.fromCharCode(parseInt(b, 16) + 848)); } ));
            
            input[i].value = convert(login);
            
        }
        
    }
    
}

// на странице инвентаря
var login = /^http:\/\/www\.ganjawars\.ru\/items\.php\?login=(.*)$/.exec(root.location.href);
if (login != null) {
    
    login = login[1];
    
    // ищем ссылки передачи
    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
        
        if (a[i].href.indexOf('http://www.ganjawars.ru/home.senditem.php') >= 0) {
        
            a[i].href += '&login='+ login;
        
        }
    }
    
}

// на странице передачи
var login = /^http:\/\/www\.ganjawars\.ru\/home\.senditem\.php.*&login=(.*)$/.exec(root.location.href);
if (login != null) {
    
    login = login[1];
    
    var input = root.document.getElementsByTagName('input');
    for (i = 0, l = input.length; i < l; i++) {
        
        if (input[i].name == 'username') {
            
            input[i].value = convert(login);
            
        }
        
    }
    
}

//});

})();