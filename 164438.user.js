// ==UserScript==
// @name        myshows-profile-sort
// @namespace   script
// @description Sort serials in alphabetic order on myshows.ru
// @include     http://myshows.ru/profile/
// @version     2.1
// @grant       none
// ==/UserScript==

window.addEventListener('load', function(){
	'use strict';

	function sort_shows(){
		// sort lists at left panel
		$('div.lside ul').html(function(){
			return $(this).children().sort(function(a,b){
				return $(a).text() < $(b).text() ? -1 : 1;
			});
		});
		// sort main content
		$('div.bserial').html(function(){
			return $(this).children('h4').map(function(){
				return $(this).nextUntil('h4').andSelf();
			}).sort(function(a,b){
				return a.first().text() < b.first().text() ? -1 : 1;
			}).map(function(){
				return this.get();
			});
		});
	}
	sort_shows();

	$('.watch-episode').live('click', function(){
		$('#content-inner').one('DOMNodeInserted', sort_shows);
	});
}, false);
