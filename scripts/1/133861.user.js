// ==UserScript==
// @name        mangareader proxify
// @namespace   smeenai
// @description Proxifies all mangareader links and images on a page to enable US users to view them. Currently uses daveproxy.co.uk
// @include     *
// @version     1
// ==/UserScript==


// helper function that takes a URI and returns a daveproxy version of it
function proxifyURI(uri) {
	return 'http://www.daveproxy.co.uk/browse.php?u=' + encodeURIComponent(uri) + '&b=4';
}

// helper function that takes an element and proxifies the specified attribute
function proxifyElement(element, attribute) {
	element.setAttribute(attribute, proxifyURI(element.getAttribute(attribute)));
}

// helper function that proxifies the specified attribute of a collection of elements
function proxifyCollection(xPath, attribute) {
	var collection = document.evaluate(xPath, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0; i < collection.snapshotLength; ++i) {
		proxifyElement(collection.snapshotItem(i), attribute);
	}
}

// proxifies all mangareader links and images on the current page
function proxify() {
	// proxifies all links
	proxifyCollection('//a[contains(@href, "mangareader.net")]', 'href');
	// proxifies all images
	proxifyCollection('//img[contains(@src, "mangareader.net")]', 'src');
}

proxify();
