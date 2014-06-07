// ==UserScript==
// @name        Neopets - Go Go Go - Auto Continue
// @namespace   http://userscripts.org/users/24077
// @description Auto clicks continue while playing Go Go Go
// @include     http://www.neopets.com/prehistoric/gogogo/gogogo.phtml
// @version     1.0
// @grant		none
// ==/UserScript==

(function() {

	//Find all INPUT elements (buttons) that say continue.
	continue_find = document.evaluate("//input[@value='Continue...']", document, null,7, null); 
	//Grabs the button value.
	continue_button = continue_find.snapshotItem(0);
	// Generates a button click event.
	continue_button.click();

})();