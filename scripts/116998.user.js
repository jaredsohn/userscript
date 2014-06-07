// ==UserScript==
// @name             Farmer [GW]
// @description      Farm Timer
// @include          http://www.ganjawars.ru/me*
// @version          0.2
// @author           Sviatoy
// @license          GPL v3
// @namespace        http://www.ganjawars.ru/info.php?id=199526
// ==/UserScript==

var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.6.4/jquery.min.js';
            GM_JQ.type = 'text/javascript';
            GM_JQ.async = true;
    
            GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
        }
        GM_wait();
    })();

// Check if jQuery's loaded
    function GM_wait() {
        if (typeof unsafeWindow.jQuery == 'undefined') {
            window.setTimeout(GM_wait, 100);
        } else {
            $ = unsafeWindow.jQuery.noConflict(true);
            letsJQuery();
        }
    }

    function letsJQuery() {
        var ferma = $('a[href*="ferma"]:eq(1)');
		$.get(ferma.attr('href'), function(data) {
			var str = $(data).find('td[bgcolor="#e0eee0"]').html();
			var regexp = /\((.+)\)/g;
			$(ferma).append('<font style="color: red;FONT-SIZE: 7pt;"> '+regexp.exec(str)[1]+'</font>');
		});
    }