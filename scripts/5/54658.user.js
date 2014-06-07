// ==UserScript==
// @name           Color-changing password fields based on password hash
// @namespace      gcalpo
// @description    Password field changes color as you enter your password.   
// @include        *
// @version       1.0
// ==/UserScript==

// Inspired by Chroma-Hash by Mattt Thompson http://mattt.github.com/Chroma-Hash/

// Userscript code patterned after "Show Password ondblclick" by BlindWanderer http://userscripts.org/scripts/show/13243

window.addEventListener("load", function(e) {
	var inputs, input;
	inputs = document.evaluate(
		"//input[@type]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for(var i = 0; input = inputs.snapshotItem(i); i++) {
		if(input.type.toLowerCase() == "password")
		{
			input.addEventListener('keyup', updateHashColor, false);
			input.addEventListener('change', updateHashColor, false);
			updateHashColorByObject(input);
		}
	}
}, false);

function updateHashColorByObject(input) {
	var hue = djb2hash(input.value) % 360;
	var color = "hsl(" + hue + ", 75%, 80%)";
	input.style.backgroundColor = (input.value.length > 0) ? color: null;
}

function updateHashColor(e) {
	updateHashColorByObject(this);
}

// Hash function copied from ChromaTabs Plus https://addons.mozilla.org/en-US/firefox/addon/8004
function djb2hash(hashstring) {
	var i, hashvalue = 5381;
	for (i = 0; i < hashstring.length; i++) {
		var ascii_code = hashstring.charCodeAt(i);
		hashvalue = ((hashvalue << 5) + hashvalue) + ascii_code;
	}
	return hashvalue;
};
