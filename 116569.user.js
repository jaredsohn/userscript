// ==UserScript==
// @name           Autologin
// @namespace      http://henrik.nyh.se
// @description    Allows special URLs that automatically enter form values and submit the form, typically for autologin functionality. No support (yet) for frames or non-text-input form elements. To add an autologin: fill out the log-in form, make sure one of the form fields is focused (contains the caret), go to Tools > User Script Commands > Create autologin from form, and bookmark the generated URL. Visit that bookmark to autologin. Look at the script code for details and yahoos.
// @include        *
// ==/UserScript==

/*

In case the autologin extraction tool fails, this is how things work:

The data is specified in a fragment (hash) at the end of the URL, similar to a query string.

A form number (the first one on the page is 0, the second one is 1, ...) can be given; otherwise the script will default to the first form.

There is limited support for frames if you edit the URL manually, but not yet in the extraction tool. You can set the frame number for the form (try window.frames[1] etc to figure out the number). For many sites you could just use the form page outside the frameset.

Query values can be encrypted with ROT13 plus ROT5 (see http://4umi.com/web/javascript/rot13.htm) to be somewhat safe against others looking at the screen or your browsing history.

Autologin URLs are the page URL followed by "#", followed by "AUTOLOGIN" or "sAUTOLOGIN" for encrypted values, optionally followed by "=f123" where 123 is the frame index, optionally followed by "=456" where 456 is the form index, followed by a query string. Some autologin yahoos: https://login.yahoo.com/config/login_verify2?.intl=in&.src=ym

REAL SITE YAHOO

Helgon:
https://login.yahoo.com/config/login_verify2?.intl=in&.src=ym


TODO

* Handle frames better
* Autologin extraction tool should support select, radiobuttons, checkboxes?
* Only menu item if form active?

*/

// Perform autologin

(function() {  // Give us something to return from

	var hash = top.location.hash, loginType;

	if (loginType = hash.match(/s?AUTOLOGIN/)) {
		var parts = hash.split('&');

    var frameIndex = parts[0].match(/f(\d+)/);
    if (frameIndex && top.frames.length) {
      frameIndex = frameIndex[1];
      var thisFrame = (top.frames[frameIndex]==window);
      if (!thisFrame) return;      
    }

		var formIndex = parts[0].match(/=(\d+)/);
		formIndex = (formIndex ? formIndex[1] : 0);

		var form = document.forms[formIndex];
		if (!form) return GM_log("Couldn't find form number "+formIndex+"!");

		for (var i = 1; i < parts.length; i++) {  // Loop through each key/value pair
			var kv = parts[i].split('=').map(decodeURIComponent), key = kv[0], value = kv[1];
			
			var keyElement = form.elements.namedItem(key);
			if (!keyElement) return GM_log('Couldn\'t find a form element named "'+key+'"!');

			if (loginType == 'sAUTOLOGIN')  // Decrypt ROTed values
				value = rot(value);

			if (!value)  // Prompt for unspecified values
				value = prompt(key+'=?');

			keyElement.value = value;
		}

		form.submit();
	}

})();

