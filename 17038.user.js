/*
 YouTube Popper
 version 0.1
 2007-12-22
 Copyright (c) 2007, Chris Brewer
 Released under the GPL license
 http://www.gnu.org/copyleft/gpl.html

 This is a Greasemonkey user script.
 http://greasemonkey.mozdev.org/

*/

// ==UserScript==
// @name          YouTube Popper
// @description   Adds '[pop]' next to youtube links to display the video in a pop up window
// @description	  - won't work for videos that are set to not embed
// @include       *
// ==/UserScript==

(function() {
	var allElements, thisElement;
	allElements = document.evaluate(
		"//a[contains(@href, 'youtube.com/watch?')]",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i=0; i < allElements.snapshotLength; i++ ) {
	
		if (i == 0) {
			// insert the window pop up function
			var popperFunction = 'function popYTvid(vid) {';
			popperFunction += 'var content = \'<html><head><title>YouTube Video</title></head><body style="margin:0px;">\';';
			popperFunction += 'content += \'<object width="425" height="355">\';';
			popperFunction += 'content += \'<param name="movie" value="http://www.youtube.com/v/\'+vid+\'&rel=1"></param>\';';
			popperFunction += 'content += \'<param name="wmode" value="transparent"></param>\';';
			popperFunction += 'content += \'<embed src="http://www.youtube.com/v/\'+vid+\'&rel=1" type="application/x-shockwave-flash" wmode="transparent" width="425" height="355"></embed>\';';
			popperFunction += 'content += \'</object></body></html>\';';
			popperFunction += 'var vidWindow = window.open(\'\',\'popVid\',\'height=355,width=425,scrollbars=no,resizable=no\');';
			popperFunction += 'vidWindow.document.write(content);';
			popperFunction += 'vidWindow.document.close();';
			popperFunction += 'vidWindow.focus();';
			popperFunction += '}';
			var popperScript = document.createElement('script');
			popperScript.appendChild(document.createTextNode(popperFunction));
			document.body.appendChild(popperScript);
		}
		
		thisElement = allElements.snapshotItem(i);		
		var result = thisElement.search.match( /v=(\S+)/ );
		if (result != null) {
			var vidLink = result[1];
			var pop = document.createElement('a');
			pop.setAttribute('href','javascript:popYTvid("'+vidLink+'")');
			pop.appendChild(document.createTextNode('[pop]'));
			thisElement.parentNode.insertBefore(pop, thisElement.nextSibling);
			thisElement.parentNode.insertBefore(document.createTextNode(' '), thisElement.nextSibling);
		}
	}
})();
