// ==UserScript==
// @name           Fix Mint Budget
// @namespace      http://ichor.dnsalias.net/userscripts
// @description    Fix Mint Budget
// @include        https://wwws.mint.com/planning.event*
// @run-at document-end
// ==/UserScript==

// Set the variable gmul to the unordered list item in the spendingBudget unordered list
var gmul = document.getElementById("spendingBudget-list-body").getElementsByTagName("li");
// Loop through all list items
for(var i=0; i < gmul.length; i++) {
	// Set variable gmli to the list item index
	var gmli = gmul[i];
	// Set variable gmdivs to all divs in the list item gmli
	var gmdivs = gmli.getElementsByTagName('div')
	// Loop through all divs in gmdivs
	for (var x = 0; x < gmdivs.length; x++) {
		// Set variable gmdiv to the div index
		var gmdiv = gmdivs[x];
		// Check if the class name in a div is progress
		if (gmdiv.className == 'progress') {
			// Delete all whitespace in the text contained in gmdiv
			var data = gmdiv.textContent.replace(/^\s*([\S\s]*?)\s*$/gm, '$1');
			// and newlines
			data = data.replace(/(\r\n|\n|\r)/gm,"");
			// and commas
			data = data.replace(/,/gm,"");
			// and dollar signs
			data = data.replace(/\$/gm,"");
			// and any other spaces
			data = data.replace(/ /gm,"");
			// Replace the string "of" with a |
			data = data.replace(/of/gm,"|");
			// Split the variable data into an array by the | character
			data = data.split("|");
			// If data[1] is 725, then it is zero (this is a stupid Mint thing.  All numbers are 725 until the page loads and javascript rewrites) so data[0] is the remaining amount
			if (data[1] == "725") {
				var remaining = Number(data[0])
				// Cast the variable to a string
				remaining = remaining.toString();
			// Subtract data[1] from data[0]
			} else {
				var remaining = Number(data[1]) - Number(data[0]);
				// Cast the variable to a string
				remaining = remaining.toString();		
			}
			// Check if the list item class name has the word warning
			if (gmli.className.search("warning") != -1) {
				// Set variable towrite
				towrite = "&nbsp;&nbsp;&nbsp;&nbsp;<b><font color=\"#CC9900\"><span><span class=\"dollar_sign\">$</span>" + remaining + "</span></font></b>";
			// Check if the list item class name has the word overbudget
			} else if (gmli.className.search("overbudget") != -1) {
				// Set variable towrite
				towrite = "&nbsp;&nbsp;&nbsp;&nbsp;<b><font color=\"#FF0000\"><span>-<span class=\"dollar_sign\">$</span>" + remaining + "</span></font></b>";
			} else {
				// Set variable towrite
				towrite = "&nbsp;&nbsp;&nbsp;&nbsp;<b><font color=\"#009933\"><span><span class=\"dollar_sign\">$</span>" + remaining + "</span></font></b>";
			}
			// Append text content in gmdiv with the towrite variable
			gmdiv.innerHTML = gmdiv.innerHTML + towrite;
		}
	}
}
