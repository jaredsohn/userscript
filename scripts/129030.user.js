// ==UserScript==
// @name              Ukrywacz czarnej listy
// @namespace         http://www.wykop.pl/ludzie/artur125/
// @description       Ukrywa całkowicie znaleziska i wpisy z czarnej listy 
// @author            Artur125
// @version           1.3
// @include           http://*.wykop.pl*
// ==/UserScript==

var main = function () {
	$(document).ready(function($) {	
		$('article.sponsoredby').hide();
		$(".scale a[href*='http://www.wykop.pl/reklama']").closest('article').hide();
		$('article.slim').hide();
		$("div.margin20_0:contains('przejdź do wpisu')").hide();
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)