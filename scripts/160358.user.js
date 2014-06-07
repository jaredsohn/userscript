// ==UserScript==
// @name             Family [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Прикручивает ссылки к членам семьи на странице персонажа.
// @include          http://www.ganjawars.ru/info.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

// на странице персонажа
if (root.location.href.indexOf('http://www.ganjawars.ru/info.php?id=') >= 0) {
    
    var b = root.document.getElementsByTagName('b');
    for (i = 0, l = b.length; i < l; i++) {
        
        if (b[i].innerHTML == 'Семья:') {
            
            // узел семьи
            var oFamily = b[i].nextSibling;
            // родитель
            var parent = oFamily.parentNode;
            // узел после семьи
            var br = b[i].nextSibling.nextSibling;
            // текстовое значение узла семьи
            var s = oFamily.nodeValue;
            
            // убираем описание
            family = s.replace(/\s+\(.*?\)/g, '');
            
            family = family.split(/,\s+/);
            for (n in family) {
                
                // убираем пробел у первого члена семьи
                if (n == 0) { family[n] = family[n].replace(/^\s+/, '') }
                s = s.replace(new RegExp(family[n].replace(/([\/\.\*\?\+\[\]\)]+)/g, '\\$1').replace(/([\(]+)/g, '\\$1')), '<a href="http://www.ganjawars.ru/search.php?key='+ family[n] +'">'+ family[n] +'</a>');
                
            }
            
            var span = root.document.createElement(span);
            span.innerHTML = s;
            // удаляем узел семьи
            parent.removeChild(oFamily);
            // вставляем новый
            parent.insertBefore(span, br);
            
            
            break;
        }
        
    }
    
}


})();