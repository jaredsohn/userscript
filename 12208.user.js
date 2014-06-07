// ==UserScript==
// @name           TexAgs GM - Page Numbers
// @namespace      Texags
// @description    Adds page numbers to topic list to allow faster navigation
// @include        http://www.texags.com/main/forum.topic.*
// @include        http://texags.com/main/forum.topic.*
// ==/UserScript==


function getElementsByClass(searchClass,node,tag) {
	var classElements = new Array();
	if ( node == null )
		node = document;
	if ( tag == null )
		tag = '*';
	var els = node.getElementsByTagName(tag);
	var pattern = new RegExp("(^|\\s)"+searchClass+"(\\s|$)");
	for (i = 0, j = 0; i < els.length; i++) {
		if ( pattern.test(els[i].className) ) {
			classElements[j] = els[i];
			j++;
		}
	}
	return classElements;
}

var pageNumberThreshold = 4;
var maxPageNumbers = 8;

var topics = getElementsByClass("topics", null, "a");
for (i=0; i<topics.length;i++) {
	thisTopic = topics[i];
	if (pageNumberThreshold && thisTopic.parentNode.parentNode.childNodes[4].innerHTML > ((pageNumberThreshold - 1) * 35 - 1)) {
		thisTopic.style.paddingRight = 25;
		var forumID = /(&forum_id=\d+)$/;
		var numberOfPages = Math.ceil(thisTopic.parentNode.parentNode.childNodes[4].innerHTML/35 + 1/35);
		for (var j = 1; j <= numberOfPages; j++) {
			if (numberOfPages > maxPageNumbers && j == Math.floor(maxPageNumbers/2)+1) {
				thisTopic.parentNode.insertBefore(document.createTextNode("..."), thisTopic.parentNode.lastChild.nextSibling);
				j = (numberOfPages - Math.ceil(maxPageNumbers/2) + 1);
			}
			var pageLink = document.createElement('a');
			if (j==1) pageLink.href = thisTopic.href;
			else pageLink.href = thisTopic.href.replace(forumID, "&page="+j+"$1");
			pageLink.setAttribute('class', 'topics');
			pageLink.style.padding = 2;
			pageLink.innerHTML = j;
			thisTopic.parentNode.insertBefore(pageLink, thisTopic.parentNode.lastChild.nextSibling);
		}
	}
}