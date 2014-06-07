// ==UserScript==
// @name        NeverStaySignedIn
// @namespace   http://hey-google-screw-you.lol
// @include     https://accounts.google.com/ServiceLogin*
// @grant       none
// ==/UserScript==

(function(){

	var persistCookieCheckbox = document.getElementById("PersistentCookie");
	if(persistCookieCheckbox){
		persistCookieCheckbox.checked = false;
		persistCookieCheckbox.disabled = true;
	}

})();