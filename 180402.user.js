// ==UserScript==
// @name          RetailMeNot.com code reveal
// @description	  Replace "Show Coupon Code" with actual code
// @include       http://www.retailmenot.com/view/*
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.6/jquery.min.js
// @author        Richard Hayden
// ==/UserScript==
// Style

$('.actions').each(function(index){
	var code=$(this).find('.code-text').text().trim();
	$(this).empty().html('<p class="code-text" style="font-size: 28px;">' + code + '</p>');
});