// ==UserScript==
// @name           Qwiki from wikipedia
// @description    Qwiki Link for English Wikipedia Pages
// @author         spencerwater@gmail.com
// @namespace      none
// @include        http://*.wikipedia.org/wiki/*
// ==/UserScript==

var allHTMLTags = new Array();

function getElementByClass(theClass) {
	var allHTMLTags=document.getElementsByTagName('li');
	for (i=0; i<allHTMLTags.length; i++) {
		if (allHTMLTags[i].className == theClass) {
			var link = allHTMLTags[i].firstChild.getAttribute("href");
			if(link.search('en.wikipedia.org') > -1) {
				return link;
			}
		}
	}
	return "";
}

var firstHeading, qwikiLink, pageTitle, hostName;
pageTitle = location.pathname.replace(/\/wiki/, "");
if(location.host.search('en.wikipedia.org') > -1) {
	if (pageTitle.length > 0) { 
		firstHeading = document.getElementById('firstHeading');
		qwikiLink = document.createElement("a");
		qwikiLink.setAttribute("style","margin-left: 20px;");
		qwikiLink.setAttribute("href","http://www.qwiki.com/q/#!" + location.pathname.replace(/\/wiki/, ""));
		
		
		qwikiImage = document.createElement("img");
		qwikiImage.setAttribute("style","border:none;");
		qwikiImage.setAttribute("title","Qwiki page for " + firstHeading.firstChild.nodeValue);
		qwikiImage.setAttribute("src","http://www.qwiki.com/favicon.ico");
		qwikiLink.appendChild(qwikiImage);
		firstHeading.appendChild(qwikiLink);
		
	}
} else {
	var englishLink = getElementByClass('interwiki-en');
	var link = "";
	if(englishLink.search('en.wikipedia.org') > -1) {
		link = englishLink;
	} else {
		link = getElementByClass('interwiki-en GA');
	}
	if(link.search('en.wikipedia.org') > -1) {
		if (pageTitle.length > 0) { 
			firstHeading = document.getElementById('firstHeading');
			qwikiLink = document.createElement("a");
			qwikiLink.setAttribute("style","font-weight:bold; margin-left: 20px; margin-right: 20px;");
		qwikiLink.setAttribute("href","http://www.qwiki.com/q/#!" + location.pathname.replace(/\/wiki/, ""));
		qwikiImage = document.createElement("img");
		qwikiImage.setAttribute("style","border:none;");
		qwikiImage.setAttribute("title","Qwiki page for " + firstHeading.firstChild.nodeValue);
		qwikiImage.setAttribute("src","http://www.qwiki.com/favicon.ico");
		qwikiLink.appendChild(qwikiImage);
		firstHeading.appendChild(qwikiLink);
		}
	}	
}
