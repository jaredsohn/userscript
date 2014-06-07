// ==UserScript==
// @name			Amazon - Add link to Shelfari
// @author			Thomas Gagnon
// @author			mathias
// @namespace	http://euicho.com/greasemonkey/amazon-shelfari
// @version		2.2
// @description	Adds a link to this book shelfari.com on the book detailpage. This script was by mathias, I updated it to work again (was broken/abandoned since 2007), and make it target only books (and ebooks/audiobooks). v2.2 fixes a problem with "look inside" (big thanks for the bug report/fix Andrei!)
// @include		http://www.amazon.com/*
// @include		http://www.amazon.co.uk/*
// @include		http://www.amazon.ca/*
// ==/UserScript==

// startpoint of this script
prepareDocument();

// functions
// --> setup

function prepareDocument() {
	
	var storeID = document.getElementsByName('storeId.att');
	if (storeID.item(0) == null) {
		return 0;
	}
	
	if ((storeID.item(0).getAttribute('value') != 'digital-text') && (storeID.item(0).getAttribute('value') != 'books')) {
		return 0;
	}
	
	var asin = document.getElementsByName('asin.att');
	var isbn = asin.item(0).getAttribute('value');
	if (isbn == '') {
		return 0;
	}
	
	var btAsinTitle = document.getElementById('btAsinTitle');
	btAsinTitle.parentNode.parentNode.insertBefore(
		wrapElementInAnchor(
			makeImageShelfariLogo(),
			'http://www.shelfari.com/booksearch.aspx?keywords='+isbn
		),
		btAsinTitle.parentNode
	);
}
//<-- setup

//--> DOMhelpers
	/**
	 * @return HTMLElement
	 */
function makeImageShelfariLogo(){
	return makeElement(
		'img',
		{
			'src': 'data:image/png;base64,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',
			'style': 'border:0; margin:0 20px 6px 0;'
		}
	);
}
	/**
	 * @param  string
	 * @param  object
	 * @return HTMLElement
	 */
function makeElement(name, options){
	var i, element = document.createElement(name);
	for ( i in options ) {
		if ( typeof(options[i])=='string' ) {
			element.setAttribute(i, options[i]);
		}
	}
	return element;
}
	/**
	 * @param HTMLElement
	 * @param string
	 * @return HTMLElement link
	 */
function wrapElementInAnchor(element, href){
	var a = document.createElement('a');
	a.setAttribute('href', href||'#');
	if ( element.parentNode ) {
		element.parentNode.insertBefore(a, element);
	}
	a.appendChild(element);
	return a;
}
//<-- DOMhelpers
