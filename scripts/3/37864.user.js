// ==UserScript==

// @name           Alternate Geizhals.at Suche

// @namespace      http://www.daniel-kaefer.de

// @include        http://www.alternate.de/*

// ==/UserScript==



// search the heading / product name

var results =

document.evaluate("id('buyProduct')/div[2]/h1",

    document, null,

    XPathResult.FIRST_ORDERED_NODE_TYPE,

    null);

var divnode = results.singleNodeValue;

var productname = divnode.innerHTML;



results =

    document.evaluate("id('buyProduct')/div[5]/p[4]",

        document, null,

        XPathResult.FIRST_ORDERED_NODE_TYPE,

        null);

divnode = results.singleNodeValue;



// create a linebreak before the geizhals link

var br = document.createElement('br');

divnode.insertBefore(br, divnode.lastChild.nextSibling);



// create a new link

var geizhalslink = document.createElement('a');

geizhalslink.innerHTML = 'Preis vergleichen';

geizhalslink.target = '_blank';

geizhalslink.style.fontSize = 'small';



divnode.insertBefore(geizhalslink, divnode.lastChild.nextSibling);



if(productname.indexOf("(") > 3)

    productname = productname.substring(0, productname.indexOf("("));

if(productname.indexOf("<") > 3)

    productname = productname.substring(0, productname.indexOf("<"));

productname = productname.replace(/&nbsp;/g, " ")



geizhalslink.href = "http://geizhals.at/deutschland/?fs="+productname+"&x=0&y=0&in=";