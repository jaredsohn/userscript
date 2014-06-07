// ==UserScript==
// @name           RemoveQuestions
// @namespace      fb_scripts
// @description    Remove stupid questions from facebook
// @include        *facebook*
// ==/UserScript==

function deleteQuestions() {
	var allDivs, thisDiv;
	allDivs = document.evaluate(
		"//div[@class='storyContent clearfix']",
		document,
		null,
		XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
		null);
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		if(thisDiv.innerHTML.search(/question_id/ig) != -1) {
			thisDiv.parentNode.style.display = 'none';
		}
	}
}
document.addEventListener("DOMNodeInserted", deleteQuestions, true);