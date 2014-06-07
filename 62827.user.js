// ==UserScript==
// @name           VicTeach.com.au Keyboard Access
// @namespace      http://lachlandonald.com
// @description    Allow keyboard access for the password entry
// @include        https://*.victeach.com.au/*
// ==/UserScript==

(function(){

	// prevent the defocus function from firing
	unsafeWindow.defocus = function() {}

	var keypad = document.getElementById('keypad');
	var password = document.getElementsByName('pwd');

	if(keypad && password.length == 1) {

		// remove the onblur and onclick handlers from the html
		password[0].parentNode.innerHTML =
			'<input type="password" class="input_grey1" name="pwd" value="" />';

		// clear the field on focus
		password[0].addEventListener('focus', function(event) {
			unsafeWindow.cleark();
		}, false);

		// translate keypresses into function calls via the virtual keyboard
		password[0].addEventListener('keypress', function(event) {
			//console.info('pressing ' + String.fromCharCode(event.charCode));
			unsafeWindow.k(String.fromCharCode(event.charCode));
			event.preventDefault();
		}, false);
	}

}());