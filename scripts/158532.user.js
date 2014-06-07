// ==UserScript==
// @name           SF: Display Inline Image
// @namespace      http://www.gramercyone.com/
// @description    On the attachments page, display the image on the page.
// @include        https://na5.salesforce.com/*
// ==/UserScript==

// If you want a maximum size.  Set to 0 if you don't care.
var iWd = Math.floor(screen.width * .94);
// var iWd = 1200;  // Uncomment this to get specific.

// Get all table cells.
var allTDs = document.evaluate('//td[@class="data2Col"]', document, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
var doGo = false;
var fName = "";
var chkName = 2;
var chkFile = 5;
var allImgs = "|png|bmp|jpg|jpeg|gif|tiff|tif|";
for (var x = 0; x < allTDs.snapshotLength; x++) {
	var thisTD = allTDs.snapshotItem(x);
	// Is this a case attachment or an email attachment?
	if (x == 2) {
		if (thisTD.childNodes[0].nodeName.toLowerCase() == "img") {
			chkName++;
			chkFile++;
		}
	}
	if (x == chkName) {
		// Is the file an image?
		var fName = thisTD.innerHTML.toLowerCase();
		if (allImgs.indexOf('|' + fName.split('.').pop() + '|') > -1) doGo = true;
	} else if (x == chkFile && doGo == true) {
		// Make the image linkable.
		var newLink = document.createElement("a");
		newLink.setAttribute("href", thisTD.childNodes[0].getAttribute("href"));
		newLink.setAttribute("target", "_blank");
		
		// Start the new element.
		var newImg = document.createElement("img");
		newImg.setAttribute("src", thisTD.childNodes[0].getAttribute("href"));
		var iStyle = "";
		if (iWd && iWd > 0) { iStyle += "max-width: " + iWd + "px; "; }
		iStyle += "border: 1px dashed #F00;";
		newImg.setAttribute("style", iStyle);
		
		// Start the container.
		var newDiv = document.createElement("div");
		newDiv.setAttribute("style", "clear: both;");

		// Append the whole thing.
		newLink.appendChild(newImg);
		newDiv.appendChild(newLink);
		document.getElementById("bottomButtonRow").parentNode.parentNode.appendChild(newDiv);
		
		break;  // Don't need to continue.
	}
}
