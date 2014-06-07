// Facebook Advertisment remove
// Because we all hate adverts


// -----------------------------------------------------------


// ==UserScript==
// @name           Facebook ads remove
// @author         http://3allouch.com
// @version        1.1 
// @namespace      http://localhost
// @description    remove Facebook Adverts,
// @include        *facebook.com/*
// ==/UserScript==


function rmv(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

// Hiding the adverts
rmv(	'#pagelet_adbox {display:none !important;}'+
		'#sidebar_ads {visibility:hidden !important;}'+
		'.ego_column {visibility:hidden !important;}'+
		// OK so I would have prefered to just use display:none on the last 2 divs, but doing so thew the rest of the design into disarray.
		
	

// Styling for the div that contains the 'Better Facebook 1.0 (beta)' notice
		'.notice {z-index:99999 !important; color:#fff !important; margin:0 auto !important; width:140px !important; position:relative !important; top:33px !important; left:100px !important; margin:0 auto !important; font-size:11px !important;}'
);
