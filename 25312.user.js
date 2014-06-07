// ==UserScript==
// @name           Flickr No Awards
// @namespace      http://www.moremonks.com
// @description    Removes any award comments and group invitations from flickr photos
// @include        http://www.flickr.com/photos/*
// @include        http://flickr.com/photos/*
// @version        1.1
// @author         Justin Locsei
// ==/UserScript==
//
//  Script written by Justin Locsei
//  http://www.moremonks.com

(function() {

var almostLoaded = false, awardComments = [], awardsHidden, flickrColors, newLayout, toggleLink, versionXPaths;

//  Standard colors used by flickr
flickrColors = {
	blue:   "#0063DC",
	gray:   "#C3BEBD",
	pink:   "#FF0084",
	silver: "#F3F3F3"
};

//  Different XPath expressions for different versions of the photo page
versionXPaths = {
	awardComments: "//a[contains(@href, '/groups/') and not(starts-with(text(), 'Seen')) and not(contains(text(), '?'))]/ancestor::*[contains(@class,'comment-block')]",
	commentContent: {
		newer: "div[contains(@class,'comment-content')]/p[contains(@class,'comment-head')]",
		older: "div[contains(@class,'comment-content')]/h4"
	},
	commentHeader: {
		newer: "//div[@id='comments']/h3[starts-with(text(), 'Comments')]",
		older: "//div[@id='DiscussPhoto']/h3[starts-with(text(), 'Comments')]"
	},
	styleComment: {
		newer: "div[contains(@class, 'comment-content')]",
		older: "."
	}
};

//  Helper for XPath queries
function doXPath(query, searchIn) {
	return document.evaluate(query, searchIn, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
}

//  Helper to return the proper XPath query for the photo page layout version
function versionXPath(xPathName) {
	var xPath = versionXPaths[xPathName];
	if (typeof xPath == "object") {
		return newLayout ? xPath["newer"] : xPath["older"];
	} else {
		return xPath;
	}
}

//  Toggle the visibility of any award comments and update the status text
function toggleAwards() {
	var commentDisplay = awardsHidden ? "block" : "none";
	for (i=0; i < awardComments.length; i++) {
		awardComments[i].style.display = commentDisplay;
	}
	awardsHidden = !awardsHidden;
	toggleLink.innerHTML = awardsHidden ? "hiding" : "showing";
}

//  Searches for awards when the comments page is changed using the new layout's
//  JavaScript-based pagination controls. This works by watching an element that
//  flickr uses to darken the screen during loading. While a new page is
//  loading, this element has a "loading" class, and, when loading is finished,
//  is assigned a "loaded" class.
function processNewPage(e) {
	if (e.attrName == "class" && e.newValue == "loaded") {
		almostLoaded = true;
		processAwards();
	}
}

//  This is called by a listener on the comments container that watches for node
//  insertion events, and specifically looks for the comment form to be added,
//  after the processNewPage function has flagged that a new page is being
//  loaded. If, once this event occurs, the page looks like the No Awards script
//  has yet to be invoked, this function processes the award comments.
//
//  This seems necessary in order to prevent award comments from not being
//  processed on the first page, which seems to reload the comments area after
//  it has already been loaded and inserted into the document.
function processFirstPage(e) {
	if (almostLoaded) {
		var newObjectClass = e.target.className || "";
		if (newObjectClass.indexOf("add-comment-form") >= 0) {
			if (! document.getElementById('NA-statusText')) {
				almostLoaded = false;
				processAwards();
			}
		}
	}
}

//  Does the heavy lifting of hiding award comments and modifying the document
function processAwards() {

	var awardComment, awardsXPath, commentContent, commentCount, commentHeader, i, flagText, statusText, styleComment;
	awardComments = [];
	awardsHidden  = false;

	//  Get all apparent award comments, as determined by the presence of a link to
	//  a group in the body of the comment Since this sometimes filters out comments
	//  with a "seen in..." signature, try to filter out comments that have a "(?)"
	//  link to the group or the post that started this style of comment signing.
	awardsXPath = doXPath(versionXPath("awardComments"), document);

	//  Only proceed if award comments were found
	if (awardsXPath.snapshotLength) {

		//  Alter the display of each award comment
		for (i=0; i < awardsXPath.snapshotLength; i++) {

			//  Get each award comment and store it for later use
			awardComment = awardsXPath.snapshotItem(i);
			styleComment = doXPath(versionXPath("styleComment"), awardComment).snapshotItem(0);
			styleComment.className += " NA-award";
			awardComments.push(awardComment);

			//  Add text to each comment
			commentContent = doXPath(versionXPath("commentContent"), awardComment).snapshotItem(0);
			flagText = document.createElement("p");
			flagText.className = "NA-awardFlag";
			flagText.innerHTML = "award comment";
			commentContent.parentNode.insertBefore(flagText, commentContent);
		}

		//  Create container for status text
		statusText = document.createElement("p");
		statusText.id = "NA-statusText";

		//  Create the award comment count text
		commentCount = document.createElement("span");
		commentCount.innerHTML = " <strong>" + awardComments.length + "</strong> award comments";

		//  Create visibility toggle link
		toggleLink = document.createElement("strong");
		toggleLink.id = "NA-toggleLink";
		toggleLink.addEventListener("click", toggleAwards, true);

		//  Add the status text and toggle links to the right of the comments header
		commentHeader = doXPath(versionXPath("commentHeader"), document).snapshotItem(0);
		commentHeader.parentNode.insertBefore(statusText, commentHeader);
		statusText.appendChild(toggleLink);
		statusText.appendChild(commentCount);

		//  Hide the award comments
		toggleAwards();
	}
}

//  Determine which version of the photo page layout the user has activated
newLayout = doXPath("//div[@id='comments']", document).snapshotLength > 0;

//  Create styles for our custom elements
GM_addStyle([
	".NA-award {background: " + flickrColors.silver + "; border: 1px solid " + flickrColors.gray + "; border-left: 3px double " + flickrColors.gray + "; margin-bottom: 1em; padding: 1em;}",
	".NA-awardFlag {color: " + flickrColors.pink + "; float: right; font-weight: bold; margin: 0 !important;}",
	"#NA-statusText {color: " + flickrColors.pink + "; float: right; margin: 0; padding: 0.25em 0 0.25em 0;}",
	"#NA-toggleLink {color: " + flickrColors.blue + "; cursor: pointer; font-weight: bold; }"
].join(""));

//  If using the new photo page layout, listen for class changes in elements
//  used during loading, in order to determine when a new comment page is ready.
if (newLayout) {
	document.getElementById("global-dialog-background").addEventListener('DOMAttrModified', processNewPage, false);
	document.getElementById("comments").addEventListener('DOMNodeInserted', processFirstPage, false);
}

//  Hide any award comments
processAwards();

})();
