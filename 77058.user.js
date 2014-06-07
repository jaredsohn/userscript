// ==UserScript==
// @name           Dell Premier Show Login
// @namespace      http://userscripts.org/users/4294
// @description    Automatically show Dell Premier login window without having to click a button
// @include        http://www.dell.com/content/topics/topic.aspx/global/premier/login/signin*
// ==/UserScript==

var links, i;
links = document.evaluate("//a", document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);

i = 0;
while( (link = links.snapshotItem(i) ) != null ) {
	if (link.innerHTML == "Sign In") {
		var oc = link.getAttribute('href');
		location.assign("javascript:" + oc + "; void(0)");
		break;
	}
	i++;
}
