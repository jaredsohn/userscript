// BGU Login script. All rights NOT reserved 2009 © Yuval Adam
// Do whatever the fuck you want with this, it's all yours

// ==UserScript==
// @name           BGU Login
// @namespace      http://userscripts.org/scripts/
// @include        http://bgu4u.bgu.ac.il/html/*
// @exclude        https://www.google.com/*
// ==/UserScript==

var user = "myUserName" 	// enter your user name here
var pass = "myPassword"		// enter your password here
var id = "012345678"		// enter your id number here


var doLogin = function() {
	var formElement = top.frames[0].document.getElementById("mainForm");

	for (var j=0; j < formElement.length; j++) {
		var thisElement = formElement[j];
		if (thisElement.name == "oc_username") {
			thisElement.value = user;
		}
		if (thisElement.name == "oc_password") {
			thisElement.value = pass;
		}
		if (thisElement.name == "rc_id") {
			thisElement.value = id;
		}
	}
}

window.addEventListener(
    'load', 
    doLogin,
    true);
