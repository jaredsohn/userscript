// ==UserScript==
// @name           Show Image URL
// @namespace      http://www.flickr.com/photos/gustavog
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

var images = document.evaluate(
	'//div[starts-with(@id,"photoImgDiv")]//img',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var image = images.snapshotItem(0);
var newdiv = document.createElement('div');
var urltext = '[URL]';
var text = document.createTextNode(urltext);
var	link = document.createElement('a');
link.setAttribute('href', image.src);
link.appendChild(text);
newdiv.appendChild(link);
image.parentNode.appendChild(newdiv, image);
