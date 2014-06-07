// ==UserScript==
// @name		The Free Dictionary 2 Wikipedia
// @description		This script permits to quickly jump to Wikipedia when you read an encyclopedia article on thefreedictionary.com. You can click on the article title, and a "(w)" link is added after every internal link. Also change some 'javascript:' links to regular links, allowing double-click.
//
// @changelog
//	1.0.1 :
//		- including www.tfd.com as well
//	1.0 :
//		- first public release
//
// @include		http://*.thefreedictionary.com/*
// @exclude		http://a.thefreedictionary.com/*
// @include		http://*.tfd.com/*
// @exclude		http://a.tfd.com/*
// ==/UserScript==

/*
 * @author		Xavier Robin (aka Calimo)
 * @version		1.0.1
 * @created		2010-04-20
 * @email		mozilla [at] romandie [dot] com
 */

(function() {
	/* LINKIFY THE TITLE IN ENCYCLOPEDIA */
	if (window.location.href.indexOf("http://encyclopedia.thefreedictionary.com/") == 0) {
		// get all the links of the page
		var divs = document.getElementsByTagName("div");
		var brand_copy;
		for (var div in divs) {
			if (divs[div].className == "brand_copy") {
				brand_copy = divs[div];
				break;
			}
		}
		var brand_copyLinks = brand_copy.getElementsByTagName("a");
		// loop on all links
		for (var i in brand_copyLinks) {
			var link = brand_copyLinks[i];
			var href = link.getAttribute("href");
			var e = href.indexOf('http://en.wikipedia.org/wiki/');
			if (e != -1) {
				var h1title = document.getElementById("MainTitle").firstChild;
				var newLink = document.createElement('a');
				newLink.setAttribute("href", href);
				newLink.setAttribute("title", "View in Wikipedia");
				var newTxtNode = document.createTextNode(h1title.firstChild.data); 
				newLink.appendChild(newTxtNode);
				h1title.replaceChild(newLink, h1title.childNodes[0]);
				break;
			}
		}
	}
	/* FOR ALL THE OTHER LINKS TO ENCYCLOPEDIA, APPEND A DIRECT LINK TO WIKIPEDIA */
	// get all the links of the page
	var allLinks = document.links;
	// loop on all links
	for (var i in allLinks) {
		var link = allLinks[i];
		var href = link.getAttribute("href");
		var doit;
		// first remove "wknln" links
		var e = href.indexOf('javascript:wklnk(');
		if (e != -1) {
			href = href.replace(/^javascript:wklnk\('(.+)'\)$/, "http://encyclopedia.thefreedictionary.com/$1");
			link.href = href;
		}
		// determine what to link
		if (window.location.href.indexOf("http://encyclopedia.thefreedictionary.com/") == 0) {
			// in the encyclopedia, do not link http: links, javascript, anchors…
			doit = href.indexOf('http:') != 0 && href.indexOf('/') != 0 && href.indexOf('javascript:')  != 0 && href.indexOf('#') != 0 && href.indexOf('mailto:') != 0
		}
		else {
			// elsewhere, require http://encyclopedia.thefreedictionary.com/
			doit = href.indexOf('http://encyclopedia.thefreedictionary.com/') == 0
		}
		// Select only relative links, not external, javascript, anchors…
		if (doit) {
			var fs = link.firstChild;
			// do not make this transformation for links with only one images as child
			if (fs.nodeName != "IMG" | link.childNodes.length > 1) {
				// Create the new link and its content
				
				if (window.location.href.indexOf("http://encyclopedia.thefreedictionary.com/") != 0) {
					href = href.replace(/^http:\/\/encyclopedia.thefreedictionary.com\//, "http://en.wikipedia.org/wiki/");
				}
				else {
					href = href.replace(/^/, "http://en.wikipedia.org/wiki/");
				}
				href = href.replace(/\+/g, "_");
				var newLink = document.createElement('a');
				newLink.setAttribute("href", href);
				newLink.setAttribute("title", "View in Wikipedia");
				var newTxtNode = document.createTextNode('(w)'); 
				newLink.appendChild(newTxtNode);
				var newSup = document.createElement('sup');
				newSup.appendChild(newLink);
				// Append it to the DOM tree
				var siblingToInsertBefore = link.nextSibling;
				if (siblingToInsertBefore) { // if there is a sibling, insert it just before
					//siblingToInsertBefore.parentNode.insertBefore(document.createTextNode("\u00a0"), siblingToInsertBefore);
					siblingToInsertBefore.parentNode.insertBefore(newSup, siblingToInsertBefore);
				}
				else { // otherwise append to the end of the parent
					//link.parentNode.appendChild(document.createTextNode("\u00a0"))
					link.parentNode.appendChild(newSup)
				}
			}
		}
	}
})();
