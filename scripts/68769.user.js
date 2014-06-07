// ==UserScript==
// @name           Justify text where appropriate
// @namespace      http://no.web.presence/
// @description    Makes paragraphs use justified text.
// @include        *
// ==/UserScript==

var allElements = document.body.getElementsByTagName("*");
var needsJustifiedAlign = [];

for(var i = 0; i < allElements.length; i++) {
	var candidateElem = allElements[i];
	switch(document.defaultView.getComputedStyle(candidateElem, "").getPropertyValue("text-align")) {
		case "start":
		case "left":
		case "-moz-left":
			needsJustifiedAlign.push(candidateElem);
			break;
		default:
	}
}

needsJustifiedAlign.forEach(function (filteredElem) {
	filteredElem.style.textAlign = "justify";
});
