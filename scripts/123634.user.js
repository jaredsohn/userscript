// ==UserScript==
// @name           eBay total colum
// @include        http://*.ebay.*/sch/*
// @description    Add the total price near the item price
// @author         tognolo
// @require        http://ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js

// ==/UserScript==


// Language Check
var lang = location.host.split('.').pop();
var langMsg = "";
if (lang == "it"){langMsg = "Prezzo + spedizione";}
else if (lang == "fr"){langMsg = "Prix + livraison";}
else {langMsg = "Price + ship";}

$("table.li").each(function(){
	// Find the price of this item
	var price = $(this).find("td.prc.g-b");
	// Check if item have "Buy now" offer and skip it
	if (price.length == 0){price = $(this).find("td.prc").children(".g-b");}

	// I've the current price, convert to float.
	var priceArray = price.html().split(' ');
	price = parseFloat(priceArray[1].replace(",", "."));
	if (isNaN(price)){
		var currency = priceArray[1];
		price = parseFloat(priceArray[0].replace(",", "."));
	}
	else{
		var currency = priceArray[0];
	}

	// Check if the ship is free
	var ship = $(this).find("td.fshp");
	if (ship.length == 0){
		// Ship isn't free...
		var shipArray = $(this).find("td.ship").html().split(' ');
		ship = parseFloat(shipArray[1].replace(",", "."));
		if (isNaN(ship)){
			ship = parseFloat(shipArray[0].replace(",", "."));
			// Check if only hand delivery
			if (isNaN(ship)){ship = 0.0;}
		}
	}
	else{ship = 0.0;}

	var total = (ship + price).toFixed(2);

	$(this).find("td.prc").append('<div class="total" style="padding-top: 5px;">' + langMsg + ': <span style="font-weight: bold; color: #FF0000;">' 
		+ currency + ' ' + total + '</span></div>');
});