// ==UserScript==
// @name           Hidden Fields
// @namespace      forms
// @description    Displays Hidden Fields
// @include        *
// ==/UserScript==

forms = document.forms.length;
count = 0;

while (count < forms) {
	inputs = document.forms[count].elements;
	for each (element in inputs) {
		if (element.type == 'hidden') {
			element.type = 'text';
		}
	}
	count++;
}