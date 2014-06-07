// ==UserScript==
// @name			Turn Paypal Login Auto Complete On
// @namespace		turnPaypalLoginAutoCompleteOn
// @include			https://www.paypal.com/*
// @include			http://www.paypal.com/*
// @version			1.0
// @description		This will turn autocomplete on for the paypal login password field.
// ==/UserScript==

try{
	var turnPaypalLoginAutoCompleteOn = {};
	
	turnPaypalLoginAutoCompleteOn.loginPasswordField = document.getElementById('login_password');
	
	if( turnPaypalLoginAutoCompleteOn.loginPasswordField.getAttribute("autocomplete") == "off" ){
		turnPaypalLoginAutoCompleteOn.loginPasswordField.setAttribute("autocomplete","on");
	}
}
catch(e){}
