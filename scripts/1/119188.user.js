// ==UserScript==
// @name             Sind Pic [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Показывает картинку синдиката в списке синдикатных боев. Ссылка ведет сразу на состав онлайн.
// @include          http://www.ganjawars.ru/wargroup.php*
// @version          1.0
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

if (root.location.href.indexOf('http://www.ganjawars.ru/wargroup.php?war=attacks') >= 0) {
    
    load(function() {
        
        var a = document.getElementsByTagName('a');
            
            for (i = 0, l = a.length; i < l; i++) {
                
                var sind_id = /<b>\#(\d+)<\/b>/i.exec(a[i].innerHTML);
                if (sind_id != null) {
                    
                    // ссылка
                    a[i].setAttribute('href', a[i].getAttribute('href') + '&page=online');
                    
                    // картинка
                    a[i].innerHTML = '<img style="border: none;height: 14px;width: 20px;" src="http://images.ganjawars.ru/img/synds/'+ sind_id[1] +'.gif" />' + a[i].innerHTML;
                }
            }
        
    });
}

})();