// ==UserScript==
// @name           Gameblog1Column
// @namespace      http://randomfeature.net
// @include        http://gameblog.fr/*
// @include        http://www.gameblog.fr/*
// ==/UserScript==

// Add jQuery
    var GM_JQ = document.createElement('script');
    GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.1/jquery.min.js';
    GM_JQ.type = 'text/javascript';
    document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
    function GM_wait() {
        if(typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); }
    else { jQuery = unsafeWindow.jQuery; letsJQuery(); }
    }
    GM_wait();

// All your GM code must be inside this function
    function letsJQuery() {
 			jQuery.noConflict()
 			/*	.log(jQuery('.col'));*/
			if(jQuery('#cols').length) {
			var cont =	jQuery('#container');
			var chapeau = jQuery('.chapeau',cont);
			
			var cols =	jQuery('#cols');
			var imgbloc =jQuery('#imagesBloc');
			
			cont.css('display','block').css('font-size','9pt').css('line-height','1.4em').css('padding','0 20px 10px 0');
			cont.css('text-align','justify');
			
			chapeau.css('line-height','1.3em')
			
			//chapeau.eq(0).css('width','100px').css('float','left');
			//chapeau.eq(0).after(jQuery('<div style="clear:both"></div>'))
			chapeau.eq(0).after(imgbloc);
			imgbloc.css('position','static').css('margin-left','100px');
			
			cols.empty().css('display','none');
			jQuery('#cols + table').css('display','none');
			}
    }