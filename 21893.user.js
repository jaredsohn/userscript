// ==UserScript==
// @name           Go to Bottom
// @namespace      http://www.userscripts.org/scripts/show/21893
// @description    Puts a link at the top of every script page to go to the bottom(to read comments)
// @include        http://userscripts.org/*
// @include        http://www.userscripts.org/*
// ==/UserScript==

var footer, content, newElement, newElement2;
 footer = document.getElementById('footer');
 content = document.getElementById('content');

if (content) {
	newElement2 = document.createElement('a');
	newElement2.setAttribute('href', '#bottom');
	newElement2.setAttribute('name', 'top');
	newElement2.appendChild(document.createTextNode('Bottom of Page'));
	content.parentNode.insertBefore(newElement2, content);
	
	newElement = document.createElement('a');
	newElement.setAttribute('name', 'bottom');
	newElement.setAttribute('href', '#top');
	newElement.appendChild(document.createTextNode('Top of Page'));
	footer.parentNode.insertBefore(newElement, footer);
}