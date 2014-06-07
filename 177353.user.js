// ==UserScript==
// @name       JustDice investor layout
// @namespace  
// @version    0.1
// @description  removes bet buttons and details on personal betting statistics. leaves investors with only the information releveant to investors.
// @match      https://just-dice.com/*
// @include     https://just-dice.com/*
// @copyright  2013+, vongesell
// ==/UserScript==

$(function() {
	$('.bets, .wagered, .myprofit, .container, .button_group, fieldset').hide();
    $('#all').hide();
    $('#chat').show();
});
