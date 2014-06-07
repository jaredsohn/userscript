// ==UserScript==
// @name           LoL 2.0 Referral Redeemer
// @author		   F1u5h3r @ ace-client.net
// @description    Redeems all your LoL 2.0 rewards.
// @include        http://*.leagueoflegends.com/rewards/
// @require 	   http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

function initRedeem() {
	$(document).ready(function () {
		redeem();
	});
}

function redeem() {
	$('input[value*="YOURBUTTONDESCRIPTIONHERE"]').trigger('click');
	setTimeout(redeem, 1000);
}

initRedeem();