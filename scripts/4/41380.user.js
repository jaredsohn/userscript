// ==UserScript==
// @name           vkCleaner
// @namespace      http://glukki.spb.ru/
// @description    script to clear spam comments from photos
// @include        http://vkontakte.ru/photo-*
// @include        http://www.vkontakte.ru/photo-*
// @require        http://jqueryjs.googlecode.com/files/jquery-1.3.1.min.js
// ==/UserScript==

var spam_str = 'hottestonlinenews';
var timer = 4000;

(function (){
	$(document).ready(function (){
		var oid = location.href.substr(location.href.search('photo') + 5);
		oid = oid.substring(0, oid.search('_'));
		window.setInterval(function() {
			$('div[id^="comm"]:contains("'+spam_str+'")').each(function(e){
				unsafeWindow.deleteComment(oid, $(this).attr('id').substr(4));
			});
			unsafeWindow.nextPhoto()
		}, timer);
	});
}());