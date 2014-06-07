// ==UserScript==
// @name          Wedoist
// @namespace     http://www.tuwe.se
// @description	  Add some extra functions to Wedoist.
// @author        Jonas Petersson
// @homepage      http://www.tuwe.se
// @include       http://wedoist.com/project/*
// @include       http://www.wedoist.com/project/*
// ==/UserScript==

var $;

// Add jQuery
(function(){
	if (typeof unsafeWindow.jQuery == 'undefined') {
		var GM_Head = document.getElementsByTagName('head')[0] || document.documentElement,
			GM_JQ = document.createElement('script');

		GM_JQ.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
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
	//Show all
	$('<button>Show all</button>').click(function(){
		$('li.item').show();
	}).insertAfter($('#top_holder'));
	//Hide all	
	$('<button>Hide all</button>').click(function(){
		$('li.item').hide();
	}).insertAfter($('#top_holder'));
	
	//Show/hide items on click/move
	$('body').mouseup(function(e){
		if( $(e.target).parent().hasClass('header') ) {
			$(e.target).parent().next().find('li').toggle();
		}else{
			$(e.target).closest('.list').find('li').show();
		}
	});
	//Add item on "a"-button click
	$(window, document).keydown(function(event) {
		if (event.keyCode == '65') {
			if(!$('textarea').length){
				$('a.link_add:first').trigger('click');
			}
		}
	});
;
}
