// ==UserScript==
// @name          Google Clear Button
// @namespace     http://eric.jain.name/2007/03/13/google-clear-button/
// @description   adds a clear button to search forms at Google
// @include       http://*.google.*/*
// ==/UserScript==

addClearButton('gs', 'btnG') || // Web, Images, Blog
addClearButton('gs', 'qt_s') || // Groups
addClearButton('f', 'button-search') || // Video
addClearButton('f', 'btnG') || // Books, Patents, Scholar, Products
addClearButton('s', 'btnS') || // Calendar
addClearButton('search-form', 'search-submit') || // Reader
addClearButton('q_form', 'q_sub'); // Maps
// TODO: Finance, Mail, Photos

function addClearButton(formId, buttonId) {
	var form = document.forms.namedItem(formId, buttonId);
	if (form) {
		var target = form.elements.namedItem(buttonId);
		if (target) {
			var button = document.createElement('input');
			button.setAttribute('type', 'button');
			button.setAttribute('value', 'Clear');
			button.setAttribute('style', 'margin-left:0.25em');
			button.setAttribute('onclick', "var el=document.forms['" + formId + "'].q;el.value='';el.focus()");
			target.parentNode.insertBefore(button, target.nextSibling);
			return true;
		}
	}
	return false;
}
