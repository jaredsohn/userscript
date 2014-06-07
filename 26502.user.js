// ==UserScript==
// @name          Price Markup
// @namespace     frack
// @description	  Display your markup, taxes applied and net total in place
// @description   of textual prices on a page.
// @include       *
// @version       0.04
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
		//var value = parseFloat(textNode.data.substring(1));
		var source = textNode.data.split("$");
		var value = source[1];
		value = stripCommas(value);
		var markup = (fixAmt(parseFloat(value) * parseFloat(GM_getValue("markup",0.66)))).toFixed(2);
		var tax = fixAmt((parseFloat(value) + parseFloat(markup)) * parseFloat(GM_getValue("tax",0.0825))).toFixed(2);
		var total = fixAmt(parseFloat(markup)+ parseFloat(value) + parseFloat(tax)).toFixed(2);
		if(GM_getValue("add $",true))
		  var symbol = "$";
		else
			var symbol = "";
		var displayString = "";
		if(GM_getValue("wholeSale",true))
			displayString += "\nWholeSale: " + symbol + value;
		if(GM_getValue("shmarkup",true))
			displayString += "\nMarkup: " + symbol + markup;
		if(GM_getValue("shmax",true))
		  displayString += "\nTax: " + symbol + tax;
		if(GM_getValue("total",true))
			displayString += "\nTotal: " + symbol + total;
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

function setTax() {
	var tax = prompt("Enter tax percentage in decimal format: ");
	if(parseFloat(tax)>0)
		GM_setValue("tax",tax);
	else
		alert("Invalid data entered: "+tax);
}

function setBoolean() {
	var temp = confirm(data + "(ok is yes, cancel is no)");
	if(temp == NaN) temp = true;
	GM_setValue(data,temp);
}

function showConfiguration() {
         alert("Show Wholesale: " + GM_getValue("wholesale")+"\n"+
               "Show Markup: " + GM_getValue("shmarkup")+   "\n"+
               "Show Tax: " + GM_getValue("shtax")+      "\n"+
               "Show Total: " + GM_getValue("total")+    "\n"+
               "Show Tax Rate: " + GM_getValue("tax")+           "\n"+
               "Show Markup Rate: " + GM_getValue("markup")+        "\n");
}

/* end of function blocks */
var data = "wholesale";
        GM_registerMenuCommand("Set Show Wholesale",setBoolean);
var data = "shmarkup";
        GM_registerMenuCommand("Set Show Markup",setBoolean);
var data = "shtax";
        GM_registerMenuCommand("Set Show Tax",setBoolean);
var data = "total";
        GM_registerMenuCommand("Set Show Total",setBoolean);

        GM_registerMenuCommand("Set Markup",setMarkup);
        GM_registerMenuCommand("Set Tax",setTax);
        GM_registerMenuCommand("Show Configuration",showConfiguration);
