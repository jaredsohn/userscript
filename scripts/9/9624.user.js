// ==UserScript==
// @name          Autocomplete on!
// @namespace     htto://mario-martinez.cl/
// @description   Make your browser remember the password in some web pages who  have disabled that option.
// ==/UserScript==

var elements  = document.getElementsByTagName('*');
for (var i = 0; i < elements.length; i++) {
	var element = elements[i];
	if (element.hasAttribute("autocomplete")) {
		element.setAttribute("autocomplete","on");
	}		
}
