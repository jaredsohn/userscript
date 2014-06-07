// ==UserScript==
// @name        Hide Trending Articles
// @namespace   http://userscripts.org/users/constchar
// @description	Hide "Trending Articles" on your Facebook news feed.
// @include     https://*.facebook.com/*
// @include     http://*.facebook.com/*
// @require     https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// @version     1
// ==/UserScript==

$(window).ready(function(){
	$('li').each(function(i,e){
		var t = false;
		$(this).find('span').each(function(i,e){
			t = ( t || $(this).html().toLowerCase().indexOf('trending articles') > -1 );
		});
		if( t ) {
			$(this).css('background','red').remove();
		}
	});
});
