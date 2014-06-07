// ==UserScript==
// @name           StudiVZ - highlight unread messages
// @namespace      http://valentinlaube.blogspot.com/
// @description    highlight unread messages
// @include        http://www.studivz.net/group.php*
// ==/UserScript==

var threadTitlesXPath = "id('profileganzbreit')/div/table/tbody/tr/td/div/div/strong/a";
var threadChangedTextsXPath = "id('profileganzbreit')/div/table/tbody/tr/td/div/a[2]/small";

var groupName = getGroupName();

var threadTitleTexts = getInnerHTMLFromNodes(getNodesFromXPath(threadTitlesXPath));
var threadChangeNodes = getNodesFromXPath(threadChangedTextsXPath)
var threadChangeTexts = getInnerHTMLFromNodes(threadChangeNodes);

for (var i=0; i<threadTitleTexts.length; i++) {
	if(!threadChangeNodes[i]) {
		continue;
	}

	var lastChangeText = GM_getValue('studivz.'+groupName+'.'+threadTitleTexts[i]);
	
	if(lastChangeText != threadChangeTexts[i]) {
		// thread changed since last visit
		threadChangeNodes[i].style.color = 'red';
		threadChangeNodes[i].style.fontWeight = 'bold';
	} else {
		// debug: no change
		//threadChangeNodes[i].style.color = 'green';
	}

	// update prefs
	GM_setValue('studivz.'+groupName+'.'+threadTitleTexts[i], threadChangeTexts[i]);
}



/******/

function getGroupName() {
	var xpath = "id('headline')/h1";
	var results = unsafeWindow.document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

	return results.snapshotItem(0).innerHTML;
}

function getNodesFromXPath(xpath) {
	var results = unsafeWindow.document.evaluate(xpath, document.body, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	var resultarray = new Array();

	for (var i=0; i<results.snapshotLength; i++) {
		resultarray[i] = results.snapshotItem(i);
	}

	return resultarray;
}

function getInnerHTMLFromNodes(nodes) {
	var resultarray = new Array();

	for (var i=0; i<nodes.length; i++) {
		resultarray[i] = nodes[i].innerHTML;
	}

	return resultarray;
}
