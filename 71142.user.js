// ==UserScript==
// @name           seamlessnosilverware
// @namespace      seamlessnosilverware
// @description    Adds a comment to the comment box asking to not include silverware
// @include        https://www.seamlessweb.com/*
// ==/UserScript==

var instructions = ["No silverware, please.",
					"No plastic utensils please.",
					"Please do not include napkins or utensils."];

function randomchoice(array) {
	return array[Math.floor(Math.random() * array.length)];
}

function addNoSilverwareComment() {
	var specialInstructions = document.getElementById("specialInstructions");
	if (specialInstructions) {
		var value = specialInstructions.value;
		if (value.length > 0) {
			value += "\n";
		}
		value += randomchoice(instructions);
		specialInstructions.value = value;
	} else {
		setTimeout(addNoSilverwareComment, 500);
	}
}

setTimeout(addNoSilverwareComment, 500);