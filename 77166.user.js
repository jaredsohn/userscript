// ==UserScript==
// @name           Assembla ROI
// @namespace      http://userscripts.org/users/167150
// @description    Calculate the ROI for Assembla Tickets
// @include        https://www.assembla.com/*
// ==/UserScript==

// Add jQuery
if (document.getElementById('werul_jquery') == null) {
	var script = document.createElement('script');
	script.src = 'http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js';
	script.type = 'text/javascript';
	script.id = 'werul_jquery';
	document.getElementsByTagName('head')[0].appendChild(script);
}


// Check if jQuery's loaded
function GM_wait() {
	if(unsafeWindow.jQuery == null) { window.setTimeout(GM_wait,100); }
	else { 
		jQuery = unsafeWindow['jQuery'];
		jQuery.noConflict();
		(function($) {
			$(function() {
				jqAssemblaPrinting($);
			});
		})(jQuery);					
	}
}
GM_wait();

// All your GM code must be inside this function
function jqAssemblaPrinting($) {
	$('ticket_list').html('test');
}