// ==UserScript==
// @id             harvardextensionautologinscript@userscripts.org
// @name           Harvard Extension Auto Login
// @version        1.4
// @release        2013-02-22
// @author         Benjamin Harris
// @license        Creative Commons Attribution-NonCommercial-NoDerivs 3.0 Unported License
// @namespace      harvardextensionautologinscript@userscripts.org
// @updateURL      http://userscripts.org/scripts/source/112086.meta.js
// @description    This script remembers your Harvard login info and will automatically log you in when you visit a Harvard-run webpage requiring you to log in. This script can handle both iSites and the Online Services Menu.
// @include        *pin1.harvard.edu*
// @include        *dceweb.harvard.edu/prod/gowlogn3.taf*
// ==/UserScript==

var url = window.location.href.toLowerCase();

if (url.indexOf("/prod/gowlogn3.taf") != -1) {
	// If on wrong login page, redirect to correct login page.
	document.getElementsByName("Submit")[0].click();
} else if (url.indexOf("/pin/authenticate") != -1) {
	// If on right login page then verify the login, fill out the information, and login.
	// Define functions
	document.getElementsByClassName = function(cl) {
		// Defines the "getElementsByClassName" function.
		var retnode = [];
		var myclass = new RegExp('\\b'+cl+'\\b');
		var elem = this.getElementsByTagName('*');
		for (var i = 0; i < elem.length; i++) {
			var classes = elem[i].className;
			if (myclass.test(classes)) retnode.push(elem[i]);
		}
		return retnode;
	};

	GM_getValue = function(name, defaultValue) {
		var value = localStorage[name];
		return value == null ? defaultValue : JSON.parse(value);
	}

	GM_setValue = function(name, value) {
		localStorage[name] = JSON.stringify(value);
	}

	// Now verify login information
	if (GM_getValue("userHUID") === undefined) {
		// If user ID is undefined, ask user to set it.
		var prompt1 = prompt("<HARVARD EXTENSION AUTO LOGIN>\nPlease enter your Harvard University ID number: ", "");
		if (prompt1 !== null) {
			GM_setValue("userHUID", window.btoa(prompt1));
		}
		window.location.reload();
	}
	if (GM_getValue("userPassword") === undefined) {
		// If user Password is undefined, ask user to set it.
		var prompt2 = prompt("<HARVARD EXTENSION AUTO LOGIN>\nPlease enter your Harvard pin/password: ", "");
		if (prompt2 !== null) {
			GM_setValue("userPassword", window.btoa(prompt2));
		}
		window.location.reload();
	}

	// Now input the information and submit
	document.getElementById("authenId").value = window.atob(GM_getValue("userHUID"));
	document.getElementById("authenPassword").value = window.atob(GM_getValue("userPassword"));
	document.getElementsByClassName("login-button")[0].click();
} else if (url.indexOf("/pin/success") != -1) {
	// If on login success page, skip waiting time
	document.getElementsByClassName("faq-link")[0].click();
}