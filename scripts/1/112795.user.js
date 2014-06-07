// ==UserScript==
// @name           Automatically print PayPal invoices
// @namespace      Automatically print PayPal invoices
// @description    Automatically open PayPal invoice and print it
// @include        https://www.paypal.com/us/cgi-bin/*
// @include        https://history.paypal.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

window.addEventListener ("load", LocalMain, false);

function LocalMain ()
{

var TargetLink          = $("a:contains('Print Packing Slip')")

if (TargetLink  &&  TargetLink.length) 
    window.location.href    = TargetLink[0].href

document.evaluate("//input[@type='button']", document, null, 9, 

null).singleNodeValue.click();

}