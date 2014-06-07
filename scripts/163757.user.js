// ==UserScript==
// @name        GithubAccessibilityFixes
// @namespace   http://bramd.nl/
// @description Improves Github accessibility
// @include     https://github.com/*
// @version     0.2
// ==/UserScript==

function hasClass (element, selector) {
	var className = " " + selector + " ";
	if ((" " + element.className + " ").replace(/[\n\t]/g, " ").indexOf(className) > -1 ) {
		return true;
	} else {
		return false;
	}
}

function fixTooltippedLinks () {
	var links = document.getElementsByTagName('a');
	for (var i = 0; i < links.length; i++) {
		var link = links[i];
		if (hasClass(link, "tooltipped")) {
			var children = link.children;
			for (var j = 0; j < children.length; j++) {
				var child = children[j];
				if (hasClass(child, "mini-icon")) {
					child.setAttribute('aria-hidden', 'true');
				}
			}
			if (!(/[a-zA-Z0-9]/).test(link.textContent)) {
				var span = document.createElement("span");
				span.appendChild(document.createTextNode(link.getAttribute("original-title")));
				link.appendChild(span);
			}
		}
	}
}

document.addEventListener("DOMContentLoaded", function(){
	document.removeEventListener("DOMContentLoaded", arguments.callee, false);
	fixTooltippedLinks();
}, false);