/* eBay - Show total cost when listing items (ebay.es)
Created : 2007-10-27 by Lex Sparrow (Alejandro Sanchez Valdezate)
Modified: 2007-10-27 Initial Version



Change log:
1.0.0 2007-10-27 Initial Version
*/

// ==UserScript==
// @name          eBay - Sacar totales ebay.es
// @namespace     http://userscripts.org/people/36339
// @description	  Shows total cost at a new column. 
// @include       http://*.ebay.es/*
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
	//alert("pasa");
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
	var myregexp = /(EUR|\£|\$)/;

	var cad="";
	var pos=0;
	for (var i = 0; i < allElements.length; ++i) {
		//alert("Node: " + allElements[i].className);
	
		if (allElements[i].className == "ebcPr") {
			//alert(allElements[i].textContent);
			//mymatch = myregexp.exec(allElements[i].textContent);			
			cad=allElements[i].textContent;
			pos=cad.indexOf('EUR');
			preciocoma=cad.substr(0,pos);
			pos=preciocoma.indexOf(',');
			biddingPrice=1*preciocoma.substr(0,pos)+'.'+preciocoma.substr(pos+1,preciocoma.length-pos-2);
			//alert("precio:"+biddingPrice+"-");
			
/*			
			if (mymatch[4] != "")
			{				
				mymatch = myregexp.exec(mymatch[4]);			
			
				buyItNowPrice = 1 * (mymatch[2]+'.'+mymatch[3]);				
			}
*/			


			//allElements[i].innerHTML += "<font color=green>"+currency+biddingPrice+"|"+buyItNowPrice+"</font>";
		}


		if (allElements[i].className == "ebcShpNew") {

			
			shippingPrice = allElements[i].textContent;

			if (shippingPrice == "Gratis")  {
				shippingPrice = 0; 

			} else  {
				if (shippingPrice == "Not specified" || shippingPrice == "No especificado") {
					shippingPrice = "?";
				}	else 			{
					cad=allElements[i].textContent;
					pos=cad.indexOf('EUR');
					genviocoma=cad.substr(0,pos);
					pos=genviocoma.indexOf(',');
					shippingPrice = 1*genviocoma.substr(0,pos)+'.'+genviocoma.substr(pos+1,genviocoma.length-pos-2);
					//alert("envio:"+shippingPrice+"-");
				}
			}

			//allElements[i].innerHTML += "<font color=green>"+shippingPrice+"</font>";


			RowElement.insertBefore(totalTdNode, allElements[i].nextSibling);			
		}

		
		if (allElements[i].className == "ebcTtl") {			

			RowElement.setAttribute('title', allElements[i].textContent);
		}	
			

	}

	if (biddingPrice != -1) {
		if (isNaN(biddingPrice) || isNaN(shippingPrice)) {
				var biddingTotal = "?";
		} else {
			var biddingTotal =parseFloat(biddingPrice) + parseFloat(shippingPrice);
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
		var yo = document.createElement("b");
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
