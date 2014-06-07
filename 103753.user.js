// ==UserScript==
// @name          Mouseover MediaWiki references
// @namespace     http://www.mediawiki.org
// @description   Displays references in a box after mouseovering for a second
// @exclude       http://en.wikipedia.org/*
// @exclude       https://en.wikipedia.org/*
// @license       GPL version 2; http://www.gnu.org/licenses/gpl-2.0.html
// @version       1.0
// ==/UserScript==

if (!document.querySelector('body.mediawiki')) {
	return; // nothing to see here, move along
}

function onmouseovered () {
	try {
		window.clearTimeout(rmtimeout);
	}
	finally {
		this.getElementsByClassName('gm-mouseover-reference')[0].style.display = 'block';
	}
}

function onmouseouted () {
	rmnode = this;
	rmtimeout = window.setTimeout(rm, 1E3);
}

function rm () {
	rmnode.getElementsByClassName('gm-mouseover-reference')[0].style.display = 'inline';
	rmnode.getElementsByClassName('gm-mouseover-reference')[0].style.display = 'none';
}

function addbox (node) {
	var box = document.createElement('div');
	box.className = 'gm-mouseover-reference';
	box.style.border = '1px solid #99B3FF';
	box.style.backgroundColor = '#E0E8FF';
	box.style.padding = '.5em 1em';
	box.style.display = 'none';
	try {
		var list = document.querySelectorAll(node.childNodes[0].hash);
	}
	catch (e) {
		box.appendChild(document.createTextNode('Sorry, couldn\'t retrieve reference :-('));
		node.appendChild(box); // Both querySelector and appendChild regularly throw exceptions for reasons yet unknown to me
		return;
	}
	for (var i in list) {
		try {
			box.appendChild(list[i].cloneNode(true));
		}
		catch (e) {
			// DOM Exception
		}
	}
	node.appendChild(box);
}

for (var i in document.getElementsByClassName('reference')) {
	addbox(document.getElementsByClassName('reference')[i]);
	document.getElementsByClassName('reference')[i].addEventListener('mouseover', onmouseovered);
	document.getElementsByClassName('reference')[i].addEventListener('mouseout', onmouseouted);
}
