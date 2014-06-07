// ==UserScript==
// @name       Saltybet Super Simple Slider
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Saltybet betting slider
// @include     /^https?://(www\.)?saltybet\.com
// @include     *saltybet.com*
// @copyright  2012+, You
// ==/UserScript==

// I really don't know what I'm doing.

var cache = $("span").filter(":contains('Get more Salty Bucks!')").children();
$("span").filter(":contains('Get more Salty Bucks!')").html("<span id=\"betstatus\"></span>").append(cache);

    
$('#odds').after("<div id='slider' 	style='margin-top: 1%	;margin-bottom: 0%	;margin-left: 2%;	width: 80%; '></div>");

      
$( "#slider" ).slider({
	value: 0,
	min: 0,
	max: 1,
	step: 0.01,
	slide: function( event, ui ) {
		$('#wager').val(parseInt(parseInt($('#balance').text()) * ui.value));
	}
});
