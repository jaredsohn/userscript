// ==UserScript==
// @name           KRUF.NET direct link from mvgroup
// @namespace      KRUF_MVGROUP
// @include        http://forums.mvgroup.org/index.php?showtopic=*
// ==/UserScript==

var GM_DEBUG = false;
var GM_log = function(){};

if(GM_DEBUG){
	if(unsafeWindow.console){
		GM_log = unsafeWindow.console.log;
	}
}

var iframe = document.evaluate('//iframe["stats"]', document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null).snapshotItem(0);
//var iframe = unsafeWindow.frames['stats'];
unsafeWindow.iframe = iframe;
iframe.style.overflow = 'scroll';
iframe.addEventListener('load', addFurkLinks, false);

function addFurkLinks(){
	var iframeDoc = iframe.contentDocument;
	unsafeWindow.iframeDoc = iframeDoc;
	var torrentLinkNodes = iframeDoc.evaluate('//a[@class="torrentlink"]', iframeDoc, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	GM_log('number of torrent link nodes = '+torrentLinkNodes.snapshotLength);
	for(var i=0; i<torrentLinkNodes.snapshotLength; i++){
		var torrentLinkRef = torrentLinkNodes.snapshotItem(i);
		GM_log('torrentLinkRef = '+torrentLinkRef);
		var furkLink = document.createElement("a");
		furkLink.href = 'http://furk.net/'+torrentLinkRef.href.match('[^/]+.torrent$')[0].replace(".torrent", ".html");
		var img = document.createElement("img");
		img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAABHNCSVQICAgIfAhkiAAAArRJREFUOI1tkk1onGUQx3/zPO/uu1/dNWnY1I2a1n2pwUIKXoKeA/YgBtRTjyIInioeBQURPGkV8erNg4iRYBURVFBEbGnoQa0SIjWRxE22aZJtdt+P533Gw9rYNf5hYJjh/2OGGeH/9K6HShdjnLVeyuPfvt9qsxOdnqhFW7H8+MXkU5f9K7MKIAD1pa1w/NJ77al0J6poGhU1jyzaDtSfKqibKgWmDEitVuOPtfV815nFjWDy1d/D9nVh9lnOTf11rVatnjVGABARRI7m1WqV7e1t8jzHe40/+/rycTNWPw4Q7s8t0G80ybLsMJxzR3JrLdZaCoWgZMJjBXP/qQjnnDYfmmb2tTdoPDZPnKQjoLvjDiAIAkzBYoJQcc75hvV6+p4qz7zwPE+8+DISVo6YkyTBGHMIQcGoKplzvqhKQ+DewPD43CNceP0txqNZ4jg+NG9sbGCtRUSGAJSAXsrNbtcPnKO726Pf7bL09pvc+OUnBmlKf/cmRkBVKZVK9Ho9BoPBEGQMQbD+IEmS+FuxY+niRcreEz19nmvfPYfPHQKoDt9DVcmyDBHBOQcimCtaBkRXv/meXxc/4OcvP+X2yTYn5p9E7zj5FzBSUzDkAPhbX30oqJIe9Li6eIny+QvI8MQjgNECGK6s4SFG88Nu5/OPdDWpa7rw0ojpPwDN00QtLHHyzNymjk3/puXxVUr1Dmm6vzM2s3Zw4uGDYHW5HPS2CjIUjUZD+1raTCX8ZLrVXAwAbL+zUqHTBUJFwmwiKhzzpdzeWKlXG837svDRB3w6aKmLm3vlqZW6HPwQur0O4IN/xvkT2AJCQYt7Z8+ltydbxdbH74wVN6+vF+EqEKqYcCI3fUH3gX3Ay91LzczMUKlUWF5e5sz8ggl31kMRKXjviyISAsVWq5UAPWDgvXd/A6QdcElaNs8vAAAAAElFTkSuQmCC";
		furkLink.appendChild(img);
		torrentLinkRef.parentNode.appendChild(furkLink);
		GM_log('Added the link '+furkLink.href);
	}
}