// ==UserScript==
// @name           IGN++ Listener Example
// @namespace      vestitools.pbworks.com
// @include        http://boards.ign.com/*
// ==/UserScript==

function clearOutline(el) {
	el.style.outline = "";
}

function listenFor(type) {

	window.addEventListener(type, function(e) {
		
		GM_log("Listener caught a " + e.type + " event. Data: " + e.data);
		
		var tar;
		if((tar = e.target) && tar.style) {
			tar.style.outline = "2px solid red";
			setTimeout(clearOutline, 500, tar);
		}
		
	}, true);

}

var events = ["pollChange", "topicListChange", "newReply", "replyEdited",
				"newPaginator", "paginatorChange", "recentPostsChange",
				"newPMBubble", "PMBubbleRemoved", "morePMs", "lessPMs",
				"newPanel", "panelOpened", "panelClosed"];

for(var i=0, len=events.length; i<len; i++)
	listenFor(events[i]);