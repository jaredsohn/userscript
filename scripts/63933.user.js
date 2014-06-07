// ==UserScript==
// @name           Minecraft survival links
// @namespace      None
// @description    Change the links to survival links (By Neko Baron)
// @include        http://*minecraft.net/
// ==/UserScript==

var links, a, newElement;
links = document.evaluate(
    "//a[contains(@href, 'play.jsp?user')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for (var i = 0; i < links.snapshotLength; i++) {
    a = links.snapshotItem(i);

	newElement = document.createElement('a');
	newElement.innerHTML = ' - <a href=' + a + '>Creative</a>';

    a.parentNode.insertBefore(newElement, a.nextSibling);
	
	a.href = a.href.replace('play.jsp?user', 'survivaltest/?user');
	
	//GM_log(newElement.innerHTML)
}