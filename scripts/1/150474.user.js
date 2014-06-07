// ==UserScript==
// @name         Amazon - Price Rounder
// @description  On Amazon(com/ca/cn/uk), rounds up most prices to even numbers.
// @icon         http://i.imgur.com/8QLe3.png
// @version      1.1
// @namespace    Splark
// @copyright    Spinosaurus aegyptiacus 104my BCE
// @include      http*://*amazon.com/*
// @include      http*://*amazon.ca/*
// @include      http*://*amazon.cn/*
// @include      http*://*amazon.co.uk/*
// @exclude      http://www.amazon.*/gp/cart/*
// @exclude      http://www.amazon.*/aan/*
// ==/UserScript==

function intelligentPriceRoundup(price) {
  // (Assumes being passed a positive number/string with no more than 2 decimal places)
  // Above $10, rounds up to the nearest 10 if close by $2 or less. Otherwise, rounds up to the nearest $1.
  // Below $10, rounds up to the nearest 0.25.

  // Remove commas and convert to a number, if it was originally a string
  if (typeof price == "string") { price = Number( price.replace(",","") ); }
  
  // If under $10,
  if ( price <= 10 && (price*100)%25 != 0 ) {
    // then round up to the nearest 25 cents.
    price = price - ((price*100)%25)/100 + 0.25;
  }

  // If over $10,
  if ( price > 10 ) {
    // If the price is $2 or less below an even 10,
    if (( 10 - price%10 ) <= 2 ) {
      // then round it up to that 10.
      price = price + ( 10 - price%10 );
    } else {
      // Otherwise, round it up to the nearest dollar.
      price = Math.ceil(price);
    }
  }

  // Keep both decimal places, convert to a string, and add commas back in, if needed
  price = (price.toFixed(2) + "").replace(/(\d)(?=(\d\d\d)+(?!\d))/g, "$1,");
  
  return price;
}

function priceSimple(selector) {
  // For elements where the dollars and cents are continuous
  
  // Examples of cases:
  // [empty]
  
  var maps = document.querySelectorAll(selector);
  
  for (var i=0; i<maps.length; i++) {
    if ( !maps[i].hasAttribute("rounded") ) {
    
      // For .priceNote, make sure it's a rebate price and not "sold by ..." or "choose from ..." or something
      if ( selector == '.priceNote' && maps[i].innerHTML.indexOf("ebate") == -1 ) {continue;}

      // 1 or more digits, followed by a period, followed by exactly 2 digits, that aren't inside angle brackets
      var reGetPrice = /([0-9]+\.[0-9]{2})(?![^<]*>)/i;

      // Replace this match with the rounded up version
      maps[i].innerHTML = maps[i].innerHTML.replace(reGetPrice, intelligentPriceRoundup);
      
      // Tag this element as having been rounded so it won't be repeated
      maps[i].setAttribute("rounded", "rounded");
    }
  }
}

function priceSplit(selector) {
  // For elements where the dollars and cents are split up, such as by <sup>
  // Note: priceSplit might also correctly handle all priceSimple cases, but I haven't checked yet - and it isn't a robust implementation for that
  
  // Examples of cases:
  // [empty]
  
  var maps = document.querySelectorAll(selector);

  for (var i=0; i<maps.length; i++) {
    if ( !maps[i].hasAttribute("rounded") ) {
      // maybe a period, followed by 1 or more digits and commas, and not inside angle brackets (to avoid matching inline css)
      var reGetPrice = /(\.?[0-9,]+)(?![^<]*>)/ig;
      // Grab these two matches (### and .##) in an array
      var matchArrayPre = maps[i].innerHTML.match(reGetPrice);
      // Concatenate them into a single number (###.##) and use the roundup
      var matchString = intelligentPriceRoundup(matchArrayPre[0] + matchArrayPre[1]);
      // Split them apart again
      var matchArrayPost = matchString.match(reGetPrice);
      // Replace the old dollars (pattern: some digits and commas, that aren't inside angle brackets) with the new dollars
      maps[i].innerHTML = maps[i].innerHTML.replace(/[0-9,]+(?![^<]*>)/, matchArrayPost[0]);
      // Replace the old cents (pattern: a period, followed by exactly two digits, that aren't inside angle brackets) with the new cents
      maps[i].innerHTML = maps[i].innerHTML.replace(/\.[0-9]{2}(?![^<]*>)/, matchArrayPost[1]);

      // Tag this element as having been rounded so it won't be repeated
      maps[i].setAttribute("rounded", "rounded");
    }
  }
}


// Run all of the roundup functions, given the elements I've found so far
function runAll() {
  // Frontpage promo cells
    priceSimple('.s9Price');
    priceSimple('.newListprice');
  // Pages with vertical lists
    priceSimple('del.grey');
    priceSimple('span.bld.lrg.red');
  // Pages with cells
    priceSimple('strike.addon');
    priceSimple('.price'); // used to be span.price, but "Other items" promo box uses just .price
  // Individual Product Pages
    priceSimple('.priceLarge');
    //priceSimple('span#youSaveValue'); // Not activated since this is a save value instead of a price
  // Alternative sellers page
    priceSimple('.olpPrice');
    priceSimple('span.price_shipping');
  // "1-Click" button
    priceSimple('.avod-one-click-btn td.content');
  // Found in Kindle book store
    priceSimple('.red.t13');
  // Found on books pages (maybe more general than that?)
    priceSimple('.toeOurPrice');
    priceSimple('.toeNewPrice');
    priceSimple('.toeUsedPrice');
    priceSimple('.toeCollectiblePrice');
    priceSimple('.toeRentPrice');
    priceSimple('.toeOurPriceWithRent');
    priceSimple('.toeListPrice');
  // 'Related Products' promo box
    priceSimple('td.mbcPriceCell');
  // 'Product Ads' box
    priceSimple('.pa_price');
  // 'Product Ads from External Websites' promo box
    priceSimple('.pa_priceTest');
  // Misc
    priceSimple('.original-price');
    priceSimple('.listprice');
}

// Rerun the roundup functions, ignoring certain classes
function eventRerun(e) {
  if ( e.target.hasAttribute("class") ) {
    var ignoreClasses = ""; // empty for now
    if ( ignoreClasses.indexOf(e.target.className) > -1 ) {
      return;
    }
  }
  runAll();
}

// Watch main product cell for mutations (dynamic content loading) and call the re-run of the roundup functions
function addListen() {
  if (document.getElementById("related_adsLazyLoad")) {
     document.getElementById("related_adsLazyLoad").addEventListener("DOMSubtreeModified", eventRerun, false);
  }
  // Your Recent History
  // not working, right now
  if (document.getElementById("rhf")) {
     document.getElementById("rhf").addEventListener("DOMSubtreeModified", eventRerun, false);
  }
  // Main node for product results for browsing pages
  if (document.getElementById("rightResultsATF")) {
     document.getElementById("rightResultsATF").addEventListener("DOMSubtreeModified", eventRerun, false);
  }
}

// Goooooo!
addListen();
runAll();
