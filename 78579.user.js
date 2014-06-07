// ==UserScript==
// @name           link killer
// @namespace      theimben
// @include        *
// ==/UserScript==

var $;
/*
	Thank you: http://joanpiedra.com/jquery/greasemonkey/
*/
// Add jQuery
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
	var altPressed = false;
	$(window).keydown(function(evt) {
	  if (evt.which == 18) {
		altPressed = true;
	  }
	}).keyup(function(evt) {
	  if (evt.which == 18) { 
		altPressed = false;
	  }
	});
	
	var ctrlPressed = false;
	$(window).keydown(function(evt) {
	  if (evt.which == 17) { 
		ctrlPressed = true;
	  }
	}).keyup(function(evt) {
	  if (evt.which == 17) { 
		ctrlPressed = false;
	  }
	});
	
	$('a').click(function(e){
		if(altPressed){
			e.preventDefault;
			var href = $(this).attr('href');
			$(this).removeAttr('href');
			$(this).attr('oldhref', href);
			$('a').click(function(v){
				if(ctrlPressed){
					v.preventDefault;					
					$(this).attr('href', $(this).attr('oldhref'));
				}
			});
		}
	});
}

