// ==UserScript==
// @name           GoHastings TruePrice Display
// @namespace      http://userscripts.org/users/164228/
// @description    Quick-and-dirty script that displays the real price (shipping included) of items on GoHastings
// @include        http://gohastings.com/*
// @include        https://gohastings.com/*
// @include        http://*.gohastings.com/*
// @include        https://*.gohastings.com/*
// ==/UserScript==

var pat1=/\$[0-9]+\.[0-9][0-9]/g;
var paths = "//*[@class='fl']";
paths = paths + " | //*[@class='new-price']";
paths = paths + " | //*[@class='regular-price']";
paths = paths + " | //*[@class='sale-price']";
paths = paths + " | //*[@class='used-price']";
paths = paths + " | //*[@class='prodPrice']";
paths = paths + " | //*[@class='fl product-info']";
paths = paths + " | //*[@id='cat-prod-det-reg-price']";
paths = paths + " | //*[@id='cat-product-details-list-price']";
paths = paths + " | //*[@id='cat-product-details-sale-price']";
var flElements = document.evaluate(paths,document,null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);

for (var i=0; i<flElements.snapshotLength; i++) {
  node = flElements.snapshotItem(i);
  s = node.textContent;
  if (s.match(pat1)) {
    amounts = s.match(pat1);
    if (amounts.length <= 2) {
      for (var j=0; j<1; j++) {
        amount = amounts[j];
        price = amount.substring(1,amount.length);
        pat2 = new RegExp('\\\$'+price);
        price = 2.28 + parseFloat(price);
        price = "$" + price.toFixed(2)+"*";
        s = s.replace(pat2,price);
      }
      node.textContent = s;
    }
  }
}
