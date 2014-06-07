// ==UserScript==
// @name           Schoology Auto Login
// @description    Automatically clicks the login button for schoology when you visit the home page.
// @include        https://www.schoology.com/home.php
// @version        1.0
// ==/UserScript==

schoologyAutoClick = function() {
	var schoologyLoginButton = document.getElementById('edit-submit');

	schoologyLoginButton.click()();
	}

schoologyAutoClick();