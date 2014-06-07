// ==UserScript==
// @name       Steam Wishlist Stuff
// @namespace  http://userscripts.org/users/385903
// @version    0.1
// @description  Add some price-stats and stuff to the Steam Wishlist. Note: Not a replacement for Enhanced Steam; a complement.
// @match      http*://steamcommunity.com/id/*/wishlist/*
// @match      http*://steamcommunity.com/id/*/wishlist
// ==/UserScript==

// Only activate the code on the Wishlist-page of Steam
if(location.href.match(/steamcommunity.com\/id\/.*\/wishlist/) ){
    // Elias Zamaria @ StackOverflow
    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }
    
    // Create a Div to contain all the things
    var statsDiv = document.createElement("div");
    statsDiv.style.marginBottom = "10px";
    
    // Add all of the standard text to the div
    // Spans with IDs make it easy to add the data once it has been calculated
    statsDiv.innerHTML += "Total original prices of Wishlist: <span id=totStdPrice style='color:red;text-decoration:line-through;'></span><br>";
    statsDiv.innerHTML += "Total saved of prices of Wishlist: <span id=totSavedPrice style='color:green;'></span><br>";
    statsDiv.innerHTML += "Total price right now of Wishlist: <span id=totFinalPrice style='color:green;font-weight:bold;'></span><br>";
    
    // Fetch all wish-list items
    // Add our Div to the top of it all
    var allWishlist = document.getElementById("wishlist_items");
    allWishlist.insertBefore(statsDiv, allWishlist.firstChild);
    
    // Create arrays to hold the games with
    // - Their original prices
    // - The pre-discount prices
    // - The discount prices
    var allOriginalDiscountPricesArray = document.getElementsByClassName("discount_original_price");
    var allDiscountPricesArray = document.getElementsByClassName("discount_final_price");
    var allStandardPricesArray = document.getElementsByClassName("price");
    
    // Find the currency
    // The Wallet Balance has a delay, so...
    // ... find the first item in your Wishlist, look at the currency symbol, and take that one
    var currency;
    if( allStandardPricesArray.length > 0 )
        currency = allStandardPricesArray[0].innerHTML.replace(/\d+,\d\d/g,'');
    else if( allDiscountPricesArray.length > 0 )
        currency = allDiscountPricesArray[0].innerHTML.replace(/\d+,\d\d/g,'');
        
        // Prepare to sum the prices
        var allOriginalDiscountPrices = 0;
    var allDiscountPrices = 0;
    var allStandardPrices = 0;
    
    // Original discount prices
    for(var i=0; i<allOriginalDiscountPricesArray.length; i++){
        // Strip the actual price out from the ##.##€-formatted string
        // Some price-tags are "Free" or just empty; for some reason "empty" to Valve means "ALL THE TABS!!!"...
        var curr = allOriginalDiscountPricesArray[i].innerHTML.replace(/[$€£ -]|Free|\n|\t/g,'').replace(/,/g,'\.');
        
        // Parse a number from the stripped string
        allOriginalDiscountPrices += parseFloat(curr);
    }
    
    // Standard prices
    for(var i=0; i<allStandardPricesArray.length; i++){
        // Strip the actual price out from the ##.##€-formatted string
        // Some price-tags are "Free" or just empty; for some reason "empty" to Valve means "ALL THE TABS!!!"...
        var curr = allStandardPricesArray[i].innerHTML.replace(/[$€£ -]|Free|\n|\t/g,'').replace(/,/g,'\.');
        
        // Parse a number from the stripped string
        if( curr.length > 1 )
            allStandardPrices += parseFloat(curr);
    }
    
    // Sale prices
    for(var i=0; i<allDiscountPricesArray.length; i++){
        // Strip the actual price out from the ##.##€-formatted string
        // Some price-tags are "Free" or just empty; for some reason "empty" to Valve means "ALL THE TABS!!!"...
        var curr = allDiscountPricesArray[i].innerHTML.replace(/[$€£ -]|Free|\n|\t/g,'').replace(/,/g,'\.');
        
        // Parse a number from the stripped string
        if( curr.length > 1 )
            allDiscountPrices += parseFloat(curr);
    }
    
    // Calculate the total price without any discounts
    var totalStandardPrice = allOriginalDiscountPrices + allStandardPrices;
    
    // Calculate how much we have saved from having discounts
    var totalSavedPrice = allOriginalDiscountPrices - allDiscountPrices;
    
    // Calculate the final price
    var totalFinalPrice = totalStandardPrice - totalSavedPrice;
    
    // Calculate the average percentage of 
    var savedPercent = Math.floor((allDiscountPrices / allOriginalDiscountPrices) * 100);
    
    // Add the values to their respective fields
    document.getElementById("totStdPrice").innerHTML = numberWithCommas( totalStandardPrice.toString().substring(0, totalStandardPrice.toString().indexOf('.')+3) ).replace(/ /g,'') + currency;
    document.getElementById("totSavedPrice").innerHTML = numberWithCommas( totalSavedPrice.toString().substring(0, totalSavedPrice.toString().indexOf('.')+3) ).replace(/ /g,'') + currency + " (" + savedPercent + "% sale on average for games on sale)";
    document.getElementById("totFinalPrice").innerHTML = numberWithCommas( totalFinalPrice.toString().substring(0, totalFinalPrice.toString().indexOf('.')+3) ).replace(/ /g,'') + currency;
    
    
}