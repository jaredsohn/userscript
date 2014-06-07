// ==UserScript==
// @name        KivaLendingMultiplier
// @namespace   eelcodevlieger
// @description Kiva - Lending Multiplier - Ratio of (Total Amount Lent / Total Deposits)
// @include     https://www.kiva.org/portfolio
// @version     1
// @grant       none
// ==/UserScript==

var totalDepositsEm = $(".deposit_circle .number_sans")[0];
var totalDeposits = parseFloat( totalDepositsEm.innerHTML.replace(",", "").substr(1) );

var totalAmountLentEm = $(".deposit_circle .bottom .number_sans")[0];
var totalAmountLent = parseFloat( totalAmountLentEm.innerHTML.replace(",", "").substr(1) );

// Ratio of (Total Amount Lent / Total Deposits)
var ratio = totalAmountLent / totalDeposits;

// Create new multiplier ratio element    
var ratioEm = document.createElement('div');
ratioEm.setAttribute('class', 'number_sans top');
ratioEm.setAttribute('style', 'margin-left:4px; margin-top:12px; width:100%; font-size: 1.5em;');
ratioEm.setAttribute('alt', 'Multiplier - Ratio of (Total Amount Lent / Total Deposits)');
ratioEm.setAttribute('title', 'Multiplier - Ratio of (Total Amount Lent / Total Deposits)');
ratioEm.innerHTML = "" + ratio.toFixed(2) + " x";

// Add the new multiplier ratio element 
totalDepositsEm.parentNode.insertBefore(ratioEm, totalDepositsEm.nextSibling);