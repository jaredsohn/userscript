// ==UserScript==
// @name           Metalinks
// @namespace      http://example.com/metalinks
// @description    A sidebar of links scraped from the current Metafilter page's comments.
// @include        http://metafilter.com/*
// @include        http://*.metafilter.com/*
// ==/UserScript==

var pathPrefix = location.pathname;
var slashIdx = pathPrefix.indexOf('/', 1);
if (slashIdx != -1) {
	pathPrefix = pathPrefix.substr(0, slashIdx);
}
var urlPrefix = location.protocol + '//' + location.host + pathPrefix + '/';

function LinkInfo(link, text, author, time, backlink) {
	this.link = link;
	this.text = text;
	this.author = author;
	this.time = time;
	this.backlink = backlink;
}

var linkSuperset = document.evaluate(
	"//div[contains(concat(' ', @class, ' '), ' comments ')]//a",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

var linkInfos = new Array();

for (var i = 0; i < linkSuperset.snapshotLength; i++) {
	var link = linkSuperset.snapshotItem(i);
	var parent = link.parentNode;
	var comment = null;
	while (true) {
		if ((parent == null) || (parent == document)) {
			break;
		}

		var parentClasses = ' ' + parent.getAttribute('class') + ' ';
		if ((parentClasses.indexOf(' smallcopy ') != -1) ||
				(parentClasses.indexOf(' whitesmallcopy ') != -1)) {
			break;
		}
		if (parentClasses.indexOf(' comments ') != -1) {
			comment = parent;
			break;
		}
		parent = parent.parentNode;
	}
	
	if (comment == null) {
		continue;
	}
	
	var smallcopyLinks = document.evaluate(
		"span[contains(concat(' ', @class, ' '), ' smallcopy ')]//a",
		comment, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	if (smallcopyLinks.snapshotLength < 2) {
		continue;
	}
	
	if (link.href.indexOf(urlPrefix) == 0) {
		continue;
	}

	var author = smallcopyLinks.snapshotItem(0).innerHTML;
	var time = smallcopyLinks.snapshotItem(1).innerHTML;
	var backlink = smallcopyLinks.snapshotItem(1).href;	

	var text = comment.textContent;
	var postedByIndex = text.lastIndexOf('posted by');
	if (postedByIndex != -1) {
		text = text.substr(0, postedByIndex) + '               \r\n' + 
			text.substr(postedByIndex);

		var flagIndex = text.indexOf('[!]', postedByIndex);
		if (flagIndex != -1) {
			text = text.substr(0, flagIndex);
		}
		var emptyFavIndex = text.indexOf('[+]', postedByIndex);
		if (emptyFavIndex != -1) {
			text = text.substr(0, emptyFavIndex);
		}
	}

	var linkInfo = new LinkInfo(link, text, author, time, backlink);

	linkInfos.push(linkInfo);
}

var tagDivs = document.evaluate(
	"//div[@class='tags']",
	document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
var tagDivsParent = tagDivs.snapshotItem(0).parentNode;

var linksDiv = document.createElement('div');
linksDiv.setAttribute('class', 'tags');
linksDiv.appendChild(document.createTextNode('Links:'));
linksDiv.appendChild(document.createElement('br'));

for (var i = 0; i < linkInfos.length; ++i) {
	var linkInfo = linkInfos[i];

	var span = document.createElement('span');
	span.setAttribute('style',
		'font-size:11px; font-weight:normal;');

	var newLink = document.createElement('a');
	newLink.href = linkInfo.link.href;
	newLink.innerHTML = linkInfo.link.innerHTML;
	newLink.setAttribute('style', 
		'font-size:11px; font-weight:normal; text-decoration:underline;');
	newLink.setAttribute('title', linkInfo.text);
	span.appendChild(newLink);

	span.appendChild(document.createTextNode(' | '));

	var backlink = document.createElement('a');
	backlink.href = linkInfo.backlink;
	backlink.innerHTML = 'src';
	backlink.setAttribute('style', 
		'font-size:11px; font-weight:normal; text-decoration:underline;');
	backlink.setAttribute('title', 'posted by ' + linkInfo.author + ' at ' + 
		linkInfo.time);
	span.appendChild(backlink);

	linksDiv.appendChild(span);
	linksDiv.appendChild(document.createElement('hr'));
}

tagDivsParent.appendChild(linksDiv);