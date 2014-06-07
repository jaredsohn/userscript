// ==UserScript==
// @name             Terminal [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      Фильтр списка рисурсов на терминале.
// @include          http://www.ganjawars.ru/objects-terminal.php*
// @include          http://www.ganjawars.ru/trade-terminal.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

// НАСТРОЙКИ
//-----------------------------------
// Список ресурсов. Вводить через ,(запятую) без пробелов.
var resourses = 'Алюминий,Бокситы,Батареи,Ганджиум,Сталь,Нефть,Пластик,Резина,Маковая соломка,Уран,Водоросли,Трава'; 
//-----------------------------------

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/objects-terminal.php') >= 0 ||
    root.location.href.indexOf('http://www.ganjawars.ru/trade-terminal.php') >= 0) {
    
    // регулярка
    var re = new RegExp(resourses.replace(/,/g, '|').replace(/\(р\)/, ''));
        
    var r = root.document.getElementsByName('resource');
    if (r.length) {
        
        r = r[0].childNodes;
        
        for (var i = 0, l = r.length; i < l; i++) {
            
            if (typeof r[i].innerHTML != 'undefined') {
                
                if (!re.test(r[i].innerHTML)) {
                    
                    r[i].parentNode.removeChild(r[i]);
                    i--;
                    
                }
                
            }
            
        }
        
    }
    
}


})();