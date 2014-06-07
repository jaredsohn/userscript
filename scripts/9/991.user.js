// ==UserScript==
// @name          CNN reorg
// @namespace     http://mkgray.com:8000/userscripts
// @include       http://www.cnn.com/*
// @description	  Reformats CNN stories
// @exclude
// ==/UserScript==

(function() {
	if(document.storyreorg){
	    alert("script called on reorged doc");
	}
	else{
	    var xpath = '//div[@class="cnnStoryContent"]';
	    var stories = document.evaluate(xpath, document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	    story=stories.snapshotItem(0);
	    story.className="noclass";
	    story.style.width="75%";
	    document.body.insertBefore(story, document.body.firstChild);
	    document.storyreorg = true;
	}
})();
