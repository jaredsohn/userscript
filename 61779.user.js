// ==UserScript==
// @name           Show Image Thumbnail
// @description    Offers a thumbnail of the image for easy access to URL, contextual menu, drag-and-drop functions, etc.
// @namespace      http://www.flickr.com/photos/gustavog
// @include        http://www.flickr.com/photos/*/*
// ==/UserScript==

//Get the image path and create the "thumbnail"
var images = document.evaluate(
	'//div[starts-with(@id,"photoImgDiv")]//img',
    document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var image = images.snapshotItem(0);
var th = document.createElement("img");
th.setAttribute("src",image.src);
th.setAttribute("width", 50);

//Create the link
var urltext = ' Image URL';
var text = document.createTextNode(urltext);
var	link = document.createElement('a');
link.setAttribute('href', image.src);
link.setAttribute('class', 'Plain');
link.appendChild(th);
link.appendChild(text);

//Add it to the top of the right-side column
var newdiv = document.createElement('div');
newdiv.setAttribute('style', 'position:relative;left:+2px;');
newdiv.appendChild(link);
var widget = document.evaluate("//*[@class='Widget']", document, null, XPathResult.ANY_TYPE,null).iterateNext();
widget.parentNode.insertBefore(newdiv, widget);
