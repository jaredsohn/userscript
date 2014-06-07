// ==UserScript==
// @name           Amazon - Add link to Shelfari.com
// @namespace      http://mathiasbaert.be/userscripts/amazon.com/addlinktoshelfari
// @description    Adds a link to this book shelfari.com on the book detailpage
// @include        http://www.amazon.com/*
// @include        http://www.amazon.co.uk/*
// ==/UserScript==

// startpoint of this script
prepareDocument();

// functions
// --> setup
	/**
	 * Changes the document to toggling posts
	 */
function prepareDocument(){
	var productImage = document.getElementById('prodImage');
	var isbn = productImage.getAttribute('src').match(/images\/[^\/]+\/(\d+)/)[1];
	productImage.parentNode.parentNode.insertBefore(
		wrapElementInAnchor(
			makeImageShelfariLogo(),
			'http://www.shelfari.com/booksearch.aspx?keywords='+isbn
		),
		productImage.parentNode
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
			'style': 'border:0; margin:0 20px 30px 0;'
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
