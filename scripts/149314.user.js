// ==UserScript==
// @name          Retail Me Not Simplifier
// @description	  Remove cover items from RetailmeNot
// @include       http://www.retailmenot.com/view/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @author        WMA
// ==/UserScript==
// Style

var covers = $('.cover');
covers.parent().removeClass('cover attachFlash');
covers.remove();
$('.discount').each(function(index) {
			var text = $(this).text().trim();
			$(this).parent().append('<br/><br/><p>' + text + '</p>');
			$(this).remove();

});