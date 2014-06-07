// ==UserScript==
// @name           t.co is the devil
// @namespace      net.miell.tco-is-the-devil
// @description    Rewrite t.co links to point directly to their target
// @include        https://twitter.com/*
// @include        http://twitter.com/*
// ==/UserScript==

(function ()
{
	function fixLinks(rootNode) {
		var timelineLinks = rootNode.getElementsByClassName("twitter-timeline-link");
		
		for (let i = 0; i < timelineLinks.length; ++i) {
			let link = timelineLinks[i];
			if (link.dataset.ultimateUrl !== undefined) {
				link.href = link.dataset.ultimateUrl;
			} else if (link.dataset.expandedUrl !== undefined) {
				link.href = link.dataset.expandedUrl;
			}
		}
	}
	
	function nodeChanged(event) {
	    	fixLinks(event.target);   
	}
	
	window.addEventListener("load", function(e) {
		fixLinks(document);
		document.addEventListener("DOMNodeInserted", nodeChanged, false);
		document.addEventListener("DOMNodeInsertedIntoDocument", nodeChanged, false);
		document.addEventListener("DOMAttrModified", nodeChanged, false);
	}, false);
})();
