// ==UserScript==

// @name           Nest Post Counts

// @namespace      nest

// @description    Adds post counts next to user names on the Nest

// @include        http://*.thenestbaby.com/*

// @include        http://boards.thenest.com/*

// ==/UserScript==


var allNames, currName;


allNames = document.evaluate(
	"//span[@class='inlineLink']",
	document,
	null,
	XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
	null);

for(var i=0; i < allNames.snapshotLength; i++) {
	currName = allNames.snapshotItem(i);
	if(currName.textContent != "") {
		GM_xmlhttpRequest({
			method:'GET',
			url: 'http://talk.thenestbaby.com/boards/User/ForumMembers.aspx?q=' + 
				escape(currName.textContent),
			headers: {
		            'User-agent': 'Mozilla/4.0 (compatible) Greasemonkey',
		            'Accept': 'application/atom+xml,application/xml,text/xml',
		        },
		        onload:function(results) {
				var postCount = results.responseText.
					match(/<td align=\"center\">([\d,]+)&nbsp;<\/td>/);
				if(postCount) {
					postCount = postCount[1];
					var userName = results.responseText.
						match(/\?UserName=([^']+)'/);
					userName = unescape(userName[1]);
					userName = userName.replace(/\+/g, ' ');
					var nameInstances = document.evaluate(
						"//span[@class='inlineLink']",
						document,
						null,
						XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
						null);
					for (var j=0; j < nameInstances.snapshotLength; j++) {
						currNameInstance = nameInstances.snapshotItem(j);
						if(currNameInstance.textContent == userName) {
							currNameInstance.textContent = 
								currNameInstance.textContent + 
								" (" + postCount + ")";
						}
					}
				}
		        }
		    });
	}
}