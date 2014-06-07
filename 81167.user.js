// ==UserScript==
// @name           Pluzz patch
// @namespace      pluzz
// @autor      	   Morphing
// @twitter        http://twitter.com/camillebaronnet
// @include        http://www.pluzz.fr/*
// ==/UserScript==

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') {
		window.setTimeout(GM_wait, 100);
	}
	else {
		$ = unsafeWindow.jQuery.noConflict(true);
	}
}

var $;
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
		GM_JQ = document.createElement('script');
		    
		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js';
		GM_JQ.type = 'text/javascript';
		GM_JQ.async = true;
		    
		GM_Head.insertBefore(GM_JQ, GM_Head.firstChild);
	}
	GM_wait();

	if($('#current_video').attr('class') == 'video'){

		GM_xmlhttpRequest({
			method: "GET",
			dataType: "html",
			url: $('#current_video').attr('href'),
			onload: function(response) {

				urlPart1 = response.responseText.match(/[^"]+\.wmv/i);
				urlPart2 = 'mms://a988.v101995.c10199.e.vm.akamaistream.net/7/988/10199/3f97c7e6/ftvigrp.download.akamai.com/10199/cappuccino/production/publication/';
				finalUrl = urlPart2+urlPart1;

				btn = '<a href="'+finalUrl+'" target="blank">Lien vers ce programme</a>';
				btn += $('.footer').html();
				$('.footer').html(btn);

				accroche = $('#playerCtnr .accroche').html();
				$('#playerCtnr').html('<embed src="'+finalUrl+'" width="100%" height="100%" autostart="true" /><div class="accroche">'+accroche+'</div>');

			}
		});
	}
})();
