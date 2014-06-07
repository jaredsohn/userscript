// ==UserScript==
// @name        Till Withdraw Fill
// @namespace   userscripts.org
// @include     http://www.neopets.com/market.phtml?type=till
// @require	http://code.jquery.com/jquery-latest.min.js
// ==/UserScript==

$shopTill = $("b:contains('NP'):first").text();
$amount = $shopTill.replace(' NP','');
$amount = $amount.replace(',','');

$("input[name='amount']").val($amount);