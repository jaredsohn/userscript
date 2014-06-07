// ==UserScript==
// @name        Saltybet Extra Mouse UI
// @namespace   http://userscripts.org
// @description Adds more buttons and a slider for mouse only Saltybetting
// @include     /^https?://(www\.)?saltybet\.com
// @include     *saltybet.com*
// @version     2
// @grant       none
// ==/UserScript==

var custom_styles = '#slider { margin-top: 3%;margin-bottom: 3%;margin-left: 10%;width: 80%; }' + 
'.saltyextra-button { border-radius:5px;border: 2px solid #336633;margin:0.25em;padding:0;background:green;color:white;cursor:pointer;width:15%;height:20%; } ' + 
'.saltyextra-row { text-align:center; } #saltyextra-minus-buttons input{background:red !important; border: 2px solid #663333 !important; } ' + 
'#saltyextra-pcent-buttons input{ background:blue !important; border: 2px solid #333366 !important; }' + 
'#fightcard {border-top:none !important;}';

// From http://commons.oreilly.com/wiki/index.php/Greasemonkey_Hacks/Getting_Started#Adding%20a%20Global%20Style
function addGlobalStyle(css) {
	try {
		var elmHead, elmStyle;
		elmHead = document.getElementsByTagName('head')[0];
		elmStyle = document.createElement('style');
		elmStyle.type = 'text/css';
		elmHead.appendChild(elmStyle);
		elmStyle.innerHTML = css;
	} catch (e) {
		if (!document.styleSheets.length) {
			document.createStyleSheet();
		}
		document.styleSheets[0].cssText += css;
	}
}

addGlobalStyle(custom_styles);

$('#status').after("<div id='saltyextra-pcent-buttons' class='saltyextra saltyextra-row'></div>");
$('#status').after("<div id='saltyextra-plus-buttons' class='saltyextra saltyextra-row'></div>");
$('#status').after("<div id='saltyextra-minus-buttons' class='saltyextra saltyextra-row'></div>");

/*
Creates and returns a new button. When clicked, that button will
set the current wager to the value returned func.

func is passed the current_bet and the current balance of the player
*/
function generate_button(text,func){

	var button_elem = $("<input class='saltyextra-button saltyextra' type='button'></input>");
	button_elem.val(text);

	button_elem.click(function(){

		var current_bet = parseInt($('#wager').val());

		if ( isNaN(current_bet)){
			current_bet = 0;
		}

		var balance = parseInt($('#balance').text());

		var new_bet = parseInt(func(current_bet,balance));

		if ( isNaN( new_bet ) ) {
			new_bet = 0;
		}

		if (new_bet < 0){
			new_bet = 0;
		}

		if (new_bet > balance){
			new_bet = balance;
		}
		
		$('#wager').val(new_bet);
	});

	return button_elem;
}

$('#saltyextra-minus-buttons').append(generate_button("-1",function(current_bet,balance){ return current_bet - 1 } ) );
$('#saltyextra-minus-buttons').append(generate_button("-10",function(current_bet,balance){ return current_bet - 10 } ) );
$('#saltyextra-minus-buttons').append(generate_button("-100",function(current_bet,balance){ return current_bet - 100 } ) );
$('#saltyextra-minus-buttons').append(generate_button("-1k",function(current_bet,balance){ return current_bet - 1000 } ) );
$('#saltyextra-minus-buttons').append(generate_button("-10k",function(current_bet,balance){ return current_bet - 10000 } ) );

$('#saltyextra-plus-buttons').append(generate_button("+1",function(current_bet,balance){ return current_bet + 1} ) );
$('#saltyextra-plus-buttons').append(generate_button("+10",function(current_bet,balance){ return current_bet + 10 } ) );
$('#saltyextra-plus-buttons').append(generate_button("+100",function(current_bet,balance){ return current_bet + 100 } ) );
$('#saltyextra-plus-buttons').append(generate_button("+1k",function(current_bet,balance){ return current_bet + 1000 } ) );
$('#saltyextra-plus-buttons').append(generate_button("+10k",function(current_bet,balance){ return current_bet + 10000 } ) );

$('#saltyextra-pcent-buttons').append(generate_button("10%",function(current_bet,balance){ return balance * 0.1} ) );
$('#saltyextra-pcent-buttons').append(generate_button("25%",function(current_bet,balance){ return balance * 0.25 } ) );
$('#saltyextra-pcent-buttons').append(generate_button("50%",function(current_bet,balance){ return balance * 0.5 } ) );
$('#saltyextra-pcent-buttons').append(generate_button("75%",function(current_bet,balance){ return balance * 0.75 } ) );
$('#saltyextra-pcent-buttons').append(generate_button("100%",function(current_bet,balance){ return balance } ) );

$('#bottomcontent').mouseenter(function(){
    $('.saltyextra').show();
});

$('#bottomcontent').mouseleave(function(){
    $('.saltyextra').hide();
});

$('.saltyextra').hide();