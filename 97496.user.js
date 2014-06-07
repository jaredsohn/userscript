// ==UserScript==
// @name           auto.drom.ru big images
// @description    Show big images in cars proposal
// @version        1.0
// @date           2011-02-21
// @author         Dmitriy Fedorenko
// @include        http://*.drom.ru/*/*/*.html
// ==/UserScript==


var $;

// Add jQuery
    (function(){
        if (typeof unsafeWindow.jQuery == 'undefined') {
            var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
                GM_JQ = document.createElement('script');
    
            GM_JQ.src = 'https://ajax.googleapis.com/ajax/libs/jquery/1.5.0/jquery.min.js';
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

// All your GM code must be inside this function
    function letsJQuery() {
	if (!$('.auto .img .cf img')) return;
	var container = $('<div style="overflow: hidden; max-width: 1000px"></div>').insertAfter('.auto');
	$('.auto .img .cf a').each(function(){
		var img = $('<img/>')
			.attr('src', $(this).attr('img').replace('ttn_', ''))
			.css('width', '100%');
		$('<p></p>').appendTo(container).append(img);
	})
	$('.auto .img').hide();
	$('.auto h3:first').append(', '+$.trim($('.price').text()));
	$('.price').hide();
	$('h1').hide();
    }