// ==UserScript==
// @name           OkCoin BitCoin Trade Helper
// @description    A utility for OkCoin.com
// @author         waisir
// @include        https://www.okcoin.com/market.do*
// @version        0.9.0
// @grant       none
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==

;(function($, g){
	if(typeof g.BOK=='undefined'){
		g.BOK = {};
	}
	BOK = g.BOK;

	BOK.loadCss = function(url){
		$('head').append( $('<link rel="stylesheet" type="text/css" />').attr('href', url) );
	}

	BOK.loadJs = function(url){
		$('head').append( $('<script/>').attr('src', url) );
	}




	BOK.loadCss('http://127.0.0.1/bt-spider/public/styles/style.css');
	BOK.loadJs('http://127.0.0.1/bt-spider/public/scripts/market.js');





})(jQuery, window);
