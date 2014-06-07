// ==UserScript==
// @name           FaviconizeGoogle
// @namespace      http://userscripts.org/users/89794
// @description    Adds favicons to each link offered by Google search results.
// @include        http://www.google.com/search?*
// ==/UserScript==

// TODO: Provide more options where to place favicon: left of link, right of
// link, left of url, right of url; also inside or outside the link.

// Broken images would be messy, but we don't see them, I don't know why.
// We do see the gap from the image's padding.
// It might be desirable to check each image actually exists/loads, or remove it.
// Is that possible, without making an http request ourselves?

var placeFaviconByUrl = false;

function filterListBy(l,c) {
	var ret = new Array();
	for (var i=0;i<l.length;i++) {
		var it = l[i];
		if (c(it)) {
			ret[ret.length] = it;
		}
	}
	return ret;
}

// var links = document.evaluate("//a[@class='l']",document,null,6,null);
var links = filterListBy(document.links, function(x){ return x.className=='l'; } );

// GM_log("Got links = "+links.snapshotLength);

var style = document.createElement('STYLE');
style.innerHTML = ".favicon { padding-right: 4px; vertical-align: middle; }";
document.getElementsByTagName('head')[0].appendChild(style);

// for (var i=0;i<links.snapshotLength;i++) {
	// var link = links.snapshotItem(i);
for (var i=0;i<links.length;i++) {
	var link = links[i];
	// if (link.href.match('^javascript:') || link.href.match('^#')) {
		// continue;
	// }
//alert(link.href);
	var host = link.href.substring(29).replace(/^[^\/]*:\/\//,'').replace(/\/.*$/,'');
//alert(host);
	// if (host == document.location.host) {
		// continue;
	// }
	var img = document.createElement('IMG');
	img.src = 'http://'+host+'/favicon.ico';
	img.width = '16';
	img.height = '16';
	img.className = 'favicon';
	if (placeFaviconByUrl) {
		// var urlNodes = document.evaluate("./parent-node::li[1]//cite",link,null,6,null);
		// var urlNode = urlNodes.snapshotItem(0);
		var urlNode = link.parentNode.parentNode.getElementsByTagName('cite')[0];
		urlNode.parentNode.insertBefore(img,urlNode);
	} else {
		link.parentNode.insertBefore(img,link);
	}

}