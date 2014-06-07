// ==UserScript==
// @name          Download video from Veoh
// @namespace     http://userscripts.org/scripts/show/35382
// @description   Adds a link to download the Flash video file from Veoh
// @include       http://www.veoh.com/videos/*
// ==/UserScript==

/ Shortcut to document.getElementById
function $(id) {
	return document.getElementById(id);
}

// Runs a particular XPath expression p against the context node context (or the document, if not provided)
// If a document (docObj) is provided, its evaluate method is used instead of document.evaluate (and it's also the default context)
// Returns the results as an array
function $x(p, context, docObj) {
	if (!docObj) docObj = document;
	if (!context) context = docObj;
	var arr = [], xpr = docObj.evaluate(p, context, null, XPathResult.UNORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, l = xpr.snapshotLength; i < l; i++) arr.push(xpr.snapshotItem(i));
	return arr;
}

// Returns only the first element of the array returned by $x (or null if the array was empty)
function $x1(p, context, docObj) {
	var nodeArray = $x(p, context, docObj);
	return (nodeArray.length > 0) ? nodeArray[0] : null;
}

// Creates a new node with the given attributes and properties (be careful with XPCNativeWrapper limitations)
function createNode(type, attributes, props) {
	var node = document.createElement(type);
	if (attributes) {
		for (var attr in attributes) {
			node.setAttribute(attr, attributes[attr]);
		}
	}
	if (props) {
		for (var prop in props) {
			if (prop in node) node[prop] = props[prop];
		}
	}
	return node;
}

// Gets the video permalink
var permalinkId = window.location.pathname.match(/\/videos\/([\w\d]+)/i);
if (permalinkId === null) {
	return;
}
else {
	permalinkId = permalinkId[1];
}

// Adds a download link to the FLV file
// It gets the url from a XML file from Veoh
// GM_xmlhttpRequest's privileged features aren't necessary and it doesn't support responseXML without using DOMParser
var urlRest = "http://www.veoh.com/rest/v2/execute.xml?method=veoh.search.search&type=video&maxResults=1permalinkId5697781E-1C60-663B-FFD8-9B49D2B56D36";
var xhrVideoInfo = new XMLHttpRequest();
xhrVideoInfo.onload = function(evt) {

	// Checks for errors
	if ((xhrVideoInfo.readyState != 4) || (xhrVideoInfo.status != 200) || (!xhrVideoInfo.responseXML)) return;

	// Extracts the url from the XML data received
	var urlFullPreview = $x1("//video[@permalinkId='" + permalinkId + "']/@fullPreviewHashPath", null, xhrVideoInfo.responseXML);
	if ((urlFullPreview) && (urlFullPreview.nodeValue)) {
		urlFullPreview = urlFullPreview.nodeValue;
	}
	else {
		return;
	}

	// Creates the Download FLV link and inserts it into the page
	var feedbackDiv = $x1("//div[@id='application']//div[@class='feedback']");
	if (!feedbackDiv) return;
	var linkDownloadPreview = createNode("a", {href: urlFullPreview, style: "font-weight: bold",
																						 title: "Download the full length video file"}, {textContent: "Download FLV Video"});
	feedbackDiv.appendChild(linkDownloadPreview);

}
xhrVideoInfo.open("GET", urlRest, true);
xhrVideoInfo.send(null);