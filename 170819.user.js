// ==UserScript==
// @name          Facebook Censor
// @author        Dror Cohen
// @description   Cleans the facebook feed of unwanted entries
// @include       http://www.facebook.com/*
// @include       https://www.facebook.com/*
// ==/UserScript==

function removeXpath() {
    var allStories = document.evaluate("//body//div[@class='UIIntentionalStream UIStream']//li", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var i=0; i<allStories.snapshotLength; i++){ 
		story = allStories.snapshotItem(i); 
		if(story.textContent.lastIndexOf("spam") > 0){
			story.parentElement.removeChild(story);
		}
	}     
	var tickerStories = document.evaluate("//body//div[@class='tickerActivityStories']/div", document, null,XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,null);
	for(var i=0; i<tickerStories.snapshotLength; i++){ 
		story = tickerStories.snapshotItem(i); 
		if(story.textContent.lastIndexOf("spam") > 0){
			story.parentElement.removeChild(story);
		}
	}
}



window.addEventListener("load", function() { removeXpath(); }, false);
window.addEventListener("DOMNodeInserted", function() { removeXpath(); }, false);