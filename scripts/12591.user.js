// ==UserScript==
// @name           Zooomr Zipline "Old Skool" Reply Helper
// @namespace      http://www.zooomr.com/photos/ping/
// @description    Adds a (+) icon to each Zipline entry which when clicked, will generate the @UserName text into the status textarea.
// @include        http://*.zooomr.com/zipline/
// @include        http://*.zooomr.com/zipline/#
// @include        http://*.zooomr.com/zipline/page*/
// @include        http://*.zooomr.com/zipline/page*/#
// @include        http://*.zooomr.com/zipline/*/#
// @include        http://*.zooomr.com/zipline/*/
// @include        http://*.zooomr.com/
// @include        http://*.zooomr.com/#
// ==/UserScript==
(function() {
	var statusTextArea = document.getElementById('status');
	var timeline = document.getElementById('timeline');
	if (!statusTextArea || !timeline) {
		return;
	}

	function ziplineReloaded(event) {
		if (event.target.tagName == 'TBODY') {
			//GM_log(' Reload? (' +event.target.id + ' | ' + event.target.tagName + ' | ' + event.type + ') ');
			window.setTimeout(generateReplyLinks,100); // delays the function
		}
	}

	
	if (timeline) {
		timeline.addEventListener('DOMNodeRemoved' , ziplineReloaded, false);
	}
	
	generateReplyLinks();
	
	function generateReplyLinks() {
		var zipPosts;
		zipPosts = document.evaluate(
			'//table[@id="timeline"]/tbody/tr/td/div/a[contains(@href,"/zipline/")][@title]|//table[@id="timeline"]/tbody/tr/td/div/blockquote/a[contains(@href,"/zipline/")][@title]'
			, document
			, null
			, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE
			, null);
		bindLink(zipPosts);
	}
	
	function bindLink(zipPosts) {
		for (var i = 0; i < zipPosts.snapshotLength; i++) {
			post = zipPosts.snapshotItem(i);
			if (post.title) {
				userTitle = post.title.replace(' ','');
				var replyLink = document.createElement('a');
				replyLink.href='javascript:;';
				replyLink.setAttribute('onClick','javascript: document.getElementById("status").value="@' + userTitle + ': "; document.getElementById("status").focus();');
				replyLink.setAttribute('userTitle',userTitle);
				replyLink.innerHTML = '<img src="/images/silk/bullet_add.png" width="16" height="16" style="vertical-align:bottom;" >';
				post.parentNode.insertBefore(replyLink, post.nextSibling);
			}
		}
	}

})()