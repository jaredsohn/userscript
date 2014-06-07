// ==UserScript==
// @name           BvS Village Applicant Alert
// @namespace      Razithel
// @description    Lets you know if you have village applicants.
// @include        http://www.animecubed.com/billy/bvs/village.html
// ==/UserScript==

var myInputs=document.getElementsByTagName("input");
var newVillagers = false;

// Makes an array of the Attack Check radios
for (var i=0; i<myInputs.length; i++) {
	var myElement = myInputs[i];
	if ((myElement.getAttribute("name") == "ninjatoadd") && myElement.getAttribute("value") != 0) {
		newVillagers = true;
	}
}

if (newVillagers == true) {
	var announcements = document.evaluate("//div[@id='annul']", document, null,
	XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	var newAppMessage = document.createElement("p");
	newAppMessage.style.textAlign = "center";
	newAppMessage.style.fontSize = "24";
	newAppMessage.style.fontWeight = "bold";
	newAppMessage.innerHTML = ("You have new applicants!");
	announcements.parentNode.insertBefore(newAppMessage, announcements);
}