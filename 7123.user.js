// ==UserScript==
// @name            Autocomplete Everywhere
// @author          Phillip Beazley
// @namespace       
// @description     Set autocomplete to on for all forms.
// @include         *
// ==/UserScript==

var forms = document.getElementsByTagName('form');

for (i = 0; i < forms.length; i++) {
	forms[i].setAttribute("autocomplete", "on");
	inputs = forms[i].getElementsByTagName('input');
	for (j = 0; j < inputs.length; j++) {
		inputs[j].setAttribute("autocomplete", "on");
	}
}
