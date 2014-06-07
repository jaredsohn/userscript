// ==UserScript==
// @name       Hide Trainers
// @version    0.2
// @description  
// @include    http://economy.erepublik.com/en/land/overview/*
// @copyright  2011+, gwangyi
// ==/UserScript==

function GM_wait() {
	if (typeof unsafeWindow.jQuery == 'undefined') { window.setTimeout(GM_wait, 100); }
	else { letsJQuery(unsafeWindow.jQuery); }
}
GM_wait();

function letsJQuery($) {
    $('.train_2').parent().hide();
}
