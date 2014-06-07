// ==UserScript==
// @name           Dynander - BHW - OP Highlight
// @namespace      http://www.blackhatworld.com/
// @description    Highlight posts made by the Original Poster
// @include        http://www.blackhatworld.com/*
// ==/UserScript==



// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
	if(
		typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait,100); 
	}
	else { 
		$ = unsafeWindow.jQuery; letsJQuery(); 
	}
}
GM_wait();	

// All your GM code must be inside this function
function letsJQuery(){ 
	op = $('A[class=bigusername]:first').html();
	$('A[class=bigusername]').each(function(i){
		if($(this).html()==op){
			$(this).parents('table:first')
			.css(
				{
					'background-color' : 'rgb(128, 128, 128)'
				}
			);
			
			$(this).parents('TD[nowrap=nowrap]')
			.css(
				{
					'background-color' : 'black'
				}
			);
		}
	});
};