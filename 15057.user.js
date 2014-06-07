// ==UserScript==
// @name           IMDB Image Puller
// @namespace      http://www.cogulus.com/
// @description    Grabs the code for an image and sends it to a script of mine.
// @include        http://*.imdb.com/title/*
// @include        http://imdb.com/title/*
// ==/UserScript==

// Updates:
//
// 
// The latest version of this script is always available at 
// http://userscripts.org/scripts/show/15057

var scrapeScript = 'http://www.cogulus.com/blog/scrape.php?username=movies&';

linkTags = document.getElementsByTagName("a");

for(i=0; i<linkTags.length; i++) {
	
	if(linkTags[i].name=='poster') {
		var pic = linkTags[i].firstChild;
		var url = scrapeScript + 
				'alt=' + escape(pic.alt) + '&' +
				'title=' + escape(document.title) + '&' +
				'width=' + escape(pic.width) + '&' +
				'height=' + escape(pic.height) + '&' +
				'src=' + escape(pic.src) + '&' +
				'href=' + escape(location.href);
		linkTags[i].href = url;
		linkTags[i].target = 'scraper';
	}
}
