// ==UserScript==
// @description Skip Steam store age check verification screen.
// @grant       none
// @include     http://store.steampowered.com/agecheck/*
// @name        Steam age check bypass
// @namespace   http://userscripts.org/users/nescafe
// @version     5
// ==/UserScript==

// Get form
var g_oForm = document.getElementById('agegate_box').getElementsByTagName('form')[0];

// Get selection list
var g_a_oSelectionList = g_oForm.getElementsByTagName('select');

// Loop through selection list
for (var g_iIndex = 0; g_a_oSelectionList.length !== g_iIndex; ++g_iIndex)
{
	// Get selection
	var g_oSelection = g_a_oSelectionList[g_iIndex];

	// Check name
	if ('ageYear' === g_oSelection.name)
	{
		// Set year
		g_oSelection.value = '1970';
	}
}

// Submit form
g_oForm.submit();
