// ==UserScript==
// @name           MintMonkey
// @namespace      http://www.ColorBlindDesign.net
// @description    Tweaks the Mint Interface
// @include        https://wwws.mint.com/*
// @include        http://*.mint.com/*
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

$(document).ready(function() {
	

	
	function myFunc() {
	$('.progress').each(function() {
		console.log('tick');
		var spentAmount = $(this).find('.amount').html();
		var totalAmount = $(this).find('.total').find('.amount').html();
	
		totalAmount = totalAmount.replace(/,/g,"");
    	spentAmount = spentAmount.replace(/,/g,"");    
    	var remainingAmount = totalAmount - spentAmount
		$(this).append("&nbsp;&nbsp;--&nbsp;&nbsp;<strong>  \$" + remainingAmount + '</strong> remaining');
		
	});
	}


	setTimeout(myFunc,3000);
	
});