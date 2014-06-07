// ==UserScript==
// @name            BlackBeltInterface
// @namespace       http://bakarika.net/fj
// @include         http://www.forumjapon.com/forum/viewtopic.php*
// @include         http://www.forumjapon.com/forum/posting.php?*
// ==/UserScript==

// Resize a text area, because it is damn too small.
// Also, preinput a thread id if one was given.
function prepareTextArea() {
	var postId = getPostId();
	var textareas = document.getElementsByTagName('textarea');
	var txtar = textareas[0];
	if (postId != undefined && txtar != undefined) {
		txtar.value = "http://www.forumjapon.com/forum/viewtopic.php?p="
				+ postId;
	}
	if (txtar != undefined) {
		txtar.cols = "80";
		txtar.rows = "30";
		setStyle(txtar, "width", "auto");
	}
}

function setStyle(o, style, value) {
	o.style[style] = value;
}

function getPostId() {
	var sGet = window.location.search;
	if (sGet) { // if has a value...
		var res = sGet.split("_");
		if (res != undefined)
			return res[1];
	}
}

// When watching a thread, allow automatic post to the moderation-calling thread
// or to the note-harmonizing thread.
function blackBelt() {
	var allImgs = document.getElementsByTagName('img');
	for ( var i = 0; i < allImgs.length; i++) {
		var thisElem = allImgs[i];
		if (thisElem.getAttribute('src') == "templates/subForumJapon/images/lang_french/icon_quote.gif") {
			thisElem = thisElem.parentNode;
			var postId = thisElem.getAttribute('href');
			postId = parseGet(postId)['p'];
			if (postId != undefined) {
				// moderer;
				var link1 = document.createElement('a');
				link1.appendChild(document.createTextNode("Modérer"));
				link1.setAttribute('href',
						"http://www.forumjapon.com/forum/posting.php?mode=reply&t=4824_"
								+ postId);
				insertAfter(link1, thisElem);
				// br;
				var br = document.createElement('br');
				insertAfter(br, thisElem);
				// renoter;
				var link2 = document.createElement('a');
				link2.appendChild(document.createTextNode('Renoter'));
				link2.setAttribute('href',
						"http://www.forumjapon.com/forum/posting.php?mode=reply&t=8058_"
								+ postId);
				insertAfter(link2, thisElem);
				// br;
				var br2 = document.createElement('br');
				insertAfter(br2, thisElem);
			}
		}
	}
}

function parseGet(data) {
	// Create a global array that will hold the value of each variable,
	// keyed by the name of the variable.
	var GETDATA = new Array();

	// Get the string that follows the "?" in the window's location.
	var sGet = data;
	if (sGet) // if has a value...
	{
		// Drop the leading "?"
		sGet = sGet.replace(/.*\.php\?/, "");

		// Generate a string array of the name value pairs.
		// Each array element will have the form "foo=bar"
		var sNVPairs = sGet.split("&");

		// Now, for each name-value pair, we need to extract
		// the name and value.
		for ( var i = 0; i < sNVPairs.length; i++) {
			// So, sNVPairs[i] contains the current element...
			// Split it at the equals sign.
			var sNV = sNVPairs[i].split("=");

			// Assign the pair to the GETDATA array.
			var sName = sNV[0];
			var sValue = sNV[1];
			GETDATA[sName] = sValue;
		}
	}
	return GETDATA;
}

function insertAfter(newNode, target) {
	var parent = target.parentNode;
	var refChild = target.nextSibling;
	if (refChild != null)
		parent.insertBefore(newNode, refChild);
	else
		parent.appendChild(newNode);
};

window.addEventListener("load", function() {
	blackBelt();
	prepareTextArea();
}, false);