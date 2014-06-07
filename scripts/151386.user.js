// ==UserScript==
// @name        rStarcraft-tag-remover
// @namespace   reddit
// @include     http://www.reddit.com/r/starcraft/*
// @version     1
// ==/UserScript==

(function() {

tags = document.evaluate(
	"//span[contains(@class, 'linkflairlabel')]",
    document,
    null,
    XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE,
    null);
for(var i = 0; i < tags.snapshotLength; i++) {
	var tag = tags.snapshotItem(i);

	if(tag.innerHTML == "(To be tagged...)"){
		tag.setAttribute("style", "display:none;");
	}
}

})();