// ==UserScript==
// @name         Newegg - Price Rounder
// @description  On Newegg(com/ca/cn), rounds up most prices to even numbers.
// @icon         http://i.imgur.com/bsQYa.png
// @version      1.12
// @namespace    Splark
// @copyright    Beipiaosaurus 124.6my BCE
// @include      http*://*newegg.com/*
// @include      http*://*newegg.ca/*
// @include      http*://*newegg.cn/*
// @include      http*://*newegg.com.cn/*
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
  // .priceWas              <span class="priceWas"><span class="label">Was: </span><span>$289.99</span>
  // .priceRebate            <span class="priceRebate">$239.99 with Rebate
  // .priceNote              <li class="priceNote">$134.99 with Rebate
  // .priceShip              <li class="priceShip">$8.99 Shipping
  // .priceNoteDollar          <span class="priceNoteDollar">$9.99
  // .price                  <span rounded="rounded" class="price">$134<span>.99</span></span> <span rounded="rounded" class="priceNote">after rebate(s)</span>
  // .ccs-selector-result-price    <div class="ccs-selector-result-price">$29.99
  // #phonePrice            <span id="phonePrice" class="specialoffer70_146_change_phone_thumbview_offerblock_bigprice">$98.00
  // #spnPriceToday          <p id="spnPriceToday">$99.99<br>with Virgin Mobile service
  //       phone mouseover box price (needs event probably)
  // .dred.vat                <span class="dred vat">$31.00
  // .rebateShipping          <dd class="rebateShipping">$5.95 Shipping
  //       (not an actual rebate amount, but a shipping price on the items in rebate category)
  // .mirRebate              <td class="mirRebate"><strong>$0.01 Instant Rebate</strong>
  //       (not implemented in roundups because this is an actual rebate value, rather than an after-rebate value)
  // .comboOriginal          <li class="comboOriginal">Was:&nbsp;$2,148.99
  // .comboDiscount          <li class="comboDiscount">Discount:&nbsp;-$285.00
  // .comboFinal            <li class="comboFinal"><strong>Combo Price:&nbsp;$3,614.87</strong>
  
  var maps = document.querySelectorAll(selector);
  
  for (var i=0; i<maps.length; i++) {
    
    // skip if node has been rounded already
    if ( maps[i].hasAttribute("rounded") ) {continue;}

    // Tag this element as having been rounded so it won't be repeated // moved to front, fixes hangups for some reason
    maps[i].setAttribute("rounded", "rounded");

    // skip if node has no innerHTML
    if ( !maps[i].innerHTML ) {continue;}
    
    // For .priceNote, make sure it's a rebate price and not "sold by ..." or "choose from ..." or something
    if ( selector == '.priceNote' && maps[i].innerHTML.indexOf("ebate") == -1 ) {continue;}
    
    // 1 or more digits, followed by a period, followed by exactly 2 digits, that aren't inside angle brackets
    var reGetPrice = /([0-9]+\.[0-9]{2})(?![^<]*>)/i;
    
    // if there aren't any matching numbers found, skip this node instead of aborting the whole thing
    if ( !reGetPrice.test(maps[i].innerHTML) ) {
      maps[i].setAttribute("skip", "skip");
      continue;
    }
    
    // Replace this match with the rounded up version
    maps[i].innerHTML = maps[i].innerHTML.replace(reGetPrice, intelligentPriceRoundup);
    
  }
}

function priceSplit(selector) {
  // For elements where the dollars and cents are split up, such as by <sup>
  // Note: priceSplit might also correctly handle all priceSimple cases, but I haven't checked yet - and it isn't a robust implementation for that
  
  // Examples of cases:
  // #singleFinalPrice    <div id="singleFinalPrice" class="current" content="309.99" itemprop="price"><span class="label">Now: </span><span>$</span>309<sup> .99</sup>
  // .priceFinal - case #1  <li class="priceFinal"><span class="label">Now: </span>$<strong>1,299</strong><sup>.99</sup>
  // .priceFinal - case #2  <span class="priceFinal"><span class="label">Now: </span>$269.99
  // .finalPrice          <span class="finalPrice">$<strong>94</strong><sup>.99</sup>
  // #TotalPrice          <span class="dollar" id="TotalPrice" style="display:block"><span>$</span>1,599<sup>.99</sup>
  
  var maps = document.querySelectorAll(selector);

  for (var i=0; i<maps.length; i++) {
    
    // skip if node has been rounded already
    if ( maps[i].hasAttribute("rounded") ) {continue;}

    // Tag this element as having been rounded so it won't be repeated // moved to front, fixes hangups for some reason
    maps[i].setAttribute("rounded", "rounded");

    // skip if node has no innerHTML
    if ( !maps[i].innerHTML ) {continue;}
    
    // maybe a period, followed by a digit, followed by 1 or more digits and/or commas, and not inside angle brackets (to avoid matching inline css)
    var reGetPrice = /(\.?[0-9][0-9,]*)(?![^<]*>)/ig;
    
    // Grab these two matches (### and .##) in an array
    var matchArrayPre = maps[i].innerHTML.match(reGetPrice);
    
    // one digit anywhere
    var reContinue = /[0-9]/i;
    
    // if there aren't any matching numbers found, skip this node instead of aborting the whole thing
    if ( matchArrayPre.length < 2 || !reContinue.test(matchArrayPre[0]) || !reContinue.test(matchArrayPre[1])) {
      maps[i].setAttribute("skip", "skip");
      continue;
    }
    
    // Concatenate them into a single number (###.##) and use the roundup
    var matchString = intelligentPriceRoundup(matchArrayPre[0] + matchArrayPre[1]);
    
    // Split them apart again
    var matchArrayPost = matchString.match(reGetPrice);
    
    // Replace the old dollars (pattern: a digit, followed by digits and/or commas, that aren't inside angle brackets) with the new dollars
    maps[i].innerHTML = maps[i].innerHTML.replace(/[0-9][0-9,]+(?![^<]*>)/, matchArrayPost[0]);
    
    // Replace the old cents (pattern: a period, followed by exactly two digits, that aren't inside angle brackets) with the new cents
    maps[i].innerHTML = maps[i].innerHTML.replace(/\.[0-9]{2}(?![^<]*>)/, matchArrayPost[1]);
    
  }
}


// Run all of the roundup functions, given the elements I've found so far
function runAll() {
  priceSplit('.price'); // for China - needs to come before priceSimple('.price') because of the trigger-happy "rounded" ad-hoc fix

  priceSimple('.priceWas'); // may be deprecated
  priceSimple('.price-was');
  priceSimple('.price'); // not catching when before "after rebate(s)", not sure why
  priceSimple('.price .price'); // quick fix - on Newegg China, there are .price nodes inside other .price nodes, and querySelectorAll seems to be grabbing only the first one
  priceSimple('.priceRebate');
  priceSimple('.priceNote');
  priceSimple('.priceShip'); // may be deprecated
  priceSimple('.price-ship');
  priceSimple('.priceNoteDollar'); // may be deprecated
  priceSimple('.price-note-dollar');
  priceSimple('.ccs-selector-result-price');
  priceSimple('#phonePrice'); // not catching right now
  priceSimple('#spnPriceToday'); // not catching right now
  priceSimple('.dred.vat');
  priceSimple('.rebateShipping');
  priceSimple('.comboOriginal');
  priceSimple('.comboDiscount');
  priceSimple('.comboFinal');
  priceSimple('#protect li em');

  priceSplit('#singleFinalPrice');
  priceSplit('.price-current'); // for some reason, this won't work on a #singleFinalPrice.price-current, and will also cause #singleFinalPrice to fail if this is run first
  priceSplit('.priceFinal');
  priceSplit('.finalPrice'); // not catching right now
  priceSplit('#TotalPrice');
}

// Rerun the roundup functions, ignoring certain classes
function eventRerun(e) {
  if ( e.target.hasAttribute("class") ) {
    var ignoreClasses = "priceMAP priceRange priceFinal";
    if ( ignoreClasses.indexOf(e.target.className) > -1 ) {
      return;
    }
  }
  runAll();
}

// Watch main product cell for mutations (dynamic content loading) and call the re-run of the roundup functions
function addListen() {
  // [Note:] for some reason, document.getElementById("bcaProductCell") is failing to grab the element if runAll() is run before the listener is attached with addListen()
  if (document.getElementById("bcaProductCell")) {
     document.getElementById("bcaProductCell").addEventListener("DOMSubtreeModified", eventRerun, false);
  }
  // #personalizationWrapper includes some front page boxes
  if (document.getElementById("personalizationWrapper")) {
     document.getElementById("personalizationWrapper").addEventListener("DOMSubtreeModified", eventRerun, false);
  }
  // #CombineBoxContent includes promo boxes on individual product pages
  if (document.getElementById("CombineBoxContent")) {
     document.getElementById("CombineBoxContent").addEventListener("DOMSubtreeModified", eventRerun, false);
  }
  // #ccs-selector-wrapper enables .css-selector-result-price, in "xyz finder" utilities
  if (document.getElementById("ccs-selector-wrapper")) {
     document.getElementById("ccs-selector-wrapper").addEventListener("DOMSubtreeModified", eventRerun, false);
  }
}

// Goooooo!
addListen();
runAll();