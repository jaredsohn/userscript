// ==UserScript==
// @name           Facebook Auto-Login 2
// @namespace      Facebook
// @include        http://www.facebook.com/login.php*
// ==/UserScript==

// This script will log you into Facebook automatically
// as long as you have checked "remember me" in the past

window.addEventListener("load",function() {
	document.getElementById("login").click()
},true)