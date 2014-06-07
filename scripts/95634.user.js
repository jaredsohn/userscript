// ==UserScript==
// @name           eBay Total: Price + Shipping
// @namespace      http://codeoptimism.com
// @description    Adds shipping fee to price.
// @author         Christopher Galpin
// @include        http://*ebay.com*
// @version        1.4
// @require        http://code.jquery.com/jquery.min.js
// ==/UserScript==

// Copyright (c) 2011, Christopher Galpin
// All rights reserved.
// 
// Redistribution and use in source and binary forms, with or without modification, are permitted provided that the following conditions are met:
// 
// Redistributions of source code must retain the above copyright notice, this list of conditions and the following disclaimer.
// Redistributions in binary form must reproduce the above copyright notice, this list of conditions and the following disclaimer in the documentation and/or other materials provided with the distribution.
// Neither the name of the author nor the names of its contributors may be used to endorse or promote products derived from this software without specific prior written permission.
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

shipFees = $("td.prc span.fee");
shipFees.each(totalPrice);

function totalPrice(index, shipFee) {
	shipFee = $(shipFee);
	shipFeeNumStr = shipFee.html().replace("+$", "").replace(" shipping", "");
	shipFeeNum = parseFloat(shipFeeNumStr);

	// 'bidsold' is just a different class
	// used for successful completed listings
	prices = new Array();
	price = shipFee.parent().prev("div.g-b,div.bidsold.g-b");
	hasTwoPrices = (price.length == 0);
	if (hasTwoPrices) {
		buyNowPrice = shipFee.parent().prev("div");
		prices.push(buyNowPrice);
		bidPrice = buyNowPrice.prev("div.g-b,div.bidsold.g-b");
		prices.push(bidPrice);
	} else
		prices.push(price);

	for (var i = 0; i < prices.length; i++) {
		price = prices[i];
		priceNumStr = price.html().replace(/[$,]/g, "");
		priceNum = parseFloat(priceNumStr);
		totalNum = (shipFeeNum + priceNum).toFixed(2);

		// annoyingly complex code just to restore commas
		iPart = Math.floor(totalNum);
		iPartCommas = iPart.toString().replace(/\B(?=(?:\d{3})+(?!\d))/g, ",");
		dPart = totalNum - iPart;
		dPart = Math.round(dPart * Math.pow(10, 2));
		if (dPart < 10) dPart = "0" + dPart;
		totalNumStr = iPartCommas + "." + dPart;

		price.html("$" + totalNumStr);
		shipFee.html("");
	}
}