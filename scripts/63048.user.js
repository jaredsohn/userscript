// ==UserScript==
// @name        SA Forums Custom Accesskeys
// @namespace   meta.ironi.st
// @include     http://forums.somethingawful.com/*
// @author      Nigglypuff
// ==/UserScript==

/*
	To add more access keys, add items to this list of associations.
	the text represents a link on the page, either by its content
	or its tooltip. Note that these are case-sensitive.
*/

var associations = {
	n: 'next page »',
	p: 'previous page',
	r: 'Reply',
	u: 'User Control Panel',
	l: 'last page',
	f: 'first page'
};

document.addEventListener('keypress', function(press) {
	if (! /HTML|BODY/.test(press.target.nodeName)) return;
	
	var key = String.fromCharCode(press.charCode).toLowerCase(),
		action = associations[key];
	
	if (action) {
		var link = findLinkWithCaption(action) || findLinkWithText(action);
		
		if (link) location.assign(link.href);
	}
}, false);

function findLinkWithText(text) {
	var i = 0, link;
	while (link = document.links[i++]) {
		if (text == link.textContent) return link;
	}
};

function findLinkWithCaption(caption) {
	var link = document.querySelector(SELECTOR.join(caption));
	if (link && link.nodeName != 'A') link = link.parentNode;
	return link;
};

const SELECTOR = 'a *[alt="$1"], a *[title="$1"], a[title="$1"]'.split('$1');

