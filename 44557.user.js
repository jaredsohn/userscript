// ==UserScript==
// @name           Hotmail Login
// @namespace      HotmailLogin
// @include        www.hotmail.com
// ==/UserScript==

// This script will log you in to Hotmail automatically
// In GreaseMonkey, add an user script for http://login.live.com*
// Copy and paste this script for the new entry. Be sure to change the e-mail address and password to your credentials.
// This script unchecks the "Remember me on this computer" checkbox. Comment out line 1 if you don't want this

window.addEventListener("load",function() {
	document.getElementById("i0201").checked = false
	document.getElementById("i0116").value = "username@hotmail.com"
	document.getElementById("i0118").value = "password"
	document.getElementById("idSIButton9").click()
},true)