// ==UserScript==
// @name           Remove Gawker Blogs Inline Tags
// @description    Removes annoying inline tags to "related" posts on all current Gawker Media blogs.
// @include        http://*.gizmodo.com/*
// @include        http://gizmodo.com/*
// @include        http://*.gawker.com/*
// @include        http://gawker.com/*
// @include        http://*.defamer.com/*
// @include        http://defamer.com/*
// @include        http://*.wonkette.com/*
// @include        http://wonkette.com/*
// @include        http://*.idolator.com/*
// @include        http://idolator.com/*
// @include        http://*.jalopnik.com/
// @include        http://jalopnik.com/
// @include        http://*.fleshbot.com/*
// @include        http://fleshbot.com/*
// @include        http://*.kotaku.com/*
// @include        http://kotaku.com/*
// @include        http://*.deadspin.com/*
// @include        http://deadspin.com/*
// @include        http://*.gridskipper.com/*
// @include        http://gridskipper.com/*
// @include        http://*.consumerist.com/*
// @include        http://consumerist.com/*
// @include        http://*.valleywag.com/*
// @include        http://valleywag.com/*
// @include        http://*.jezebel.com/*
// @include        http://jezebel.com/*
// @include        http://*.lifehacker.com/*
// @include        http://lifehacker.com/*
// ==/UserScript==

// Note: This script was based on the script "CNN for Me v1.3.2", written by userscripts.org user Smiths, and available at http://userscripts.org/scripts/show/8407 as of 5/31/2007
// Modified by Lenroc to remove inline tags from Gawker media blogs based on the Link's "Title" (tool tip, in many browsers)

var allLinks, thisLink, textonly, linktext, link;
allLinks = document.evaluate('//a[@href]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

for (var i = 0; i < allLinks.snapshotLength; i++) {
    thisLink = allLinks.snapshotItem(i);

    if ((thisLink.title.search('Posts tagged as') != -1)) {
	textonly = thisLink.innerHTML;
	link = document.createElement('i');
	textonly = textonly.replace(/<(.?|\/)(u|i)>/g,"");
	linktext = document.createTextNode(textonly);
	link.appendChild(linktext);
	thisLink.parentNode.insertBefore(link, thisLink);
	thisLink.parentNode.removeChild(thisLink);
	}
}