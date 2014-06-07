// ==UserScript==
// @name              Obiektywny Wykop
// @namespace         http://kamdz.pl
// @description       Skrypt ukrywający stan plusów i minusów w komentarzach innych użytkowników dopóki nie oddamy na nie głosu.
// @author            Kamil "kamdz" Dzwonkowski 
// @version           1.1
// @include           http://*.wykop.pl/link/*
// ==/UserScript==

var main = function () {
	$(document).ready(function($) {
		$('span.votes').each(function() {
		if (!$('>a', this).hasClass('disabled'))
			$('>strong', this).hide();
		});
		$('li.comment').removeClass('hlight');
	});
};

var script = document.createElement('script');
script.textContent = '(' + main.toString() + ')();';
document.body.appendChild(script)