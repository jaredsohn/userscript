// ==UserScript==
// @name           Amazon Geizhals.at Suche 2
// @namespace      http://www.daniel-kaefer.de
// @include        http://www.amazon.de*
// ==/UserScript==

// search the heading / product name
var results =
   document.evaluate("id('btAsinTitle')",
                     document, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);
var divnode = results.singleNodeValue;
var productname = divnode.innerHTML;

// create a new link
var geizhalslink = document.createElement('a');
geizhalslink.innerHTML = 'Preis vergleichen';
geizhalslink.target = '_blank';
geizhalslink.style.fontSize = 'small';


results =
   document.evaluate("id('priceBlock')",
                     document, null,
                     XPathResult.FIRST_ORDERED_NODE_TYPE,
                     null);

divnode = results.singleNodeValue;
//alert(divnode.innerHTML);
divnode.insertBefore(geizhalslink, divnode.lastChild.nextSibling);

if(productname.indexOf("(") > 3)
	productname = productname.substring(0, productname.indexOf("("));
if(productname.substring(productname.length-1,productname.length) == ' ')
    productname = productname.substring(0,productname.length-1);
if(productname.lastIndexOf(" ") > 3)
	productname = productname.substring(0, productname.lastIndexOf(" "));
if(productname.indexOf("<") > 3)
	productname = productname.substring(0, productname.indexOf("<"));

geizhalslink.href = "http://geizhals.at/deutschland/?fs="+productname+"&x=0&y=0&in=";
