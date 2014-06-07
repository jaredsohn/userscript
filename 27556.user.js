// ==UserScript==
// @name           Something Awful Ban History
// @namespace      http://www.mathemaniac.org
// @description    Add link to user's Leper's Colon page to each post.
// @include        http://forums.somethingawful.com/showthread.php?*
// @include        http://forum.somethingawful.com/showthread.php?*
// @require        http://updater.usotools.co.cc/27556.js
// ==/UserScript==

var il = document.evaluate('//table[contains(@class,"post")]/descendant::ul[@class="profilelinks"]/li/a[contains(@href,"do_search_posthistory")]', document, null, XPathResult.UNORDERED_NODE_ITERATOR_TYPE, null);
var i = il.iterateNext();
var searchlinks = new Array();
var profileIdExtractor = /search\.php\?(?:s=&)?action=do_search_posthistory\&userid=(\d+)/
while (i) { ni = il.iterateNext(); searchlinks.push(i); i = ni; }
for(var j = 0; j < searchlinks.length; j++) {
	searchlink = searchlinks[j];
	searchLi = searchlink.parentNode;
	url = document.evaluate('@href',searchlink,null,XPathResult.STRING_TYPE,null).stringValue;
	result = url.match(profileIdExtractor);
	userId = result[1]
        banlinkLi = document.createElement("li");
	banlinkSpace = document.createTextNode(" ");
	banlinkLink = document.createElement("a")
	banlinkLink.href = "http://forums.somethingawful.com/banlist.php?userid="+userId;
	banlinkLi.appendChild(banlinkLink);
	banlinkText = document.createTextNode("Ban History");
	banlinkLink.appendChild(banlinkText);
	searchLi.parentNode.insertBefore(banlinkLi,searchLi.nextSibling);
	searchLi.parentNode.insertBefore(banlinkSpace,banlinkLi);
}
