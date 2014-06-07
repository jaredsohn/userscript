// ==UserScript==
// @name           Wikipedia category mapper
// @description    GoogleMap Wikipedia Pages in this category
// @author         spencerwater@gmail.com
// @namespace      none
// @include        http://*.wikipedia.org/wiki/Category*
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

var firstHeading, catmapLink, pageTitle, hostName;
pageTitle = location.pathname.replace(/\/wiki/, "");
if(location.host.search('en.wikipedia.org') > -1) {
	if (pageTitle.length > 0) { 
		firstHeading = document.getElementById('firstHeading');
		catmapLink = document.createElement("a");
		catmapLink.setAttribute("style","margin-left: 20px;");
		catmapLink.setAttribute("href","http://maps.google.com/maps?q=http%3A%2F%2Ftoolserver.org%2F%7Epara%2Fcgi-bin%2Fkmlexport%3Farticle%3D" + location.pathname.replace(/\/wiki\/?/, ""));
		
		
		
		catmapImage = document.createElement("img");
		catmapImage.setAttribute("style","border:none;");
		catmapImage.setAttribute("title","map " + firstHeading.firstChild.nodeValue);
		catmapImage.setAttribute("src","http://maps.google.com/intl/en_us/mapfiles/dd-icon-start.gif");
		catmapLink.appendChild(catmapImage);
		firstHeading.appendChild(catmapLink);
		
	}
} 
