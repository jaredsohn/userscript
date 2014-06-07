// ==UserScript==
// @name        Neuland
// @namespace   kamikaze.bsdforen.de
// @description Substitute the internet with Neuland
// @include     *
// @version     2
// ==/UserScript==

var level = 0;
function descent(node) {
	if (node.nodeName == "TEXTAREA") {
		return;
	}
	if (node.nodeType == 3) {
		node.data = node.data.replace(/Internet/g, "Neuland");
		node.data = node.data.replace(/INTERNET/g, "NEULAND");
		node.data = node.data.replace(/internet/gi, "neuland");
	}
	for (var i = 0; i < node.childNodes.length; i++) {
		descent(node.childNodes[i]);
	}
}

function update(e) {
	descent(e.target);
}

var bodies = document.getElementsByTagName("body");
for (var i = 0; i < bodies.length; i++) {
	descent(bodies[i]);
	bodies[i].addEventListener("DOMNodeInserted", update, false);
}
