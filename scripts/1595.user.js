// ==UserScript==
// @name           Autologin
// @namespace      http://henrik.nyh.se
// @description    Allows special URLs that automatically enter form values and submit the form, typically for autologin functionality. No support (yet) for frames or non-text-input form elements. To add an autologin: fill out the log-in form, make sure one of the form fields is focused (contains the caret), go to Tools > User Script Commands > Create autologin from form, and bookmark the generated URL. Visit that bookmark to autologin. Look at the script code for details and examples.
// @include        *
// ==/UserScript==

/*

In case the autologin extraction tool fails, this is how things work:

The data is specified in a fragment (hash) at the end of the URL, similar to a query string.

A form number (the first one on the page is 0, the second one is 1, ...) can be given; otherwise the script will default to the first form.

There is limited support for frames if you edit the URL manually, but not yet in the extraction tool. You can set the frame number for the form (try window.frames[1] etc to figure out the number). For many sites you could just use the form page outside the frameset.

Query values can be encrypted with ROT13 plus ROT5 (see http://4umi.com/web/javascript/rot13.htm) to be somewhat safe against others looking at the screen or your browsing history.

Autologin URLs are the page URL followed by "#", followed by "AUTOLOGIN" or "sAUTOLOGIN" for encrypted values, optionally followed by "=f123" where 123 is the frame index, optionally followed by "=456" where 456 is the form index, followed by a query string. Some autologin examples: http://www.example.com/#AUTOLOGIN&username=Pig&password=sesame123
http://www.example.com/?page=login#AUTOLOGIN&user=Pig&pw=sesame123
http://www.example.com/#sAUTOLOGIN=2&nick=Cvt&pass=frfnzr678
http://www.example.com/#sAUTOLOGIN=f3=2&nick=Cvt&pass=frfnzr678

REAL SITE EXAMPLES

Helgon:
http://www.helgon.net/#sAUTOLOGIN=0&saft=ENCRYPTED_USERNAME&bulle=ENCRYPTED_PASSWORD

PayPal:
https://www.paypal.com/#sAUTOLOGIN=0&login_email=ENCRYPTED_EMAIL&login_password=ENCRYPTED_PASSWORD

SquirrelMail:
http://mail.example.com/src/login.php#sAUTOLOGIN=0&login_username=ENCRYPTED_USERNAME&secretkey=ENCRYPTED_PASSWORD

A Swedish OPAC library:
http://opac.vallentuna.se/pls/bookit/pkg_www_misc.print_index?in_user_id=opac-a-e&in_op_key_id=menupoint_loan#sAUTOLOGIN=f3=0&in_ci_borr_card_id__m=ENCRYPED_CARD_ID&in_pin_code__m=ENCRYPTED_PIN


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


// Extraction tool

GM_registerMenuCommand("Create autologin from form", function() {
	var form = getFocusedForm();
	if (form) {
		var url = location.href.replace(/#.*$/, '') + '#sAUTOLOGIN=' + getFormIndex(form) + getFormValues(form);
		prompt("The autologin URL is below for you to copy.\nBookmark it, and visit that bookmark to autologin.", url, 'Autologin extraction tool');
	} else {
		alert("No form has focus, or the focused form could not be located. Sorry.");
	}
});

function getFocusedForm() {
	GM_addStyle("input:focus, select:focus {background-attachment:fixed;}");
	var result;
	$x("//input | //select").forEach(function(element) {
		var bAt = window.getComputedStyle(element, null).backgroundAttachment;
		if (bAt == "fixed")
			return (result = element);  // Return into getFocusedForm
	});	
	if (result)
		return result.form;
}

function getFormValues(form) {
	var fields = $x("//input[@type='text'] | //input[@type='password']", form);
	var result = "";
	for (var i = 0; i < fields.length; i++) {
		var field = fields[i];
		result += "&" + field.name + "=" + encodeURIComponent(rot(field.value));
	}
	return result;
}

function getFormIndex(form) {
	for (var i = 0; i < document.forms.length; i++) {
		if (form == document.forms[i]) return i;
	}
}


/* Helper functions */

// ROT13 encryption (for letters), from http://4umi.com/web/javascript/rot13.htm
function rot13(s) {
	var i = s.length, b = [], c,
	a = 'a'.charCodeAt(), z = a + 26,
	A = 'A'.charCodeAt(), Z = A + 26,

	r = function(t, p) {
		return String.fromCharCode(((t + 13 - p) % 26) + p);
	};

	while (i--) {
		c = s.charCodeAt(i);
		if (c >= a && c < z)
			b[i] = r(c, a);
		else if(c >= A && c < Z)
			b[i] = r(c, A);
		else
			b[i] = s.charAt(i);
	}
	return b.join('');
}

// ROT5 encryption (for numbers), from http://4umi.com/web/javascript/rot13.htm
function rot5(s) {
	var i = s.length, b = [], c,
	a = '0'.charCodeAt(), z = a + 10,

	r = function(t) {
		return String.fromCharCode(((t + 5 - a) % 10) + a);
	};

	while(i--) {
		c = s.charCodeAt(i);

		if (c >=a && c < z)
			b[i] = r(c);
		else
			b[i] = s.charAt(i);
	}
	return b.join('');
}

// ROT13 + ROT5 encryption
function rot(s) {
	return rot13(rot5(s));
}


/* Staple functions */

function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
