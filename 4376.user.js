// ==UserScript==
// @name          Bank of America Burn Rate Calculator
// @author        Richard Bronosky
// @namespace     http://bronosky.com/pub/greasemonkey_scripts
// @description   Adds a projected balance to the Outgoing Payments area of the Bill Pay Overview page.
// @include       https://bill*.bankofamerica.com/*
// ==/UserScript==

// I have created an extension of this also.
// https://addons.mozilla.org/en-US/firefox/addon/7109

// When ever I am carrying a balance on a credit card, I like to spend nearly
// every penny each month. It's kind of nerve racking, but it's the best way to
// make sure those "bargains" that you just HAD to spend credit on remain
// bargains. (It's amazing how expensive things are when you add in the interest
// you pay!)

// Later I may come back and change the color based on a +/- balance.  But this works for me for now.
// UPDATE: Colors based on thresholds added.  You can tweak the values below:

(function(){
	var colorGreen      = '#080'; // Balances will be this color if they are greater than the theshold below.
	var thresholdYellow = 2000;   // Balances below this threshold will be the color below.
	var colorYellow     = '#990'; // Balances will be this color if they are between the thesholds above and below.
	var thresholdOrange = 1000;   // Balances below this threshold will be the color below.
	var colorOrange     = '#A60'; // Balances will be this color if they are between the thesholds above and below.
	var thresholdRed    =  250;   // Balances below this threshold will be the color below.
	var colorRed        = '#A00'; // This is the color for the rest of the balances.
	if(document.title.indexOf('Bill Pay Overview') > -1){
		var funds,table,cells, bill,fundsString;
		function getElementsByClassName(oElm, strTagName, strClassName){
			var arrElements = (strTagName == '*' && document.all)? document.all : oElm.getElementsByTagName(strTagName);
			var arrReturnElements = new Array();
			strClassName = strClassName.replace(/\-/g, '\\-');
			var oRegExp = new RegExp('(^|\\s)' + strClassName + '(\\s|$)');
			var oElement;
			for(var i=0; i<arrElements.length; i++){
				oElement = arrElements[i];
				if(oRegExp.test(oElement.className)){
					arrReturnElements.push(oElement);
				}
			}
			return (arrReturnElements);
		}
		funds = parseFloat(getElementsByClassName(document, 'span', 'payfrommargin')[1].innerHTML.replace(/Avail. Funds \$([0-9.,]+).*/, '$1').replace(/,/, ''));
		table = getElementsByClassName(document, 'table', 'mod1-bkgd2-hs')[2];
		cells = getElementsByClassName(table, 'td', 'text1a');
		for(x=1; x<cells.length; x+=3){
			bill = cells[x].innerHTML.replace(/\$([0-9.,]+).*/, '$1').replace(/,/,'');
			funds -= bill;
			color = (funds>=thresholdYellow) ? colorGreen : ((funds>=thresholdOrange) ? colorYellow : ((funds>=thresholdRed) ? colorOrange : colorRed));
			fundsString = Math.ceil(funds * 100).toString();
			cells[x].innerHTML = '$' + bill + '<br>~<span style="color:' + color + ';">$' + fundsString.substring(0,fundsString.length-2) + '.' + fundsString.substring(fundsString.length-2, fundsString.length)+'</span>';
		}
	}
})();

//.user.js

