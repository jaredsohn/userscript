// ==UserScript==
// @name           Raven login
// @namespace      raven.cam.ac.uk
// @description    Automatically completes raven login
// @include        https://raven.cam.ac.uk/auth/authenticate.html?*
// ==/UserScript==

if (document.getElementById("userid")) {
	document.getElementById("userid").value = "User ID"; // enter your CRSid here, e.g. crs28
	document.getElementById("pwd").value = ""; // Enter your password between the speech marks
	form = document.getElementsByName("credentials");
	form[0].submit();
} else document.getElementsByTagName("form")[0].submit();
