// ==UserScript==
// @name           Show in Shekel
// @namespace      www.yaweli.com
// @description    Show $ in Shkalim
// @include       *
// ==/UserScript==

// User XPath to return all of our text nodes in the HTML
allTextNodes = document.evaluate(
				"//text()", 
				document, 
				null, 
				XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, 
				null);

// Loop through all text nodes and replace values				
for (var i = 0; i < allTextNodes.snapshotLength; i++) 
{ 	
	var textNode = allTextNodes.snapshotItem(i); 
	var nodeString = textNode.data;  
	var result;
	
	var newString = "";
	var lastIndex = 0;
	
	if (textNode.data.indexOf("$")>-1) {
		var source = textNode.data.split("$");
		var value = source[1];
		value = stripCommas(value);
		var markup = (fixAmt(parseFloat(value) * parseFloat(GM_getValue("markup",0.66)))).toFixed(2);
		if(GM_getValue("add $",true))
		  var symbol = "$";
		else
			var symbol = "";
		var displayString = "";
		if(GM_getValue("wholeSale",true))
			displayString += "\n" + symbol + value;
		if(GM_getValue("shmarkup",true))
			displayString += "\n [ " + markup + " Shekel ]" ;
		textNode.data = displayString;
	}	
} 

/* FUNCTION BLOCKS */

function fixAmt(num) {
	return Math.round(num*100)/100;
}

function stripCommas(numString) {
    var re = /,/g;
    return numString.replace(re,"");
}

function setMarkup() {
	var markup = prompt("Enter markup percentage in decimal format: ");
	if(parseFloat(markup)>0)
		GM_setValue("markup",markup);
	else
		alert("Invalid data entered: "+markup);
}


/* end of function blocks */
var data = "wholesale";

        GM_registerMenuCommand("Set dolar to shekel",setMarkup);

