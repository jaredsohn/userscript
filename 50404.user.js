// ==UserScript==
// @name           Iberia PDF
// @namespace      Ricardo Ribalda
// @description    Use Iberia check-in in Linux
// @include        http*://www.iberia.com/autocheckinonline/
// @last update    5/29/09
// ==/UserScript==


function unsetNoadobe(formElements) {
	for (var i = 0; i < formElements.length; i++) {
		thisElement = formElements[i];
		if(thisElement.name == "noAdobe") {
			thisElement.setAttribute("value", false);
		}
	}
}
unsetNoadobe(document.getElementsByTagName("input"));