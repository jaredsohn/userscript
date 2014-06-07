// ==UserScript==
// @name           BetterBreak.com
// @namespace      nanobyte
// @description    Break.com bad video removal
// @include        http://www.break.com/
// ==/UserScript==

//alert('You visited Break.com');
var allVidContents = document.evaluate('//div[@class="v_content_container"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
//alert('Found ' + allVidContents.snapshotLength + ' video contents.');

for(var x=0; x<allVidContents.snapshotLength; x++) { // 
	var vidContent = allVidContents.snapshotItem(x);
	var rating = parseFloat(vidContent.innerHTML.match(/UpdateRating\(\'([^']+)/)[1]);
	if(rating < 4.0)
		vidContent.parentNode.removeChild(vidContent);
	//alert('Removed video.');
}