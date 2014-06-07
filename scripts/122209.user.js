// ==UserScript==
// @name           Fantasy Premier League Custom Transfer List Price
// @namespace      FPLTransferPrices
// @description    Set a custom price on the Transfer List table of players instead of the irregular set prices.
// @include        *fantasy.premierleague.com/transfers/*
// ==/UserScript==

unsafeWindow.setCustomMaxPrice = function() {
var newMax = prompt("Enter Custom Price (e.g 5.3)","");
newMaxProper = newMax.replace('.', '');
if (newMax.length < 3) {
newMaxProper = newMaxProper + '0';
newMax = newMax + '.0';
}
var select = document.getElementById("ismMaxCost");
select.options[1].value = newMaxProper;
select.options[1].text = '£'+newMax;
select.options[2].value = '';
select.options[2].text = '---';
};
var container = document.getElementsByClassName('ismList ismFilterList');
element = '<label for="ismMaxCost" onClick="setCustomMaxPrice()">Custom</label>';
var new_element = document.createElement('li');
new_element.innerHTML = element;
container[0].insertBefore(new_element, container[0].lastChild);