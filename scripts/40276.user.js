// ==UserScript==
// @name			Turn Zoominfo Login Auto Complete On
// @namespace		turnPaypalLoginAutoCompleteOn
// @include			https://secure.zoominfo.com/Login.aspx?*
// @include			https://secure.zoominfo.com/Login.aspx?*
// @version			1.0
// @description		This will turn autocomplete on for the zoominfo login password field.
// ==/UserScript==

try{
	var turnPaypalLoginAutoCompleteOn = {};
	
	turnPaypalLoginAutoCompleteOn.loginPasswordField = document.getElementById('aspnetForm');
	
	if( turnPaypalLoginAutoCompleteOn.loginPasswordField.getAttribute("autocomplete") == "off" ){
		turnPaypalLoginAutoCompleteOn.loginPasswordField.setAttribute("autocomplete","on");
	}
}
catch(e){}