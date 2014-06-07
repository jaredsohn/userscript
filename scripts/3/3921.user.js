// ==UserScript==
// @name          gfinance
// @description	Add gain/loss in pctg
// @include		http://www.google.*/finance/portfolio*
// ==/UserScript==

var els=document.getElementsByTagName("table");
var lastrow = els[1].rows.length - 1;
var investment = els[1].rows[lastrow].cells[1].innerHTML;
var value = els[1].rows[lastrow].cells[2].innerHTML;
investment = investment.substr(1, investment.length - 1);
value = value.substr(1, value.length - 1);
var gain = (value / investment - 1) * 100;
var gainstr = gain >= 0 ? "+" + gain + "%" : gain + "%";
gainstr = "(" + gainstr.substr(0, 5) + "%)";
els[1].rows[lastrow].cells[4].innerHTML = gain >= 0 ? "<font color=green>" + gainstr + "</font>" : "<font color=red>" + gainstr + "</font>";
