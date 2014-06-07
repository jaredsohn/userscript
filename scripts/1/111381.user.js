// ==UserScript==
// @name             Pro4ka [GW]
// @namespace        http://worm.vline.ru/gw/
// @description      На главной странице показывает прочку предметов под картинками + остаточную прочность.
// @include          http://www.ganjawars.ru/me/*
// @version          1.01
// @author           W_or_M & Co
// ==/UserScript==

(function() {

var root = typeof unsafeWindow != 'undefined' ? unsafeWindow : window;

if (root.location.href.indexOf('http://www.ganjawars.ru/me/') >= 0) {
    var img = root.document.getElementsByTagName('img');
    for (var i = 0, l = img.length; i < l; i++) {
        var re = /(\d+)\/(\d+)/;
        if (typeof img[i].title != 'undefined' && re.test(img[i].title)) {
            var match  = re.exec(img[i].title);
            var num1   = parseInt(match[1]);
            var num2   = parseInt(match[2]);
            var pro4ka = Math.round((num2-1)*num2/2+num1);
            //if (num2 < 3 || num2 > 20) {
                var ouput = num1+'/'+num2;
            //} else {
               // var ouput = num1+'/'+num2+'/'+pro4ka;
           // }
            var p   = root.document.createElement('p');
            p.title = pro4ka;
            with (p.style) {
               
                margin = 0;
                padding = 0;
                textAlign = 'center';
                fontSize = '7pt';
               
            }
           
            p.appendChild(root.document.createTextNode(ouput));
           
            img[i].parentNode.appendChild(p);
           
        }
       
    }
   
}

})();