// ==UserScript==
// @name           	Dailyrush.dk
// @namespace      	dailyrush_dk
// @description    	Tilføjet et 'åben i nyt vindue' link efter alle http-links på www.dailyrush.dk
// @include        	http://dailyrush.dk/*
// @include        	http://www.dailyrush.dk/*
// @grant 			none
// @require        	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// ==/UserScript==

// http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html
this.$ = this.jQuery = jQuery.noConflict(true); // GM/jQ v1.0 quickfix

start();
function start(){
	// do links
	$('a').each(function(){
		var $el = $(this);
		var $href = $el.attr('href');
		if( $href.substring(0, 4) == "http" ){
			$el.after(' <a style="font-size:12px;font-weight:normal;padding:0 1px;"'
						+' href="' + $href + '" target="_blank" title="Åben link i et nyt vindue">&and;</a>');
		}
	});

	// add css to body
		$('body').append('<style> a.newClass:hover{ color:#444;background:#EEE;text-decoration:none; } </style>');
	// add css to all links
		$('a').addClass('newClass');
		$('div#logo a').removeClass('newClass');
}