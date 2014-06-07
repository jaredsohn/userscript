// ==UserScript==
// @name          Web.de mal richtig
// @author        Sagan
// @description   Blendet auf web.de alles aus, au&szlig;er dem Email-login. Das Skript verwendet aktuell noch die Holzhammer Methode. Hilfe f&uuml;r die Verbesserung ist erw&uuml;nscht.
// @include	  http://web.de/
// @include       http://www.web.de/
// ==/UserScript==

// start off by showing nothing
var allContent = document.getElementsByTagName ('*');
for (var i = 0; i < allContent.length; i++) {
	allContent[i].style.display = 'none';
}

// show the container for the login
var boxToDisplay = document.getElementById('formLogin');
boxToDisplay.style.display = 'block';

// show the login fields and buttons
keepChildNodes(boxToDisplay);

// show the containers necessary to view the login field
keepParentNodes(boxToDisplay);

// this element was made visible by calling "keepChildNodes", but I don't want to see it
document.getElementById('loginLinks').style.display = 'none';

// this function shows all parentNodes of the node as blocks
function keepParentNodes(node) {
	if (node.parentNode) {
		if(node.parentNode.style) {
			node.parentNode.style.display = 'block';
		}
		keepParentNodes(node.parentNode);
	}
}

// this function shows all childNodes of the node as blocks
function keepChildNodes(node) {
	if(node.childNodes) {
		for (var i = 0; i < node.childNodes.length; i++) {
			if (node.childNodes[i].style) {
				node.childNodes[i].style.display = 'block';
			}
			keepChildNodes(node.childNodes[i]);
		}
	}
}
