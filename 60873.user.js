// ==UserScript==
// @name           Abbey Auto Logout Confirm
// @namespace      http://userscripts.org/users/71721
// @description    Automatically confirms logout when you click logout
// @include        https://retail.abbeynational.co.uk/EBAN_ENS/BtoChannelDriver.ssobto
// ==/UserScript==

(function() {
	var inputs = document.getElementsByTagName('input');
	for (var i = 0; i < inputs.length; i++) {
		if (inputs[i].alt == "Click here to Log off") {
			inputs[i].click();
		}
	}
})();