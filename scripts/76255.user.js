// ==UserScript==
// @name           BvS_Science_Stopper
// @namespace      SirDuck
// @description    Keep People from accidently doing science that aren't supposed to
// @include        http://*animecubed.com/billy/bvs/villagescience.*
// ==/UserScript==


// Get the player name
var playerName = document.evaluate("//input[@name='player' and @type='hidden']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue.value;


// If playerName

if (playerName == "Kazeodori" || playerName == "Quoth")
{
	// Find the Science button
	SciButton = document.evaluate("//a[@href='javascript:document.science.submit();']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;

	// Generate replacement node
	newdiv = newdiv=document.createElement("div");
	newdiv.innerHTML = "<font color=\"#ffffff\"><b>No Science for you " + playerName + "...</b></font>";
	SciButton.parentNode.appendChild(newdiv);
	
	// Neutralize the Science button
	SciButton.href = "javascript:return false;";
	SciButton.innerHTML = "";

	// Neutralize the form itself
	SciForm = document.evaluate("//form[@action='villagescience.html']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	SciForm.action = "javascript:return false;";
}