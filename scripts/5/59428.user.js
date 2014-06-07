// ==UserScript==
// @name           Delicious.com - Sidebar Untruncator
// @namespace	  http://murklins.talkoncorners.net
// @description	Display full tag and bundle names in the sidebar
// @include		http://www.delicious.com/*
// @include		http://delicious.com/*
// ==/UserScript==

(function() {
	var sidebar = document.getElementById("sidebar");
	
	var bundleLinks = document.evaluate(".//h4[contains(@class, 'bundle')]//a", 
				sidebar, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	
	for (var i = 0; i < bundleLinks.snapshotLength; i++) {
		if (bundleLinks.snapshotItem(i).getAttribute("href")) {
			var urlPieces = bundleLinks.snapshotItem(i).getAttribute("href").split("/");
			var fullTag = urlPieces.pop();
			var extraText = "bundle:";
			fullTag = fullTag.substr(extraText.length, fullTag.length);
			fullTag = unescape(fullTag);
			bundleLinks.snapshotItem(i).firstChild.nodeValue = fullTag;
		}
	}
		
		
	var tagSpans = document.evaluate(".//a/span[contains(text(),'...')]", 
				sidebar, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);	
	for (var i = 0; i < tagSpans.snapshotLength; i++) {
	    var titleText = "";
	    if (tagSpans.snapshotItem(i).getAttribute("title")) {
            titleText = tagSpans.snapshotItem(i).getAttribute("title");
        }
        else if (tagSpans.snapshotItem(i).parentNode.getAttribute("title")) {
            titleText = tagSpans.snapshotItem(i).parentNode.getAttribute("title");
        }
        if (titleText != "") {
            var tagMatch = titleText.match(/(.*)\s+\(\d+\)$/);
            if (tagMatch) {
                var fullTag = tagMatch[1];
                var child = tagSpans.snapshotItem(i);
                while (child.nodeName != "SPAN" && child.nextSibling != null) {
                    child = child.nextSibling;
                }
                if (child.nodeName == "SPAN") {
                    child.firstChild.nodeValue = fullTag;
                }
            }
        }
	}
})();