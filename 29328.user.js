// ==UserScript==
// @name           add_postage_amazon.de
// @namespace      http://www.amazon.de
// @description    Adds postage to non-amazon offers. Only on the product site
// @include        http://www.amazon.de/*
// @author         tst__ (tst<at>panictank<dot>net)
// ==/UserScript==

function getPriceAndAddPostage(s)
{
  // search for the span element which includes the price
  var sSpan = s.getElementsByTagName('span');
  var sPrice = sSpan[0].innerHTML;

  // erasing "EUR"
  var sPriceAlone = sPrice.replace('EUR ', '');

  // search for int price
  var sPriceIntIndex = sPriceAlone.indexOf(',');

  // adding postage
  var sPriceInt =  parseInt(sPriceAlone.slice(0, sPriceIntIndex)) + 3;

  // making output string
  var sPriceNew = "EUR " + sPriceInt + sPriceAlone.slice(sPriceIntIndex, sPriceAlone.length);

  sSpan[0].innerHTML = sPriceNew;
}

var s1 = document.getElementById('secondaryUsedAndNew');
var s2 = document.getElementById('primaryUsedAndNew');

if(s1 && s2)
{
  getPriceAndAddPostage(s1);
  getPriceAndAddPostage(s2);
}