// ==UserScript==
// @name           radio
// @namespace      http://userscripts.org/users/23652
// @description    Used as a filler for a little bug on the Greasemonkey script list
// ==/UserScript==

//for (var int i; i<document.getElementsByName('radio').length)
function fillField(input){
	if (input.type == "radio" && input.name) {
		var r = document.getElementsByName(input.name);
		r[randomInt(r.length)].checked = true;
	}
}
function submitForm() {
	for (var i=0; i<f.elements.length; i++)
		fillField(f.elements[i]);
	}
submitForm();

