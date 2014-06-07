// ==UserScript==
// @name		  Tagged.com Ads Remove
// @namespace	  taggedadsremove
// @description   Removes ads on Tagged.com
// @include	  http://www.tagged.com/*
// @include	  http://www.*.tagged.com
// @include	  http://www.*.tagged.com/*
// @include	  http://tagged.poker.zynga.com/poker/www2/*/*
// @exclude	   
// @version       0.1
// ==/UserScript==

_divpromo = new Array();
_divpromo.push( document.getElementById('ad_unit_0_div') ); 
_divpromo.push( document.getElementById('ad_unit_1_div') );
_divpromo.push( document.getElementById('ad_unit_2_div') ); 
_divpromo.push( document.getElementById('ad_unit_ringtones') );
_divpromo.push( document.getElementsByClassName('ad')[0] );


for ( var i = 0 ; i < _divpromo.length ; i++ ){
	if ( _divpromo[i] && _divpromo[i].parentNode && _divpromo[i].parentNode.removeChild ) {
		_divpromo[i].style.display = 'none';
		_divpromo[i].parentNode.removeChild(_divpromo[i]);
	}
}

