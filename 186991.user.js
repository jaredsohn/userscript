// ==UserScript==
// @name         Steam Community Market Instant Buy
// @include http://steamcommunity.com/market*
// @description   Automatically accepts and buys an item upon clicking buy button
// ==/UserScript==

var elems = document.getElementsByClassName('item_market_action_button item_market_action_button_green');

for (var i = 0; i < elems.length; i++)
{
	var innerText = elems[i].innerHTML;

	String.prototype.contains = String.prototype.contains || function (str)
	{
		return this.indexOf(str) >= 0;
	}

	if (innerText.contains("Buy Now"))
	{
		elems[i].onclick = function ()
		{
			setTimeout(buyIt, 10);
		};
	}
}

function buyIt()
{
	document.getElementById('market_buynow_dialog_accept_ssa').checked = true;
	document.getElementById('market_buynow_dialog_purchase').click();
}