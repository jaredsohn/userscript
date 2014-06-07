// ==UserScript==
// @name          Amazon Polish Price
// @namespace     http://github.com/iczechowski/amazon-polish-price
// @description   Converts price on amazon.com to Polish currency (PLN) and displays bellow orginal price.
// @version       1.0
// @author        Igor Czechowski
// @homepage      http://github.com/iczechowski/amazon-polish-price
// @include       http://www.amazon.com/*
// @include       https://www.amazon.com/*
// ==/UserScript==

(function() {
  function converte(price, display) {
    var convert_url = "http://www.google.com/finance/converter?from=USD&to=PLN&a=" + price
    GM_xmlhttpRequest({
      method: "GET",
      url: convert_url,
      onload: function(responseDetails) {
        var convertedPrice = responseDetails.responseText.match(/<span.*?>(.+)<\/span>/i)[1];
        if (convertedPrice != null) {
          display(convertedPrice);
        }
      }
    });
  }

  function getNode(xpath) {
    var xpath_result = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);    
    return xpath_result.singleNodeValue;
  }

  function addPolishPriceRow(price) {
    var priceNode = getNode("//b[@class='priceLarge']");
    var priceRowNode = priceNode.parentNode.parentNode;
    var polishRowNode = priceRowNode.cloneNode(true);

    polishRowNode.cells[0].innerHTML = "Polish Price:";
    polishRowNode.cells[1].innerHTML = "<b class='priceLarge'>" + price + "</b>";

    priceRowNode.parentNode.insertBefore(polishRowNode, priceRowNode.nextSibling);
  }

  function displayPrice() {
    var priceNode = getNode("//b[@class='priceLarge']");
    if (priceNode != null) {
      var price = priceNode.innerHTML.replace(/\u0024/, "");
       converte(price, addPolishPriceRow);
    }
  }

  displayPrice();

})();		
