// ==UserScript==
// @name           iStockphoto Large Preview
// @namespace      http://www.istockphoto.com/
// @description    Shows a high-res iStock preview image - useful for designing website layouts. Click on an image to start loading the small preview window, then in the Greasemonkey menu under User Script Commands select Resize Preview and drag the full image into view, it can then be screenshotted for use in your layout.
// @include        http://www.istockphoto.com/*
// ==/UserScript==


function xpath(query) {
    return document.evaluate(query, document, null,
        XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
}

function removeId(elementId){
	var removeMe = document.getElementById(elementId);
	if (removeMe) {
		removeMe.parentNode.removeChild(removeMe);
	}
}
function hideId(elementId){
	document.getElementById(elementId).style.display = "none";
}

GM_registerMenuCommand('Resize Preview', testFunction); 

function testFunction(){

	hideId('Navigator');
	hideId('zoomInDiv');
	hideId('ZoomTrackDiv');
	hideId('zoomOutDiv');

	var allDivs, thisDiv;
	allDivs = xpath("//div[@class='column1']");
	for (var i = 0; i < allDivs.snapshotLength; i++) {
		thisDiv = allDivs.snapshotItem(i);
		thisDiv.style.width = "1200px";
		thisDiv.style.height = "800px";
	}

	document.getElementById('ZoomImageDiv').style.width = "1200px";
	document.getElementById('ZoomImageDiv').style.height = "800px";

	document.getElementById('ZoomDroppableDiv').style.width = "1200px";
	document.getElementById('ZoomDroppableDiv').style.height = "800px";

}
