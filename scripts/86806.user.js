// ==UserScript==
// @name           animowane wykresy
// @namespace      local
// @include        http://www.fotka.pl/konto_glosy.php
// @include        http://www.fotka.pl/konto_podgladacz.php
// @copyright      bozar
// @version        1.0.0
// ==/UserScript==

var $ = unsafeWindow.$;

function iterate(){        
    if(i>słupki.length){
        clearInterval(timer);
        return false;
    }
    $(słupki[słupki.length-i]).slideDown(300);
    i++;
}


var słupki = $(".slupek");
var timer = setInterval(iterate, 10);
var i = 0;
słupki.hide();