/* eBay - Display Totals with Shipping
Created : 07/20/06
Modified: 07/20/06 Initial Version



Change log:
1.0.0 07/20/06 Initial Version
*/

// ==UserScript==
// @name          eBay - Display Totals with Shipping
// @namespace     http://userscripts.org/people/2042
// @description	Computes and displays the total price with shipping added.  Makes a new column that shows the final price for both the BuyItNow and auction price added to the shipping prices.  Note: Works with international prices.
// @include       http://*.ebay.com/*
// ==/UserScript==

FindAllRows();

function FindAllRows() {
	var ListingsRows = [];
	var allElements = document.getElementsByTagName('tr');
	for (var i = 0; i < allElements.length; ++i) {
		if (allElements[i].className == "ebHlOdd single") ListingsRows.push(allElements[i]);
		if (allElements[i].className == "single") ListingsRows.push(allElements[i]);
	}
	
	if (ListingsRows.length > 0) {
		//alert("Num of Rows: " + ListingsRows.length);
		for (var i = 0; i < ListingsRows.length; ++i) {
			WorkOnRow(ListingsRows[i]);
		}
		//WorkOnRow(ListingsRows[0]);
	}	
}

function WorkOnRow(RowElement) {
	var buyItNowPrice = -1;
	var biddingPrice = -1;
	var shippingPrice = -1;
	var allElements = RowElement.getElementsByTagName('td');

	for (var i = 0; i < allElements.length; ++i) {
		//alert("Node: " + allElements[i].className);
	

	
		if (allElements[i].className == "ebcPr") {
			var spans = allElements[i].getElementsByTagName('span')

			if (spans.length >= 1) {
				if (spans[0].childNodes[0].nodeName == "#text")	biddingPrice = 1 * spans[0].childNodes[0].nodeValue.replace(/\$/g,"");	
				else if (spans[0].childNodes[1].nodeName == "#text") biddingPrice = 1 * spans[0].childNodes[1].nodeValue.replace(/\$/g,"");	
			}
			//alert("biddingPrice = " + biddingPrice);
			if (spans.length > 1) {
				if (spans[0].childNodes[0].nodeName == "#text") buyItNowPrice = 1 * spans[1].childNodes[0].nodeValue.replace(/\$/g,"");					
				else if (spans[0].childNodes[1].nodeName == "#text") buyItNowPrice = 1 * spans[1].childNodes[1].nodeValue.replace(/\$/g,"");
			}			
			//alert("buyItNowPrice = " + buyItNowPrice);
		}
		if (allElements[i].className == "ebcShpNew") {
			
			if (allElements[i].childNodes[0].childNodes[0].nodeName == "#text") shippingPrice = allElements[i].childNodes[0].childNodes[0].nodeValue.replace(/\$/g,"");
			else if (allElements[i].childNodes[0].childNodes[1].nodeName == "#text") shippingPrice = allElements[i].childNodes[0].childNodes[1].nodeValue.replace(/\$/g,"");

			if (shippingPrice == "Free") shippingPrice = 0; 
			else if (shippingPrice == "Not specified") shippingPrice = "?";
			else shippingPrice = 1 * shippingPrice;
			//alert("shippingPrice= " + shippingPrice)			

			var shippingTrNode = allElements[i]
		}
	}

	if (buyItNowPrice != -1) {
		if (isNaN(buyItNowPrice) || isNaN(shippingPrice)) var buyItNowTotal = "?";
		else var buyItNowTotal = Math.round((buyItNowPrice + shippingPrice)*100)/100;
	}
	
	
	if (biddingPrice != -1) {
		if (isNaN(biddingPrice) || isNaN(shippingPrice)) var biddingTotal = "?";
		else var biddingTotal = Math.round((biddingPrice + shippingPrice)*100)/100;	
	}
	
	
	//alert("Totals: " + biddingTotal + "\n" + buyItNowTotal);
	var totalTableNode = document.createElement("div");
	totalTableNode.setAttribute("cellspacing",0);
	totalTableNode.setAttribute("cellpadding",0);

	var totalTrNode = document.createElement("tr"); totalTableNode.appendChild(totalTrNode);
	var totalTdNode = document.createElement("td"); totalTrNode.appendChild(totalTdNode);
		
	if (biddingPrice != -1) {
		var newTextNode = document.createTextNode("$" + biddingTotal);
		totalTdNode.appendChild(newTextNode);
		var breakNode = document.createElement("br");
		totalTdNode.appendChild(breakNode);
	}	

	if (buyItNowPrice != -1 && !isNaN(buyItNowPrice)) {
		var newTextNode = document.createTextNode("$" + buyItNowTotal);
		totalTdNode.appendChild(newTextNode);
	}
	shippingTrNode.appendChild(totalTableNode);
	shippingTrNode.setAttribute("nowrap",1);
	shippingTrNode.childNodes[0].setAttribute("align","left");
	totalTableNode.setAttribute("border","1px solid #c03");
	
	totalTableNode.setAttribute("align","right");
}



