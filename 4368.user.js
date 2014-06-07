// ==UserScript==
// @name           Remove StrategyPage.com Nag Box
// @namespace      http://codesuidae.net
// @description    Removes the StrategyPage.com nag popup
// @include        http://www.strategypage.com/*
// ==/UserScript==

var nagBox = document.getElementById("subad");

if (nagBox) {
    nagBox.parentNode.removeChild(nagBox);
}