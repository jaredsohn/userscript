// Copyright (c) 2009 - 2010 Foppe Hemminga
// Licence: GNU General Public Licence (GPL)
// Feel free to copy, distribute, sell, modify and enjoy this script
// as long as you obey either the GPL 2 or GPL 3 licence.
//
// This script is for Torn City (http://www.torn.com). It will keep track of
// your stocks.
// Usage: view your personal stocks page and it will show the total value
// of your stocks. It will keep track of recent changes and displays a 
// nice graph. It adds the feature called MagicStack which provides an
// info page with nearly all relevant data of the stock you own.

// ==UserScript==
// @name            TornMagicStock
// @version         20101025.1
// @namespace       http://www.hemminga.net
// @description     Keeps track of your stocks in the RPG Torncity
// @author          Foppe Hemminga 'Afwas' #1337627
// @include         http://torncity.com/stockexchange.php?step=portfolio
// @include         http://www.torncity.com/stockexchange.php?step=portfolio
// @include         http://torn.com/stockexchange.php?step=portfolio
// @include         http://www.torn.com/stockexchange.php?step=portfolio
// @require 	    http://code.jquery.com/jquery-1.3.2.js
// @require 	    http://people.iola.dk/olau/flot/jquery.flot.js
// @require	    http://www.hemminga.net/greasemonkey/jquery.qtip-1.0.0-rc3.js
// @require 	    http://jquery-simpletip.googlecode.com/files/jquery.simpletip-1.3.1.js
// ==/UserScript==

// TODO: check where this is used
var TM_color = {
	green: '#c1dec1',
	blue: '#c1cfde',
	red: '#dec1de',
	brown: '#decfc1',
	yellow: '#fdd017'
}

function addGlobalStyle(css) {
	// Dive into Greasemonkey ch 4.13
	// by Mark Pilgrim
	var head, style;
	head = document.getElementsByTagName('head')[0];
	if (!head) { return; }
	style = document.createElement('style');
	style.type = 'text/css';
	style.innerHTML = css;
	head.appendChild(style);
}

addGlobalStyle('.tooltip{ position: absolute; top: 0; left: 0; z-index: 3; display: none; }');
addGlobalStyle('.tooltip{ padding: 10px 13px; color: #303030; background-color: #f5f5b5; border: 1px solid #DECA7E; }'); 
addGlobalStyle('.tooltip{ font-family: sans-serif; font-size: 12px; line-height: 18px; text-align: center; }');


function CurrencyFormatted(amount)
{
	// by William Bontrager
	// http://www.web-source.net/web_development/currency_formatting.htm
	var i = parseFloat(amount);
	if(isNaN(i)) { i = 0.00; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	i = parseInt((i + .005) * 100);
	i = i / 100;
	s = new String(i);
	if(s.indexOf('.') < 0) { s += '.00'; }
	if(s.indexOf('.') == (s.length - 2)) { s += '0'; }
	s = minus + s;
	return s;
}
// end of function CurrencyFormatted()


function CommaFormatted(amount)
{
	// by William Bontrager
	// http://www.web-source.net/web_development/currency_formatting.htm
	var delimiter = ","; // replace comma if desired
	var a = amount.split('.',2)
	var d = a[1];
	var i = parseInt(a[0]);
	if(isNaN(i)) { return ''; }
	var minus = '';
	if(i < 0) { minus = '-'; }
	i = Math.abs(i);
	var n = new String(i);
	var a = [];
	while(n.length > 3)
	{
		var nn = n.substr(n.length-3);
		a.unshift(nn);
		n = n.substr(0,n.length-3);
	}
	if(n.length > 0) { a.unshift(n); }
	n = a.join(delimiter);
	if(d.length < 1) { amount = n; }
	else { amount = n + '.' + d; }
	amount = minus + amount;
	return amount;
}
// end of function CommaFormatted()

var smallest = 1000000000; // large to start with
var rememberI = 0;
// This function seeks the least significant data point in the current
// total price array.
function prune(arr){
//	GM_log("arr.length : "+arr.length);
	var i = 0;
	for(j in arr){
		i = j;
		// excluding i where i-1 or i+1 doesn't exist
		if(i > 0 && i < (arr.length -1)){
			var test = Math.abs(arr[i*1+1] - arr[i-1]);
		//	GM_log("test : "+test+" = arr["+i+"+1] : "+arr[i+1]+" - arr["+i+"-1] : "+arr[i-1]);
		//	GM_log("All [i] - i : "+i+" -> test : "+test);
			if(test < smallest){
		//		GM_log("i : "+i+" -> test : "+test);
				smallest = test;
				rememberI = i;
			}
		}
	}
//	GM_log("rememberI : "+rememberI);
	return rememberI;
}


jQuery(document).ready(function(){
	var TM_invest = new Array();
	var TM_temp;
	var TM_sum = 0;
	var TM_sumFormatted = 0;
	var temptemp = '';
	var TM_dateString = '';
	var TM_dateArray = new Array();
	var TM_dateArrayFormatted = new Array();
	var TM_flotDate = new Array();
	var TM_investString = '';
	var TM_investStringFormatted = '';
	var TM_investArray = new Array();
	var TM_investArrayFormatted = new Array();
	var TM_totalBoughtPrice= 0;
	var TM_totalBoughtPriceArray = new Array();
	var TM_flotBought = new Array();
	var TM_settingsStock = new Array();
	// Number of shares
	var TM_shares = new Array();
	// Name of shares
	var TM_sharesName = new Array();
	// Temp array
	var TM_sharesTemp = new Array();
	// From the page: current price of a share
	var TM_sharesCurrentPrice = new Array();
	// From the page: buy price of a share
	var TM_sharesBoughtPrice = new Array();
	// From the page: total current price of shares
	var TM_sharesTotalPrice = new Array();
	// Holds the images for stocks
	var TM_stockImageArray = new Array();
	// Holds the abbriviation for each stock
	// Holds all information on available stock
	// TODO: Rename this array and several others
	// to something more appropriate
	var TM_stockAbbrArray = new Array();
	// New array with compressed stock info
	var TM_stockCompressed = new Array();
	// Measured the width of a <hr /> to set the
	// div of the graph to the same width
	var TM_width = $("hr:eq(0)").css("width");
	TM_width = TM_width.match(/\d+/);
	TM_width = TM_width[0];
//	GM_log("TM_width : "+TM_width);
	// TODO: Do we need those?
	// TODO: Check all counter variables on redundancy
	var color; // TM_color defined at top of this file
	var k = 0;
	var l = 0;
	var m = 0;
	var n = 0;

	// The number of hits to be stored / remembered
	TM_settingsStock[0] = 500;
	// This gets a reasonably formatted Date string
	TM_settingsStock[1] = new Date();
	// This is the Unix like seconds from 1970/1/1 
	// needed for the flot graph
	TM_settingsStock[2] = TM_settingsStock[1].getTime();
	// Determines way to remove an item from store
	// 1 removes oldest item from array
	// 0 (experimental) removes a random point
	// Not the first and not the latest
	// 2 (default) removes least significant point
	TM_settingsStock[3] = 2;
	// The number of entries shown in the table under the graph
	// -1 for every entry (which can be as many as TM_settingsStock[0])
	TM_settingsStock[4] = 20;
	// Gets the stored string formatted date
	TM_dateStringFormatted = GM_getValue('TM_stockDateFormatted', '');
	// Gets the stored string miliseconds from 1970/1/1
	TM_dateString = GM_getValue('TM_stockDate', '');
	TM_totalBoughtPriceArray = GM_getValue('TM_stockBoughtPrice', '').split(',');
	// This removes the empty element at the point the array is first initialised
	// If all stocks are sold 0 (zero) will be stored instead
	// TODO: check if that last assumption is correct ;)
	for(i in TM_totalBoughtPriceArray){
		if(TM_totalBoughtPriceArray[i] == ''){
			TM_totalBoughtPriceArray.splice(i, 1);
		}
	}
	try{
		// Transform to array
		TM_dateArray = TM_dateString.split(',');
		for(i in TM_dateArray){
			if(TM_dateArray[i] == ''){
				TM_dateArray.splice(i, 1);
			}	
		}
	}
	catch(err){ // Surpresses error output (only error would be empty string or single element)
	}
	try{
		TM_dateArrayFormatted = TM_dateStringFormatted.split(',');
		for(i in TM_dateArrayFormatted){
			if(TM_dateArrayFormatted[i] == ''){
				TM_dateArrayFormatted.splice(i, 1);
			}	
		}

	}
	catch(err){
	}
	TM_investString = GM_getValue('TM_stockInvest', '');
	try{
		TM_investArray = TM_investString.split('|');
		for(i in TM_investArray){
			if(TM_investArray[i] == ''){
				TM_investArray.splice(i, 1);
			}	
		}

	}
	catch(err){
	}
	TM_investStringFormatted = GM_getValue('TM_stockInvestFormatted', '');
	try{
		TM_investArrayFormatted = TM_investStringFormatted.split('|');
		for(i in TM_investArrayFormatted){
			if(TM_investArrayFormatted[i] == ''){
				TM_investArrayFormatted.splice(i, 1);
			}	
		}

	}
	catch(err){
	}

	// Getting the strings from the page
	// The string contains 'Worth'
	// The strings are put into an array
	$("td center:contains('Worth')").each(function(i){
		TM_invest[i] = '';
		TM_temp = $(this).text();
		// Get the digits from a string
		TM_temp = TM_temp.match(/[0-9]+/g);
		// Because of the comma's in the formatted
		// currency string the RegEx finds more than
		// one part e.g. 5 + 432 + 987
		// So we glue them together
		for(j in TM_temp){
	//		GM_log('TM_invest['+j+'] : '+TM_temp[j]);
			TM_invest[i] += String(TM_temp[j]);
		}
	})

	// Gets the number of shares from the page
	$("td center:contains('Shares:')").each(function(i){
		TM_shares[i] = '';
		TM_temp = $(this).text();
		// Regex to grab only the numbers
		TM_temp = TM_temp.match(/[0-9]+/g);
		for(j in TM_temp){
	//		GM_log('TM_shares['+j+'] : '+TM_temp[j]);
			// Stores in array TM_shares
			TM_shares[i] += String(TM_temp[j]);
		}
	});

	// Grabs information about the stock itself (stock number)
	// and processes that information. Stores in array TM_stockAbbrArray
	$("tr td a img").each(function(i){
		var TM_stockImage = $(this).attr("src");
	//	GM_log('TM_stockImage : '+TM_stockImage);
		var TM_stockNumber = TM_stockImage.match(/[0-9]+/g);
	//	GM_log('TM_stockNumber : '+TM_stockNumber);
		switch(String(TM_stockNumber)){
			case '0':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 0;
				TM_stockAbbrArray[i - 1][1] = 'TCSE';
			//	GM_log('TM_stockAbbrArray['+i+'][0] : '+TM_stockAbbrArray[i][0]);
			//	GM_log('TM_stockAbbrArray['+i+'][1] : '+TM_stockAbbrArray[i][1]);

				break;
			case '1':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 1;
				TM_stockAbbrArray[i - 1][1] = 'TCSB';
				break;
			case '2':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 2;
				TM_stockAbbrArray[i - 1][1] = 'TCB';
				break;

			case '3':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 3;
				TM_stockAbbrArray[i - 1][1] = 'SYS';
				break;
			case '4':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 4;
				TM_stockAbbrArray[i - 1][1] = 'SLAG';
				break;

			case '5':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 5;
				TM_stockAbbrArray[i - 1][1] = 'IOU';
				break;

			case '6':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 6;
				TM_stockAbbrArray[i - 1][1] = 'GRN';

				break;
			case '7':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 7;
				TM_stockAbbrArray[i - 1][1] = 'TCHS';
				break;

			case '8':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 8;
				TM_stockAbbrArray[i - 1][1] = 'YAZ';
				break;

			case '9':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 9;
				TM_stockAbbrArray[i - 1][1] = 'TCT';
				break;

			case '10':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 10;
				TM_stockAbbrArray[i - 1][1] = 'CNC';
				break;

			case '11':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 11;
				TM_stockAbbrArray[i - 1][1] = 'MSG';
				break;

			case '12':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 12;
				TM_stockAbbrArray[i - 1][1] = 'TMI';
				break;

			case '13':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 13;
				TM_stockAbbrArray[i - 1][1] = 'TCP';
				break;

			case '14':
				// I Industries
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 14;
				TM_stockAbbrArray[i - 1][1] = 'IIL';
				break;
			case '15':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 15;
				TM_stockAbbrArray[i - 1][1] = 'FHC';
				break;

			case '16':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 16;
				TM_stockAbbrArray[i - 1][1] = 'SYM';
				break;

			case '17':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 17;
				TM_stockAbbrArray[i - 1][1] = 'LSC';
				break;
			case '18':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 18;
				TM_stockAbbrArray[i - 1][1] = 'PRN';
				break;

			case '19':
				// Eaglewood
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 19;
				TM_stockAbbrArray[i - 1][1] = 'TWM';
				break;
			case '20':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 20;
				TM_stockAbbrArray[i - 1][1] = 'TCM';
				break;

			case '21':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 21;
				TM_stockAbbrArray[i - 1][1] = 'ELBT';
				break;

			case '22':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 22;
				TM_stockAbbrArray[i - 1][1] = 'HRG';
				break;

			case '23':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 23;
				TM_stockAbbrArray[i - 1][1] = 'TGP';
				break;

			case '24':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 24;
				TM_stockAbbrArray[i - 1][1] = '';
				break;

			case '25':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 25;
				TM_stockAbbrArray[i - 1][1] = 'WSSB';
				break;

			case '26':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 26;
				TM_stockAbbrArray[i - 1][1] = 'ISTC';
				break;

			case '27':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 27;
				TM_stockAbbrArray[i - 1][1] = 'BAG';
				break;

			case '28':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 28;
				TM_stockAbbrArray[i - 1][1] = 'EVL';
				break;

			case '29':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 29;
				TM_stockAbbrArray[i - 1][1] = 'MCS';
				break;

			case '30':
				// World Line Travels
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 30;
				TM_stockAbbrArray[i - 1][1] = 'WLT';
				break;
			case '31':
				TM_stockAbbrArray[i - 1] = new Array();
				TM_stockAbbrArray[i - 1][0] = 31;
				TM_stockAbbrArray[i - 1][1] = 'TCC';
				break;
		}
	});

	// Debug
/*	for(j in TM_stockAbbrArray){
		for(k in TM_stockAbbrArray[j]){
			GM_log('TM_stockAbbrArray['+j+']['+k+'] : '+TM_stockAbbrArray[j][k]);
		}
	}
*/

	// This grabs 'current price', 'bought price' and 'Worth' from the page.
	// Stores the information in three arrays
	$("td center:contains('$')").each(function(i){
		// This picks up every table cell where the
		// text contains a $
		TM_sharesTemp[i] = '';
		TM_temp = $(this).text();
		TM_temp = TM_temp.match(/\d+/g);
		for(j in TM_temp){
				TM_sharesTemp[i] += String(TM_temp[j]);
				if(((j == (TM_temp.length - 2)) && ((i % 4) != 3))){
					TM_sharesTemp[i] += '.';
				}
		}
	//	GM_log("TM_sharesTemp["+i+"] : "+TM_sharesTemp[i]);
		// 1 == [0/3/6 ...] = current price
		// 2 == [1/4/7 ...] = bought price
		// 3 == [2/5/8 ...] = total current price
		// n starts at 0 (zero)
	//	GM_log('n : '+n+', i : '+i);
		if(i % 4 == 1){
			TM_sharesBoughtPrice[n] = TM_sharesTemp[i] * 1;

	//		GM_log('TM_sharesBoughtPrice['+n+'] : '+TM_sharesBoughtPrice[n]);
		}
		else if(i % 4 == 3){
			TM_sharesTotalPrice[n] = TM_sharesTemp[i] * 1;
	//		GM_log('TM_sharesTotalPrice['+n+'] : '+TM_sharesTotalPrice[n]);
			n++;
		}
		else if (i % 4 == 0){
			TM_sharesCurrentPrice[n] = TM_sharesTemp[i] * 1;
	//		GM_log('TM_sharesCurrentPrice['+n+'] : '+TM_sharesCurrentPrice[n]);
		}
		else {
			// n = 0;
		}

	});

	// This critical piece brings all information of the page into
	// one array: TM_stockAbbrArray
	// TM_stockAbbrArray[i][0] = Stock number
	// TM_stockAbbrArray[i][1] = Stock abbiviation
	// TM_stockAbbrArray[i][2] = Current price of that stock
	// TM_stockAbbrArray[i][3] = Price that stock is bought for
	// TM_stockAbbrArray[i][4] = Total value of that batch of stock
	// TM_stockAbbrArray[i][5] = Number of shares in that stock
	for(j in TM_stockAbbrArray){
		TM_stockAbbrArray[j][2] = TM_sharesCurrentPrice[j];
		TM_stockAbbrArray[j][3] = TM_sharesBoughtPrice[j];
		TM_stockAbbrArray[j][4] = TM_sharesTotalPrice[j];
		TM_stockAbbrArray[j][5] = TM_shares[j];
		for(k in TM_stockAbbrArray[j]){
		//	GM_log('TM_stockAbbrArray['+j+']['+k+'] : '+TM_stockAbbrArray[j][k]);
		}
	}
	
	// TM_stockCompressed is a two-dimensional array holding
	// stock info per type of stock instead of per line in the
	// table on the page.
	var TM_controlArray = new Array();
	var xTemp = 0;
	k = 0;
	for(i in TM_stockAbbrArray){
		for(j in TM_controlArray){
			if(TM_stockAbbrArray[i][0] == TM_controlArray[j]){
				// Stock already exists at TM_controlArray[j]
				// so 'merge' both stock
				TM_stockCompressed[j][3] = (((TM_stockCompressed[j][3] * TM_stockCompressed[j][5]) + 
					(TM_stockAbbrArray[i][3] * TM_stockAbbrArray[i][5])) /
					(TM_stockAbbrArray[i][5] * 1 + TM_stockCompressed[j][5] * 1)).toFixed(3);
				TM_stockCompressed[j][5] = TM_stockCompressed[j][5] * 1 + TM_stockAbbrArray[i][5] * 1;
				TM_stockCompressed[j][4] = Math.round(TM_stockCompressed[j][2] * TM_stockCompressed[j][5]);
				var xTemp = 1;
			//	GM_log("* TM_stockCompressed["+j+"][0] : "+TM_stockCompressed[j][0]);
			//	GM_log("* TM_stockCompressed["+j+"][1] : "+TM_stockCompressed[j][1]);
			//	GM_log("* TM_stockCompressed["+j+"][2] : "+TM_stockCompressed[j][2]);
			//	GM_log("* TM_stockCompressed["+j+"][3] : "+TM_stockCompressed[j][3]);
			//	GM_log("* TM_stockCompressed["+j+"][4] : "+TM_stockCompressed[j][4]);
			//	GM_log("* TM_stockCompressed["+j+"][5] : "+TM_stockCompressed[j][5]);
			}
		}
		if(xTemp == 0){
			TM_stockCompressed[k] = new Array();
			TM_stockCompressed[k][0] = TM_stockAbbrArray[i][0];
			TM_stockCompressed[k][1] = TM_stockAbbrArray[i][1];
			TM_stockCompressed[k][2] = TM_stockAbbrArray[i][2];
			TM_stockCompressed[k][3] = TM_stockAbbrArray[i][3];
			TM_stockCompressed[k][4] = TM_stockAbbrArray[i][4];
			TM_stockCompressed[k][5] = TM_stockAbbrArray[i][5] * 1;

			TM_controlArray[k] = TM_stockCompressed[k][0];

		//	GM_log("TM_stockCompressed["+k+"][0] : "+TM_stockCompressed[k][0]);
		//	GM_log("TM_stockCompressed["+k+"][1] : "+TM_stockCompressed[k][1]);
		//	GM_log("TM_stockCompressed["+k+"][2] : "+TM_stockCompressed[k][2]);
		//	GM_log("TM_stockCompressed["+k+"][3] : "+TM_stockCompressed[k][3]);
		//	GM_log("TM_stockCompressed["+k+"][4] : "+TM_stockCompressed[k][4]);
		//	GM_log("TM_stockCompressed["+k+"][5] : "+TM_stockCompressed[k][5]);

			k++;
		}
		else{
			xTemp = 0;
		}
	}

	// Add percentages
	for(i in TM_stockCompressed){
		// Difference between bought and current price
		TM_stockCompressed[i][6] = (TM_stockCompressed[i][2] - TM_stockCompressed[i][3]).toFixed(3);
		// Difference in percentage
		TM_stockCompressed[i][7] = (((TM_stockCompressed[i][2] - TM_stockCompressed[i][3]) / TM_stockCompressed[i][3]) * 100).toFixed(3);
		// Current total stock value
		TM_stockCompressed[i][8] = Math.round((TM_stockCompressed[i][4] - TM_stockCompressed[i][3]) * TM_stockCompressed[i][5]);
		// Total gain / loss
		TM_stockCompressed[i][9] = CommaFormatted(CurrencyFormatted((TM_stockCompressed[i][2] - TM_stockCompressed[i][3]) *
			TM_stockCompressed[i][5]));
	}
		
	// Calculate total bought price
	for(i in TM_stockAbbrArray){
		TM_totalBoughtPrice += Math.round(TM_stockAbbrArray[i][5] * TM_stockAbbrArray[i][3]);
	//	GM_log('TM_totalBoughtPrice : '+TM_totalBoughtPrice);
	}

	// Convert the String into an Integer
	// TODO: check if this still is critical
	for(TM_amount in TM_invest){
		TM_sum += TM_invest[TM_amount] * 1;
	}

	// The main part
	if(TM_sum > 0){ // TM_sum > 0 finds the correct page

	//	for(i in TM_settingsStock){
	//		GM_log("TM_settingsStock["+i+"] : "+TM_settingsStock[i]);
	//	}

		if(TM_settingsStock[3] == 0){
			// Generate a random number to delete a random point
			var TM_random = Math.floor(TM_settingsStock[0] * Math.random()) + 1
		}
		if(TM_settingsStock[3] == 2){
			// Also experimental
			// This tries to find the least significant point and removes it
			// from the data set. 
			var TM_leastSignificant = prune(TM_investArray)*1;
		//	GM_log("TM_leastSignificant : "+TM_leastSignificant);
		}

		while(TM_dateArrayFormatted.length >= TM_settingsStock[0]){
			if(TM_settingsStock[3] == 1){
				// According to setting: remove the oldest point
				TM_dateArrayFormatted.pop();
			}
			else if(TM_settingsStock[3] == 0){
				// Remove a random point, not the first and not the latest
				var TM_spliced2 = TM_dateArrayFormatted.splice(TM_random, 1);
			}
			else if(TM_settingsStock[3] == 2){
				// (default) removes least significant point
				var TM_spliced2 = TM_dateArrayFormatted.splice(TM_leastSignificant, 1);
			}
		}
		while(TM_investArray.length >= TM_settingsStock[0]){
			if(TM_settingsStock[3] == 1){
				// According to setting: remove the oldest point
				TM_investArray.pop();
			}
			else if(TM_settingsStock[3] == 0){
				var TM_spliced3 = TM_investArray.splice(TM_random, 1);
			}
			else if(TM_settingsStock[3] == 2){
				var TM_spliced3 = TM_investArray.splice(TM_leastSignificant, 1);
			}
		}
		while(TM_investArrayFormatted.length >= TM_settingsStock[0]){
			if(TM_settingsStock[3] == 1){
				// According to setting: remove the oldest point
				TM_investArrayFormatted.pop();
			}
			else if(TM_settingsStock[3] == 0){
				var TM_spliced4 = TM_investArrayFormatted.splice(TM_random, 1);
			}
			else if(TM_settingsStock[3] == 2){
				var TM_spliced4 = TM_investArrayFormatted.splice(TM_leastSignificant, 1);
			}
		}
		while(TM_totalBoughtPriceArray.length >= TM_settingsStock[0]){
			if(TM_settingsStock[3] == 1){
				// According to setting: remove the oldest point
				TM_totalBoughtPriceArray.pop();
			}
			else if(TM_settingsStock[3] == 0){
				var TM_spliced5 = TM_totalBoughtPriceArray.splice(TM_random, 1);
			}
			else if(TM_settingsStock[3] == 2){
				var TM_spliced5 = TM_totalBoughtPriceArray.splice(TM_leastSignificant, 1);
			}
		//	GM_log("Popped TM_totalBoughtPriceArray : "+TM_spliced5);
		}
		while(TM_dateArray.length >= TM_settingsStock[0]){
			if(TM_settingsStock[3] == 1){
				// If the number of items gets to large
				// remove the oldest
				TM_dateArray.pop();
			}
			else if(TM_settingsStock[3] == 0){
				var TM_spliced1 = TM_dateArray.splice(TM_random, 1);
				// Generate a new random number in case more points are removed
				// TODO: This is buggy!
				// I think needs wrapping in a global while loop
				// TM_random = Math.floor(TM_settingsStock[0] * Math.random()) + 1
			}
			else if(TM_settingsStock[3] == 2){
				var TM_spliced1 = TM_dateArray.splice(TM_leastSignificant, 1);
			}
		}

		// Unshift adds items to the begin of the array
		TM_dateArray.unshift(TM_settingsStock[2]);
		TM_dateArrayFormatted.unshift(TM_settingsStock[1]);
		TM_investArray.unshift(TM_sum);
		// Use the two function in the start of this file
		// to generate nicely formatted amounts
		// TODO: Do this in real time. No need to save
		TM_sumFormatted = CurrencyFormatted(TM_sum);
		TM_sumFormatted = CommaFormatted(TM_sumFormatted);
		TM_investArrayFormatted.unshift(TM_sumFormatted);
		TM_totalBoughtPriceArray.unshift(TM_totalBoughtPrice);

	//	GM_log('TM_investArray.length : '+TM_investArray.length);
		
	//	var TM_width2 = Math.round($("hr:eq(0)").css("width"));
	//	GM_log("TM_width2 : "+TM_width2);

	//	var TM_widthLeft = Math.round(TM_width * 2 / 3) - 1;
	//	var TM_widthRight = Math.round(TM_width / 3) - 21;
		// Generate the HTML for output
		TM_addTable = '<div id="placeholder" style="float:left;width:'+TM_width+'px;height:300px"></div>';
//		TM_addTable += '</div>';
//		TM_addTable += '<div id="miniature" style="width:'+TM_widthRight+'px;float:left;margin-left:20px;margin-top:50px">';
//		TM_addTable += '<div id="overview" style="height:100px"></div>';
//		TM_addTable += '<p id="overviewLegend" style="margin-left:10px"></p>';
//		TM_addTable += '</div></div>';
		TM_addTable += '</div><p class="message" style="float:left"></p><table id="TM_latest"><tdata>';

		// counter k equals setting for displaying number of recent changes to be displayed
		// in the table under the graph
		var TM_numberOfChanges = TM_settingsStock[4];
		if(TM_numberOfChanges == -1){
			// -1 shows every available point
			TM_numberOfChanges = TM_dateArray.length;
		}
		for(k= 0; k < TM_numberOfChanges; k++){
			var l = k * 1 + 1;
		//	GM_log('TM_investArray['+k+'] : '+TM_investArray[k]);
			if(!TM_investArray[l] || TM_investArray[k] == TM_investArray[l]){
				color = TM_color.blue;
			}
			else if(TM_investArray[k] > TM_investArray[l]){
				color = TM_color.green;
			}
			else {
				color = TM_color.red;
			}
			if(TM_dateArray[k]){
				TM_addTable += "\n<tr><td>"+TM_dateArrayFormatted[k]+'</td><td bgcolor="'+color+'">$ '+TM_investArrayFormatted[k]+'</td></tr>';
			}
		}
//		GM_log("TM_dateArray: "+TM_dateArray);
		TM_addTable += "\n<tr><td></td></tr>\n<tr><td>There are "+TM_dateArray.length+" datapoints.</td></tr>\n";
		TM_addTable += "</tdata></table>"+"\n<div id=\"TM_stockExchange\"></div>\n";


		// If there is something to store ...
		if(!TM_investArray[1] || TM_investArray[0] != TM_investArray[1]){
			// Convert the Array to a String
			TM_dateString = TM_dateArray.join(',');
			// TODO: store milliseconds and do date formatting in real time
			TM_dateStringFormatted = TM_dateArrayFormatted.join(',');
			TM_investString = TM_investArray.join('|');
			TM_investStringFormatted = TM_investArrayFormatted.join('|');
			TM_totalBoughtPrice= TM_totalBoughtPriceArray.join(',');
		//	GM_log('TM_investString : '+TM_investString);
			// Store using GM_setValue
			GM_setValue('TM_stockDate', TM_dateString);
			GM_setValue('TM_stockDateFormatted', TM_dateStringFormatted);
			GM_setValue('TM_stockInvest', TM_investString);
			GM_setValue('TM_stockInvestFormatted', TM_investStringFormatted);
			GM_setValue('TM_stockBoughtPrice', TM_totalBoughtPrice);
		}

		// Prepare the toggle link
		$("hr + a").after("&nbsp;&lt;&nbsp;&gt;&nbsp;<span class=\"TM_toggle\">Toggle MagicStack</span>&nbsp;&lt;");
	//	GM_log("TM_back : "+TM_back);

		// Output the HTML
		// This is the alternative table of MagicStack
		var TM_newTable = "\n<table width=\"75%\" class=\"TM_table\"><tbody>\n\t<tr bgcolor=\"#999999\">";
		TM_newTable += "\n\t\t<td width=\"15%\"><b><center>Stock Logo</center></b></td>\n";
		TM_newTable += "\t\t<td width=\"20%\"><b><center>Current Price</center></b></td>\n\t\t<td width=20%><b><center>Bought Price</center></b></td>\n";
		TM_newTable += "\t\t<td width=\"20%\"><b><center>Price Change</center></b></td>\n\t\t<td width=\"20%\"><b><center>% Change</center></b></td>\n";
		TM_newTable += "\t\t<td width=\"15%\"><b><center>Nice Graph</center></b></td>\n\t</tr>\n";
		TM_newTable += "\t<tr bgcolor=\"#CCCCCC\">\n\t\t<td colspan=\"8\"><br></td>\n\t</tr>\n";

		for(i in TM_stockCompressed){
			if(TM_stockCompressed[i][6] < 0){
				var TM_sign = "d";
				var TM_signAlt =  "Downs";
				var TM_signColour = "#D80000";
			}
			else if(TM_stockCompressed[i][6] > 0){
				var TM_sign = "u";
				var TM_signAlt = "Up";
				var TM_signColour = "green";
			}
			else{
				var TM_sign = "s";
				var TM_signAlt = "No Change";
				var TM_signColour = "black";
			}
			TM_newTable += "\n\t<tr bgcolor=\"#dfdfdf\">\n\t\t<td colspan=\"8\"> </td>\n\t</tr>";
			TM_newTable += "\n\t<tr>\n\t\t<td bgcolor=\"#CCCCCC\" rowspan=\"3\" valign=\"center\">";
			TM_newTable += "<a href=\"stockexchange.php?step=profile&stock="+TM_stockCompressed[i][0]+"&back=port\">";
			TM_newTable += "<img src=\"images/stockmarket/"+TM_stockCompressed[i][0]+".jpg\" border=\"0\" alt=\""+TM_stockCompressed[i][1]+"\">";
			TM_newTable += "</a></td>\n\t\t<td bgcolor=\"#DFDFDF\"><center>$ "+TM_stockCompressed[i][2]+"</center></td>\n";
			TM_newTable += "\t\t<td bgcolor=\"#DFDFDF\"><center>$ "+TM_stockCompressed[i][3]+"</center></td>\n";
			TM_newTable += "\t\t<td bgcolor=\"#DFDFDF\"><center><font color=\""+TM_signColour+"\">"+TM_stockCompressed[i][6]+"</font>";
			TM_newTable += " <img src=\"gdup.php?s="+TM_sign+"\" border=\"0\" alt=\""+TM_signAlt+"\"></center></td>\n";
			TM_newTable += "\t\t<td bgcolor=\"#DFDFDF\"><center><font color=\""+TM_signColour+"\">"+TM_stockCompressed[i][7]+" %</font>";
			TM_newTable += " <img src=\"gdup.php?s="+TM_sign+"\" border=\"0\" alt=\""+TM_signAlt+"\"></center></td>\n";
			TM_newTable += "\t\t<td bgcolor=\"#CCCCCC\" rowspan=\"3\" class=\"simpletip\" id=\""+TM_stockCompressed[i][1]+"\">";
			TM_newTable += "<img src=\"http://static.torn.com/stock-"+TM_stockCompressed[i][0]+".png\"";
			TM_newTable += " alt=\""+TM_stockCompressed[i][1]+"\" /></td>\n\t</tr>\n";

			TM_newTable += "\t<tr>\n\t\t<td colspan=\"2\" bgcolor=\"#DFDFDF\"><center><b>Worth:</b> $ ";
			TM_newTable += CommaFormatted(CurrencyFormatted(TM_stockCompressed[i][4]))+"</center></td>\n";
			TM_newTable += "\t\t<td colspan=\"2\" bgcolor=\"#DFDFDF\"><center><b>Shares: </b>"+TM_stockCompressed[i][5]+"</center></td>\n\t</tr>\n";

			TM_newTable += "\t<tr>\n\t\t<td colspan=\"2\" bgcolor=\"#DFDFDF\"><center><b>Difference:</b> $ ";
			TM_newTable += TM_stockCompressed[i][9]+"</font></center></td>\n";
			TM_newTable += "\t\t<td id=\"TM_pennies"+i+"\" bgcolor=\"#DFDFDF\"></td>";
			TM_newTable += "<td id=\"TM_perc"+i+"\" bgcolor=\"#DFDFDF\"></td>\n\t</tr>\n";

			TM_newTable += "\t<tr bgcolor=\"#dfdfdf\">\n\t\t<td colspan=\"8\"> </td>\n\t</tr>\n\t<tr bgcolor=\"#cccccc\">\n\t\t"
			TM_newTable += "<td colspan=\"8\"><br></td>\n\t</tr>\n";
		}
		TM_newTable += "</tbody></table>\n\n";

		// Now the table is shown
		$("table:eq(5)").addClass("TM_table").css("display", "none");
		$("table:eq(5)").before(TM_newTable);
		$(".TM_toggle").click(function(){
			$(".TM_table").toggle();
		});

		// This is the table at the bottom
		$("hr:eq(3)").append(TM_addTable);

		// Generate the two dimensional array for the flot graph
		// The second dimension holds time in milliseconds [0]
		// and the amount as integer [1]
		// e.g. [[1261746985513,36758826][1261746151051,36754579]]
		for(m in TM_dateArray){
			TM_flotDate[m] = new Array();
			TM_flotDate[m][0] = TM_dateArray[m];
			TM_flotDate[m][1] = TM_investArray[m];
		//	GM_log('TM_flotDate : '+TM_flotDate);
		}
		// TM_totalBoughtPrice is the sum of stocks times the price they are bought for
		for(i in TM_totalBoughtPriceArray){
			TM_flotBought[i] = new Array();
			TM_flotBought[i][0] = TM_dateArray[i];
			TM_flotBought[i][1] = TM_totalBoughtPriceArray[i];
		}

//		var placeholder = $("#placeholder");

		function getData(x1, x2){
			// Return a slice from the array where x1 is the startingpoint
			// and x2 is the endpoint.both are time values (I hope) / milliseconds
			// Time values are stored in TM_flotDate[i][0], TM_flotBought[i][0]
			// and TM_flotRemoved[i][0]
	//		GM_log("x1 : "+x1+"; x2 : "+x2);
			for(i in TM_flotDate){
				if(x1 > TM_flotDate[i][0] && x1 <= TM_flotDate[i+1][0]){
					var start = i;
				}
				if(x2 > TM_flotDate[i][0] && x2 <= TM_flotDate[i+1][0]){
					var end = i;
				}
			}
			var arr1 = TM_flotDate.slice(start, end);
			var arr2 = TM_flotBought.slice(start, end);
			var arr3 = TM_removed.slice(start, end);

			return [ { data: arr1 } ];
		}
			

		if(TM_settingsStock[3] == 0 || TM_settingsStock[3] == 2){
			var TM_removed = new Array();
			TM_removed[0] = new Array();
			TM_removed[0][0] = TM_spliced1;
			TM_removed[0][1] = TM_spliced3;
			TM_removed[1] = new Array();
			TM_removed[1][0] = TM_spliced1;
			TM_removed[1][1] = TM_spliced5;
		}

		var TM_options = { 
			xaxis: { mode: "time" }, 
//			xaxis: { },
			yaxis: { },
//			selection: { mode: "x" }
		};

		var data = [
			{ data: TM_flotBought, lines: { show: true }, points: { show: true } },
			{ data: TM_flotDate, lines: { show: true }, points: { show: true } }, 
			{ data: TM_removed, points: { show: true } }
		];

		var plot = $.plot("#placeholder", data, TM_options);
/*
		// setup overview
		var overview = $.plot($("#overview"), [TM_flotDate, TM_flotBought], {
//		legend: { show: true, container: $("#overviewLegend") },
		series: {
			lines: { show: true, lineWidth: 1 },
			shadowSize: 0
		},
		xaxis: { },
		yaxis: { },
		grid: { color: "#999" },
		selection: { mode: "xy" }
		});
*/
/*
    placeholder.bind("plotselected", function (event, ranges) {
            plot = $.plot("#placeholder", data,
                          $.extend(true, {}, options, {
                              xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to }
                          }));
    });
*/
    // now connect the two
/*    
    $("#placeholder").bind("plotselected", function (event, ranges) {
	GM_log("ranges : "+ranges);
        // clamp the zooming to prevent eternal zoom
        if (ranges.xaxis.to - ranges.xaxis.from < 0.00001)
            ranges.xaxis.to = ranges.xaxis.from + 0.00001;
        if (ranges.yaxis.to - ranges.yaxis.from < 0.00001)
            ranges.yaxis.to = ranges.yaxis.from + 0.00001;
        
        // do the zooming
        plot = $.plot($("#placeholder"), getData(ranges.xaxis.from, ranges.xaxis.to),
                      $.extend(true, {}, options, {
                          xaxis: { min: ranges.xaxis.from, max: ranges.xaxis.to },
                          yaxis: { min: ranges.yaxis.from, max: ranges.yaxis.to }
                      }));
        
        // don't fire event on the overview to prevent eternal loop
        overview.setSelection(ranges, true);
    });
    $("#overview").bind("plotselected", function (event, ranges) {
        plot.setSelection(ranges);
    });
*/
/*
		// show pan/zoom messages to illustrate events 
		placeholder.bind('plotpan', function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
				+ " &ndash; " + axes.xaxis.max.toFixed(2)
				+ " and y: " + axes.yaxis.min.toFixed(2)
				+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		// show pan/zoom messages to illustrate events 
		placeholder.bind('plotpan', function (event, plot) {
			var axes = plot.getAxes();
			$(".message").html("Panning to x: "  + axes.xaxis.min.toFixed(2)
				+ " &ndash; " + axes.xaxis.max.toFixed(2)
				+ " and y: " + axes.yaxis.min.toFixed(2)
				+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		placeholder.bind('plotzoom', function (event, plot) {
		var axes = plot.getAxes();
		$(".message").html("Zooming to x: "  + axes.xaxis.min.toFixed(2)
			+ " &ndash; " + axes.xaxis.max.toFixed(2)
			+ " and y: " + axes.yaxis.min.toFixed(2)
			+ " &ndash; " + axes.yaxis.max.toFixed(2));
		});

		// add zoom in button 
		$('<div class="button" style="right:52px;top:20px">&nbsp;+&nbsp;</div>').appendTo(placeholder).click(function (e) {
			e.preventDefault();
			plot.zoom();
		});


		// add zoom out button 
		$('<div class="button" style="right:28px;top:20px">&nbsp;-&nbsp;</div>').appendTo(placeholder).click(function (e) {
			e.preventDefault();
			plot.zoomOut();
		});

		// and add panning buttons
    
		// little helper for taking the repetitive work out of placing
		// panning arrows
		function addArrow(dir, right, top, offset) {
			$('<img class="button" src="http://people.iola.dk/olau/flot/examples/arrow-' 
				+ dir + '.gif" style="right:' + right + 'px;top:' + top + 'px">')
				.appendTo(placeholder).click(function (e) {
			e.preventDefault();
			plot.pan(offset);
			});
		}

		addArrow('left', 55, 60, { left: -100 });
		addArrow('right', 25, 60, { left: 100 });
		addArrow('up', 40, 45, { top: -100 });
		addArrow('down', 40, 75, { top: 100 });
	
		// Apply style after the graph is rendered
		$("#placeholder .button").css({"position": "absolute", "cursor": "pointer"});
		$("#placeholder div.button").css({"font-size": "smaller", "color": "#999", "background-color": "#eee", "padding": "2px", "width": "16px"});
*/
//		$(".message").css({"padding-left": "2px", "font-size": "smaller"});

	}

	// Ajax
	// This snippet adds the latest changes (both real currency and percenage) to the MagicStack table
	try{
		var TM_stockNow = [];
		var TM_pennies = [];
		var TM_perc = [];
		var TM_tableRow;
		// image src contains the unique number of the stock used to find the table row
		// for that stock, e.g. <img src="images/stockmarket/21.jpg" [...] />
		var TM_imgSrc = '';
		// Data from the page /stockexchange.php
		var TM_stockExchangeData; // Object
		// get the html from the page
		var ajax = $.get("http://www.torn.com/stockexchange.php", function(data){
			// Refine the html, keep only the table with stock data
			TM_stockExchangeData = $(data).find("table tr td:contains('Stock Price')");
			TM_stockExchangeData = $(TM_stockExchangeData).find("table tr td:contains('Stock Price')");
			TM_stockExchangeData = $(TM_stockExchangeData).find("table:eq(1)");
			// Loop through the table find rows of stock we currently own
			for(i in TM_stockCompressed){
				// TM_stockCompressed contains information on the stock we own.
				// [i][0] holds the unique number of the stock (currently 0 through 31)
				TM_imgSrc = "images/stockmarket/"+TM_stockCompressed[i][0]+".jpg";
				// Here the filter returns the table rows (Object)
				TM_tableRow = $(TM_stockExchangeData).find("tr td a").filter(function(){
			//			GM_log("$(this).find(\"img\").attr(\"src\")"+$(this).find("img").attr("src"));
						return $(this).find("img").attr("src") == TM_imgSrc;
					}).parent().parent();
				// The third <td> contains actual change of price in $TC
				TM_pennies[i] = $(TM_tableRow).find("td:eq(2)").children();
				// Put the html into the MagicStack table
				$("#TM_pennies"+i).html(TM_pennies[i]);
			//	GM_log("TM_pennies["+i+"] : "+TM_pennies[i]);
				// The fourth <td> contains the percentge change
				TM_perc[i]= $(TM_tableRow).find("td:eq(3)").children();
				// Put the html into the MagicStack table
				$("#TM_perc"+i).html(TM_perc[i]);
			//	GM_log("TM_perc["+i+"] : "+TM_perc[i]);
			}
		}
	)}
	catch(err){
		GM_log("Error : "+err);
	} 

	var stockData = [];

	// Helper function (method) for simpletip (see below)
	// This method fills the two dimensional array stockDatai[stockNumber]
	function getStockData(stockNumber){
		var ajax = $.ajax({
			// Crucial to do a syncrone call here. This way the function halts to wait
			// for the response. If you do this asynchrone the tooltip will show
			// regardless if the data is retreived or not (an empty bubble will show)
			async: false,
			url: "http://www.torn.com/stockexchange.php?step=profile&stock="+stockNumber,
			// TODO: see if i can refine this context
			context: document.body,
			success: function(data){
				// table:eq(7) contains
				// Acronym: SLAG
				// Director: Mrs. Anneka Yates
				// Forecast: Very Good
				// Demand: Very Low
				var table = $(data).find("table:eq(7)");
				stockData[0] = $(table).find("tr:eq(0) td:eq(1)").text();
			//	GM_log("stockData[0] : "+stockData[0]);
				stockData[1] = $(table).find("tr:eq(2) td:eq(1)").text();
				stockData[2] = $(table).find("tr:eq(4) td:eq(1)").text();
				stockData[3] = $(table).find("tr:eq(6) td:eq(1)").text();

			//	alert("Now in getStockData\n[i] = stockNumber = "+stockNumber);
				table = $(data).find("table:eq(8)");
				stockData[4] = $(table).find("tr:eq(0) td:eq(1)").text();
				stockData[5] = $(table).find("tr:eq(2) td:eq(1)").text();
				stockData[6] = $(table).find("tr:eq(4) td:eq(1)").text();
				stockData[7] = $(table).find("tr:eq(6) td:eq(1)").text();
			//	GM_log("stockData : "+stockData);
				// Populate the array with the newly collected data
				stockDatai[stockNumber] = stockData.slice(0);
			}
		});
	}
	
	// This snippet adds a tooltip when the stock graph is hovered
	// Simpletip (c) Craig Tompson http://craigsworks.com/projects/simpletip/
	// TODO: Simpletip is succeeded by qTip http://craigsworks.com/projects/qtip/
	// Could also use tooltip from jQuery plugins http://docs.jquery.com/Plugins/Tooltip
	var stockDatai = new Array();

	$(".simpletip").each(function(){
		// Tooltip jQuery simpletip
		$(this).simpletip({
			// TODO: Basically I want a "Loading..." message or image
			// but neither place I try to put that up works
			content: "Loading...",
			onBeforeShow: function(){
				// Doesn't show
				this.update("Still loading ...");
			},
			onShow: function(){
				// Doesn't show
				this.update("Still loading ...");

				// Retrieve the html of the image being hovered
				var temp = this.getParent().html();
				// Retreive the stockNumber from the image url
				temp = temp.match(/(\d+)\.png/);
				// Convert to string
				temp = temp[1];
			//	GM_log("Inside onShow: temp: "+temp);
				if(!stockDatai[temp]){
					// The actual consuming ajax call is made only once per stock
					// and only when hovered. It's stored in a two dimensional array
					// called stockDatai[stockNumber][]
					getStockData(temp);
				}
			//	GM_log("stockDatai: "+stockDatai);

				// Display data in tooltip
			//	GM_log("onShow - stockDatai["+temp+"][0]: "+stockDatai[temp][0]);
				this.update("Acronym: "+stockDatai[temp][0]+" - "+temp+"<br />Director: "+stockDatai[temp][1]
					+"<br />Forecast: "+stockDatai[temp][2]+"<br />Demand: "+stockDatai[temp][3]
					+"<br />Current price: "+stockDatai[temp][4]+"<br />Market cap: "+stockDatai[temp][5]
					+"<br />Total shares: "+stockDatai[temp][6]+"<br />Shares for sale: "+stockDatai[temp][7]);
			}
		});
	})

//	GM_log("TM_settingsStock: "+TM_settingsStock);
	// http://www.hemminga.net/TornMagicStock: TM_settingsStock: 500,Sat Jan 23 2010 10:52:10 GMT+0100 (CET),1264240330927,2,20
});

// @name           Script Update Checker
// @namespace      http://www.crappytools.net
// @description    Code to add to any Greasemonkey script to let it check for updates.
// @include        *
// NOTES:
// Feel free to copy this into any script you write; that's what it's here for. A credit and/or URL back to here would be appreciated, though.
// I was careful to use as few variables as I could so it would be easy to paste right into an existing script. All the ones you need to set are at the very top.
// The target script needs to be uploaded to userscripts.org. The update checks will -not- increase the install count for the script there.
// This script is set up to check for updates to itself by default. It may be a good idea to leave it like this.
var SUC_script_num = 64957; // Change this to the number given to the script by userscripts.org (check the address bar)
try
{
	function updateCheck(forced)
	{
		if ((forced) || (parseInt(GM_getValue('SUC_last_update', '0')) + 86400000 <= (new Date().getTime()))) // Checks once a day (24 h * 60 m * 60 s * 1000 ms)
		{
			try
			{
				GM_xmlhttpRequest(
				{
					method: 'GET',
					url: 'http://userscripts.org/scripts/source/'+SUC_script_num+'.meta.js?'+new Date().getTime(),
				headers: {'Cache-Control': 'no-cache'},
					onload: function(resp)
					{
						var local_version, remote_version, rt, script_name;
						
						rt=resp.responseText;
						GM_setValue('SUC_last_update', new Date().getTime()+'');
						remote_version=parseInt(/@uso:version\s*(.*?)\s*$/m.exec(rt)[1]);
						local_version=parseInt(GM_getValue('SUC_current_version', '-1'));
						if(local_version!=-1)
						{
							script_name = (/@name\s*(.*?)\s*$/m.exec(rt))[1];
							GM_setValue('SUC_target_script_name', script_name);
							if (remote_version > local_version)
							{
								if(confirm('There is an update available for the Greasemonkey script "'+script_name+'."\nWould you like to go to the install page now?'))
								{
									GM_openInTab('http://userscripts.org/scripts/show/'+SUC_script_num);
									GM_setValue('SUC_current_version', remote_version);
								}
							}
							else if (forced)
								alert('No update is available for "'+script_name+'."');
						}
						else
							GM_setValue('SUC_current_version', remote_version+'');
					}
				});
			}
			catch (err)
			{
				if (forced)
					alert('An error occurred while checking for updates:\n'+err);
			}
		}
	}
	GM_registerMenuCommand(GM_getValue('SUC_target_script_name', '???') + ' - Manual Update Check', function()
	{
		updateCheck(true);
	});
	updateCheck(false);
}
catch(err)
{}
