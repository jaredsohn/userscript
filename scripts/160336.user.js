// ==UserScript==
// @name             Dostizhenija [GW] 
// @namespace        http://ganjascript.ucoz.com
// @description      Добавляет ссылку на достижения
// @include          http://www.ganjawars.ru/*
// @version          1.0
// @author          Julja__90
// ==/UserScript==

(function() {

    var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

    var a = root.document.getElementsByTagName('a');
    for (i = 0, l = a.length; i < l; i++) {
	
        if (/<b>Банк Ganja Islands<\/b>/i.test(a[i].innerHTML)) {
            
            var parent = a[i].parentNode;
            var url_id_player = document.getElementsByTagName('a')[2];
            var player = /^http:\/\/www\.ganjawars\.ru\/info\.php\?id=(\d+)/.exec(url_id_player);
                player = player[1];
            // ссылка на достижения
            var a = root.document.createElement('a');
            a.setAttribute('href', 'http://www.ganjawars.ru/info.ach.php?id='+player+'');
            a.setAttribute('style', 'font-size: 12px; font-weight: bold; text-decoration: none; color: red;');
            a.innerHTML = '»&nbsp;<u>Достижения</u>';
            parent.appendChild(a);
            
            break;
            
        }
        
    }
 
})();