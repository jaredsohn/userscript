// ==UserScript==
// @name             Herpbl_Pa6oTaTb [GW] 
// @namespace        http://worm.vline.ru/gw/
// @description      Удаляет кнопку "Работать".
// @include          http://www.ganjawars.ru/object.php*
// @include          http://ganjawars.ru/object.php*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('ganjawars.ru/object.php?id=') >= 0) {
    
    // ищем кнопку
    var input = root.document.getElementsByTagName('input');
    for (var i = 0, l = input.length; i < l; i++) {
        
        if (input[i].value == 'Работать') {
            
            // гадский IE
            if (document.all) {
                
                var form = root.document.getElementsByName('workform');
                form[0].onsubmit = function() {
                    
                    h2c();
                    submit_work();
                    
                }
                
            }
            
            // негры работают минимум по 2 часа!
            var node = input[i].parentNode.removeChild(input[i]);
            
            break;
            
        }
        
    }
        
}

})();