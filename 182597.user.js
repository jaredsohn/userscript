// ==UserScript==
// @name          Ferengizer
// @namespace     http://youngpup.net/userscripts
// @description   Replaces all use of the word "FEMALES" by MRA clowns with Ferengi. Yoinked from https://twitter.com/ZoeQuinnzel/status/368472526571044864
// @include       http://*
// ==/UserScript==

var regex = /\bfemales\b/gi;

walk(document.body);


function walk(node) {

	var child, next;

	switch (node.nodeType) {

		case 1:  // Element
		case 9:  // Document
		case 11: // Document fragment

			child = node.firstChild;

				while (child) {

					next = child.nextSibling;
					walk(child);
					child = next;
				}
				break;

		case 3: // Text node
			if (regex.test(node.nodeValue)) {

				handleText(node);
			}
			break;
	}
}

function handleText(textNode) {

	var v = textNode.nodeValue,
		tokens = v.split(regex),
		parent = textNode.parentNode,
		fragment = document.createDocumentFragment(),
		newNode = document.createElement("span"),
		imageNode = document.createElement("img"),
		numTokens = tokens.length;

	imageNode.src = "http://i.imgur.com/aINMtpr.png";
	// just in case the site has global img { "display: block"; }.
	// Could add "vertical-align: middle;" to make it sit better in the text:
	imageNode.style.cssText = "margin: 0; padding: 0; display: inline;";

	for (var i = 0; i < (tokens.length - 1); i++) {

		var placeholder = document.createTextNode(tokens[i]);

		fragment.appendChild(placeholder.cloneNode(true));
		fragment.appendChild(imageNode.cloneNode(true));
		newNode.appendChild(fragment);
	}

	newNode.appendChild(document.createTextNode(tokens[i]));

	parent.replaceChild(newNode, textNode);
}
