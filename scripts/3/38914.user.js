// ==UserScript==
// @name           Empty Inbox
// @namespace      http://test.com
// @include        http://playevo.com/messages
// @include	   http://playevo.com/messages/inbox
// @include        http://playevo.com/messages/trash
// @include        http://playevo.com/messages/sent
// ==/UserScript==

unsafeWindow.toggle();
delButton = document.evaluate("//input[@name='delete']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
if (delButton == null){ 
	delButton = document.evaluate("//input[@name='deletetrash']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	if (delButton == null){
		delButton = document.evaluate("//input[@name='deletesent']", document, null, XPathResult.ANY_UNORDERED_NODE_TYPE, null).singleNodeValue;
	}
}

delButton.click();