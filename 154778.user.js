	// ==UserScript==
	// @name       Steam market license auto-agree
	// @namespace  http://scrap.tf
	// @version    0.3
	// @description  Auto-checks the agreement when buying something from steam market
	// @match      http://steamcommunity.com/market*
	// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.8.3/jquery.min.js
	// @copyright  2012+, scrap.tf
	// ==/UserScript==
	
	$( function() {
		$('#market_buynow_dialog_accept_ssa').attr('checked',true);
	});
