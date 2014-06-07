// ==UserScript==
// @name          Download video from Veoh
// @namespace     http://userscripts.org/scripts/show/28954
// @description   Adds a link to download the video file from Veoh without installing the Veoh WebPlayer
// @include       http://www.veoh.com/watch/*
// @grant         none
// @updateURL     https://userscripts.org/scripts/source/28954.meta.js
// @version       2012.8.26
// ==/UserScript==

// The script is wrapped in an anonymous function
(function() {

////////////////////////// START OF HELPER FUNCTIONS //////////////////////////

// Shortcut to document.getElementById
function $(id) {
	return document.getElementById(id);
}

// Returns a node from its id or a reference to it
function $ref(idRef) {
	return (typeof idRef === "string") ? $(idRef) : idRef;
}

// Runs a particular XPath expression p against the context node context (or the document, if not provided)
// If a document (docObj) is provided, its evaluate method is used instead of document.evaluate (and it's also the default context)
// Returns the results as an array
function $x(p, context, docObj) {
	if (!docObj) docObj = document;
	if (!context) context = docObj;
	var arr = [], xpr = docObj.evaluate(p, context, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
	for (var i = 0, l = xpr.snapshotLength; i < l; i++) arr.push(xpr.snapshotItem(i));
	return arr;
}

// Returns only the first element of the array returned by $x (or null if the array was empty)
function $x1(p, context, docObj) {
	var nodeArray = $x(p, context, docObj);
	return (nodeArray.length > 0) ? nodeArray[0] : null;
}

// Creates a new node with the given attributes, properties and event listeners
function createNode(type, attributes, props, evls) {

	var node = document.createElement(type);

	if (attributes) {
		for (var attr in attributes) {
			if (attributes.hasOwnProperty(attr)) node.setAttribute(attr, attributes[attr]);
		}
	}

	if (props) {
		for (var prop in props) {
			if ((props.hasOwnProperty(prop)) && (prop in node)) node[prop] = props[prop];
		}
	}

	if (Array.isArray(evls)) {
		evls.forEach(function(evl) {
			if (Array.isArray(evl)) node.addEventListener.apply(node, evl);
		});
	}

	return node;

}

// Checks if the passed variable is an array. Provides an acceptable solution in most cases if Array.isArray isn't implemented (Javascript 1.8.5 addition)
if (typeof Array.isArray !== "function") {
	Array.isArray = function(arrTest) { // Static method of Array
		return (Object.prototype.toString.call(arrTest) === "[object Array]");
	};
}

/////////////////////////// END OF HELPER FUNCTIONS ///////////////////////////

///////////////////////////// START OF MAIN SCRIPT ////////////////////////////

// Gets the download URL and put it in the downloadURL global variable
// The function uses XMLHttpRequest asynchronously, so it will finish before downloadURL is updated
function getDownloadURL(flashVars) {

	// The process to get the URL is started
	downloadURL = "";

	// Gets the permalink from flashVars
	var queryRE = new RegExp("(?:^|&)permalinkid=([^&]*)");
	var queryRet = queryRE.exec(flashVars);
	if (queryRet === null) {
		// The search has failed. Returns
		downloadURL = null;
		return;
	}
	var permalinkId = queryRet[1];

	// Sends a request to the Veoh API to get the download URL from the permalink
	var xhrVideoInfo = new XMLHttpRequest();
	xhrVideoInfo.onload = function(evt) {

		// Checks for errors
		if ((xhrVideoInfo.readyState != 4) || (xhrVideoInfo.status != 200) || (!xhrVideoInfo.responseXML)) return;

		// Extracts the URL from the XML data received
		var urlFullPreview = $x1("//video[@permalinkId='" + permalinkId + "']/@fullPreviewHashPath", null, xhrVideoInfo.responseXML);
		if ((urlFullPreview) && (urlFullPreview.nodeValue)) {
			urlFullPreview = urlFullPreview.nodeValue;
		}
		else {
			// The URL wasn't found. Returns
			downloadURL = null;
			return;
		}

		// Sets downloadURL with the download URL
		downloadURL = urlFullPreview;

	};
	xhrVideoInfo.onerror = function(evt) {
		// Request error
		downloadURL = null;
	}
	xhrVideoInfo.open("GET", "http://www.veoh.com/rest/v2/execute.xml?apiKey=5697781E-1C60-663B-FFD8-9B49D2B56D36&method=veoh.search.search&type=video&maxResults=1&permalink=" + permalinkId, true);
	xhrVideoInfo.send(null);

}

// Creates a download link in the actions div with the URL stored in the downloadURL global variable
function createDownloadLink(actionsDiv, retries) {

	// Initializes retries if it's undefined
	if (!retries) retries = 0;

	if (downloadURL === "") {
		// getDownloadURL is in the process of getting the download URL
		if (retries <= 60) {
			// Calls itself one second later to wait for getDownloadURL
			window.setTimeout(createDownloadLink, 1000, actionsDiv, retries++);
		}
		else {
			// Too many retries. Sets downloadURL to null to prevent and doesn't call itself again to prevent an endless loop
			downloadURL = null;
		}
		return;
	}
	else if (downloadURL === null) {
		// If downloadURL is null, we shouldn't do anything. Returns
		return;
	}

	// Creates the download link and appends it to the actions div if it isn't there already (it shouldn't be)
	var downloadLinkButton = $("gsdownloadLink");
	if (!downloadLinkButton) {
		downloadLinkButton = createNode("a", {id: "gsdownloadLink", class: "button sp_button-white", style: "display: block; width: 80px", href: downloadURL, title: "Download the video file without installing Veoh WebPlayer"});
		downloadLinkButton.appendChild(createNode("span", {style: "font-size:10px"}, {textContent: "No WebPlayer download"}));
		actionsDiv.appendChild(downloadLinkButton);
	}

	// The link was successfully added
	downloadURL = null;

}

// Gets the player div
var playerDiv = $x1("//div[@id='videoPlayerContainer']");
if (!playerDiv) return;

// Global variable that will hold the download URL and coordinates getDownloadURL (GDU) and createDownloadLink (CDL) actions
// Possible values:
//  - null: Initial value, set by GDU to indicate to CDL that an error occured while getting the download URL (CDL shouldn't do anything then), set by CDL if it has called itself more than 60 times while waiting for GDU to get the URL (to prevent an endless loop) or set by CDL after the link have been added (so successive calls to CDL do nothing until a GDU call modifies downloadURL)
//  - "" (empty string): set by GDU to indicate to CDL that is in the process of getting the download URL (CDL, if called, will use setTimeout to call itself one second later, to wait for GDL)
//  - download URL (string): set by GDU to indicate to CDL the download URL (so CDL can create the download link)
var downloadURL = null;

// Tries to get the flashVars attribute of the player and the actions div (the div with the "Download Video" button)
var flashVars = $x1(".//embed[@id='SPL']/@flashvars", playerDiv);
var actionsDiv = $x1("//div[a[@id='watchDownload']]");

// If both elements were found, calls getDownloadURL and createDownloadLink
if (flashVars && actionsDiv) {
	getDownloadURL(flashVars.value);
	createDownloadLink(actionsDiv);
}

// Activates a mutation event listener to get notified when Veoh inserts the player or the action div with Ajax
document.addEventListener("DOMNodeInserted", function(evt) {

	// If the inserted node is the player or one of the player's ancestor, extracts the flashVars and calls getDownloadURL
	var flashVars = $x1("descendant-or-self::embed[@id='SPL']/@flashVars", evt.target);
	if (flashVars) {
		getDownloadURL(flashVars.value);
		return;
	}

	// If the inserted node is the actions div or one of the actions div's ancestor, calls createDownloadLink
	var actionsDiv = $x1("descendant-or-self::div[a[@id='watchDownload']]", evt.target);
	if (actionsDiv) {
		createDownloadLink(actionsDiv);
		return;
	}

}, false);

////////////////////////////// END OF MAIN SCRIPT /////////////////////////////

})();