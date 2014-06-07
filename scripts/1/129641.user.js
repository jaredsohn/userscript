// ==UserScript==
// @name              Wykop - No AutoPromo Box
// @namespace         http://gac3k.pl
// @description       Usuwa tamten promowany boks o tam na górze ale zostawia urwisko :) Jeżeli kogoś owy boks faktycznie irytuje, to proszę...
// @author            Dominik Gacek
// @version           1.0
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () 
{	
	$(document).ready(function($) 
        {
            var _promo_link = $('a[href*="/paylink/"]').closest('article');
            
            _promo_link.next('article').removeClass('dnone');
            _promo_link.remove();
            
            // success
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)