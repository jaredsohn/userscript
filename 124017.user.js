// ==UserScript==
// @name abStore - opróżniacz koszyka
// @description dodaje możliwość wyczyszczenia koszyka
// @include http://*.abstore.pl/cart*
// @include http://*.evstore.pl/cart*
// @include http://*.a4b.com/cart*
// ==/UserScript==

var unsafeWindow = typeof unsafeWindow == 'undefined' || window;
var $;

(function(){
/*
    if (typeof unsafeWindow.jQuery == 'undefined') {
        var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement, GM_JQ = document
                .createElement('script');

        GM_JQ.src = 'http://code.jquery.com/jquery-latest.min.js';
        GM_JQ.type = 'text/javascript';
        GM_JQ.async = true;

        GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
    }*/
    GM_wait();
})();

function GM_wait(){
    if (typeof unsafeWindow.jQuery == 'undefined') {
        window.setTimeout(GM_wait, 100);
    } else {
        $ = unsafeWindow.jQuery.noConflict(true);
        ready();
    }
}

function ready(){
alert($); // check if the dollar (jquery) function works
        alert($().jquery); // check jQuery version
   
}

function addButton() {
 var clearCart = function(){

        var rm = [];
        $.each($('[id^=delFromCart]'), function(idx, itm){
            var id = $(itm).attr('id').match(/\d+$/)[0];
            rm[idx] = [ id, 0 ].join('":"');
        });
        rm = '{"' + rm.join('","') + '"}';

        unsafeWindow.xajax_add2cart(rm);

    };

    $('#lay-cart')
            .before(
                    '<div class="button-std float-right"><input id="abs-clear-cart" type="button" value="CLEAR" /></div><div class="clear"/><div class="spacer"/>')

    $('#abs-clear-cart').bind('click', clearCart);
}
