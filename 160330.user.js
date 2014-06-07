// ==UserScript==
// @name             Pro4ka [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      На главной странице показывает прочку предметов под картинками.
// @include          http://www.ganjawars.ru/me/*
// @version          1.0
// @author           W_or_M
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/me/') >= 0) {
    
    var img = root.document.getElementsByTagName('img');
    for (var i = 0, l = img.length; i < l; i++) {
        
        if (typeof img[i].title != 'undefined' && /\d+\/\d+/.test(img[i].title)) {
            
            var p = root.document.createElement('p');
            with (p.style) {
                
                margin = 0;
                padding = 0;
                textAlign = 'center';
                fontSize = '8pt';
                
            }
            
            p.appendChild(root.document.createTextNode(img[i].title));
            
            img[i].parentNode.appendChild(p);
            
        }
        
    }
    
}

})();