// ==UserScript==
// @name       Steam Store Account Total
// @namespace  http://github.com/wiLD0kl
// @version    0.9.1
// @description Tallies the total spent on a Steam Account Details page.
// @match      http*://store.steampowered.com/*
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js
// @copyright  Creative Commons CC0 1.0
// @grant       none
// ==/UserScript==
if ($('.transactionRowPrice').length != 0)
{
	totaler = function(e,i){
		var regex = /(\d+\.\d\d+)/;
		price = regex.exec($(e).html());
		if (price != null) { return parseFloat(price);}
	};
	prices = jQuery.map($('.transactionRowPrice'), totaler);
	var total = 0.0;
	jQuery.map(prices, function(e,i){total += e});
  total = total.toFixed(2);
    $('.rightcol .accountInfoBlock:first-child .block_content_inner .accountRow').after('<div class="accountRow accountBalance accountSpent"></div>');
  $('.accountSpent').append('<div class="accountData price">$' + total + '</div>');
  $('.accountSpent').append('<div class="accountLabel" style="color: #C00; font-weight: bold; font-size: 125%">Total Spent:</div>');
}