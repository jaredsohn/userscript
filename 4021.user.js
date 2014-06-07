// Google Finance Gain/Loss Percent
// version 0.2
// 2006-06-17
// Copyright (c) Tom Preuss
//
// Released under the GPL version 2 or later
// http://www.gnu.org/copyleft/gpl.html
//
// Direct any comments to userscripts@tompreuss.com
//
// This is a Greasemonkey user script.
//
// To install, you need Greasemonkey: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Google Finance Gain/Loss Percent", and click Uninstall.
//
// Current bugs:
// Does not reload with the new update-every-so-often feature
// Often goes off the right side of the window
//
// Changelog:
// Version 0.2     2006-06-17   Adapted to Google's new output
// Version 0.1.1   2006-05-10	Added second and third @include URLs
// Version 0.1     2006-05-03	Initial release
//
// ==UserScript==
// @name	Google Finance Gain/Loss Percent
// @namespace   http://www.tompreuss.com/2006/05/03/google-finance-gainloss-percent-greasemonkey-script/
// @description	Add gain/loss indicator to Google Finance portfolio view
// @include	http://finance.google.com/finance/portfolio?action=view
// @include	http://www.google.com/finance/portfolio?action=view
// @include	http://google.com/finance/portfolio?action=view
// @include	http://finance.google.com/finance/portfolio?action=view&pid=*
// @include	http://www.google.com/finance/portfolio?action=view&pid=*
// @include	http://google.com/finance/portfolio?action=view&pid=*
// ==/UserScript==

(function() {
var investment = document.getElementById("ref_total_netinv").innerHTML.replace(/,/g,"");	//get the total investment value
var gainlossvalue = document.getElementById("ref_total_netval").innerHTML.replace(/,/g,"");	//get the gain/loss number
investment = investment.substr(1, investment.length - 1);	//remove dollar sign from investment number
gainlossvalue = gainlossvalue.substr(1, gainlossvalue.length - 1);	//remove dollar sign from gain/loss number
var percentvalue = (gainlossvalue / investment - 1) * 100;	//calculate percent gained or lost
var percentstr = percentvalue >= 0 ? "+" + percentvalue + "%" : percentvalue + "%";	//if it's positive, change to a plus sign	
percentstr = "(" + percentstr.substr(0, 6) + "%)";	//round percent, add open and close parens and percent sign
var span = document.createElement('span')	//create span
span.innerHTML = percentvalue >= 0 ? "&nbsp;<font color=green>" + percentstr + "</font>" : "&nbsp;<font color=red>" + percentstr + "</font>";	//green for positive, red for negative
document.getElementById("ref_total_netpro").appendChild(span)	//add the span
})();
