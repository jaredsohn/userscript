// ==UserScript==
// @name       Bitcoin Wisdom BTC-e FTC
// @namespace  http://chasevasic.com/
// @version    0.2
// @description  adds BTC-e Feathercoin (FTC/BTC) chart link 
// @match      http://bitcoinwisdom.com/*
// @copyright  2012+, Chase Vasic
// ==/UserScript==

var a = document.createElement('a');

var linkText = document.createTextNode("FTC/BTC");

a.appendChild(linkText);
a.title = "BTC-e FTC/BTC Charts";
a.href = "http://bitcoinwisdom.com/markets/btce/ftcbtc";

var markets = document.getElementsByClassName("nav-markets")[0]
var btce = markets.getElementsByTagName("tbody")[0].getElementsByTagName("tr")[14].getElementsByTagName("td")[1]
btce.appendChild(a);
