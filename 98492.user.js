// ==UserScript==
// @name           Round prices up
// @namespace      org.mrbb
// @description    Round prices up from trailing "9...0..."
// @include        http*://store.apple.com/*
// ==/UserScript==

	var newHTML = document.body.innerHTML;
	// Trim trailing ".00" from prifces.
	newHTML = newHTML.replace(/(\$[0-9,]*)\.00\b/g, "$1");

	// Round up every price ending in ".9x".
	// Commas are not well supported, so $1,999.95 will not round to $2000.
	for (i = 0; i <= 9; i++) {
		var maxDigits = 5
		// Count downward, so that "999" goes to "1000" instead of "9910".
		// WARNING: This will mishandle "x,999", changing it to "x,1000".
		for (digits = maxDigits; digits >= 1; digits--) {
			
			// Add extra excapes to "\", because this is a string that will get wrapped in a RegExp
			old = "(\\$[0-9,]*)" + i + new Array(digits+1).join("9") + "\.9.\\b" ;
			
			newStr = "$1" + (i + 1) + new Array(digits+1).join("0") + "<font size=1 color='#dddddd'>.</font>";
			console.log("replacing: " + old + " -> " + newStr);		
			newHTML = newHTML.replace(RegExp(old, "g"), newStr);
		}	
	}


	// Round up every price ending in "9...".
	// Commas are not supported, so $1,999 will not round to $2000.
	for (i = 0; i <= 9; i++) {
		var maxDigits = 5
		// Count downward, so that "999" goes to "1000" instead of "9910".
		// WARNING: This will mishandle "x,999", changing it to "x,1000".
		for (digits = maxDigits; digits >= 1; digits--) {
			
			// Add extra excapes to "\", because this is a string that will get wrapped in a RegExp
			old = "(\\$[0-9,]*)" + i + new Array(digits+1).join("9") + "\\b" ;
			
			newStr = "$1" + (i + 1) + new Array(digits+1).join("0") + "<font size=1 color='#dddddd'>.</font>";
			console.log("replacing: " + old + " -> " + newStr);		
			newHTML = newHTML.replace(RegExp(old, "g"), newStr);
		}	
	}
	// Fix up "x,1000"
	for (i = 0; i <= 9; i++) {
		for (digits = 3; digits >=  3; digits--) {
			old = "(\\$[0-9,]*)" + i + ",1" + new Array(digits+1).join("0") + "\\b" ;
			newStr = "$1" + (i + 1) + new Array(digits+1).join("0");
			console.log("replacing: " + old + " -> " + newStr);		
			newHTML = newHTML.replace(RegExp(old, "g"), newStr);				
		}
	}
	
	// Until Apple sells million-dollar products, we are good.
	document.body.innerHTML = newHTML;
