// ==UserScript==
// @name        PistonHeads Km&Eur
// @namespace   http://userscripts.org/users/499505
// @description Show cars mileage and price using kilometers and euros for pistonheads.com used cars
// @include     http://classifieds.pistonheads.com/*
// @include     http://www.pistonheads.com/classifieds/*
// @include     http://www.pistonheads.com/classifieds
// @grant       GM_xmlhttpRequest
// @grant       GM_setValue
// @grant       GM_getValue
// @version     0.3
// ==/UserScript==

// Request yahoo.com for currency conversion
GM_xmlhttpRequest({
  method: "GET",
  url: "http://download.finance.yahoo.com/d/quotes.csv?s=GBPEUR=X&f=Xl1&e=.csv",
  onload: function(responseDetails) {
    var csv = responseDetails.responseText;
    var csvvalue = csv.split(',')[1];
    GM_setValue("currency", csvvalue);
  },
  onerror: function() {
    alert("GreaseMonkey PistonHeads Script: Unable to get currencies from finance.yahoo.com.");
  }
});

function reverse(s){
  return s.split("").reverse().join("");
}

function convert_mileage_to_km(s){
  // Strip ',' separator
  var mileage = s.replace(',','');
  // Convert to kilometers
  mileage = mileage*1.609;
  // Round to integer
  mileage = Math.floor(mileage);
  // Convert back to string
  mileage = mileage.toString();
  // Reverse, add space between each 3 caracters, reverse back
  mileage = reverse(mileage);
  mileage = mileage.replace(/.{3}/g, "$& ");
  mileage = reverse(mileage);
  mileage = mileage.trim();
  return mileage;
}

function convert_gbp_to_euro(s){
  // Strip 's' separator and £
  var price = s.replace(',','');
  price = price.replace('£','');
  // Convert to euro
  price = price*parseFloat(GM_getValue("currency"));
  // Round to integer
  price = Math.floor(price);
  // Convert back to string
  price = price.toString();
  // Reverse, add space between each 3 caracters, reverse back
  price = reverse(price);
  price = price.replace(/.{3}/g, "$& ");
  price = reverse(price);
  price = price.trim();
  return price
}

// Add kilometers along mileage (list page)
var match, re = /<span>Mileage: <\/span><span>([0-9]+(,[0-9]+)?)<\/span>/g;
while((match = re.exec(document.documentElement.innerHTML)) !== null){
  var mileage = match[1];
  var km = convert_mileage_to_km(mileage);
  var mileagepattern = match[0];
  var newmileagepattern = match[0].replace(match[1],match[1]+" ("+km+" km)");
  document.body.innerHTML = document.body.innerHTML.replace(mileagepattern, newmileagepattern);
}

// Add kilometers along mileage (list page)
//var match, re = /<span class="spec-name">Mileage: <\/span>\s<span class="spec-value">([0-9]+(,[0-9]+)?)<\/span>/g;
var match, re = /<span class="spec-name">Mileage: <\/span>\s*\n\s*<span class="spec-value">([0-9]+(,[0-9]+)?)<\/span>/g;
while((match = re.exec(document.documentElement.innerHTML)) !== null){
  var mileage = match[1];
  var km = convert_mileage_to_km(mileage);
  var mileagepattern = match[0];
  var newmileagepattern = match[0].replace(match[1],match[1]+" ("+km+" km)");
  document.body.innerHTML = document.body.innerHTML.replace(mileagepattern, newmileagepattern);
}

// Add euro price conversion (list page)
var prices = document.getElementsByClassName("ad-price");
for (var i = 0; prices[i]; i++) {
  var gpbprice = prices[i].innerHTML;
  var eurprice = convert_gbp_to_euro(gpbprice);
  prices[i].innerHTML = gpbprice+'<br\> (&euro;'+eurprice+')';
}

// Add euro price conversion (details page)
var prices = document.getElementsByClassName("adevert-price");
for (var i = 0; prices[i]; i++) {
  var gpbprice = prices[i].innerHTML;
  var eurprice = convert_gbp_to_euro(gpbprice);
  prices[i].innerHTML = gpbprice+'<br\> (&euro;'+eurprice+')';
}