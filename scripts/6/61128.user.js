// ==UserScript==
// @name           Assembla Ticket Printing
// @namespace      http://werul.com/
// @description    Makes assembla ticket pages and lists printer friendly
// @include        https://*.assembla.com/spaces/*/tickets/*
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
			$('link[media=screen]').attr('media','all');
			$('<style media="print" type="text/css">' +
				' #header-w, #main-menu-w, #footer-w, .menu-submenu, .ttop-bar, #top-edit-option, #ticket_canvas, h1 span { display:none !important; } ' +
			' </style> ').appendTo('head');	
    }		