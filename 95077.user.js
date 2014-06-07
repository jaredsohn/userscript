// ==UserScript==
// @name           Add Reader to gbar
// @namespace      http://greasemonkey.mikepfirrmann.com
// @description    Add Google Reader link back to where it was in the top-navigation bar on gmail.
// @include        https://mail.google.com/mail/*
// @match          https://mail.google.com/mail/*
// ==/UserScript==

function addReaderLink() {
	var gbar=null,
		linkEls=null,
		secondLinkEl=null,
		readerEl=null;

	// Get the navigation bar element.
	gbar=document.getElementById('gbar');

	// Get the first link in the navigation bar.
	linkEls=gbar.getElementsByTagName('a');

	// Get the third link in the navigation bar.
	secondLinkEl=linkEls.item(1);

	// Create a link to Google Reader.
	readerEl=secondLinkEl.cloneNode();
	readerEl.setAttribute('href', 'https://www.google.com/reader/view/');
	readerEl.innerText="Reader";

	// Insert the reader node after the second link element.
	secondLinkEl.parentNode.insertBefore(readerEl, secondLinkEl.nextSibling);
};

try {
	addReaderLink();
} catch (e) {
	setTimeout(addReaderLink, 50);
}
