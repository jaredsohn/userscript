// ==UserScript==
// @name           IMDb TwitLess
// @namespace      userscripts.org/users/106295
// @description    Removes Twitter from name pages
// @include        http://*imdb*name*
// ==/UserScript==

{
	
	function getNodes(nodeOrigin, pathNode) {
		return document.evaluate(pathNode, nodeOrigin, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	function getNodeFirst(nodeOrigin, pathNode) {
		return document.evaluate(pathNode, nodeOrigin, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	var nodeTwitter = getNodeFirst(document, "//div[contains(@class,\"twitter\")]");
	if (nodeTwitter) nodeTwitter.innerHTML = "";
	
};