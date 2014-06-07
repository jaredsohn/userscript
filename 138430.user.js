// ==UserScript==
// @name           Amazon MBC Price + Shipping
// @namespace      absurdlyobfuscated
// @version        1.0
// @description    Shows the sum of price + shipping instead of separate price and shipping numbers on 'More Buying Choices' pages.
// @include        http://*.amazon.com/*
// ==/UserScript==

function FixPrices()
{
  var i, prices, priceElement, shippingElement, shipping, price, dollarSign;
  prices = document.getElementsByClassName("price");
  for (i = 0; i < prices.length; i++)
  {
    priceElement = prices[i];
    shippingElement = prices[i].nextElementSibling;
    if (shippingElement && shippingElement.className == "shipping_block")
    {
      shippingElement = shippingElement.firstElementChild;
      if (shippingElement && shippingElement.className == "price_shipping")
      {
        shipping = parseFloat(shippingElement.textContent.substr(3));
        price = parseFloat(priceElement.textContent.substr(1));
        dollarSign = priceElement.textContent.substr(0, 1);
        priceElement.textContent = dollarSign + (price + shipping).toFixed(2);
        shippingElement.textContent = dollarSign + price.toFixed(2) + " + " + dollarSign + shipping.toFixed(2)
      }
    }
  }
  prices = document.getElementsByClassName("mbcPriceCell");
  for (i = 0; i < prices.length; i++)
  {
    priceElement = prices[i].firstChild;
    if (priceElement && priceElement.nodeType == 3) //Type == text node
    {
      shippingElement = prices[i].firstElementChild;
      if (shippingElement && shippingElement.className == "plusShippingText")
      {
        shipping = parseFloat(shippingElement.textContent.substr(4));
        if (!isNaN(shipping))
        {
          price = parseFloat(priceElement.textContent.substr(1));
          dollarSign = priceElement.textContent.substr(0, 1);
          priceElement.textContent = dollarSign + (price + shipping).toFixed(2);
          shippingElement.textContent = " " + dollarSign + price.toFixed(2) + " + " + dollarSign + shipping.toFixed(2) + " shipping"
        }
      }
    }
  }
}

FixPrices();
