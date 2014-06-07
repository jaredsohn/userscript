// ==UserScript==
// @name           Facebook Login
// @namespace      Facebook
// @include        http://www.facebook.com/
// ==/UserScript==

// This script will log you in to Facebook automatically
// In GreaseMonkey, add an user script for http://www.facebook.com
// Copy and paste this script for the new entry. Be sure to change the e-mail address and password to your credentials.

window.addEventListener("load",function() {
	document.getElementById("email").value = "your@email.com"
	document.getElementById("pass").select()
	document.getElementById("pass").value = "your_password"
	document.getElementById("menubar_login").submit()
},true)