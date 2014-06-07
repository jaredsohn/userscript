// ==UserScript==
// @name			Turn Blogger Login Auto Complete On
// @namespace		turnBloggerLoginAutoCompleteOn
// @include			https://www.blogger.com/*
// @include			http://www.blogger.com/*
// @version			1.0
// @description		This will turn autocomplete on for the blogger login password field.
// ==/UserScript==

try{
	var turnBloggerLoginAutoCompleteOn = {};
	
	turnBloggerLoginAutoCompleteOn.loginPasswordField = document.getElementById('Passwd');
	
	if( turnBloggerLoginAutoCompleteOn.loginPasswordField.getAttribute("autocomplete") == "off" ){
		turnBloggerLoginAutoCompleteOn.loginPasswordField.setAttribute("autocomplete","on");
	}
}
catch(e){}
