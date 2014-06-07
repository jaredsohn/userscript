// ==UserScript==
// @name         Embedded media linker
// @namespace    http://browservulsel.blogspot.com/
// @description  v0.4 - Show links to embedded media
// @include      *
// ==/UserScript==

/*

	Author: Jasper de Vries, jepsar@gmail.com
	Date:   2006-02-28

*/

var i, j, elements, params;
var excludeRe = /flash/i; // exclude media types that match this expression

// First handle embeds (if embed is nested in an object, replace the object with the embed)
elements = document.getElementsByTagName('embed');
for (i = 0; i < elements.length; i++) {
	if (elements[i].hasAttribute('src')) {
		if (elements[i].parentNode.nodeName == 'OBJECT') {
			elements[i].parentNode.parentNode.replaceChild(elements[i], elements[i].parentNode);
		}
		new EmbedLinker(elements[i], elements[i].src);
	}
}

// Then handle objects (if any left)
elements = document.getElementsByTagName('object');
for (i = 0; i < elements.length; i++) {
	if (elements[i].hasAttribute('data')) {
		new EmbedLinker(elements[i], elements[i].data);
	}
	else {
		params = elements[i].getElementsByTagName('param');
		for (j = 0; j < params.length; j++) {
			if (params[j].name.toLowerCase() == 'filename') {
				new EmbedLinker(elements[i], params[j].value);
				break;
			}
		}
	}
}

function EmbedLinker(element, url) {
	if (element.type.match(excludeRe)) return;

	var obj = this;

	// Create link to embeded media
	var a = document.createElement('a');
	a.setAttribute('href', url);
	a.innerHTML = url;
	with (a.style) {
		position = 'absolute';
		zIndex = '32767';
		opacity = 0.3;
		overflow = 'hidden';
		width = element.width +'px';
		height = '9px';
		color = '#00f';
		background = '#fff';
		fontFamily = '"Arial", sans-serif';
		lineHeight = '9px';
		fontSize = '9px';
		fontWeight = 'normal';
		fontStyle = 'normal';
		letterSpacing = 'normal';
		textAlign = 'left';
	}
	a.addEventListener('mouseover', function(){ a.style.opacity = 1; }, false);
	a.addEventListener('mouseout', function(){ a.style.opacity = 0.3; }, false);

	this.resposition = function() {
		var posY = 0;
		var posX = 0;
		var currOffsetParent = element;
		do {
			if (
				document.defaultView.getComputedStyle(currOffsetParent, null)
				.getPropertyValue('position') == 'static'
			) {
				posY += currOffsetParent.offsetTop;
				posX += currOffsetParent.offsetLeft;
			}
			else break;
		}
		while (currOffsetParent = currOffsetParent.offsetParent);

		a.style.top = (posY - 9) +'px';
		a.style.left = posX +'px';
	}

	// reposition absolute positioned elements
	// damn this.. find a way to do this event based
	unsafeWindow.setInterval(obj.resposition, 100);
	this.resposition();

	element.parentNode.insertBefore(a, element);
}
