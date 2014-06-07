/* eBay - Display Totals with Shipping
Created : 20/07/06

Change log:
1.0.0 29/07/06 Initial Version (User 2042)
1.0.1 22/03/07 Modified - works with bug fixes, Ebay UK, proper extra column, SORTS!
1.0.2 27/03/07 Now caters for ebay.de (EUR) and sorting works for mixed currency listings (assuming £1 = EUR 1,50)
1.0.3 28/03/07 Now caters for ebay.com ($), assumes £1=$2. Also, heavy clean-up of price columns analysis - instead of wondering through spans and other tags (which may change, if EBay change format), use TD's textContent with a regular expression
*/

// ==UserScript==
// @name          eBay - Display Totals with Shipping - enhanced version
// @namespace     http://userscripts.org/people/24313
// @description	Computes and displays the total price with shipping added.  Makes a new column that shows the final price for both the BuyItNow and auction price added to the shipping prices.  Note: Works with international prices.
// @include       http://*search.ebay.co.uk/*
// @include       http://*search.ebay.com/*
// @include       http://*search.ebay.de/*
// ==/UserScript==

FindAllRows();

// Function used by the sort routine to compare the current value in the array with the next one
function sortCompare (currValue, nextValue) {
 // Since the elements of this array are actually arrays themselves, just sort
 // on the first element which contiains the value, not the second which contains
 // the original row position
	if ( currValue[0] == nextValue[0] ) 
	{
		if ( currValue[1] == nextValue[1] ) return 0;
		if ( currValue[1] < nextValue[1] ) return -1;
		if ( currValue[1] > nextValue[1] ) return 1;
	}

	if ( currValue[0] < nextValue[0] ) return -1;
	if ( currValue[0] > nextValue[0] ) return 1;
}

function FindAllRows() {
	var ListingsRows = [];

	var ClonedListingsRows = new Array();
	var TotalPrices = new Array();
	var sortedTotalPrices = new Array();

	//get table with the main listings (i.e. not those from shops)
	var allElements = document.getElementsByTagName('table');
	for (var i = 0; i < allElements.length; ++i)
		if (allElements[i].className == "ebItemlist single") {
			maintable = allElements[i];
			break;
		}

	//Find first instance on ebcShpNew TD (will be shipping header), and add "total" header
	var TotalHeader = document.createElement("td");	TotalHeader.innerHTML = "TOTAL";
	var allElements = document.getElementsByTagName('td');
	for (var i = 0; i < allElements.length; ++i)
		if (allElements[i].className == "ebcShpNew") {
			allElements[i].parentNode.insertBefore(TotalHeader, allElements[i].nextSibling);
			break;
		}



	var allElements = maintable.getElementsByTagName('tr');
	for (var i = 0; i < allElements.length; ++i) {
		if (allElements[i].className == "ebHlOdd single") ListingsRows.push(allElements[i]);
		if (allElements[i].className == "single") ListingsRows.push(allElements[i]);
	}
	
	if (ListingsRows.length > 0) {
		//alert("Num of Rows: " + ListingsRows.length);

		//STEP 1 - add totals to all rows		

		for (var i = 0; i < ListingsRows.length; ++i) 
		{
			current_row = ListingsRows[i];

			current_price = WorkOnRow(current_row);

			ClonedListingsRows[i] = current_row.cloneNode(true);
		
			TotalPrices[i] = [current_price, current_row.title, i];
			sortedTotalPrices[i] = [current_price, current_row.title, i];
			
		}

		//STEP 2 - SORT & remove duplicates

		sortedTotalPrices.sort(sortCompare);

		var last_title = 'x';

		for (var i = 0; i < ListingsRows.length; ++i) 
		{
			this_row_should_be = sortedTotalPrices[i][2];

			ListingsRows[i].parentNode.replaceChild(ClonedListingsRows[this_row_should_be], ListingsRows[i]);

			if (ClonedListingsRows[this_row_should_be].title == last_title) 

//				ClonedListingsRows[this_row_should_be].style.display = 'none';
				ClonedListingsRows[this_row_should_be].innerHTML = '<td></td><td></td><td></td><td>(duplicate)</td><td></td><td></td><td></td><td></td><td></td><td></td>';

			else

				last_title = ClonedListingsRows[this_row_should_be].title;
		}


	}	
}

function WorkOnRow(RowElement) {
	var buyItNowPrice = -1;
	var biddingPrice = -1;
	var shippingPrice = -1;
	var returnPrice = 1000;

	var allElements = RowElement.getElementsByTagName('td');
	var totalTdNode = document.createElement("td"); 

	var currency = "";
	var myregexp = /(EUR|\£|\$)\s?(\d+)[.,](\d+)(.*)/;


	for (var i = 0; i < allElements.length; ++i) {
		//alert("Node: " + allElements[i].className);
	
		if (allElements[i].className == "ebcPr") {
			
			
			mymatch = myregexp.exec(allElements[i].textContent);			
			
			currency = mymatch[1];
			biddingPrice = 1 * (mymatch[2]+'.'+mymatch[3]);
			
			if (mymatch[4] != "")
			{				
				mymatch = myregexp.exec(mymatch[4]);			
			
				buyItNowPrice = 1 * (mymatch[2]+'.'+mymatch[3]);				
			}


			//allElements[i].innerHTML += "<font color=green>"+currency+biddingPrice+"|"+buyItNowPrice+"</font>";
		}


		if (allElements[i].className == "ebcShpNew") {

			
			shippingPrice = allElements[i].textContent;

			if (shippingPrice == "Free") 
				shippingPrice = 0; 

			else if (shippingPrice == "Not specified" || shippingPrice == "Siehe Beschreibung") 
				shippingPrice = "?";

			else 
			{
				mymatch = myregexp.exec(shippingPrice);
				shippingPrice = 1 * (mymatch[2]+'.'+mymatch[3]);	
			}

			//allElements[i].innerHTML += "<font color=green>"+shippingPrice+"</font>";


			RowElement.insertBefore(totalTdNode, allElements[i].nextSibling);			
		}

		
		if (allElements[i].className == "ebcTtl") {			

			RowElement.setAttribute('title', allElements[i].textContent);
		}	
			

	}

	if (biddingPrice != -1) {
		if (isNaN(biddingPrice) || isNaN(shippingPrice)) var biddingTotal = "?";
		else {
			var biddingTotal = Math.round((biddingPrice + shippingPrice)*100)/100;
			returnPrice = biddingTotal;
		}
	}

	if (buyItNowPrice != -1) {
		if (isNaN(buyItNowPrice) || isNaN(shippingPrice)) var buyItNowTotal = "?";
		else {
			var buyItNowTotal = Math.round((buyItNowPrice + shippingPrice)*100)/100;
			returnPrice = buyItNowTotal;
		}
	}
	
	
	
	
	//alert("Totals: " + biddingTotal + "\n" + buyItNowTotal);
		
	if (biddingPrice != -1) {
		var newTextNode = document.createTextNode( currency_format(biddingTotal,currency) );
		totalTdNode.appendChild(newTextNode);
		var breakNode = document.createElement("br");
		totalTdNode.appendChild(breakNode);		
	}	

	if (buyItNowPrice != -1 && !isNaN(buyItNowPrice)) {
		var newTextNode = document.createTextNode( currency_format(buyItNowTotal,currency) );
		totalTdNode.appendChild(newTextNode);
	}

	//for multi currency listing, convert to same price

	if (currency == "EUR") returnPrice = returnPrice/1.5;
	if (currency == "$") returnPrice = returnPrice/2;

	return returnPrice;

}


function currency_format(price, currency)
{
	if (isNaN(price)) return price;

	price = price.toFixed(2);

	if (currency == 'EUR') 
		return 'EUR_'+ price.replace(/\./,',');
	else
		return currency + price;		

}