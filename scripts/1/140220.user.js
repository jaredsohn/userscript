// ==UserScript==
// @name       eBay Calculate Total Payment
// @namespace  https://github.com/foxhound22003
// @version    0.1
// @description  Show the price + shipping on the item page
// @match      http://www.ebay.com/itm/*
// @match      http://www.ebay.com/ctg/*
// @copyright  2012+, ATMega
// @require    https://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js
// ==/UserScript==


DEBUG = true;

function debug(m) {
    if (DEBUG) {
        console.log(m);
    }
}

(function() {
    var priceRegex = /\d+\.\d+/;
    // Attempt to parse shipping cost
    try {
        var fshippingCost = document.getElementById('fshippingCost').childNodes[0].innerHTML;
        debug("Shipping cost HTML: " + fshippingCost);
        
        var shippingCost = parseFloat(fshippingCost.match(priceRegex)[0]);

   
        debug(shippingCost);
        
        // Now get the price of the item
        var priceWindow = $('span[itemprop="price"]');
        var itemCost = parseFloat(priceWindow.html().match(priceRegex)[0]);

        var totalCost = itemCost + shippingCost;
        debug("Item Price: " + itemCost);
        debug("Shipping Price: " + shippingCost);
        debug("Total cost: " + totalCost);
        
        // Now replace the current price with the total cost:
        priceWindow.append("<br/><small>($" + totalCost + " Price + Shipping)</small>");
             
    } catch (e) {
        
        // Shipping cost unable to be parsed, assume shipping is free
        debug("Shipping cost not found. Assuming the shipping price is free...");
    }
    
})();