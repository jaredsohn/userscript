// ==UserScript==
// @name           G[rease]Mail
// @version        1.0
// @author         Raymond Augé <rauge@liferay.com>
// @namespace      G[rease]Mail
// @description    Removes GMail Ads and clean up the UI for larger resolutiuons.
// @include        http://mail.google.com/mail/*
// @include        https://mail.google.com/mail/*
// ==/UserScript==

// Add jQuery
var GM_JQ = document.createElement('script');
GM_JQ.src = 'http://jquery.com/src/jquery-latest.js';
GM_JQ.type = 'text/javascript';
document.getElementsByTagName('head')[0].appendChild(GM_JQ);

// Check if jQuery's loaded
function GM_wait() {
    if(typeof unsafeWindow.jQuery == 'undefined') { 
    	window.setTimeout(GM_wait,100); 
    }
	else { 
		$ = unsafeWindow.jQuery; 
		letsJQuery(); 
	}
}

GM_wait();

var COLUMN_LEFT_WIDTH = 250;

function letsJQuery() {
	$('body').append(
		[
			'<style type="text/css">',
			'.cQ .pk .qk .p9, .cQ .qk .p9, .zA.zE, .zA.yO {',
			'	font-size: 18px;',
			'}',			
			'.T1HY1.nH.iY > tr:first-child > td:first-child + td.tELAdc + td.tELAdc > div:first-child + div.nH {',
			'	clear: both;',
			'	top: 42px;',
			//'	bottom: 1px;',
			'	position: absolute;',
			'	right: 0;',
			'	width: auto !important;',
			'}',			
			'.nH.if .nH h1.ha {',
			'	margin-right: 400px !important;',
			'}',			
			'.T1HY1.nH.iY .u5, .T1HY1.nH.iY .u8 {',
			'	display: none;',
			'}',			
			'.T1HY1.nH.iY .hj, .T1HY1.nH.iY .hj .hk {',
			'	float: left;',
			'}',			
			'.T1HY1.nH.iY .hj .hk {',
			'	margin-right: 8px;',
			'}',
			'body.cP > div > div.nH > div.nH > div.nH > .no > div.nH.nn:first-child + div.nH.nn {',
			'	width: ' + COLUMN_LEFT_WIDTH + 'px !important;',
			'}',
			'</style>'
		].join('\n')
	);
	
	if (window.name && window.name.charAt(0) == 'c') {
		var rightPanel = $('.no:eq(2) > div.nH.nn:eq(2)');
		
		rightPanel.css({'width': (window.innerWidth - COLUMN_LEFT_WIDTH - 36) + 'px'});

		$(window).resize(function() {
			rightPanel.css({'width': (window.innerWidth - COLUMN_LEFT_WIDTH - 36) + 'px'});
		});
	}	
}
