// ==UserScript==
// @name       TW Auto Login
// @namespace  http://www.scottystreet.co.uk/
// @version    0.1
// @description  Auto login to TW.
// @match      http://www.tribalwars.net/
// @copyright  Nahh...
// @require    http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// ==/UserScript==

twLogin = function() {
    var loginLink = $("span:contains('World 67')")
	if(!loginLink) return false;
	loginLink.click();
	return true;
}
twLogin();