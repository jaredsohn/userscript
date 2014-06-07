// ==UserScript==
// @name           	CykelGalleri.dk - Fjern QXL links
// @namespace		cykelgalleriqxl
// @description		Fjern "Tilsvarende annoncer fra QXL" og reklamer fra www.cykelgalleri.dk
// @include       	http://www.cykelgalleri.dk/*
// @include       	http://cykelgalleri.dk/*
// @include       	https://cykelgalleri.dk/*
// @include       	https://www.cykelgalleri.dk/*
// @grant 			none
// @require        	http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.js
// ==/UserScript==

// http://www.greasespot.net/2012/08/greasemonkey-10-jquery-broken-with.html
this.$ = this.jQuery = jQuery.noConflict(true); // GM/jQ v1.0 quickfix

// pre jQuery - still works though :)
var by_id = [
	'PnlBanner',
	'PnlBanner300x250',
];
if( by_id && by_id.length > 0 ){
	for (var i = by_id.length - 1; i >= 0; i--) {
		var elm = document.getElementById( by_id[i] );
		if( elm ){
			elm.style.display = "none";
		}
	};
}

// Fjern QXL "reklamer" fra f.eks /marked
	var $counter 	= 0;
	var $display 	= true;
	$('div#srpRight div').each(function(){
		var $id = $(this).attr('id');
		if( $id == "ContentPlaceHolder1_PnlAdSenseBottom" ){
			if( $counter < 4 ){
				$display = false;
			}
		}
		if( $id == "ContentPlaceHolder1_PagingBottom_navigation" ){
			$counter = 10000;
			$display = true;
		}
		if ( !$display ) {
			$counter = $counter + 1;
			$(this).hide();
		};
	});
