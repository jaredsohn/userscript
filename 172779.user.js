// ==UserScript==
// @name        BECU
// @namespace   BECU
// @description	Remove AskBECU sidebar when viewing Accounts.  Allows table to fill the page.
// @include     https://www.becuonlinebanking.org/BECUBankingWeb/*/Accounts/Activity.aspx?*
// @version     1
// ==/UserScript==

var c = document.getElementById("ASKBECUPanel");
if(!!c){
c = c.parentNode.parentNode;
var p = c.parentNode;
p.removeChild(c);
}