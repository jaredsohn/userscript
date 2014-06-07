// ==UserScript==
// @name          Remove ad
// @description   Remove ad
// @namespace	  http://bigpicture.ru/
// @include       http://bigpicture.ru/*
// ==/UserScript==
function removeInlineAd() {
	//:not([href*="bigpicture.ru"]
	jQuery('#contentleft').children('p').find('a').each(function(){
		var source = unescape("%u0418%u0441%u0442%u043E%u0447%u043D%u0438%u043A");
		var source = jQuery(this).parents('p:first').html().match(source);
		if (source !== null) {
			return true; //continue
		}
		
		var allowed = ['bigpicture.ru', 'citypicture.ru'];
		var href = jQuery(this).attr('href');
		for (var i = 0; i < allowed.length; i++) {
			//alert(href+' '+allowed[i]);
			if (href.indexOf(allowed[i]) != -1) {
				return true; //continue
			}
		}
		
		var rand = ('a'+Math.random()).replace('.', '');
		var selector = "'."+rand+"'";
		
		jQuery(this).parents('p:first').addClass(rand).hide().after('<p onclick="jQuery('+selector+').show();jQuery(this).remove();">show ad</p>');
	});
}




document.addEventListener('DOMContentLoaded', function () {
	var scr = document.createElement('script');
	scr.src = 'http://code.jquery.com/jquery-1.4.min.js';
	scr.onload = function() {
		setTimeout(removeInlineAd, Math.round(1000 * Math.random()));
	}
	document.body.appendChild(scr);
}, false);