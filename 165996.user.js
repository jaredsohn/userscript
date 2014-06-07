// ==UserScript==
// @name        WykoAJAX Plus
// @namespace   ajax_plus
// @description Dodaje obsługę AJAXem usuwania powiadomień i konwersacji
// @include     http://www.wykop.pl/powiadomienia/*
// @include     http://www.wykop.pl/wiadomosc-prywatna/*
// @version     1
// ==/UserScript==

function AJAX_plus() {
    $(function () {
        var t = function(event){
            var url = $(this).attr('href');
            $.get(url);
            $(this).parent().removeClass('bgfbfbd3');
            event.preventDefault();
            return false;
        };
        $('a.readNotification').click(t);
        if (window['_action'] === '_addons' || unsafeWindow['_action'] === '_addons') {
            //TODO
            
        }
        if (window['_action'] === 'pm' || unsafeWindow['_action'] === 'pm') {
            var z = function(event){
                    var url = $(this).attr('href');
                    $.get(url);
                    $(this).parent().remove();
                    event.preventDefault();
                    return false;
            };
            var q = function(){

                $('aside div ul li a.closelist').filter(':not(.ajax_read)').filter(function(index) {
                    $(this).addClass('ajax_read');
                    $(this).click(z);
                    return true;
                });
            };
            q();
            $.ajaxSetup({
                global: true,
                beforeSend: q,
                complete: setTimeout(q, 500)
            });
        }
        });
}

function addJQuery(callback) {
    "use strict";
    var script = document.createElement("script");
    script.textContent = "(" + callback.toString() + ")();";
    document.body.appendChild(script);
}
if (typeof $ === 'undefined') {
	if (unsafeWindow.jQuery) {
		$ = unsafeWindow.jQuery;
		AJAX_plus();
	} else {addJQuery(AJAX_plus);}
} else {
    AJAX_plus();
}

