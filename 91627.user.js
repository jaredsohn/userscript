// ==UserScript==
// @name			svpply_enhance
// @author	  		stefankunze
// @description   	enhance the look and feel of svpply
// @version       	0.0.1
// @include       	http://svpply.com*
// @include       	http://www.svpply.com*
// @require       	http://ajax.googleapis.com/ajax/libs/jquery/1.3/jquery.min.js
// ==/UserScript==

$(function(){var aside = {
      'position' : 'fixed',
      'z-index' : '20'
    };
    
    var footer = {
      'position' : 'relative',
      'z-index' : '100'
    };
    
    var filters = {
      'font-family' : 'Helvetica,Aria,sans-serif',
      'font-style' : 'normal'
    };
	$('aside').css(aside);
	$('#filters').css(filters);
	$('footer').css(footer);

});
