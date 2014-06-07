// ==UserScript==
// @name EdenEternal-FreeRewardsCollector
// @include http://edeneternal.aeriagames.com/itemmall/free-rewards
// @include http://edeneternal.aeriagames.com/itemmall/cart/purchase-history

if(document.location.pathname == "/itemmall/free-rewards") {
	makeInterval();
} else if(document.location.pathname == "/itemmall/cart/purchase-history") {
	setTimeout(goBackToRewardPage, 2000);
}
	

function makeInterval() {
	setInterval(checkRewardReady, 2000);
}

function checkRewardReady() {
	if(document.getElementsByClassName("wrapper_btns")[1].style.display == '' || document.getElementsByClassName("wrapper_btns")[1].style.display == 'block') {
		// Collect
		document.getElementById("btnOpen").click();
		// Redeem
		setTimeout(function() { document.getElementById("btnRedeem").click(); },2000);
	}
}

function goBackToRewardPage() {
	window.location = "http://edeneternal.aeriagames.com/itemmall/free-rewards";
}
// ==/UserScript==