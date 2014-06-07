// ==UserScript==
// @name        Saltybet Extra Mouse UI
// @namespace   http://userscripts.org
// @description Adds more buttons and a slider for mouse only Saltybetting
// @include     /^https?://(www\.)?saltybet\.com
// @include     *saltybet.com*
// @version     1
// @grant       none
// ==/UserScript==


$('#wager').before("<div id='slider' style='margin-top: 0;margin-bottom: 0;margin-left: 0;width: 40%;'></div>");

$( "#slider" ).slider({
	value:0,
	min: 0,
	max: 1,
	step: 0.01,
	slide: function( event, ui ) {
		$('#wager').val(parseInt(parseInt($('#balance').text()) * ui.value));
	}
});

function generate_button(text,value){

	var button_elem = $("<input type='button' style='border-radius:1px; solid #336633;padding:0;background:green;color:white;'></input>");
	button_elem.val(text);

	button_elem.click(function(){
		var current_bet = $('#wager').val();
		if ( isNaN( parseInt( current_bet ) ) ) {
			current_bet = 0;
		}
		var new_bet = parseInt(current_bet) + parseInt(value);
		if (new_bet < 0){
			new_bet = 0;
		}

		if (new_bet > parseInt($('#balance').text())){
			new_bet = parseInt($('#balance').text());
		}
		$('#wager').val(new_bet);
	});

	$('#wager').before(button_elem);
}

generate_button("-10k",-10000);
generate_button("-1k",-1000);
generate_button("-100",-100);
generate_button("-10",-10);
generate_button("-1",-1);
generate_button("+1",1);
generate_button("+10",10);
generate_button("+100",100);
generate_button("+1k",1000);
generate_button("+10k",10000);