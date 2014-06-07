// ==UserScript==
// @name           Google Images text links for image sizes
// @namespace      http://henrik.nyh.se
// @description    Replaces the Google Images image size select box with text links, as it used to be.
// @include        http://images.google.tld/images?*
// ==/UserScript==


var eShowing = $x('//select/ancestor::td/preceding-sibling::td/font')[0];
var eSizes = $x('//select/ancestor::td')[0];

var sizes = {
	'All sizes': '',
	'Large': 'xxlarge',
	'Medium': 'small|medium|large|xlarge',
	'Small': 'icon',
};


destroy(eShowing);
eSizes.innerHTML = '';
eSizes.setAttribute('colspan', 2);

for (size in sizes) {
	var link = document.createElement('a');
	with (link) {
		innerHTML = size;
		href = location.href.replace(/[&?]imgsz=[a-z|]+/, '');
		if (sizes[size]) href += '&imgsz='+sizes[size];
		style.fontSize = '13px';
		style.margin = '0 0.5em';
	}
	eSizes.appendChild(link);
}


/* Staple functions */

function destroy(node) { node.parentNode.removeChild(node); }
function $x(path, root) {
	if (!root) root = document;
	var i, arr = [], xpr = document.evaluate(path, root, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (i = 0; item = xpr.snapshotItem(i); i++) arr.push(item);
	return arr;
}
