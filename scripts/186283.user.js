// ==UserScript==
// @name       Speshel Suite
// @namespace  http://zombians.com/forum/user/723-logan/
// @version    0.1
// @description  A suite of Neopets tweaks.
// @match      http://www.neopets.com/market.phtml?type=till
// @include    http://www.neopets.com/market.phtml?type=till
// @copyright  2012+, Speshel; Logan.; Noxush;
// ==/UserScript==


// Automatically adds the Neopoints in your shop till to the text box so you can simply press the 'Withdraw' button.

$currentShopTillValue = $("b:contains('NP'):first").text();
$formattedAmount = $currentShopTillValue.replace(' NP','');
$formattedAmount = $formattedAmount.replace(',','');

if ($formattedAmount < 1) {
	 $("input[name='amount']").val("");
}
else {
	$("input[name='amount']").val($formattedAmount);
}

//