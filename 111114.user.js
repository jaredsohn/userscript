// ==UserScript==
// @name           Prevent "Message" Button From Opening Chat
// @namespace      http://www.vertigofx.com/
// @include        http://*.facebook.com/*
// @include    	   https://*facebook.com/*
// ==/UserScript==


var links = document.evaluate("//a[contains(@onclick, 'Chat.openTab')]", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
		for (var i=0;i<links.snapshotLength;i++) {
			var thisLink = links.snapshotItem(i);
			var userid = thisLink.getAttribute("id");
			thisLink.href = 'http://www.facebook.com/messages/' + userid;
			thisLink.removeAttribute("onclick",0);
			thisLink.innerHTML = '<span class="uiButtonText" style="color:#007700!important;">Message</span>';
		}


