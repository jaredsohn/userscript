// ==UserScript==
// @description Always tick the Steam subscriber agreement checkbox.
// @grant       none
// @include     http://steamcommunity.com/market/listings/*
// @include     https://store.steampowered.com/checkout/*
// @name        Steam subscriber agreement check
// @namespace   http://userscripts.org/users/nescafe
// @version     1
// ==/UserScript==

// Check input
function gCheck(a_sIdentifier)
{
	// Get input
	var l_oInput = document.getElementById(a_sIdentifier);

	// Check input
	if (null !== l_oInput)
	{
		// Set check mark
		l_oInput.checked = true;
	}
}

// Watch class
function gWatch(a_sClass, a_sIdentifier)
{
	// Get button list
	var
	l_oList = document.getElementsByClassName(a_sClass),
	l_iCount = l_oList.length,
	l_iIndex = 0;

	// Loop through button list
	while (l_iIndex !== l_iCount)
	{
		// Get button
		var l_oButton = l_oList[l_iIndex++];

		// Listen on click
		l_oButton.addEventListener('click', function ()
		{
			// Check input
			gCheck(a_sIdentifier)
		}
		, false);
	}
}

// Process checkout form
gCheck('accept_ssa');

// Process market listing
gWatch('item_market_action_button item_market_action_button_green', 'market_buynow_dialog_accept_ssa');
