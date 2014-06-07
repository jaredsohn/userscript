// Auto Insert Real Dollars next to MS Points
// By MC Hampster
//
// ==UserScript==
// @name          Auto Insert Dollar Value by MS Points
// @namespace     http://www.lagxbl.com/scripts
// @description	  Automatically appends dollar value after text '##### MS Points' where ##### is a number
// @include       http://www.xbox.com/*
// @include       http://xbox.com/*
// ==/UserScript==

// User XPath to return all of our text nodes in the HTML
allTextNodes = document.evaluate(
				"//body//text()", 
				document, 
				null, 
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
				null);

var pattern = /(\d+) MS Points/ig;
var pointsDollarRatio = (20 / 1600);

// Loop through all text nodes and replace values				
for (var i = 0; i < allTextNodes.snapshotLength; i++) 
{ 	
	var textNode = allTextNodes.snapshotItem(i); 
	var nodeString = textNode.data;  
	var result;
	
	var newString = "";
	var lastIndex = 0;
	while ((result = pattern.exec(nodeString)) != null)
	{
		// Debug output
		GM_log("Matched in string '" + nodeString +"'", 0);
		GM_log("Matched '" + result[0] + "'" + " at position " + result.index + "; next search begins at " + pattern.lastIndex, 0);	
	
		// Convert points to numerical value and perform conversion
		var points = result[1] - 0; // Convert to number
		var dollars = points * pointsDollarRatio;
		
		// Store first part of points
		newString = nodeString.toString().substr(lastIndex, result.index);
		lastIndex = pattern.lastIndex;
	
		// Add the dollar value
		newString = newString + result[0];
		newString = newString + " (" + toUSCurrency(dollars) + ")"
	}
	
	newString = newString + nodeString.substring(lastIndex, nodeString.length + 1);
	
	pattern.lastIndex = 0;
	
	textNode.data = newString;
} 

// Written by Charlton Rose
// Found at http://sharkysoft.com/tutorials/jsa/content/036.html
function toUSCurrency (input)
{
	// Make sure input is a string:
	input += "";

	// Keep original copy of input string:
	var original_input = input;

	// Strip leading dollar sign if necessary:
	if (input . charAt (0) == "$")
		input = input . substring (1, input . length);
	else if
	(
		input . substring (0, 2) == "-$"
	||	input . substring (0, 2) == "+$"
	)
		input = input . charAt (0) + input . substring (2, input . length);

	// Get float value:
	var amount = parseFloat (input);

	// Return unmodified input if we weren't able to convert it:
	if (isNaN (amount))
		return original_input;


	// Express amount in pennies, rounded to the nearest penny:
	amount = Math . round (100 * amount);

	// Prepare to add a US currency prefix:
	var prefix = "$";
	if (amount < 0)
	{
		prefix = "-" + prefix;
		amount = - amount;
	}

	// Convert amount to string and pad with leading zeros if necessary:
	var string;
	if (amount < 10)
		string = "00" + amount;
	else if (amount < 100)
		string = "0" + amount;
	else
		string = "" + amount;

	// Insert prefix:
	string = prefix + string;

	// Insert decimal point before last two digits:
	string =
		string . substring (0, string . length - 2) +
		"." +
		string . substring (string . length - 2, string . length);

	// Return formatted currency string:
	return string;
}
