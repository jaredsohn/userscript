// ==UserScript==
// @name           Ebay Price Total
// @namespace      ebay
// @description    Ebay Price Total
// @include        http://*.ebay.com/*
// ==/UserScript==

function parseMoney(str){
	re = /^US|\+|\$|,/g;
	return parseFloat(str.replace(re, ""));
}

var errors = "";

// Grid view
elems = document.querySelectorAll("table.fgdt td.pcell div.pctr");
for(i in elems){
	price = elems[i].querySelectorAll("span.bid");
	if(price.length == 0)
		price = elems[i].querySelectorAll("span.amt span");
	if(price.length == 0)
		errors += "001 item bid price was not found " + elems[i].innerHTML + "\n";
	shipping = elems[i].querySelectorAll("span.ship");
	if(shipping.length == 0)
		continue;

	price = parseMoney(price[0].innerHTML);
	if(shipping[0].innerHTML == "Free shipping" || shipping[0].innerHTML == "Free")
		shipping = 0;
	else
		shipping = parseMoney(shipping[0].innerHTML);
	if(shipping == NaN)
  		total = "Err-ship";
	else if(price == NaN)
		total = "Err-price";
	else
		total = parseFloat(price + shipping).toFixed(2);
	elems[i].innerHTML += '<div class="amount" style="border-top: 1px solid red"><span class="label">Total</span><span class="bid">$' + total + '</span></div>';
}

// List view
elems = document.querySelectorAll(".lview table.rh td.prc");
for(i in elems){
	price = elems[i].querySelectorAll("div.g-b");
	if(price.length == 0)
		price = elems[i].querySelectorAll("div");
	if(price.length == 0)
		price = elems[i];
	if(price.length == 0)
		errors += "002 item bid amount was not found " + elems[i].innerHTML + "\n";

	shipping = elems[i].querySelectorAll("span.ship");
	if(shipping.length == 0)
		continue;

	price = parseMoney(price[0].innerHTML);
	if(shipping[0].innerHTML == "Free shipping")
		shipping = 0;
	else
		shipping = parseMoney(shipping[0].innerHTML);
	if(shipping == NaN)
  		total = "Err-ship";
	else if(price == NaN)
		total = "Err-price";
	else
		total = parseFloat(price + shipping).toFixed(2);
	elems[i].innerHTML += '<div class="g-b" style="border-top: 1px solid red">$' + total + '</div>';
}

// Item view
elems = document.querySelectorAll("form > table.vi-is1 > tbody");
for(i in elems){
	price = elems[i].querySelectorAll("span.vi-is1-prcp");
	if(price.length == 0)
		errors += "003 1st amount was not found " + elems[i].innerHTML + "\n";

	shipping = elems[i].querySelectorAll("#fshippingCost span");
	if(shipping.length == 0)
		shipping = elems[i].querySelectorAll("#fshippingCost");
	if(shipping.length == 0)
		continue;

	price = parseMoney(price[0].innerHTML);
	if(shipping[0].innerHTML == "FREE shipping")
		shipping = 0;
	else
		shipping = parseMoney(shipping[0].innerHTML);

	if(shipping == NaN)
  		total = "Err-ship";
	else if(price == NaN)
		total = "Err-price";
	else
		total = parseFloat(price + shipping).toFixed(2);
	solid = elems[i].querySelectorAll("tr td.vi-is1-solid");
	if(solid.length == 0){
		errors += "003 unable to find grey box thing\n"
		continue;
	}
	solid = solid[solid.length - 1].parentNode;
	tr = document.createElement("TR");
	elems[i].insertBefore(tr, solid);
	tr.innerHTML = '<th class="vi-is1-lblp vi-is1-solidBg">With shipping:</th><td class="vi-is1-solid vi-is1-tbll" style="border: 1px solid red">$' + total + '</td><td class="vi-is1-solid"></td>';
}

if(errors != "")
	alert("Ebay price total script errors:\n\n" + errors);
