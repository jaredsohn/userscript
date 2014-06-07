// ==UserScript==
// @name           Woot Actual Price
// @namespace      http://userscripts.org/users/70218
// @description    Calculates the final price, including shipping and shows that instead of the base price.
// @include        http://*.woot.com/*
// ==/UserScript==

(function() {
  /* add $5 to the PriceSpan */
  var pricespan = document.getElementById('PriceSpan');
  var baseprice = parseFloat(pricespan.innerHTML.substr(1));
  var finalprice = baseprice + 5;

  pricespan.innerHTML = "$" + finalprice;

  /* and update the shipping span with the base price */
  var spans = document.getElementsByClassName("shipping");
  spans[0].innerHTML = "base price $"+baseprice;
})();
