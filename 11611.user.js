// ==UserScript==
// @name           Redwood Credit Union RCU Password Filler
// @description    Automates the Redwood Credit Union (redwoodcu.org) login process. Supports multiple accounts. Uses a dropdown selectbox to choose your account. Defeats anti-password-saving measures taken on the site.
// @namespace      http://greasemonkey.kramers.ws/
// @include        https://www.rcuconnect.org/estamp/eStamp*
// @include        https://www.rcuconnect.org/cgi-bin/mcw000.cgi?MCWSTART
// ==/UserScript==

// List your accounts here. Add more lines as needed.
var pws = {
	// Login        Password
	// ----------   -------------------
	  'acct1':     'password1',
	  'acct2':     'password2'
};

if (window.location.href.indexOf('rcuconnect.org/estamp/eStamp') != -1) { // Need password
	var form = document.getElementsByTagName('form')[1];
	var user = form.getElementsByTagName('input')[3].value;
	var pw = pws[user.toLowerCase()];
	if (typeof(pw) != 'undefined') {
		var pwField = form.getElementsByTagName('input')[9];
		pwField.value = pw;
		form.submit();
	}
} else { // Need username selector
	var form = document.getElementsByTagName('form')[0];
	var unInput = form.getElementsByTagName('input')[3];
	var unSelect = document.createElement('select');
	unSelect.name = unInput.name;
	var accountCount = 0;
	for (var key in pws) {
		unSelect.innerHTML += '<option value="'+key+'">'+key+'</option>';
		accountCount++;
	}
	unInput.parentNode.replaceChild(unSelect, unInput);
	if (accountCount == 1) {
		form.submit(); // Log in to the only account available
	} else {
		unSelect.onchange = form.submit; // Auto submit on select account
	}
}