// ==UserScript==
// @name           Bank Withdraw / Deposit All
// @namespace      diceroll123
// @description    Makes the default deposit in the bank all of your on hand NP, and vice versa with withdraw.
// @include        http://www.neopets.com/bank.phtml*
// ==/UserScript==

var frm = document.forms[1];
var frm1 = document.forms[2];
var np = document.body.innerHTML.match(/inventory">([0-9,\,]*)<\/a>/)[1];
var withdraw = document.body.innerHTML.match(/([0-9,\,]*) NP<\/td>/)[1];
np = np.replace(/,/g, '');
if(np>0){frm.elements[1].value = np;}
withdraw = withdraw.replace(/,/g, '');
if (document.body.innerHTML.indexOf('<b>PIN number ') != -1){
if(withdraw>0){frm1.elements[2].value = withdraw;}
} else {
if(withdraw>0){frm1.elements[1].value = withdraw;}
}
