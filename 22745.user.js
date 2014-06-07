// kanjikoohiistorylinks.user.js! user script for Firefox's GreaseMonkey extension
// version 0.1 BETA! Copyright (c) 2007-2008, Mario Huys
// Released under the GPL license: http://www.gnu.org/copyleft/gpl.html
//
// --------------------------------------------------------------------
//
// 0.7 2008.02.13  woelpad  Applied to the stories page
// 0.6 2007.12.20  woelpad  
// 0.5 2007.09.08  woelpad  Improved handling of images
// 0.4 2007.08.30  woelpad  Adapted to cope with the partition into
//          new and favourite stories 
//          Added support for including images in the story
// 0.3 2007.06.13  woelpad  Fix to cope with the new position of the 
//          Learned button inside the storyview
// 0.2 2007.02.27  woelpad  Accept colons in web page urles
// 0.1 2007.02.14  woelpad  First release
//
// --------------------------------------------------------------------
//
// This is a Greasemonkey user script.  To install it, you need
// Greasemonkey 0.5 (?) or later: http://greasemonkey.mozdev.org/
// Then restart Firefox and revisit this script.
// Under Tools, there will be a new menu item to "Install User Script".
// Accept the default configuration and install.
//
// To uninstall, go to Tools/Manage User Scripts,
// select "Kanji.Koohii: Insert Story Links and Pictures", and click Uninstall.
//
// --------------------------------------------------------------------
//
// ==UserScript==
// @name           Kanji.Koohii: Insert Story Links and Pictures
// @namespace      http://userscripts.org/scripts/show/7621
// @description    Inserts pictures and links in stories.
// @include        http://kanji.koohii.com/study/*
// ==/UserScript==

function xpath(query) {
	return document.evaluate(query, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

var authorsRE;

function addLinks(story, linkImage) {
	var ar;
	// Web urls
	for (var node = story.firstChild; node; node = node.nextSibling) {
		if (node.nodeType == 3) {
			while (ar = /(http|ftp|https):\/\/[\]\[\-\w\/?#%@!$&'()*+,;:=._~]*[\w\/?#]/i.exec(node.data)) {
				var url = ar[0];
				var tagStart = ar.index;
				var afterTagEnd = ar.index + url.length;
				var isImage = 0;
				if (!linkImage && (tagStart > 0) && (afterTagEnd < node.data.length)
					&& (node.data.charAt(tagStart - 1) == '{') && (node.data.charAt(afterTagEnd) == '}')) {
					tagStart = tagStart - 1;
					afterTagEnd = afterTagEnd + 1;
					isImage = 1;
				}
				if (tagStart > 0) {
					story.insertBefore(document.createTextNode(node.data.substr(0, tagStart)), node);
				}
				node.data = node.data.substr(afterTagEnd);
				if (isImage) {
					var image = document.createElement('img');
					if (ar = /\?.*((http|ftp|https):\/\/[\]\[\-\w\/?#%@!$&'()*+,;:=._~]*[\w\/?#])/i.exec(url)) {
						var anchor = document.createElement('a');
						story.insertBefore(anchor, node);
						anchor.href = ar[1];
						anchor.appendChild(image);
					} else {
						story.insertBefore(image, node);
					}
					image.src = url;
				} else {
					var anchor = document.createElement('a');
					story.insertBefore(anchor, node);
					anchor.href = url;
					anchor.appendChild(document.createTextNode(url));
				}
			}
		}
	}

	// Authors
	if (authorsRE) {
		for (var node = story.firstChild; node; node = node.nextSibling) {
			if (node.nodeType == 3) {
				while (ar = authorsRE.exec(node.data)) {
					if (ar[1].length > 0) {
						story.insertBefore(document.createTextNode(node.data.substr(0, ar.index + ar[1].length)), node);
					}
					node.data = node.data.substr(ar.index + ar[1].length + ar[2].length);
					var anchor = document.createElement('a');
					story.insertBefore(anchor, node);
					anchor.href = 'javascript:focusOnAuthor("' + ar[2].toLowerCase() + '")';
					anchor.appendChild(document.createTextNode(ar[2]));
				}
			}
		}
	}
	
	// Remove the keyword and extra brackets in frame links surrounded by round brackets, as in '({1234})'.
	story.innerHTML = story.innerHTML.replace(
		/\(<em>([^<]*)<\/em>\s+(\(<a\s+href="\?framenum=\d+")(>FRAME\s+\d+<\/a>\))\)/ig,
		'$2 title="$1"$3');
}

// Study page: Stories
if (/-stories/i.test(window.location.href)) {
	var stories = xpath('//div[@class="bookstyle"]');
	for (var idx = 0; idx < stories.snapshotLength; idx++) {
		addLinks(stories.snapshotItem(idx), 0);
	}
	return;
}

// Study page
var storyAuthors = xpath('//div[@class="sharedstory"]/div[@class="meta"]/span[@class="author"]');
var authorLinks = [];
var authors = new Array();
for (var idx = 0; idx < storyAuthors.snapshotLength; idx++) {
	var authorLink = storyAuthors.snapshotItem(idx);
	var author = authorLink.firstChild.innerHTML.toLowerCase();
	authorLinks[author] = authorLink.wrappedJSObject || authorLink;
	authors.push(author);
}
// No need to add slashes to authors, since they all are composed of basic characters.
authorsRE = new RegExp('(^|[^a-zA-Z0-9_])(' + authors.join('|') + ')($|[^a-zA-Z0-9_])', 'i');

unsafeWindow.focusOnAuthor = function(author) {
	authorLinks[author].scrollIntoView();
};

var storyView = document.getElementById('sv-textarea');
if (!storyView) return;
addLinks(storyView, 0);
// Prevent opening the text box when clicking on an anchor.
storyView.addEventListener('click', function(e) {
	if (e.target.tagName.toLowerCase() == 'a') {
		e.stopPropagation();
	}
}, true);

var sharedStories = xpath('//div[@class="sharedstory"]/div[@class="rtkframe"]/div[@class="bookstyle"]');
for (var idx = 0; idx < sharedStories.snapshotLength; idx++) {
	addLinks(sharedStories.snapshotItem(idx), 1);
}

