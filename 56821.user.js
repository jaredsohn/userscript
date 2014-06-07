// ==UserScript==
// @name           IMDb Boards ThreadNav
// @namespace      userscripts.org/users/106295
// @description    Improves thread navigation of IMDb board threads in nest view.
// @include        http://*imdb*board*nest*
// ==/UserScript==

{
	const predicateSrcPost    = "[contains(@src,\"/post.gif\")]"
	const valueAnchorParent   = "<img src=\"http://i.imdb.com/boards/msgleft.gif\" />"
	const valueAnchorChild    = "<img src=\"http://i.imdb.com/boards/msgright.gif\" />"
	const valueAnchorPrevious = "<img src=\"http://i.imdb.com/boards/msgup.gif\" />"
	const valueAnchorNext     = "<img src=\"http://i.imdb.com/boards/msgdown.gif\" />"
	
	function getNodes(nodeOrigin, pathNode) {
		return document.evaluate(pathNode, nodeOrigin, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	};
	function getNodeFirst(nodeOrigin, pathNode) {
		return document.evaluate(pathNode, nodeOrigin, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
	};

	function getNodesPosts() {
		return getNodes(document, "//table[(ancestor::table) and (not (ancestor::table[ancestor::table])) and (.//img" + predicateSrcPost + ")]");
	};
	function getNodeIndent(nodesPosts, nPost) {
		var nodeCellFirst = nodesPosts.snapshotItem(nPost).rows[0].cells[0];
		if (getNodeFirst(nodeCellFirst, ".//img" + predicateSrcPost)) return;
			else return nodeCellFirst;
	};
	function getNodeData(nodesPosts, nPost) {
		return getNodeFirst(nodesPosts.snapshotItem(nPost), ".//td[(.//table//img" + predicateSrcPost + ") and (not (.//table//table//img" + predicateSrcPost + "))]");
	};
	function getNodeTitle(nodesPosts, nPost) {
		return getNodeFirst(getNodeData(nodesPosts, nPost), "table");
	};
	function getNodeSubject(nodesPosts, nPost) {
		return getNodeFirst(getNodeTitle(nodesPosts, nPost).rows[0].cells[0], ".//a");
	};
	function getNodeNav(nodesPosts, nPost) {
		return getNodeTitle(nodesPosts, nPost).rows[0].cells[1];
	};
	
	function getIndent(nodesPosts, nPost) {
		var nodeIndent = getNodeIndent(nodesPosts, nPost);
		if (nodeIndent) return parseInt(nodeIndent.width);
			else return 0;
	};
	function getIndentStep(nodesPosts) {
		var nIndent;
		var nStep = 100;
		for (var nPost = 0; nPost < nodesPosts.snapshotLength; ++nPost ) {
			nIndent = getIndent(nodesPosts, nPost);
			if (nIndent > 0) {
				if (nStep > nIndent) nStep = nIndent;
			};
		};
		return nStep;
	};
	
	function getNewList(indexMin, indexMax, defaultValue) {
		var nIndex;
		var newList = new Array();
		for (nIndex = indexMin; nIndex <= indexMax; ++nIndex ) newList[nIndex] = defaultValue;
		return newList;
	};
	
	function getAnchorNav(nodesPosts, nPostDestination, strTitle, strValue) {
		return ("<a href=\"#" + getNodeSubject(nodesPosts, nPostDestination).name + "\" title=\"" + strTitle + "\">" + strValue + "</a> ");
	};
	
	var listParents; var listChildren; var nodesPosts  = getNodesPosts();
	var nPost;                         var nPostCount  = nodesPosts.snapshotLength;
	
	listParents = getNewList(0, nPostCount - 1, -1);
	var nIndent; var nIndentStep = getIndentStep(nodesPosts); var listPosts = getNewList(0 - nIndentStep, 100 + nIndentStep, -1);
	for (nPost = 0; nPost <= (nPostCount - 1); ++nPost ) {
		nIndent = getIndent(nodesPosts, nPost);
		if (listPosts[nIndent - nIndentStep] >= 0) listParents[nPost] = listPosts[nIndent - nIndentStep];
		listPosts[nIndent] = nPost;
	};
	
	for (nPost = 0; nPost <= (nPostCount - 1); ++nPost ) {
		getNodeNav(nodesPosts, nPost).innerHTML = "";
	};
	listChildren = getNewList(0, nPostCount - 1, -1);
	for (nPost = 0; nPost <= (nPostCount - 1); ++nPost ) {
		if (listParents[nPost]               >= 0) getNodeNav(nodesPosts, nPost).innerHTML += getAnchorNav(nodesPosts, listParents[nPost],               "Parent",   valueAnchorParent);
		if (listChildren[listParents[nPost]] >= 0) getNodeNav(nodesPosts, nPost).innerHTML += getAnchorNav(nodesPosts, listChildren[listParents[nPost]], "Previous", valueAnchorPrevious);
		if (listParents[nPost]               >= 0) listChildren[listParents[nPost]] = nPost;
	};
	listChildren = getNewList(0, nPostCount - 1, -1);
	for (nPost = (nPostCount - 1); nPost >= 0; --nPost ) {
		if (listChildren[listParents[nPost]] >= 0) getNodeNav(nodesPosts, nPost).innerHTML += getAnchorNav(nodesPosts, listChildren[listParents[nPost]], "Next",     valueAnchorNext);
		if (listChildren[nPost]              >= 0) getNodeNav(nodesPosts, nPost).innerHTML += getAnchorNav(nodesPosts, listChildren[nPost],              "Child",    valueAnchorChild);
		if (listParents[nPost]               >= 0) listChildren[listParents[nPost]] = nPost;
	};
};