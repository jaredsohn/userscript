// ==UserScript==
// @name          Fronter easy auto-login
// @namespace     Zentriple
// @description	  The script automatically log you into Fronter. If it does not know your username or password it will ask your to enter it, and you can always use the built-in functions to change your login information yourself.
// @include       http://fronter.com/*
// @include       http://www.fronter.com/*
// @include       https://fronter.com/*
// @include       https://www.fronter.com/*
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_registerMenuCommand
// @require       http://ajax.googleapis.com/ajax/libs/jquery/1.3.2/jquery.min.js
// @downloadURL   https://userscripts.org/scripts/source/113439.user.js
// @updateURL     https://userscripts.org/scripts/source/113439.meta.js
// @version       2013.3.6
// ==/UserScript==

(function() {

	// jQuery selector for the input elements
	var username_element = $('#username_input');
	var password_element = $('#password_input');
	var button_element = $('#loginbox .submit');

	// Settings functions
	function setUsername ()
	{
		username_get = prompt ("Please enter your username", username);
		username = username_get;
		GM_setValue ("username", username);
	}
	function setPassword ()
	{
		password_get = prompt ("Please enter your password", password);
		password = password_get;
		GM_setValue ("password", password);
	}

	// Check if username and password is set
	var username = GM_getValue ("username", null);
	if (username == null) { setUsername () }
	var password = GM_getValue ("password", null);
	if (password == null) { setPassword () }

	// Make the settings available
	GM_registerMenuCommand ("Change username", setUsername);
	GM_registerMenuCommand ("Change password", setPassword);

	// Enter username and password if not entered
	if ($(username_element).val().length == 0) { $(username_element).val(username) }
	if ($(password_element).val().length == 0) { $(password_element).val(password) }

	// Login
	$(button_element).click();

})();
