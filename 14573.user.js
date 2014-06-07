// ==UserScript==
// @name           PayPal withdrawal automater
// @namespace      martin@geological-supplies.com
// @include        https://www.paypal.com/*/cgi-bin/webscr?cmd=_withdraw-funds*
// @include        https://www.paypal.com/*/cgi-bin/webscr?cmd=_flow*
// @version        1.0.2 : should work with amounts > 1,000
// @version        1.0.1.1 : should work with non-UK accounts by default
// ==/UserScript==

//Move to second page if necessary
if (window.location.href.match(/_withdraw-funds[^-$]/)) window.location.href="https://www.paypal.com/uk/cgi-bin/webscr?cmd=_withdraw-funds-bank" ;

//Withdraw everything
document.getElementsByName("amount")[0].value = document.getElementsByName("holding_ccode")[0].parentNode.innerHTML.match(/[^,\d]([,\d]*\.\d*)[^,\d]/)[1];

//Select 2nd  account in list.  To change the default account, modify the "1" in the line below to the index of the account you wish to use (0 is the first in the list, 1 is the second, and so on).
document.getElementsByName("ach_id")[0].selectedIndex = 1;

//Automatically submit the form:
document.getElementsByName("WithDrawForm")[0].submit();