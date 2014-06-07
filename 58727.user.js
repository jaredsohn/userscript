// ==UserScript==
// @name          Convert Bricklink Prices
// @namespace     http://userscripts.org/scripts/show/58727
// @description   Converts Bricklink prices to any other currency (version 1.0)
// @include       http://*.bricklink.com/storeDetail.asp*
// @include       http://*.bricklink.com/storeCart.asp*
// @include       http://bricklink.com/storeDetail.asp*
// @include       http://bricklink.com/storeCart.asp*
// @exclude       
// ==/UserScript==
//
//
//	Features
//
//	- Display prices in any curreny in any store and in shopping carts
//	- support for new currency system
//	- automatic detection of currency of stores
//	- automatic retrieval of real exchange rates
//	- (some) support for fixed exchange rates
//	- reset saved values for a store
//
//
//	How to use this script
//
//	Next to the regular prices in shops and in the shopping cart the prices will be shown in a currency of your choice.
//	The prices are calculated using the actual exchange rate between the shops' and the target currency or by the fixed
//	exchange rate the store uses.
//	When the script runs for the first time you will be asked for a target currency. The currency has to be entered using
//	the abbreviations from the ISO 4217 standard. You can find all available currencies here:
//	http://www.iso.org/iso/support/currency_codes_list-1.htm
//
//	Most of the script will work automatically. It detects the currency a store uses and gets exchange rates from Yahoo
//	(or other services (see below)) once a day.
//	Fixed rates have to be entered manually and can only be used in shops that use US Dollar.
//	This only works if the store uses a fixed rate between US Dollar and your currency! (You might estimate a rate in that
//	case, but since fixed rates are considered bad style, you should consider looking for another store.)
//	For this reason you will be asked what exchange rate a store uses, if the script has detected that it uses US Dollar.
//	Most stores use do not use fixed rates and you can just enter 'USD' (without the quotes). Otherwise enter the fixed rate
//	for US Dollar to your currency the store uses.
//
//	If the currency or the fixed rate of a store has changed, you have to click the new button at the bottom of an inventory
//	page in that store. This will delete the saved values and new ones will be set automatically or manually (for fixed rate).
//
//	All calculated prices are estimates and in no way official.
//
//	If you find any bugs or problems, don't hesitate to tell me about it.
//	Any ideas, questions and feedback are greatly appreciated!
//
//	Written by
//		Lars Neumann (nikolarsi <at> gmail.com)
//
//	Code to retrieve exchange rate from yahoo inspired by
//		Amazon Local Currency - Dynamic version
//		(http://userscripts.org/scripts/show/1476)
//	by
//		Carl Henrik Lunde
//		Ori Avtalion
//		Simon Pope
//
//	

// Global variable
var sid;

// Functions
// read store ID from URL
function getStoreid()
{
	var v_sid;
	v_sid = window.location.href;
	v_sid = v_sid.substring(v_sid.indexOf('?'));
	v_sid = v_sid.substring(v_sid.indexOf('h')+2);
	v_sid = v_sid.substring(0,v_sid.indexOf('&'));
	GM_log('store id: ' + v_sid);
	return v_sid;
}

// Find currency of store
function findCur(p_storeid,p_toCur)
{
	// Get saved currency
	var v_cur = GM_getValue(p_storeid);
	// If none was found detect it automaticaly
	if(!v_cur)
	{
		v_cur = document.evaluate(
			"//li[starts-with(text(), 'Store prices are in ')]",
			document,
			null,
			XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
			null);
		// Find the official abreviation (USD, CAD, EUR etc.)
		v_cur = v_cur.snapshotItem(0).innerHTML.substr(-7,3);
		// If its USD ask if there is a fixed exchange rate
		if(v_cur==='USD')
		{
			v_cur = prompt("What is the fixed exchange rate of this store? If it is not fixed enter USD. (1$=x.xx" + p_toCur + ")",'USD');
		}
		GM_setValue(p_storeid,v_cur);
	}
	return v_cur;
}

// Get exchange rate to calculate new prices
function getExchRate(p_toCur,p_CUR)
{
	// Find the exchange rate
	var todayDate = new Date();
	var todayString = todayDate.getDate() + "/" + todayDate.getMonth() + "/" + todayDate.getFullYear();
	GM_log(todayString);
	var v_exch;

	if(GM_getValue(p_CUR + 'date')===todayString)
	{
		v_exch = GM_getValue(p_CUR + 'exch');
		GM_log("Today's rate found: " + v_exch);
		displayALL(p_toCur,p_CUR,v_exch);
	}
	else
	{
		GM_log('Getting rate from Yahoo');
		GM_setValue(p_CUR + 'date',todayString);
		// Leave only the line of the service you want to use. Comment out the others.
		v_exch = fetchYA(p_toCur,p_CUR);// get from Yahoo
		//v_exch = fetchGO(p_toCur,p_CUR);// get from Google
		//v_exch = fetchXE(p_toCur,p_CUR);// get from XE.com
	}
}

// Get latest exchange rate from Yahoo
// Inspired by
// Amazon Local Currency - Dynamic version
// http://userscripts.org/scripts/show/1476
function fetchYA(p_toCur,p_CUR)
{
	var v_exch;
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://download.finance.yahoo.com/d/quotes.csv?s=" + p_CUR + p_toCur + "=X&f=l1&e=.csv",
		onload: function(responseDetails) {
			v_exch = responseDetails.responseText.replace(/[\r\n]/g, "");
			GM_log('rate ' + v_exch);
			GM_setValue(p_CUR + 'exch',v_exch);
			displayALL(p_toCur,p_CUR,v_exch);
		},
		onerror: function(responseDetails) {
			alert("Error fetching currency data for " + p_CUR + " to " + p_toCur + " from Yahoo");
			GM_log('Rate could not be retrieved from Yahoo');
			GM_setValue(p_CUR + 'date','0/0/2000');
		}
	});
}

// Get latest exchange rate from Google
function fetchGO(p_toCur,p_CUR)
{
	var v_exch;
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.google.com/ig/calculator?hl=en&q=1" + p_CUR + "%3D%3F" + p_toCur,
		onload: function(responseDetails) {
			v_exch = responseDetails.responseText.substr(responseDetails.responseText.indexOf("rhs:") + 6, 11);
			GM_log('rate ' + v_exch);
			GM_setValue(p_CUR + 'exch',v_exch);
			displayALL(p_toCur,p_CUR,v_exch);
		},
		onerror: function(responseDetails) {
			alert("Error fetching currency data for " + p_CUR + " to " + p_toCur + " from Yahoo");
			GM_log('Rate could not be retrieved from Yahoo');
			GM_setValue(p_CUR + 'date','0/0/2000');
		}
	});
}

// Get latest exchange rate from XE.com
// This might be in violation of their terms of service. (http://www.xe.com/legal/) Use at your own risk.
function fetchXE(p_toCur,p_CUR)
{
	var v_exch;
	GM_xmlhttpRequest({
		method: "GET",
		url: "http://www.xe.com/ucc/convert.cgi?Amount=1&From=" + p_CUR + "&To=" + p_toCur,
		onload: function(responseDetails) {
			v_exch = responseDetails.responseText.substr(responseDetails.responseText.indexOf(p_CUR + " =") + 6, 8);
			GM_log('rate ' + v_exch);
			GM_setValue(p_CUR + 'exch',v_exch);
			displayALL(p_toCur,p_CUR,v_exch);
		},
		onerror: function(responseDetails) {
			alert("Error fetching currency data for " + p_CUR + " to " + p_toCur + " from Yahoo");
			GM_log('Rate could not be retrieved from Yahoo');
			GM_setValue(p_CUR + 'date','0/0/2000');
		}
	});
}

// Display exchange rate after 'Buy (?)' and button to change exchange rate in the bottom of the page
function displayExch(p_toCur,p_CUR,p_exch)
{
	var v_buy = document.evaluate(
		"//td[@width='25%']",
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	
	var v_htmlstr = ' 1 ' + p_CUR + ' = ' + p_exch + ' ' + p_toCur + '</font></b>';
	v_buy.snapshotItem(0).innerHTML = v_buy.snapshotItem(0).innerHTML.substring(0,v_buy.snapshotItem(0).innerHTML.lastIndexOf('<')-7) + v_htmlstr;
	placeButton(v_buy.snapshotItem(2));
}

// Place a Button (p_location is innerHTML of target element
function placeButton(p_location)
{
	if(p_location!=null)
	{
		GM_log('placing button');
		// Create element to center button
		centering = document.createElement("center");
		centering.setAttribute('id','cenbut');
		// Append centering element to the chosen location
		p_location.appendChild(centering);
		// Create button and asign attributes
		button = document.createElement("input");
		button.setAttribute('id','delb');
		button.setAttribute('value','Change rate');
		button.setAttribute('name','delbutton');
		button.setAttribute('type','SUBMIT');
		// Append button to centering element
		centering.appendChild(button);
		// add event listener to check for clicks on button
		button.addEventListener('click',delExch,true);
	}
}

// Delete saved currency for store with current id sid
function delExch()
{
	if(GM_getValue(sid))
	{
		GM_deleteValue(sid);
		GM_log(sid + ' deleted');
	}
	else
	{
		GM_log('No entry found for id ' + sid + '.');
	}
}
function funcGen()
{
	return delExch();
}

// Find all prices in current page. Prices are bold and start with 'p_toCur'.
function findPrices(p_CUR)
{
	// Some currencies use '$' sign
	switch (p_CUR)
	{
		case 'USD':
			p_CUR = 'US $';
		break;
		case 'CAD':
			p_CUR = 'CA $';
		break;
		case 'AUD':
			p_CUR = 'AU $';
		break;
	}
	
	var v_allprices;
	v_allprices = document.evaluate(
		"//b[starts-with(text(), '" + p_CUR + "')]",// hier stimmt was nicht
		document,
		null,
		XPathResult.ORDERED_NODE_SNAPSHOT_TYPE,
		null);
	GM_log(v_allprices.snapshotLength + ' Prices found');
	return v_allprices;
}

// Create a new string to display including the old and the new price
function setNewPrice(p_toCur,p_CUR,p_exch,p_oldString)
{
	var v_newString = p_oldString.substring(4);
	v_newString = v_newString * p_exch;
	v_newString = p_oldString + ' (' + v_newString.toFixed(2) + ' ' + p_toCur + ')';
	return v_newString;
}

// Display all the new stuff
function displayALL(p_toCur,p_CUR,p_exch)
{
	GM_log('displayALL');
	displayExch(p_toCur,p_CUR,p_exch);
	var v_allPrices = findPrices(p_CUR);
	var v_thisPrice,i;
	for(i=0; i<v_allPrices.snapshotLength; i++)
	{
		v_thisPrice = v_allPrices.snapshotItem(i);
		v_thisPrice.innerHTML = setNewPrice(p_toCur,p_CUR,p_exch,v_thisPrice.innerHTML);
	}
}

// Main script
function main()
{
	// Check if target currency is set
	var toCur = GM_getValue('toCur');
	// It it's not, ask for it
	if(!toCur)
	{
		toCur = prompt("Enter the ISO abbreviation of the currency you want prices converted to. (GBP, JPY, PLN etc.)",'EUR');// Target currency may be set here.
		GM_setValue('toCur',toCur);
	}
	// Get id of store
	sid = getStoreid();
	// Detect the store currency.
	// If target and store's currency are the same, dont do anything.
	if(toCur===findCur(sid,toCur))
	{
		GM_log('Store uses your currency.');
		return;
	}
	var CUR = GM_getValue(sid);
	GM_log('Currency found: ' + CUR);
	var exch;
	if(isNaN(CUR*1))
	{
		GM_log('Getting rate.');
		exch = getExchRate(toCur,CUR);
	}
	// If CUR is a number, it is a fixed rate.
	else
	{
		GM_log('Fixed rate found. ' + CUR);
		exch = CUR;
		CUR = 'USD';
		displayALL(toCur,CUR,exch);
	}
}

// Run main script
main();