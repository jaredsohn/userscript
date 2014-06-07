// ==UserScript==
// @name          YousableTubeFix
// @namespace     http://userscripts.org/scripts/show/13333
// @description   Removes ads and unwanted sections (configurable), allows downloading and resizing videos, changes the default video quality, expands the description and the video size, can prevent autoplay and autobuffering, etc...
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// @include       https://youtube.com/*
// @include       https://*.youtube.com/*
// @grant         GM_addStyle
// @grant         GM_getValue
// @grant         GM_setValue
// @grant         GM_registerMenuCommand
// @grant         GM_xmlhttpRequest
// @grant         unsafeWindow
// @downloadURL   https://userscripts.org/scripts/source/13333.user.js
// @updateURL     https://userscripts.org/scripts/source/13333.meta.js
// @version       2014.2.19
// @ytfversion    1392782455046
// ==/UserScript==

/*
	Author: Mindeye
	Script initially based on ETcelera's YousableTube userscript (http://userscripts.org/scripts/show/5906)
	Version: 19 Feb 2014
*/

// The script is wrapped in an anonymous function
(function() {

////////////////////////////// START OF CONSTANTS /////////////////////////////

// Default video title and username. They are used when the real ones aren't found
var YTF_DEFAULT_VIDEO_TITLE = "video";
var YTF_DEFAULT_VIDEO_USERNAME = "user";

// Data string for the tooltip of the links of the download menu
var YTF_DOWNLOAD_TOOLTIP_DATA_STRING = "Video: %v%?{%3|true| 3D|} %wx%h, Audio: %a %z KHz";

// Width of YouTube watch pages main content column (in pixels)
var YT_COLUMN_WIDTH = 1080;

// Id of the player node (Flash and HTML5) in YouTube watch and channel pages
var YT_PLAYER_ID = "movie_player";

// Size of the expanded player
var YT_PLAYER_EXPANDED_SIZE = {width: 854, height: 510};

// Height of the player control bar
var YT_PLAYER_CONTROLBAR_HEIGHT = 35;

// Id of the player's div node (player's parent node) in YouTube watch page
var YT_PLAYER_DIV_ID = "player-api";

// Id and left padding (in pixels) of the video div node (player's div's parent node) in YouTube watch page
var YT_VIDEO_DIV_ID = "player";
var YT_VIDEO_DIV_LPADDING = 225;

// Class of the player's root node (the player is inserted as a child of this node) in YouTube channel pages
var YT_PLAYER_ROOT_CHANNEL_CLASS = "channels-video-player";

//*'
// Id of YouTube watch pages playlist and class of the playlist bar (playlist's child node)
var YT_PLAYLIST_ID = "watch7-playlist-data";
var YT_PLAYLIST_BAR_CLASS = "watch7-playlist-bar";
var YT_PLAYLIST_BAR_LEFT_CLASS = "watch7-playlist-bar-left";
var YT_PLAYLIST_TRAY_ID = "playlist-tray";
var YT_PLAYLIST_BAR_RIGHT_WIDTH = 275;

//*'
var YT_GUIDE_ID = "guide-container";

// Id of YouTube watch pages content panel
var YT_CONTENT_PANEL_ID = "watch7-content";

// Class name of YouTube hidden content (display: none)
var YT_HIDDEN_CLASS = "hid";

// Class names of YouTube watch pages menus and menu items
var YT_MENU_CLASSES = "yt-uix-button-menu yt-uix-button-menu-default";
var YT_MENU_ITEM_CLASS = "yt-uix-button-menu-item";

// Class names (and a source URL) of YouTube watch pages buttons, button contents and button arrows
var YT_BUTTON_CLASSES = "yt-uix-button yt-uix-button-default";
var YT_BUTTON_CONTENT_CLASS = "yt-uix-button-content";
var YT_BUTTON_ARROW_CLASS = "yt-uix-button-arrow";
var YT_BUTTON_ARROW_SRC = "//s.ytimg.com/yts/img/pixel-vfl3z5WfW.gif"; // Scheme relative URL

// Class names to get YouTube watch pages tooltips and reverse tooltips
var YT_BUTTON_TOOLTIP_CLASS = "yt-uix-tooltip";
var YT_BUTTON_TOOLTIP_REVERSE_CLASS = "yt-uix-tooltip-reverse";

// Class name of YouTube watch pages expanders in a collapsed state
var YT_EXPANDER_COLLAPSED_CLASS = "yt-uix-expander-collapsed";

// Class name of YouTube search page badge UL
var YT_SEARCH_BADGE_UL_CLASS = "single-line-lego-list";

// Array of theme names for the YouTube player
var playerThemesArray = ["dark", "light"];

// YouTube base URL and pathname
var ytHost = window.location.protocol + "//" + window.location.host;
var ytPath = window.location.pathname;

/////////////////////////////// END OF CONSTANTS //////////////////////////////

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

// Deletes a node from its id or a reference to it
function delNode(targetNode) {
	var iNode = $ref(targetNode);
	if ((iNode) && (iNode.parentNode)) return iNode.parentNode.removeChild(iNode);
	return null;
}

// Deletes all the nodes in the passed array by calling delNode for each of them
// If the passed parameter isn't an array, it does nothing
function delNodeArray(nodeArray) {
	if (!Array.isArray(nodeArray)) return;
	nodeArray.forEach(function(iNode) {
		delNode(iNode);
	});
}

// Inserts the specified node as a sibling AFTER the reference node, returning the inserted node
// If any of the passed nodes isn't found or the reference node doesn't have a parent, it does nothing and returns null
function insertAfter(newNode, refNode) {
	return ((newNode) && (refNode) && (refNode.parentNode)) ? refNode.parentNode.insertBefore(newNode, refNode.nextSibling) : null;
}

// Returns an array of the CSS classes of the passed node or null if it isn't found
// These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
function getClassList(targetNode) {
	if (targetNode) return targetNode.className.trim().split(/\s+/);
	return null;
}

// Adds the passed CSS class as a class of the passed node, if it isn't already
// If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it does nothing
// These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
function addClass(targetNode, aClass) {
	if ((typeof aClass !== "string") || (aClass === "") || (/\s/.test(aClass))) return;
	var classList = getClassList(targetNode);
	if ((classList !== null) && (classList.indexOf(aClass) === -1)) {
		classList.push(aClass);
		targetNode.className = classList.join(" ");
	}
}

// Removes the passed CSS class as a class of the passed node, if it is
// If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it does nothing
// These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
function removeClass(targetNode, rClass) {
	if ((typeof rClass !== "string") || (rClass === "") || (/\s/.test(rClass))) return;
	var classList = getClassList(targetNode);
	if (classList !== null) {
		var classIndex = classList.indexOf(rClass);
		if (classIndex !== -1) {
			classList.splice(classIndex, 1);
			targetNode.className = classList.join(" ");
		}
	}
}

// Returns true if the passed CSS class is a class of the passed node, false otherwise
// If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it returns null
// These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
function containsClass(targetNode, cClass) {
	if ((typeof cClass !== "string") || (cClass === "") || (/\s/.test(cClass))) return null;
	var classList = getClassList(targetNode);
	return (classList !== null) ? (classList.indexOf(cClass) !== -1) : null;
}

// Toggles the passed CSS as a class of the passed node (adds it if it isn't present, removes it if it is)
// If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it does nothing
// These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
function toggleClass(targetNode, tClass) {
	if ((typeof tClass !== "string") || (tClass === "") || (/\s/.test(tClass))) return;
	if (containsClass(targetNode, tClass)) {
		removeClass(targetNode, tClass);
	}
	else {
		addClass(targetNode, tClass);
	}
}

// Returns the absolute position of the passed element in pixels or null if the element isn't found
function getAbsoluteRect(targetNode) {
	if (!targetNode) return null;
	var nodeRect = targetNode.getBoundingClientRect();
	return {left: Math.round(nodeRect.left + window.scrollX), // Adds the scrolled distance to each member of the rect (getBoundingClientRect gives relative coordinates). Math.round is used because Gecko's getBoundingClientRect doesn't round its results like other engines
					right: Math.round(nodeRect.right + window.scrollX),
					top: Math.round(nodeRect.top + window.scrollY),
					bottom: Math.round(nodeRect.bottom + window.scrollY)};
}

// Vertically scrolls the page to put the passed element top at the top of the page
function scrollToNode(targetNode) {
	if (targetNode) window.scrollTo(window.scrollX, getAbsoluteRect(targetNode).top);
}

// Fires a click event on targetNode (an id of a node or a reference to it)
// It uses the basic "Event" type instead of the "MouseEvent" type because the more detailed features of the latter aren't needed
// Returns null if the node isn't found, otherwise it returns the return value of dispatchEvent
function fireClickEvent(targetNode) {
	var iNode = $ref(targetNode);
	if (iNode) {
		var evtObj = document.createEvent("Event");
		evtObj.initEvent("click", true, true);
		return iNode.dispatchEvent(evtObj);
	}
	else {
		return null;
	}
}

// Adds !important to complete CSS rules (e.g. ".nd {display: none}")
function makeCSSImportant(cssString) {
	var impCssString = cssString.replace(/([^;]\s*)}/, "$1;}"); // Adds a trailing semicolon to the last rule if it doesn't have one
	return impCssString.replace(/(?:\s*!\s*important\s*)?;/gi, " !important;"); // Adds !important to each rule if it doesn't have it already
}

// Returns a unique function name based on the passed base name, the current time and a random number
function getUniqueFunctionName(baseName) {
	return baseName + (new Date()).getTime().toString() + Math.randomIntFromRange(0, 99).toString();
}

// Creates a dropdown button (with the passed id and title) with an associated menu (buttonMenuId). The button management will be done by YouTube's code (data-button-menu-id attribute)
// The button will have a child span (buttonContentId) to hold its text (buttonText) and a arrow image for decoration
function createDropdownYTButton(buttonId, buttonText, buttonTitle, buttonContentId, buttonMenuId) {

	var dropButton = createNode("button", {"aria-pressed": "false", "aria-expanded": "false", class: YT_BUTTON_CLASSES + " " + YT_BUTTON_TOOLTIP_CLASS + " " + YT_BUTTON_TOOLTIP_REVERSE_CLASS, "data-button-menu-id": buttonMenuId, id: buttonId, role: "button", title: buttonTitle, type: "button"});
	dropButton.appendChild(createNode("span", {class: YT_BUTTON_CONTENT_CLASS, id: buttonContentId}, {textContent: buttonText}));
	dropButton.appendChild(createNode("img", {alt: "", class: YT_BUTTON_ARROW_CLASS, src: YT_BUTTON_ARROW_SRC}));

	return dropButton;

}

// Safely returns the value of the requested YouTube preference using yt.getConfig. The passed default value will be returned if the preference isn't set or an error occurs
function getYTConfig(prefName, prefDefaultValue) {

	var prefValue = prefDefaultValue;

	try {
		prefValue = unsafeWindow.yt.getConfig(prefName, prefDefaultValue);
	}
	catch(err) {
		console.log("Error trying to get a YouTube config (" + prefName + "): " + err.toString());
	}

	return prefValue;

}

// Safely sets the value of the passed YouTube preference using yt.setConfig. It does nothing if an error occurs
function setYTConfig(prefName, prefNewValue) {

	try {
		unsafeWindow.yt.setConfig(prefName, prefNewValue);
	}
	catch(err) {
		console.log("Error trying to set a YouTube config (" + prefName + ") to " + prefNewValue + ": " + err.toString());
	}

}

//'
function setYTSessionCookie(cKey, cValue) {
	if (String(cKey) !== "") document.cookie = cKey + "=" + cValue + "; domain=.youtube.com; path=/";
}

//'
function getVisibilitySupport() {

	var vSupport = null;

	var prefixesArr = ["", "moz", "webkit", "o"];

	for (var i = 0; i < prefixesArr.length; i++) {

		var vPropName = prefixesArr[i] + ((prefixesArr[i] === "") ? "hidden" : "Hidden");

		if (typeof document[vPropName] !== "undefined") {
			vSupport = vPropName;
			break;
		}

	}

	return vSupport;

}

//'
function isPageVisible(defaultVisibility) {

	var vDefault = (typeof defaultVisibility === "undefined") ? true : !!defaultVisibility;
	var vPropName = getVisibilitySupport();

	return (vPropName !== null) ? !document[vPropName] : vDefault;

}

// Extends the String object with a trim funcion if it's not implemented natively in String.prototype (Javascript 1.8.1 addition)
if (typeof String.prototype.trim !== "function") {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}

// Escapes characters with special meaning in a regular expression with a backslash so they can be used in a regular expression with their literal meaning
String.prototype.escapeREChars = function() {
	return this.replace(/([.*+?|(){}[\]^$\\])/g, "\\$1");
};

// Capitalizes the first character of the string, leaving the case of the other characters unchanged
String.prototype.capitalizeFirstChar = function() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};

// Transforms a number into a valid CSS dimension (in pixels)
Number.prototype.toCSS = function() {
	return Math.round(this).toString() + "px";
};

// Makes sure that the passed number (numberValue) is between a minumum value (minValue) and a maximum value (maxValue), clamping it if necessary
Math.clamp = function(numberValue, minValue, maxValue) { // Static method of Math
	return Math.max(minValue, Math.min(maxValue, numberValue));
};

// Returns a random integer between a minumum value (minValue) and a maximum value (maxValue)
Math.randomIntFromRange = function(minValue, maxValue) { // Static method of Math
	return Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;
};

// Extends the Function object with a bind function if it's not implemented in Function.prototype (Javascript 1.8.5 addition)
// Bind returns a new function that, when called, itself calls the original function in the context of the provided this value (fnThis), with a given sequence of arguments preceding any provided when the new function was called
if (typeof Function.prototype.bind !== "function") {
	Function.prototype.bind = function(fnThis /*, fixed preceding arguments */) {
		var that = this, extraArgs = Array.slice(arguments, 1);
		return function() {return that.apply(fnThis, extraArgs.concat(arguments));};
	};
}

// Checks if the passed variable is an array. Provides an acceptable solution in most cases if Array.isArray isn't implemented (Javascript 1.8.5 addition)
if (typeof Array.isArray !== "function") {
	Array.isArray = function(arrTest) { // Static method of Array
		return (Object.prototype.toString.call(arrTest) === "[object Array]");
	};
}

/////////////////////////// END OF HELPER FUNCTIONS ///////////////////////////

/////////////////////// START OF CLASSES AND SINGLETONS ///////////////////////

//'
function AsocArray() {

	this.length = 0;
	this._membersHash = {};

	for (var i = 0; i < arguments.length; i += 2) {
		this.setItem(arguments[i], arguments[i + 1]);
	}

}
AsocArray.prototype.__defineGetter__("keys", function() {

	var itemKeysArray = [];

	this.forEach(function(itemValue, itemKey) {
		itemKeysArray.push(itemKey);
	});

	return itemKeysArray;

});
AsocArray.prototype.__defineGetter__("values", function() {

	var itemValuesArray = [];

	this.forEach(function(itemValue) {
		itemValuesArray.push(itemValue);
	});

	return itemValuesArray;

});
AsocArray.prototype.hasItem = function(itemKey) {
	return (this._membersHash.hasOwnProperty(itemKey));
};
AsocArray.prototype.getItem = function(itemKey) {
	return (this.hasItem(itemKey)) ? this._membersHash[itemKey] : undefined;
};
AsocArray.prototype.setItem = function(itemKey, itemValue) {

	var itemPrevValue;

	if (typeof itemValue !== "undefined") {

		if (this.hasItem(itemKey)) {
			itemPrevValue = this._membersHash[itemKey];
		}
		else {
			this.length++;
		}

		this._membersHash[itemKey] = itemValue;

	}

	return itemPrevValue;

};
AsocArray.prototype.removeItem = function(itemKey) {

	var itemPrevValue;

	if (this.hasItem(itemKey)) {
		this.length--;
		itemPrevValue = this._membersHash[itemKey];
		delete this._membersHash;
	}

	return itemPrevValue;

};
AsocArray.prototype.clear = function() {
	this.length = 0;
	this._membersHash = {};
};
AsocArray.prototype.forEach = function(cbFunc) {

	if (typeof cbFunc !== "function") return;

	for (var itemKey in this._membersHash) {
		if (this._membersHash.hasOwnProperty(itemKey)) cbFunc(this._membersHash[itemKey], itemKey, this);
	}

};

//'
function VideoFormatInfo(qualityIndex, formatDescription, formatLabel, containerName, videoCodecName, isStereo3D, audioCodecName, audioFrequency) {
	this.qualityIndex = ((typeof qualityIndex === "number") && (!isNaN(qualityIndex))) ? qualityIndex : 0;
	this.formatDescription = (typeof formatDescription === "string") ? formatDescription : "Unknown format";
	this.formatLabel = (typeof formatLabel === "string") ? formatLabel : "???";
	this.containerName = (typeof containerName === "string") ? containerName : "?";
	this.videoCodecName = (typeof videoCodecName === "string") ? videoCodecName : "?";
	this.isStereo3D = (typeof isStereo3D === "boolean") ? isStereo3D : false;
	this.audioCodecName = (typeof audioCodecName === "string") ? audioCodecName : "?";
	this.audioFrequency = ((typeof audioFrequency === "number") && (!isNaN(audioFrequency))) ? audioFrequency : 0;
}

//'
var videoFormatsLibrary = new AsocArray(5, new VideoFormatInfo(2, "Low Quality (legacy)", "FLV LQ", "FLV", "Sorenson Spark", false, "MP3", 22.05),
																				17, new VideoFormatInfo(1, "Low Quality (legacy)", "3GP VLQ", "3GP", "MPEG-4 Visual", false, "AAC", 22.05),
																				18, new VideoFormatInfo(14, "Low Definition", "LD", "MP4", "H.264", false, "AAC", 44.1),
																				22, new VideoFormatInfo(34, "High Definition", "HD", "MP4", "H.264", false, "AAC", 44.1),
																				34, new VideoFormatInfo(15, "Low Definition", "FLV LD", "FLV", "H.264", false, "AAC", 44.1),
																				35, new VideoFormatInfo(24, "Standard Definition", "FLV SD", "FLV", "H.264", false, "AAC", 44.1),
																				36, new VideoFormatInfo(3, "Low Quality (legacy)", "3GP LQ", "3GP", "MPEG-4 Visual", false, "AAC", 22.05),
																				37, new VideoFormatInfo(43, "Full High Definition", "Full HD", "MP4", "H.264", false, "AAC", 44.1),
																				38, new VideoFormatInfo(51, "4K Original Definition", "4K HD", "MP4", "H.264", false, "AAC", 48),
																				43, new VideoFormatInfo(12, "Low Definition", "WebM LD", "WebM", "VP8", false, "Vorbis", 44.1),
																				44, new VideoFormatInfo(23, "Standard Definition", "WebM SD", "WebM", "VP8", false, "Vorbis", 44.1),
																				45, new VideoFormatInfo(32, "High Definition", "WebM HD", "WebM", "VP8", false, "Vorbis", 44.1),
																				46, new VideoFormatInfo(41, "Full High Definition", "WebM Full HD", "WebM", "VP8", false, "Vorbis", 44.1),
																				82, new VideoFormatInfo(13, "Low Definition 3D", "3D LD", "MP4", "H.264", true, "AAC", 44.1),
																				83, new VideoFormatInfo(21, "Standard Definition 3D", "3D SD", "MP4", "H.264", true, "AAC", 44.1),
																				84, new VideoFormatInfo(33, "High Definition 3D", "3D HD", "MP4", "H.264", true, "AAC", 44.1),
																				85, new VideoFormatInfo(42, "Full High Definition 3D", "3D Full HD", "MP4", "H.264", true, "AAC", 44.1),
																				100, new VideoFormatInfo(11, "Low Definition 3D", "3D WebM LD", "WebM", "VP8", true, "Vorbis", 44.1),
																				101, new VideoFormatInfo(22, "Standard Definition 3D", "3D WebM SD", "WebM", "VP8", true, "Vorbis", 44.1),
																				102, new VideoFormatInfo(31, "High Definition 3D", "3D WebM HD", "WebM", "VP8", true, "Vorbis", 44.1)
);

//'
var videoFormatsCutoffGroups = new AsocArray("None", 0,
																						 "Low Definition", 10,
																						 "Standard Definition", 20,
																						 "High Definition", 30,
																						 "Full High Definition", 40,
																						 "4K Original Definition", 50
);

//'
function VideoFormat(idx, dUrl, hRes, vRes) {
	this.idx = ((typeof idx === "number") && (!isNaN(idx))) ? idx : 0;
	this.dUrl = (typeof dUrl === "string") ? dUrl : window.location.href;
	this.hRes = ((typeof hRes === "number") && (!isNaN(hRes))) ? hRes : 0;
	this.vRes = ((typeof vRes === "number") && (!isNaN(vRes))) ? vRes : 0;
	this.videoInfo = videoFormatsLibrary.getItem(idx) || new VideoFormatInfo();
}
//'
VideoFormat.qualitySorter = function(ascendingOrder) { // Static method of VideoFormat
	var sortOrder = (ascendingOrder) ? -1 : 1;
	return function(vfA, vfB) {
		if ((!(vfA instanceof VideoFormat)) || (!(vfB instanceof VideoFormat))) return 0;
		return (vfB.videoInfo.qualityIndex - vfA.videoInfo.qualityIndex) * sortOrder;
	};
};
//'
VideoFormat.prefFilter = function(cutoffQI, filter3D) { // Static method of VideoFormat
	return function(vf) {
		if (!(vf instanceof VideoFormat)) return false;
		return !(((vf.videoInfo.qualityIndex !== 0) && (vf.videoInfo.qualityIndex < cutoffQI)) || ((filter3D) && (vf.videoInfo.isStereo3D)));
	};
};
//'
VideoFormat.prototype.getDataString = function(dataPattern) {

	var dataHash = new AsocArray("i", this.idx, "u", this.dUrl, "w", this.hRes, "h", this.vRes, "q", this.videoInfo.qualityIndex, "d", this.videoInfo.formatDescription,
															 "l", this.videoInfo.formatLabel , "c", this.videoInfo.containerName, "v", this.videoInfo.videoCodecName, "3", this.videoInfo.isStereo3D,
															 "a", this.videoInfo.audioCodecName, "z", this.videoInfo.audioFrequency);

	var dataTokensCharClass = "[" + dataHash.keys.join("") + "]";

	dataPattern = dataPattern.replace(new RegExp("%\\?\\{(%" + dataTokensCharClass + ")\\|([^|}]+)\\|([^|}]*)\\|([^|}]*)\\}", "gi"), function(strMatch, p1, p2, p3, p4) {
		var matchItem = dataHash.getItem(p1.slice(1));
		if (typeof matchItem === "undefined") return strMatch;
		return (String(matchItem) === p2) ? p3 : p4;
	});

	dataPattern = dataPattern.replace(new RegExp("%" + dataTokensCharClass, "gi"), function(strMatch) {
		var matchItem = dataHash.getItem(strMatch.slice(1));
		return (typeof matchItem !== "undefined") ? matchItem : strMatch;
	});

	return dataPattern;

};

// Class for the YouTube quality levels
function YtQuality(value, label) {
	this.value = value; // Quality level name
	this.label = label; // Quality level description
}

// Array of the available YouTube quality levels in ascending order (from lowest to highest quality)
var ytQualities = [new YtQuality("small", "Small (< 360p)"),
									 new YtQuality("medium", "Medium (360p+)"),
									 new YtQuality("large", "Large (480p+)"),
									 new YtQuality("hd720", "HD 720p"),
									 new YtQuality("hd1080", "HD 1080p"),
									 new YtQuality("highres", "HD Original (> 1080p)")
];

//'
// Class to encapsulate the video related functionality
function VideoAdapter(playerId, cbAPIFunc, defaultVideoName, defaultVideoUsername, doReloadPlayer) {

	// "that" allows inner functions to access "this" in this context (this VideoAdapter object)
	var that = this;

	// Sets the type of this VideoAdapter
	this.VAType = "Flash";

	// Gets the video player
	this.player = $(playerId);
	if (!this.player) {
		throw new Error("[VideoAdapter]: Player not found");
	}
	this.playerId = playerId;

	// Gets the video Id
	this.vId = this.getFlashVar("video_id");
	if ((this.vId === null) || (this.vId === "")) {
		throw new Error("[VideoAdapter]: Video Id not found or invalid");
	}

	// Checks that the API callback function is a function or null
	if ((cbAPIFunc !== null) && (typeof cbAPIFunc !== "function")) {
		throw new Error("[VideoAdapter]: Invalid API callback function");
	}

	// Gets an associative array of the video formats available for the video
	this.videoFormats = this.parseURLMap();
	if ((this.videoFormats === null) || (this.videoFormats.length === 0)) {
		console.log("[VideoAdapter]: No video formats were found");
		this.videoFormats = new AsocArray(); // Makes sure this.videoFormats contains a valid (empty) AsocArray if no video formats are found
	}

	//'
	this._isAPIReady = false;

	//'
	this._apiReadyActions = new AsocArray();
	this._featuresAlreadyInitialized = false;

	//'
	function checkPlayerAPI() {

		if (typeof that.uwPlayer.getPlayerState === "function") {

			//'
			that._isAPIReady = true;

			//'
			that._apiReadyActions.forEach(function(aFunc) {
				if (typeof aFunc === "function") aFunc();
			});

			// If the API callback function isn't null, it is called
			if (cbAPIFunc !== null) cbAPIFunc(playerId);

		}
		else {
			setTimeout(checkPlayerAPI, 100);
		}

	}

	//'
	setTimeout(checkPlayerAPI, 0);

	// Gets the video title (a default title is used if it isn't found)
	var videoTitleNode = $x1("id('watch-headline-title')/span[@title][contains(@class, 'watch-title')]");
	this.title = (videoTitleNode) ? videoTitleNode.title : defaultVideoName;

	// Gets the video username (a default username is used if it isn't found)
	var videoUsernameNode = $x1("id('watch7-user-header')/a[contains(@class, 'yt-user-name')]");
	this.username = (videoUsernameNode) ? videoUsernameNode.textContent : defaultVideoUsername;

	// Removes ads code from the player (needs a player reload)
	// These ads can interfere with the script features, so they should always be removed
	["ad_module", "ad3_module", "ad_preroll"].forEach(function(v) {
		that.deleteFlashVar(v, false);
	});

	// Reloads the player if it was requested to do so
	if (doReloadPlayer) this.reloadPlayer();

}
//'
VideoAdapter.prototype.initFeatures = function(vFeat, doReloadPlayer) {

	// "that" allows inner functions to access "this" in this context (this VideoAdapter object)
	var that = this;

	// Checks that the video features object (VFO) is an object or null
	if (vFeat === null) {
		vFeat = {}; // Replaces the null with an empty object to simplify the checks to see if the VFO has a specific property
	}
	else if (typeof vFeat !== "object") {
		throw new Error("[VideoAdapter.initFeatures]: Invalid vFeat parameter");
	}

	//'
	if (this._featuresAlreadyInitialized) {
		throw new Error("[VideoAdapter.initFeatures]: Features can't be reinitialized");
	}
	else {
		this._featuresAlreadyInitialized = true;
	}

	// Removes the video watermark if the VFO has the corresponding property (needs a player reload)
	if (vFeat.hasOwnProperty("removeWatermark")) {
		if (vFeat.removeWatermark) this.deleteFlashVar("watermark", false);
	}

	// Disables the video annotations if the VFO has the corresponding property (needs a player reload)
	if (vFeat.hasOwnProperty("disableAnnotations")) {
		if (vFeat.disableAnnotations) this.setFlashVar("iv_load_policy", "3", false);
	}

	// Changes the player autohide behavior if the VFO has the corresponding property (needs a player reload)
	if (vFeat.hasOwnProperty("controlsAutohideMode")) {
		if (vFeat.controlsAutohideMode !== -1) {
			this.setFlashVar("autohide", vFeat.controlsAutohideMode, false);
		}
	}

	// Changes the player theme if the VFO has the corresponding property (needs a player reload)
	if (vFeat.hasOwnProperty("playerTheme")) {
		if (vFeat.playerTheme !== "") {
			this.setFlashVar("theme", vFeat.playerTheme, false);
		}
	}

	// Changes the Flash player quality attribute if the VFO has the corresponding property (needs a player reload)
	if (vFeat.hasOwnProperty("flashQuality")) {
		if (vFeat.flashQuality !== "") {
			this.player.setAttribute("quality", vFeat.flashQuality);
		}
	}

	// Changes the Flash player wMode attribute if the VFO has the corresponding property (needs a player reload)
	if (vFeat.hasOwnProperty("flashWMode")) {
		if (vFeat.flashWMode !== "") {
			this.player.setAttribute("wmode", vFeat.flashWMode);
		}
	}

	// Changes the player video quality if the VFO has the corresponding property
	if (vFeat.hasOwnProperty("defaultVideoQuality")) {

		// Sets YouTube's PREFER_LOW_QUALITY setting to true to avoid the automatic change from "medium" to "high" video quality when the player is expanded
		// The automatic quality change would change the selected video quality if the player is expanded or resized
		setYTConfig("PREFER_LOW_QUALITY", true);

		// Changes the player video quality (needs a player reload). If the quality isn't available, the player will choose the next lowest available quality
		switch(vFeat.defaultVideoQuality) {

			// YouTube's default quality. Doesn't change anything
			case "":
				break;

			// Highest supported quality (last member of the ytQualities array)
			case "ytfHighest":
				this.setFlashVar("vq", ytQualities[ytQualities.length - 1].value, false);
				break;

			// Lowest supported quality (first member of the ytQualities array)
			case "ytfLowest":
				this.setFlashVar("vq", ytQualities[0].value, false);
				break;

			// A specific quality
			default:
				this.setFlashVar("vq", vFeat.defaultVideoQuality, false);
				break;

		}

	}

	// Prevents the autoplay if the VFO has the corresponding property (needs a player reload)
	if (vFeat.hasOwnProperty("autoplayMode")) {

		// Sets the video to not autoplay by default
		this.setFlashVar("autoplay", "0", false);

		//'
		if (vFeat.hasOwnProperty("overrideAutoplayPlaylists")) {
			if (vFeat.overrideAutoplayPlaylists) {
				if (this.getFlashVar("playnext") === "1") vFeat.autoplayMode = 0;
			}
		}

		//'
		if (vFeat.hasOwnProperty("overrideAutoplayFgTab")) {
			if (vFeat.overrideAutoplayFgTab) {
				if (isPageVisible(false)) vFeat.autoplayMode = 0;
			}
		}

		//'
		registerAPIReadyAction("autoplayMode", function(autoplayMode) {

			// "that" allows inner functions to access "this" in this context (this VideoAdapter object)
			var that = this;

			// The player is an "unstarted" (-1) state at this point. The state is changed depending on the configured autoplay mode
			switch(autoplayMode) {

				// Doesn't prevent autoplay and autobuffering. The video should be played
				case 0:
					this.uwPlayer.playVideo();
					break;

				// Prevents only autoplay. The video is played and then paused so the player continues to buffer it
				case 1:

					// Gets an unique name for the function which will be called when the player state changes
					var autoplayFuncName = getUniqueFunctionName("ytfautoplayPauseFirstPlay");

					// Function that is called when the player state change
					// Pauses the player so it continues to buffer the video
					unsafeWindow[autoplayFuncName] = function(newState) {

						// Shortcut to the current function to store variables as its properties (retaining its value between calls)
						var meSt = arguments.callee;

						// If the video is playing and hasn't already be paused here, it is paused
						// It also seeks to its starting time and unmutes the video, to undo the muting done before and rewind the video if it wasn't paused instantly after playing it
						if ((!meSt.autoplayAlreadyPaused) && (newState === 1)) {

							// Gets the video starting time. It uses 0 if it isn't found
							var startTime = parseInt(that.getFlashVar("start"), 10);
							if (isNaN(startTime)) startTime = 0;

							that.uwPlayer.seekTo(startTime, true);
							that.uwPlayer.pauseVideo();
							that.uwPlayer.unMute();
							meSt.autoplayAlreadyPaused = true;

						}

					};

					// Adds an event listener to get notifications when the player state changes. The video is played afterwards to make the player buffer it
					this.uwPlayer.addEventListener("onStateChange", autoplayFuncName);
					this.uwPlayer.mute(); // The video is muted first to prevent any sound if the player isn't paused instantly
					this.uwPlayer.playVideo();

					break;

				// Prevents both autoplay and autobuffering. The video is left in a unstarted state
				case 2:
					break;

				// Any other autoplay mode is invalid
				default:
					console.log("[VideoAdapter.initFeatures]: Invalid autoplay mode");
					break;

			}

		}, vFeat.autoplayMode);

	}

	// Expands the player if the VFO has the corresponding property
	if (vFeat.hasOwnProperty("expandVideo")) {

		//'
		registerAPIReadyAction("expandVideo", function(expandVideo) {
			if (expandVideo) this.expandPlayer();
		}, vFeat.expandVideo);

	}

	// Reloads the player if it was requested to do so
	if (doReloadPlayer) this.reloadPlayer();

	return; // Exit function

	//'
	function registerAPIReadyAction(apiReadyId, apiReadyFunc /*, extra bind arguments */) {
		var bindArgs = [that].concat(Array.slice(arguments, 2));
		if (typeof apiReadyFunc === "function") that._apiReadyActions.setItem(apiReadyId, apiReadyFunc.bind.apply(apiReadyFunc, bindArgs));
	}

};
// Function to validate video size input. Returns a valid video size string or null (if input isn't valid)
VideoAdapter.valVideoSize = function(sizeConfig) { // Static method of VideoAdapter

	var sizeValue = String(sizeConfig).toLowerCase().trim();

	if (resizeNamedSizes.hasItem(sizeValue)) return sizeValue;
	if (!isNaN(parseFloat(sizeValue))) return Math.abs(parseFloat(sizeValue)).toString();
	return null;

};
// Gets a Flash string variable from the passed flashvars (fVars)
// Returns null if the variable isn't found
// The function automatically decodes the value (except if dontDecValue is true), but the variable name is used as provided
VideoAdapter.getFlashVarGen = function(fVars, varName, dontDecValue) { // Static method of VideoAdapter

	// Makes sure that fVars is a string
	if (typeof fVars !== "string") fVars = "";

	// Searchs for the varName in the flashvars
	var queryRE = new RegExp("(?:^|&)" + varName.escapeREChars() + "=([^&]*)");
	var queryRet = queryRE.exec(fVars);

	// Returns the corresponding value or null (if not found)
	return (queryRet === null) ? null : ((dontDecValue) ? queryRet[1] : decodeURIComponent(queryRet[1]));

};
// Sets a Flash string variable in the passed flashvars and then returns the modified string
// The function automatically encodes the value (except if dontEncValue is true), but the variable name is used as provided
VideoAdapter.setFlashVarGen = function(fVars, varName, varNewValue, dontEncValue) { // Static method of VideoAdapter

	// Makes sure that fVars is a string
	if (typeof fVars !== "string") fVars = "";

	// Gets varName value now
	var varValue = VideoAdapter.getFlashVarGen(fVars, varName);

	// If varName isn't set, just adds it
	// If varName is set, replaces its value with varNewValue
	if (!dontEncValue) varNewValue = encodeURIComponent(varNewValue);
	if (varValue === null) {
		fVars += ((fVars.length !== 0) ? "&" : "") + varName + "=" + varNewValue;
	}
	else {
		var replaceRE = new RegExp("(^|&)" + varName.escapeREChars() + "=[^&]*");
		fVars = fVars.replace(replaceRE, "$1" + varName + "=" + varNewValue);
	}

	// Returns the modified flashvars string
	return fVars;

};
// Deletes a Flash string variable in the passed flashvars and then returns the modified string
// The function doesn't encode variable names, varName is used as provided
VideoAdapter.deleteFlashVarGen = function(fVars, varName) { // Static method of VideoAdapter

	// Makes sure that fVars is a string
	if (typeof fVars !== "string") fVars = "";

	// Gets varName value now
	var varValue = VideoAdapter.getFlashVarGen(fVars, varName);

	// Deletes varName if it's set
	if (varValue !== null) {
		// Searchs for varName and deletes it
		var replaceRE = new RegExp("(^|&)" + varName.escapeREChars() + "=[^&]*(&?)");
		fVars = fVars.replace(replaceRE, lambdaReplacer);
	}

	// Returns the modified flashvars string
	return fVars;

	// Lambda function to remove varName in all scenarios
	function lambdaReplacer(str, p1, p2, soffset, s) {
		return (p1 === "") ? p1 : p2; // p1 === "" if (^|&) matches ^ (start of string)
	}

};
// Parses the passed fmtList and streamMap flashvars and returns an associative array of VideoFormat objects
// Returns null if an error occurs
VideoAdapter.parseURLMapGen = function(fmtList, streamMap) {

	// Makes sure that fmtList and streamMap are strings
	if ((typeof fmtList !== "string") || (typeof streamMap !== "string")) return null;

	// Initializes the associative array of parsed video formats and a auxiliary streamInfo one
	var parsedFormats = new AsocArray(), streamInfo = new AsocArray();

	// Transforms the strings into arrays of their comma-separated elements
	fmtList = fmtList.split(",");
	streamMap = streamMap.split(",");

	// Adds items to the streamInfo associative array parsing the streamMap array
	// The key is the video format and the value is an object with its info (the values are encoded in the original streamMap array item in a flashvars-like string)
	// There are other stream information in the array, but it's not extracted
	streamMap.forEach(function(fStream) {

		// Extracts the video format index, its download URL and its signature
		var fStreamIdx = VideoAdapter.getFlashVarGen(fStream, "itag"), fStreamUrl = VideoAdapter.getFlashVarGen(fStream, "url"), fStreamSig = VideoAdapter.getFlashVarGen(fStream, "sig");
		if ((fStreamIdx === null) || (fStreamUrl === null) || (fStreamSig === null)) return;

		// Adds the extracted information to streamInfo
		streamInfo.setItem(fStreamIdx, {"dUrl": fStreamUrl, "sSig": fStreamSig});

	});

	// Adds items to the associative array of video formats parsing the fmtList array and adding info from the streamInfo associative array
	fmtList.forEach(function(fList) {

		// Extracts the video format and the horizontal and vertical size from the fmtList array item (they are separated by slashes)
		// The minimum Flash player version to support the format is also included in the fmtList array item, but it's not extracted
		var matchfList = fList.match(/^(\d+)\/(\d+)x(\d+)(?:\/\d+){3}$/);
		if (matchfList === null) return;

		// Creates a new VideoFormat object with all the gathered video format data
		var formatStreamInfo = streamInfo.getItem(matchfList[1]);
		if (typeof formatStreamInfo === "undefined") return; // The video format isn't valid if it doesn't have associated stream information in streamMap
		var finalDUrl = formatStreamInfo.dUrl + "&signature=" + formatStreamInfo.sSig; // The final download URL is the combination of the extracted download URL and signature
		var formatObj = new VideoFormat(parseInt(matchfList[1], 10), finalDUrl, parseInt(matchfList[2], 10), parseInt(matchfList[3], 10));

		parsedFormats.setItem(formatObj.idx, formatObj);

	});

	// Returns the associative array of video formats
	return parsedFormats;

};
// Returns the download URL to the video with the passed arguments, adding a parameter to indicate the desired file name to the server
// The video save name is generated replacing the dynamic symbols in the passed pattern with this video's data
VideoAdapter.getVideoTitledDownloadURL = function(vFormatObj, vId, vTitle, vUserName, savePattern) { // Static method of VideoAdapter

	var saveHash = new AsocArray("t", vTitle, "u", vUserName, "i", vId, "f", vFormatObj.idx, "w", vFormatObj.hRes , "h", vFormatObj.vRes);

	var vSaveName = savePattern.replace(new RegExp("/[" + saveHash.keys.join("") + "]", "gi"), function(strMatch) {
		var matchItem = saveHash.getItem(strMatch.slice(1));
		return (typeof matchItem !== "undefined") ? matchItem : strMatch;
	});

	// Cleans the video save name by replacing illegal file name characters with an underscore and trimming it
	vSaveName = vSaveName.replace(/[\\\/\"|?<>:*]/gi, "_").trim();

	return vFormatObj.dUrl + ((vSaveName) ? "&title=" + encodeURIComponent(vSaveName) : "");

};
// Getter to the unwrapped/unsafe version of the player if it's available (or the player itself if not)
VideoAdapter.prototype.__defineGetter__("uwPlayer", function() {
	if (this.player.wrappedJSObject) { // Firefox
		return this.player.wrappedJSObject;
	}
	else if (unsafeWindow.document.getElementById(this.playerId)) { // Opera/Chrome
		return unsafeWindow.document.getElementById(this.playerId);
	}
	else {
		console.log("[VideoAdapter.uwPlayer]: Unwrapped/unsafe player not found");
		return this.player;
	}
});
// Getter that determines if the YouTube's API is ready
VideoAdapter.prototype.__defineGetter__("isAPIReady", function() {

	// Returns the state of the YouTube's API readiness according to the internal flag which keeps track of it
	if (this._isAPIReady) {
		try { // Tries to use the API to make sure it is ready (external code may have reloaded the player)
			this.uwPlayer.getPlayerState();
			return true;
		}
		catch(err) {
			return false;
		}
	}
	else {
		return false;
	}

});
// Reloads the player
VideoAdapter.prototype.reloadPlayer = function() {
	this._isAPIReady = false; //'
	this.player.src = this.player.src;
};
// Gets a Flash string variable from the player using VideoAdapter.getFlashVarGen
VideoAdapter.prototype.getFlashVar = function(varName, dontDecValue) {
	return VideoAdapter.getFlashVarGen(this.player.getAttribute("flashvars"), varName, dontDecValue);
};
// Sets a Flash string variable to the player using VideoAdapter.setFlashVarGen
// If doReloadPlayer is true it also reloads the player
VideoAdapter.prototype.setFlashVar = function(varName, varNewValue, doReloadPlayer, dontEncValue) {
	this.player.setAttribute("flashvars", VideoAdapter.setFlashVarGen(this.player.getAttribute("flashvars"), varName, varNewValue, dontEncValue));
	if (doReloadPlayer) this.reloadPlayer();
};
// Deletes a Flash string variable from the player using VideoAdapter.deleteFlashVarGen
// If doReloadPlayer is true it also reloads the player
VideoAdapter.prototype.deleteFlashVar = function(varName, doReloadPlayer) {
	this.player.setAttribute("flashvars", VideoAdapter.deleteFlashVarGen(this.player.getAttribute("flashvars"), varName));
	if (doReloadPlayer) this.reloadPlayer();
};
// Parses the fmtList and streamMap flashvars from the player and returns an associative array of VideoFormat objects using VideoAdapter.parseURLMapGen
VideoAdapter.prototype.parseURLMap = function() {
	return VideoAdapter.parseURLMapGen(this.getFlashVar("fmt_list"), this.getFlashVar("url_encoded_fmt_stream_map"));
};
// Tries to expand the video player container (widening it) calling the corresponding YouTube's function
VideoAdapter.prototype.expandPlayer = function() {
	try {
		setYTSessionCookie("wide", "1"); // Sets the "wide" cookie to make the video expand automatically in the current session
		unsafeWindow.yt.pubsub.publish("player-resize", true);
	}
	catch(err) {
		console.log("[VideoAdapter.expandPlayer]: Error trying to expand the video: " + err.toString());
	}
};

//'
function VideoAdapterHTML5(playerId, cbAPIFunc, defaultVideoName, defaultVideoUsername) {

	// "that" allows inner functions to access "this" in this context (this VideoAdapterHTML5 object)
	var that = this;

	// Sets the type of this VideoAdapterHTML5
	this.VAType = "HTML5";

	// Gets the video player
	this.player = $(playerId);
	if (!this.player) {
		throw new Error("[VideoAdapterHTML5]: Player not found");
	}
	this.playerId = playerId;

	// Gets the video Id
	this.vId = this.getFlashVar("video_id");
	if ((this.vId === null) || (this.vId === "")) {
		throw new Error("[VideoAdapterHTML5]: Video Id not found or invalid");
	}

	// Checks that the API callback function is a function or null
	if ((cbAPIFunc !== null) && (typeof cbAPIFunc !== "function")) {
		throw new Error("[VideoAdapterHTML5]: Invalid API callback function");
	}

	// Gets an associative array of the video formats available for the video
	this.videoFormats = this.parseURLMap();
	if ((this.videoFormats === null) || (this.videoFormats.length === 0)) {
		console.log("[VideoAdapterHTML5]: No video formats were found");
		this.videoFormats = new AsocArray(); // Makes sure this.videoFormats contains a valid (empty) AsocArray if no video formats are found
	}

	//'
	this._isAPIReady = false;

	//'
	this._apiReadyActions = new AsocArray();
	this._featuresAlreadyInitialized = false;

	//'
	function checkPlayerAPI() {

		if (typeof that.uwPlayer.getPlayerState === "function") {

			//'
			that._isAPIReady = true;

			//'
			that._apiReadyActions.forEach(function(aFunc) {
				if (typeof aFunc === "function") aFunc();
			});

			// If the API callback function isn't null, it is called
			if (cbAPIFunc !== null) cbAPIFunc(playerId);

		}
		else {
			setTimeout(checkPlayerAPI, 100);
		}

	}

	//'
	setTimeout(checkPlayerAPI, 0);

	// Gets the video title (a default title is used if it isn't found)
	var videoTitleNode = $x1("id('watch-headline-title')/span[@title][contains(@class, 'watch-title')]");
	this.title = (videoTitleNode) ? videoTitleNode.title : defaultVideoName;

	// Gets the video username (a default username is used if it isn't found)
	var videoUsernameNode = $x1("id('watch7-user-header')/a[contains(@class, 'yt-user-name')]");
	this.username = (videoUsernameNode) ? videoUsernameNode.textContent : defaultVideoUsername;

}
//'
VideoAdapterHTML5.prototype.initFeatures = function(vFeat) {

	// "that" allows inner functions to access "this" in this context (this VideoAdapter object)
	var that = this;

	// Checks that the video features object (VFO) is an object or null
	if (vFeat === null) {
		vFeat = {}; // Replaces the null with an empty object to simplify the checks to see if the VFO has a specific property
	}
	else if (typeof vFeat !== "object") {
		throw new Error("[VideoAdapter.initFeatures]: Invalid vFeat parameter");
	}

	//'
	if (this._featuresAlreadyInitialized) {
		throw new Error("[VideoAdapterHTML5.initFeatures]: Features can't be reinitialized");
	}
	else {
		this._featuresAlreadyInitialized = true;
	}

	//'
	if (vFeat.hasOwnProperty("autoplayMode")) {

		//'
		if (vFeat.hasOwnProperty("overrideAutoplayPlaylists")) {
			if (vFeat.overrideAutoplayPlaylists) {
				if (getYTConfig("LIST_AUTO_PLAY_ON", null) === true) vFeat.autoplayMode = 0;
			}
		}

		//'
		if (vFeat.hasOwnProperty("overrideAutoplayFgTab")) {
			if (vFeat.overrideAutoplayFgTab) {
				if (isPageVisible(false)) vFeat.autoplayMode = 0;
			}
		}

		//'
		registerAPIReadyAction("autoplayMode", function(autoplayMode) {

			// "that" allows inner functions to access "this" in this context (this VideoAdapter object)
			var that = this;

			switch(autoplayMode) {

				//'
				case 0:
					break;

				//'
				case 1:

					// Gets an unique name for the function which will be called when the player state changes
					var autoplayFuncName = getUniqueFunctionName("ytfautoplayPauseFirstPlay");

					// Function that is called when the player state change
					// Pauses the player so it continues to buffer the video
					unsafeWindow[autoplayFuncName] = function(newState) {

						// Shortcut to the current function to store variables as its properties (retaining its value between calls)
						var meSt = arguments.callee;

						// If the video is playing and hasn't already be paused here, it is paused
						// It also seeks to its starting time and unmutes the video, to undo the muting done before and rewind the video if it wasn't paused instantly after playing it
						if ((!meSt.autoplayAlreadyPaused) && (newState === 1)) {

							// Gets the video starting time. It uses 0 if it isn't found
							var startTime = parseInt(that.getFlashVar("start"), 10);
							if (isNaN(startTime)) startTime = 0;

							that.uwPlayer.seekTo(startTime, true);
							that.uwPlayer.pauseVideo();
							that.uwPlayer.unMute();
							meSt.autoplayAlreadyPaused = true;

						}

					};

					// Adds an event listener to get notifications when the player state changes. If the video is already playing the listener is called immediately
					this.uwPlayer.mute(); // The video is muted first to prevent any sound if the player isn't paused instantly
					if (this.uwPlayer.getPlayerState() === 1) {
						unsafeWindow[autoplayFuncName](1);
					}
					else {
						this.uwPlayer.addEventListener("onStateChange", autoplayFuncName);
					}

					break;

				//'
				case 2:
					this.uwPlayer.cueVideoById(this.vId);
					break;

				// Any other autoplay mode is invalid
				default:
					console.log("[VideoAdapterHTML5.initFeatures]: Invalid autoplay mode");
					break;

			}

		}, vFeat.autoplayMode);

	}

	return; // Exit function

	//'
	function registerAPIReadyAction(apiReadyId, apiReadyFunc /*, extra bind arguments */) {
		var bindArgs = [that].concat(Array.slice(arguments, 2));
		if (typeof apiReadyFunc === "function") that._apiReadyActions.setItem(apiReadyId, apiReadyFunc.bind.apply(apiReadyFunc, bindArgs));
	}

}
// Getter to the unwrapped/unsafe version of the player if it's available (or the player itself if not)
VideoAdapterHTML5.prototype.__defineGetter__("uwPlayer", function() {
	if (this.player.wrappedJSObject) { // Firefox
		return this.player.wrappedJSObject;
	}
	else if (unsafeWindow.document.getElementById(this.playerId)) { // Opera/Chrome
		return unsafeWindow.document.getElementById(this.playerId);
	}
	else {
		console.log("[VideoAdapterHTML5.uwPlayer]: Unwrapped/unsafe player not found");
		return this.player;
	}
});
//'
VideoAdapterHTML5.prototype.__defineGetter__("isAPIReady", function() {
	return this._isAPIReady;
});
//'
VideoAdapterHTML5.prototype.getFlashVar = function(varName) {

	var argsObj = null;
	try {
		var playerConfig = getYTConfig("PLAYER_CONFIG", null);
		argsObj = (playerConfig !== null) ? playerConfig.args : unsafeWindow.ytplayer.config.args;
	}
	catch(err) {
		console.log("Error trying to get a HTML5 FlashVar (" + varName + "): " + err.toString());
	}
	if ((argsObj === null) || (typeof argsObj !== "object")) return null;

	return (argsObj.hasOwnProperty(varName)) ? String(argsObj[varName]) : null;

};
//'
VideoAdapterHTML5.prototype.parseURLMap = function() {
	return VideoAdapter.parseURLMapGen(this.getFlashVar("fmt_list"), this.getFlashVar("url_encoded_fmt_stream_map"));
};

// Associative array with the named video sizes used by the script (keys) and its corresponding resize functions (values)
// The resize functions return a new player size calculated from the passed parameters using the named size algorithm
var resizeNamedSizes = new AsocArray(//'
																		 "default",
																		 function(playerExpandedSize, viewportSize) {
																			 return {width: playerExpandedSize.width,
																							 height: playerExpandedSize.height};
																		 },

																		 // Controls size: the player height is set to show only the control bar and its width to fill the content column
																		 "controls",
																		 function(playerExpandedSize, viewportSize) {
																			 return {width: YT_COLUMN_WIDTH,
																							 height: YT_PLAYER_CONTROLBAR_HEIGHT};
																		 },

																		 // Fill size: the player width is set to fill the content column and its height is calculated to respect the player original aspect ratio
																		 "fill",
																		 function(playerExpandedSize, viewportSize) {
																			 return {width: YT_COLUMN_WIDTH,
																							 height: YT_COLUMN_WIDTH * (playerExpandedSize.height / playerExpandedSize.width)};
																		 },

																		 // Max size: The player width and height are set to fill the viewport, preserving the aspect ratio
																		 "max",
																		 function(playerExpandedSize, viewportSize) {

																			 // Calculates the resize factor (factorR) as the smallest of the vertical and horizontal ratios
																			 // This is valid if the player original size is smaller than the viewport (at least in one dimension)
																			 var factorR = Math.min(viewportSize.width / playerExpandedSize.width, viewportSize.height / playerExpandedSize.height);

																			 // Multiplies the original dimensions by the factorR factor, rounded down (the rounding mustn't return a bigger number). The aspect ratio is preserved
																			 return {width: Math.floor(playerExpandedSize.width * factorR),
																							 height: Math.floor(playerExpandedSize.height * factorR)};

																		 },

																		 // Full size: the player width and height are set to fill the viewport, regardless of the player original aspect ratio
																		 "full",
																		 function(playerExpandedSize, viewportSize) {
																			 return {width: viewportSize.width,
																							 height: viewportSize.height};
																		 }
);

//////////////////////// END OF CLASSES AND SINGLETONS ////////////////////////

///////////////////////////// START OF CSS STYLES /////////////////////////////

// Adds the CSS styles for the script to the page, making them important
GM_addStyle([

	// Adds a class to hide elements and remove them from the document flow without really deleting them
	".ytf-hidden {display: none}",

	// Adds styles for the main div and its contents
	"#ytf-main-div {border-color: #E6E6E6; border-style: solid; border-width: 0px 1px; padding: 15px 20px 9px}",
	"#ytf-main-div > button {margin-right: 5px}",
	"#ytf-main-div ." + YT_BUTTON_ARROW_CLASS + " {margin-left: 3px}",
	"#ytf-main-resize-menu {-moz-column-count: 3; -moz-column-gap: 0px}",
	".ytf-main-download-warning {cursor: default; color: red}",
	".ytf-main-download-info {cursor: default; color: blue}",

	// Adds styles and classes for the configuration mask and dialog and their contents
	"#ytf-conf-mask {position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 1000; background-color: black; opacity: 0.8}",
	"#ytf-conf-dialog {position: fixed; margin: auto; left: 0px; right: 0px; top: 0px; bottom: 0px; width: 475px; max-height: 590px; z-index: 1001; " +
		"overflow: auto; padding: 5px; color: black; background-color: #EEEEEE; border-radius: 15px}",
	"#ytf-conf-dialog > div {margin: 15px 0px}",
	"#ytf-conf-title {font-size: 150%; font-weight: bold; text-align: center}",
	"#ytf-conf-tabbar {text-align: center}",
	".ytf-conf-tab-active {border: 2px inset buttonface; font-weight: bold}",
	"#ytf-conf-content ul {list-style-type: disc; padding-left: 40px}", // Reverts the changes to the default UA values from YouTube CSS ones
	"#ytf-conf-content li {margin: 15px 0px 5px}",
	"#ytf-conf-content li > span {font-style: italic}",
	"#ytf-conf-content span + input[type='text'], #ytf-conf-content select + input[type='text'], #ytf-conf-content span + select {margin-left: 5px; max-width: 200px}",
	"#ytf-conf-content label {margin-left: 1px}",
	"#ytf-conf-content input, #ytf-conf-content select, #ytf-conf-content label {vertical-align: middle}",
	"#ytf-conf-content input[type='text'][disabled] {color: graytext; background-color: threedface}",
	"#ytf-conf-buttons {text-align: center}",
	"#ytf-conf-buttons input {margin: 0px 5px}",

	// Adds styles for the script "new version" message and its anchors
	"#ytf-script-version-message {background-color: #C00040; color: white; outline: black solid thin; overflow: auto; " +
		"padding: 5px; position: fixed; z-index: 999; top: 0px; right: 0px; width: 250px; height: 70px; text-align: center}",
	"#ytf-script-version-message a {margin: 0px 5px}"

].map(function(s) {return makeCSSImportant(s);}).join("\n"));

////////////////////////////// END OF CSS STYLES //////////////////////////////

///////////////////////// START OF USER CONFIGURATION /////////////////////////

/*
	Use "YousableTubeFix configuration" menu command to configure the script
	The menu is under "Tools" / "Greasemonkey" / "User Script Commands"
*/

/*
	Obsolete configuration variables names, do not use:
	- addCharCounter --> Adds character counter feature (dropped, added by YouTube)
	- forceHDMode --> Forces format 18 video mode (dropped in favor of the more general defaultVideoFormat)
	- removeQualitySettings --> Removes the quality settings link (dropped, integrated in the player by YouTube)
	- preventOnlyAutoplay --> Stops the video autoplay, but not its autobuffering (dropped in favor of the more general autoplayMode)
	- videoToIcon --> Substitutes the video with a thumbnail to stop autoplay and autobuffering (dropped in favor of the more general autoplayMode)
	- defaultVideoFormat --> Sets the default format of the video (dropped, defaultVideoQuality is used instead to set the default quality of the video)
	- hideCollapse --> Removes the link to collapse the video description text (dropped, the link doesn't exist anymore)
	- addEasyDownloadLinks --> Adds easy-to-use download links under the video description (dropped, a download button has replaced these links)
	- removeCharCounter --> Removes the character counter for the comments textbox (dropped, isn't necessary anymore)
	- removeFooterCopyright --> Removes the footer and the copyright section (dropped in favor of removeFooter, the copyright section is no more)
	- removeAnnotations --> Removes annotations (text comments) added to the video (dropped in favor of the more versatile disableAnnotations)
	- removeRacyNotice --> Removes the notice shown when visiting flagged videos (dropped, the notice isn't show anymore to logged users, guests can't access those videos)
	- removeRatings --> Removes the box to rate the video (dropped, the video ratings are now included in the actions section)
	- removeStats --> Removes the "Stadistics & Data" tab (dropped, the video stats are now included in the video information section)
	- removeEmbed --> Removes the Embed section (dropped, the box that shows the code to embed the video is now included in the actions section)
	- removeURL --> Removes the URL section (dropped, the box that shows the video URL is now included in the actions section)
	- removeAlsoWatching --> Removes the "Also Waching Now" section (dropped, this section ddoesn't exist anymore)
	- removeBrand --> Removes the channel brand (dropped, the brand ads are removed [if removeAds is active] and the brand image behind the username is left)
	- removeMoreUserVideos --> Removes the "more videos from [username]" section (dropped, the section is collapsed by default now)
	- removePlaylist --> Removes the playlist section (dropped, the playlist and quicklist are handled in the same section in the new YouTube design)
	- userFormats --> Lets the user modify the preference order and removes unwanted video formats (dropped, defaultVideoQuality uses qualities, not formats. The availability of all the video formats is checked)
	- bypassAgeVerification --> Bypass the age verification page for logged in users (dropped, there isn't an age verification for logged in users)
	- moveVideo --> Moves the video to a location where it can be resized (dropped, videoSize and expandVideo values control this now)
*/

// Loads the script configuration settings. If a setting isn't set, the default value will be used
var scriptConfig = {

	videoSize: GM_getValue("videoSize", "default"),
	filenameSavePattern: GM_getValue("filenameSavePattern", "/t"),
	removeVideoInformation: GM_getValue("removeVideoInformation", false),
	removeActions: GM_getValue("removeActions", false),
	removeRelatedVideos: GM_getValue("removeRelatedVideos", false),
	removeComments: GM_getValue("removeComments", false),
	removeVideoResponses: GM_getValue("removeVideoResponses", false),
	removeHeader: GM_getValue("removeHeader", false),
	removeFooter: GM_getValue("removeFooter", false),
	removeSubscriptionReminder: GM_getValue("removeSubscriptionReminder", false),
	removeAds: GM_getValue("removeAds", true),
	removeDefaultLanguageBox: GM_getValue("removeDefaultLanguageBox", false),
	removeWatermark: GM_getValue("removeWatermark", false),
	disableAnnotations: GM_getValue("disableAnnotations", false),
	expandVideo: GM_getValue("expandVideo", true),
	expandInfo: GM_getValue("expandInfo", true),
	autoplayMode: parseInt(GM_getValue("autoplayMode", 0), 10),
	channelAutoplayMode: parseInt(GM_getValue("channelAutoplayMode", 0), 10),
	overrideAutoplayPlaylists: GM_getValue("overrideAutoplayPlaylists", true),
	overrideAutoplayFgTab: GM_getValue("overrideAutoplayFgTab", false),
	channelOverrideAutoplayFgTab: GM_getValue("channelOverrideAutoplayFgTab", false),
	scrollToVideo: GM_getValue("scrollToVideo", true),
	defaultVideoQuality: GM_getValue("defaultVideoQuality", ""),
	channelDefaultVideoQuality: GM_getValue("channelDefaultVideoQuality", ""),
	downloadFromSearch: GM_getValue("downloadFromSearch", false),
	formatsHide3D: GM_getValue("formatsHide3D", true),
	formatsHideCutoffQI: parseInt(GM_getValue("formatsHideCutoffQI", 0), 10),
	formatsOnlyBest: GM_getValue("formatsOnlyBest", false),
	controlsAutohideMode: parseInt(GM_getValue("controlsAutohideMode", -1), 10),
	playerTheme: GM_getValue("playerTheme", ""),
	flashQuality: GM_getValue("flashQuality", ""),
	flashWMode: GM_getValue("flashWMode", "")

};

// videoSize should be a valid video size
scriptConfig.videoSize = VideoAdapter.valVideoSize(scriptConfig.videoSize);
if (scriptConfig.videoSize === null) scriptConfig.videoSize = "default";

// filenameSavePattern should be a string
if (typeof scriptConfig.filenameSavePattern !== "string") scriptConfig.filenameSavePattern = "/t";

// autoplayMode and channelAutoplayMode should be integer numbers between 0 and 2 (both included)
["autoplayMode", "channelAutoplayMode"].forEach(function(setName) {
	scriptConfig[setName] = Math.round(scriptConfig[setName]);
	if ((isNaN(scriptConfig[setName])) || (scriptConfig[setName] < 0) || (scriptConfig[setName] > 2)) scriptConfig[setName] = 0;
});

// defaultVideoQuality and channelDefaultVideoQuality should be "", "ytfHighest", "ytfLowest" or valid YouTube qualities
["defaultVideoQuality", "channelDefaultVideoQuality"].forEach(function(setName) {
	if ((scriptConfig[setName] !== "") && (scriptConfig[setName] !== "ytfHighest") && (scriptConfig[setName] !== "ytfLowest") &&
			(!ytQualities.some(function(q) {return (q.value === scriptConfig[setName]);}))) scriptConfig[setName] = "";
});

// formatsHideCutoffQI should be a valid video format quality index group boundary (integer)
scriptConfig.formatsHideCutoffQI = Math.round(scriptConfig.formatsHideCutoffQI);
if ((isNaN(scriptConfig.formatsHideCutoffQI)) || (videoFormatsCutoffGroups.values.indexOf(scriptConfig.formatsHideCutoffQI) === -1)) scriptConfig.formatsHideCutoffQI = 0;

// controlsAutohideMode should be an integer number between -1 and 2
scriptConfig.controlsAutohideMode = Math.round(scriptConfig.controlsAutohideMode);
if ((isNaN(scriptConfig.controlsAutohideMode)) || (scriptConfig.controlsAutohideMode < -1) || (scriptConfig.controlsAutohideMode > 2)) scriptConfig.controlsAutohideMode = -1;

// playerTheme should be "" or a valid theme name
if ((scriptConfig.playerTheme !== "") && (playerThemesArray.indexOf(scriptConfig.playerTheme) === -1)) scriptConfig.playerTheme = "";

// flashQuality should be a string
if (typeof scriptConfig.flashQuality !== "string") scriptConfig.flashQuality = "";

// flashWMode should be a string
if (typeof scriptConfig.flashWMode !== "string") scriptConfig.flashWMode = "";

// Configuration function
function scriptConfiguration(evt) {

	// Hides the embeds (but doesn't remove them from the document flow) to make sure the config layers are shown above all other elements (plugin content is shown topmost in some browsers)
	setEmbedVisibility(false);

	// Gets the config mask and dialog
	var confMask = $("ytf-conf-mask");
	var confDialog = $("ytf-conf-dialog");

	// Creates the layers if they don't exist and sets focus on the config dialog
	if ((!confMask) || (!confDialog)) {
		createDialog();
	}
	confDialog.focus();

	return; // Exit function

	// Creates the configuration layers
	function createDialog() {

		// Gets the numeric value of the video size (it can be NaN)
		var resizeNumericValue = parseFloat(scriptConfig.videoSize);

		//'
		var isVisibilitySupported = (getVisibilitySupport() !== null);

		// Creates the config mask and dialog, with their contents and event listeners
		confMask = createNode("div", {id: "ytf-conf-mask", title: "Click here to return to the page"}, null, [["click", destroyDialog, false]]);
		confDialog = createNode("div", {id: "ytf-conf-dialog"},
			{innerHTML: "<div id='ytf-conf-title'>YousableTubeFix Configuration</div>" +
				"<div id='ytf-conf-tabbar'>" +
				"<input id='ytf-conf-tab-watch' type='button' value='Watch page' data-ytf-conf-tab-index='0'>" +
				"<input id='ytf-conf-tab-channel' type='button' value='Channel page' data-ytf-conf-tab-index='1'>" +
				"<input id='ytf-conf-tab-search' type='button' value='Search page' data-ytf-conf-tab-index='2'>" +
				"<input id='ytf-conf-tab-all' type='button' value='All pages' data-ytf-conf-tab-index='3'>" +
				"</div>" +
				"<div id='ytf-conf-content'>" +
				"<div id='ytf-conf-tab-watch-content' data-ytf-conf-tab-index='0'>" +
				"<ul>" +
				"<li>" +
				"<span>Default video size:</span>" +
				"<select id='ytf-conf-video-size-sel' size='1'>" +
				(function() { // Returns a string with the HTML code of as many options nodes as named video sizes
					var resizeOptions = "";
					resizeNamedSizes.forEach(function(rf, vs) {
						resizeOptions += "<option id='ytf-conf-video-size-opt-" + vs + "' value='" + vs + "'" + ((scriptConfig.videoSize === vs) ? " selected='selected'" : "") + ">" + vs.capitalizeFirstChar() + " size</option>";
					});
					return resizeOptions;
				})() +
				"<option id='ytf-conf-video-size-opt-custom' value=''" + ((isNaN(resizeNumericValue)) ? "" : " selected='selected'") + ">Custom size</option>" + // Option for a custom (numeric) video size
				"</select>" +
				"<input type='text' id='ytf-conf-size-custom' value='" + ((isNaN(resizeNumericValue)) ? "' disabled='disabled'" : resizeNumericValue + "'") + " title='A integer or decimal number (size multiplier). E.g. use 2 to get a doubled size video'>" +
				"</li>" +
				"<li>" +
				"<span>Pattern for the filename of downloaded files:</span>" +
				"<input type='text' id='ytf-conf-filename-save-pattern' value='" + scriptConfig.filenameSavePattern + "' title='/t is the video title, /u is the video username, /i is the video id, /f is the video format. /w is the horizontal and /h the vertical video sizes (in pixels)'>" +
				"</li>" +
				"<li><span>Remove (use Ctrl+click / Shift+click to select multiple options):</span></li>" +
				"<select id='ytf-conf-remove-disable-sel' multiple='multiple' size='5'>" +
				"<option id='ytf-conf-remove-video-information'" + ((scriptConfig.removeVideoInformation) ? " selected='selected'" : "") + ">- Video information</option>" +
				"<option id='ytf-conf-remove-actions'" + ((scriptConfig.removeActions) ? " selected='selected'" : "") + ">- Actions section</option>" +
				"<option id='ytf-conf-remove-related-videos'" + ((scriptConfig.removeRelatedVideos) ? " selected='selected'" : "") + ">- Related videos section</option>" +
				"<option id='ytf-conf-remove-comments'" + ((scriptConfig.removeComments) ? " selected='selected'" : "") + ">- Comments section</option>" +
				"<option id='ytf-conf-remove-video-responses'" + ((scriptConfig.removeVideoResponses) ? " selected='selected'" : "") + ">- Video responses section</option>" +
				"<option id='ytf-conf-remove-header'" + ((scriptConfig.removeHeader) ? " selected='selected'" : "") + ">- Header section</option>" +
				"<option id='ytf-conf-remove-footer'" + ((scriptConfig.removeFooter) ? " selected='selected'" : "") + ">- Footer section</option>" +
				"<option id='ytf-conf-remove-subscription-reminder'" + ((scriptConfig.removeSubscriptionReminder) ? " selected='selected'" : "") + ">- Subscription reminder popup</option>" +
				"</select>" +
				"<li><span>Automatically expand:</span></li>" +
				"<input type='checkbox' id='ytf-conf-expand-video'" + ((scriptConfig.expandVideo) ? " checked='checked'" : "") + "><label for='ytf-conf-expand-video'>Video</label><br>" +
				"<input type='checkbox' id='ytf-conf-expand-info'" + ((scriptConfig.expandInfo) ? " checked='checked'" : "") + "><label for='ytf-conf-expand-info'>Video information</label><br>" +
				"<li><span>Video autoplay and autobuffering:</span></li>" +
				"<input type='radio' id='ytf-conf-autoplay-prevent-neither' name='ytf-conf-autoplay-choice' value='0'" + ((scriptConfig.autoplayMode === 0) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-prevent-neither'>Don't prevent autoplay and autobuffering</label><br>" +
				"<input type='radio' id='ytf-conf-autoplay-prevent-autoplay' name='ytf-conf-autoplay-choice' value='1'" + ((scriptConfig.autoplayMode === 1) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-prevent-autoplay'>Prevent only autoplay</label><br>" +
				"<input type='radio' id='ytf-conf-autoplay-prevent-both' name='ytf-conf-autoplay-choice' value='2'" + ((scriptConfig.autoplayMode === 2) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-prevent-both'>Prevent both autoplay and autobuffering</label><br>" +
				"<input type='checkbox' id='ytf-conf-override-autoplay-playlists'" + ((scriptConfig.overrideAutoplayPlaylists) ? " checked='checked'" : "") + "><label for='ytf-conf-override-autoplay-playlists'>Override in autoplaying playlists</label><br>" +
				"<input type='checkbox' id='ytf-conf-override-autoplay-fg-tab'" + ((scriptConfig.overrideAutoplayFgTab) ? " checked='checked'" : "") + ((!isVisibilitySupported) ? " disabled='disabled' title='Your browser doesn&#39;t support this feature'" : "") + "><label for='ytf-conf-override-autoplay-fg-tab'" + ((!isVisibilitySupported) ? " title='Your browser doesn&#39;t support this feature'" : "") + ">Override in the foreground tab</label><br>" +
				"<li>" +
				"<input type='checkbox' id='ytf-conf-scroll-to-video'" + ((scriptConfig.scrollToVideo) ? " checked='checked'" : "") + "><label for='ytf-conf-scroll-to-video'>Scroll to the video on page enter</label>" +
				"</li>" +
				"<li>" +
				"<span>Default video quality:</span>" +
				"<select id='ytf-conf-default-video-quality-sel' size='1'>" +
				"<optgroup label='Automatic quality options'>" +
				"<option id='ytf-conf-default-video-quality-opt-default' value=''" + ((scriptConfig.defaultVideoQuality === "") ? " selected='selected'" : "") + ">YouTube default</option>" +
				"<option id='ytf-conf-default-video-quality-opt-auto-high' value='ytfHighest'" + ((scriptConfig.defaultVideoQuality === "ytfHighest") ? " selected='selected'" : "") + ">Best quality available</option>" +
				"<option id='ytf-conf-default-video-quality-opt-auto-low' value='ytfLowest'" + ((scriptConfig.defaultVideoQuality === "ytfLowest") ? " selected='selected'" : "") + ">Fastest quality available</option>" +
				"</optgroup>" +
				"<optgroup label='Fixed quality options'>" +
				(function() { // Returns a string with the HTML code of as many option nodes as known YouTube's qualities
					return ytQualities.map(function(q) {
						return "<option id='ytf-conf-default-video-quality-opt-" + q.value + "' value='" + q.value + "'" + ((scriptConfig.defaultVideoQuality === q.value) ? " selected='selected'" : "") + ">" + q.label + "</option>";
					}).join("");
				})() +
				"</optgroup>" +
				"</select>" +
				"</li>" +
				"</ul>" +
				"</div>" +
				"<div id='ytf-conf-tab-channel-content' data-ytf-conf-tab-index='1'>" +
				"<ul>" +
				"<li><span>Video autoplay and autobuffering:</span></li>" +
				"<input type='radio' id='ytf-conf-autoplay-channel-prevent-neither' name='ytf-conf-autoplay-channel-choice' value='0'" + ((scriptConfig.channelAutoplayMode === 0) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-channel-prevent-neither'>Don't prevent autoplay and autobuffering</label><br>" +
				"<input type='radio' id='ytf-conf-autoplay-channel-prevent-autoplay' name='ytf-conf-autoplay-channel-choice' value='1'" + ((scriptConfig.channelAutoplayMode === 1) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-channel-prevent-autoplay'>Prevent only autoplay</label><br>" +
				"<input type='radio' id='ytf-conf-autoplay-channel-prevent-both' name='ytf-conf-autoplay-channel-choice' value='2'" + ((scriptConfig.channelAutoplayMode === 2) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-channel-prevent-both'>Prevent both autoplay and autobuffering</label><br>" +
				"<input type='checkbox' id='ytf-conf-channel-override-autoplay-fg-tab'" + ((scriptConfig.channelOverrideAutoplayFgTab) ? " checked='checked'" : "") + ((!isVisibilitySupported) ? " disabled='disabled' title='Your browser doesn&#39;t support this feature'" : "") + "><label for='ytf-conf-channel-override-autoplay-fg-tab'" + ((!isVisibilitySupported) ? " title='Your browser doesn&#39;t support this feature'" : "") + ">Override in the foreground tab</label><br>" +
				"<li>" +
				"<span>Default video quality:</span>" +
				"<select id='ytf-conf-channel-default-video-quality-sel' size='1'>" +
				"<optgroup label='Automatic quality options'>" +
				"<option id='ytf-conf-channel-default-video-quality-opt-default' value=''" + ((scriptConfig.channelDefaultVideoQuality === "") ? " selected='selected'" : "") + ">YouTube default</option>" +
				"<option id='ytf-conf-channel-default-video-quality-opt-auto-high' value='ytfHighest'" + ((scriptConfig.channelDefaultVideoQuality === "ytfHighest") ? " selected='selected'" : "") + ">Best quality available</option>" +
				"<option id='ytf-conf-channel-default-video-quality-opt-auto-low' value='ytfLowest'" + ((scriptConfig.channelDefaultVideoQuality === "ytfLowest") ? " selected='selected'" : "") + ">Fastest quality available</option>" +
				"</optgroup>" +
				"<optgroup label='Fixed quality options'>" +
				(function() { // Returns a string with the HTML code of as many option nodes as known YouTube's qualities
					return ytQualities.map(function(q) {
						return "<option id='ytf-conf-channel-default-video-quality-opt-" + q.value + "' value='" + q.value + "'" + ((scriptConfig.channelDefaultVideoQuality === q.value) ? " selected='selected'" : "") + ">" + q.label + "</option>";
					}).join("");
				})() +
				"</optgroup>" +
				"</select>" +
				"</li>" +
				"</ul>" +
				"</div>" +
				"<div id='ytf-conf-tab-search-content' data-ytf-conf-tab-index='2'>" +
				"<ul>" +
				"<li>" +
				"<input type='checkbox' id='ytf-conf-download-from-search'" + ((scriptConfig.downloadFromSearch) ? " checked='checked'" : "") + "><label for='ytf-conf-download-from-search'>Add direct download links</label>" +
				"</li>" +
				"</ul>" +
				"</div>" +
				"<div id='ytf-conf-tab-all-content' data-ytf-conf-tab-index='3'>" +
				"<ul>" +
				"<li><span>Remove or disable:</span></li>" +
				"<input type='checkbox' id='ytf-conf-remove-ads'" + ((scriptConfig.removeAds) ? " checked='checked'" : "") + "><label for='ytf-conf-remove-ads'>Advertisements</label><br>" +
				"<input type='checkbox' id='ytf-conf-remove-default-language-box'" + ((scriptConfig.removeDefaultLanguageBox) ? " checked='checked'" : "") + "><label for='ytf-conf-remove-default-language-box'>Default language box</label><br>" +
				"<input type='checkbox' id='ytf-conf-remove-watermark'" + ((scriptConfig.removeWatermark) ? " checked='checked'" : "") + "><label for='ytf-conf-remove-watermark'>Video watermark</label><br>" +
				"<input type='checkbox' id='ytf-conf-disable-annotations'" + ((scriptConfig.disableAnnotations) ? " checked='checked'" : "") + "><label for='ytf-conf-disable-annotations'>Video annotations (disable)</label><br>" +
				"<li><span>Hide download links:</span></li>" +
				"<input type='checkbox' id='ytf-conf-formats-hide-3d'" + ((scriptConfig.formatsHide3D) ? " checked='checked'" : "") + "><label for='ytf-conf-formats-hide-3d'>Stereo 3D links</label><br>" +
				"<span>Below this quality:</span>" +
				"<select id='ytf-conf-formats-hide-cutoff-qi-sel' size='1'>" +
				(function() { // Returns a string with the HTML code of as many option nodes as video formats cutoff groups
					var formatsCutoffOptions = "";
					videoFormatsCutoffGroups.forEach(function(fc, fg) {
						formatsCutoffOptions += "<option id='ytf-conf-formats-hide-cutoff-qi-opt-" + fc + "' value='" + fc + "'" + ((scriptConfig.formatsHideCutoffQI === fc) ? " selected='selected'" : "") + ">" + fg + "</option>";
					});
					return formatsCutoffOptions;
				})() +
				"</select><br>" +
				"<input type='checkbox' id='ytf-conf-formats-only-best'" + ((scriptConfig.formatsOnlyBest) ? " checked='checked'" : "") + "><label for='ytf-conf-formats-only-best'>All except the highest quality one</label><br>" +
				"<li>" +
				"<span>Autohide player bars:</span>" +
				"<select id='ytf-conf-controls-autohide-mode-sel' size='1'>" +
				"<option id='ytf-conf-controls-autohide-mode-opt-default' value='-1'" + ((scriptConfig.controlsAutohideMode === -1) ? " selected='selected'" : "") + ">YouTube default</option>" +
				"<option id='ytf-conf-controls-autohide-mode-opt-neither' value='0'" + ((scriptConfig.controlsAutohideMode === 0) ? " selected='selected'" : "") + ">Neither of the bars</option>" +
				"<option id='ytf-conf-controls-autohide-mode-opt-both' value='1'" + ((scriptConfig.controlsAutohideMode === 1) ? " selected='selected'" : "") + ">Both the progress and controls bars</option>" +
				"<option id='ytf-conf-controls-autohide-mode-opt-progress' value='2'" + ((scriptConfig.controlsAutohideMode === 2) ? " selected='selected'" : "") + ">Only the progress bar</option>" +
				"</select>" +
				"</li>" +
				"<li>" +
				"<span>Player theme:</span>" +
				"<select id='ytf-conf-player-theme-sel' size='1'>" +
				"<option id='ytf-conf-player-theme-opt-default' value=''" + ((scriptConfig.playerTheme === "") ? " selected='selected'" : "") + ">YouTube default</option>" + //'
				(function() { //'
					return playerThemesArray.map(function(t) {
						return "<option id='ytf-conf-player-theme-opt-" + t + "' value='" + t + "'" + ((scriptConfig.playerTheme === t) ? " selected='selected'" : "") + ">" + t.capitalizeFirstChar() + " theme</option>";
					}).join("");
				})() +
				"</select>" +
				"</li>" +
				"<li>" +
				"<span>Flash Player quality:</span>" +
				"<select id='ytf-conf-flash-quality-sel' size='1'>" +
				"<optgroup label='Automatic Quality options'>" +
				"<option id='ytf-conf-flash-quality-opt-default' value=''" + ((scriptConfig.flashQuality === "") ? " selected='selected'" : "") + ">YouTube default</option>" +
				"<option id='ytf-conf-flash-quality-opt-auto-high' value='autohigh'" + ((scriptConfig.flashQuality === "autohigh") ? " selected='selected'" : "") + ">Automatic, &darr; appearance if low frame rate</option>" +
				"<option id='ytf-conf-flash-quality-opt-auto-low' value='autolow'" + ((scriptConfig.flashQuality === "autolow") ? " selected='selected'" : "") + ">Automatic, &uarr; appearance if high frame rate</option>" +
				"</optgroup>" +
				"<optgroup label='Fixed Quality options'>" +
				"<option id='ytf-conf-flash-quality-opt-best' value='best'" + ((scriptConfig.flashQuality === "best") ? " selected='selected'" : "") + ">Best quality (high CPU use)</option>" +
				"<option id='ytf-conf-flash-quality-opt-high' value='high'" + ((scriptConfig.flashQuality === "high") ? " selected='selected'" : "") + ">High quality</option>" +
				"<option id='ytf-conf-flash-quality-opt-medium' value='medium'" + ((scriptConfig.flashQuality === "medium") ? " selected='selected'" : "") + ">Medium quality</option>" +
				"<option id='ytf-conf-flash-quality-opt-low' value='low'" + ((scriptConfig.flashQuality === "low") ? " selected='selected'" : "") + ">Low quality (low CPU use)</option>" +
				"</optgroup>" +
				"</select>" +
				"</li>" +
				"<li>" +
				"<span>Flash Player wMode:</span>" +
				"<select id='ytf-conf-flash-wmode-sel' size='1'>" +
				"<option id='ytf-conf-flash-wmode-opt-default' value=''" + ((scriptConfig.flashWMode === "") ? " selected='selected'" : "") + ">YouTube default</option>" +
				"<option id='ytf-conf-flash-wmode-opt-window' value='window'" + ((scriptConfig.flashWMode === "window") ? " selected='selected'" : "") + ">Window mode (normal mode)</option>" +
				"<option id='ytf-conf-flash-wmode-opt-transparent' value='transparent'" + ((scriptConfig.flashWMode === "transparent") ? " selected='selected'" : "") + ">Transparent mode (reduced perfomance)</option>" +
				"<option id='ytf-conf-flash-wmode-opt-opaque' value='opaque'" + ((scriptConfig.flashWMode === "opaque") ? " selected='selected'" : "") + ">Opaque mode (reduced performance)</option>" +
				"<option id='ytf-conf-flash-wmode-opt-direct' value='direct'" + ((scriptConfig.flashWMode === "direct") ? " selected='selected'" : "") + ">Direct mode (hw accelerated, recommended)</option>" +
				"<option id='ytf-conf-flash-wmode-opt-gpu' value='gpu'" + ((scriptConfig.flashWMode === "gpu") ? " selected='selected'" : "") + ">GPU mode (hw accelerated, no guaranteed pixel fidelity)</option>" +
				"</select>" +
				"</li>" +
				"</ul>" +
				"</div>" +
				"</div>" +
				"<div id='ytf-conf-buttons'>" +
				"<input type='button' id='ytf-conf-buttons-ok' value='OK' title='Save the current configuration'>" +
				"<input type='button' id='ytf-conf-buttons-cancel' value='Cancel' title='Return to the page without saving'>" +
				"</div>"});

		// Appends the layers to the document
		document.body.appendChild(confMask);
		document.body.appendChild(confDialog);

		// Adds the necessary event listeners to the config dialog's buttons
		$("ytf-conf-buttons-ok").addEventListener("click", saveConfiguration, false);
		$("ytf-conf-buttons-cancel").addEventListener("click", destroyDialog, false);

		// Adds a event listener to the config dialog's video size select, so the custom video size input is writable only when the custom video size option is selected
		$("ytf-conf-video-size-sel").addEventListener("change", function(evt) {
			var vsCustomOpt = $("ytf-conf-video-size-opt-custom"), vsCustomInput = $("ytf-conf-size-custom");
			vsCustomInput.disabled = !(vsCustomOpt.selected);
			if (vsCustomOpt.selected) vsCustomInput.focus(); // Sets focus on the custom video size input if the custom video size option is selected
		}, false);

		// Adds the necessary event listener to the config dialog's tab bar, so the dialog switches to the right tab when the corresponding button is pressed
		$("ytf-conf-tabbar").addEventListener("click", function(evt) {
			if (evt.target.hasAttribute("data-ytf-conf-tab-index")) switchToTab(evt.target.getAttribute("data-ytf-conf-tab-index"));
		}, false);

		// Switches to the first tab
		switchToTab(0);

	}

	// Switches to the passed tab of the configuration dialog
	function switchToTab(tabIndex) {

		// Change the passed tab index into a string
		tabIndex = String(tabIndex);

		// Gets the tab bar and content div nodes of the configuration dialog
		var confTabBar = $("ytf-conf-tabbar"), confContent = $("ytf-conf-content");

		// Shows the tab bar button with the passed tabIndex as active and not the other ones
		$x("./input[@data-ytf-conf-tab-index]", confTabBar).forEach(function(but) {
			if (but.getAttribute("data-ytf-conf-tab-index") === tabIndex) {
				addClass(but, "ytf-conf-tab-active");
			}
			else {
				removeClass(but, "ytf-conf-tab-active");
			}
		});

		// Shows the tab div with the passed tabIndex and hides all others
		$x("./div[@data-ytf-conf-tab-index]", confContent).forEach(function(tab) {
			if (tab.getAttribute("data-ytf-conf-tab-index") === tabIndex) {
				removeClass(tab, "ytf-hidden");
			}
			else {
				addClass(tab, "ytf-hidden");
			}
		});

	}

	// Hides or shows all the embeds of the document
	function setEmbedVisibility(embedVisible) {
		Array.forEach(document.getElementsByTagName("embed"), function(emb) {
			emb.style.visibility = (embedVisible) ? "" : "hidden";
		});
	}

	// Disables all input/select fields of the configuration dialog
	function lockDialogInputs() {
		var allInputs = $x(".//input|.//select", confDialog);
		allInputs.forEach(function(i) {i.disabled = true;});
	}

	// Exits the configuration by deleting the layers and showing the embeds
	// It is called by the Cancel button and the confMask event listeners
	function destroyDialog(evt) {
		delNodeArray([confMask, confDialog]);
		setEmbedVisibility(true);
	}

	// Gets the value of the checked radio input in the passed radio named group
	// Returns null if the name isn't found in the document
	function getRadioValue(radioName) {
		var rValue = null, rInputs = document.getElementsByName(String(radioName));
		for (var i = 0; i < rInputs.length; i++) {
			if (rInputs[i].checked) {
				rValue = rInputs[i].value;
				break;
			}
		}
		return rValue;
	}

	// Checks and saves the configuration to the configuration variables
	// It is called by the Ok button event listener
	function saveConfiguration() {

		// Sets videoSize depending on the value of the video size select (or the value of the custom video size input if a custom size is chosen)
		var vsSelect = $("ytf-conf-video-size-sel"), vsCustomInput = $("ytf-conf-size-custom");
		var vsValue = (vsSelect.value === "") ? vsCustomInput.value : vsSelect.value, vsValValue = VideoAdapter.valVideoSize(vsValue);
		if (vsValValue === null) { // Doesn't continue if the chosen video size is invalid
			window.alert("Invalid default video size");
			switchToTab(0);
			vsCustomInput.focus();
			return;
		}
		lockDialogInputs(); // Disables all input/select fields before saving
		GM_setValue("videoSize", vsValValue);

		// Sets autoplayMode depending on the state of the relevant radio inputs
		var apMode = parseInt(getRadioValue("ytf-conf-autoplay-choice"), 10);
		GM_setValue("autoplayMode", (isNaN(apMode)) ? 0 : apMode);

		// Sets channelAutoplayMode depending on the state of the relevant radio inputs
		var channelApMode = parseInt(getRadioValue("ytf-conf-autoplay-channel-choice"), 10);
		GM_setValue("channelAutoplayMode", (isNaN(channelApMode)) ? 0 : channelApMode);

		// Sets controlsAutohideMode depending on the value of the relevant select
		var ahMode = parseInt($("ytf-conf-controls-autohide-mode-sel").value, 10);
		GM_setValue("controlsAutohideMode", (isNaN(ahMode)) ? -1 : ahMode);

		// Sets other configuration variables
		GM_setValue("filenameSavePattern", $("ytf-conf-filename-save-pattern").value);
		GM_setValue("removeVideoInformation", $("ytf-conf-remove-video-information").selected);
		GM_setValue("removeActions", $("ytf-conf-remove-actions").selected);
		GM_setValue("removeRelatedVideos", $("ytf-conf-remove-related-videos").selected);
		GM_setValue("removeComments", $("ytf-conf-remove-comments").selected);
		GM_setValue("removeVideoResponses", $("ytf-conf-remove-video-responses").selected);
		GM_setValue("removeHeader", $("ytf-conf-remove-header").selected);
		GM_setValue("removeFooter", $("ytf-conf-remove-footer").selected);
		GM_setValue("removeSubscriptionReminder", $("ytf-conf-remove-subscription-reminder").selected);
		GM_setValue("expandVideo", $("ytf-conf-expand-video").checked);
		GM_setValue("expandInfo", $("ytf-conf-expand-info").checked);
		GM_setValue("overrideAutoplayPlaylists", $("ytf-conf-override-autoplay-playlists").checked);
		GM_setValue("overrideAutoplayFgTab", $("ytf-conf-override-autoplay-fg-tab").checked);
		GM_setValue("scrollToVideo", $("ytf-conf-scroll-to-video").checked);
		GM_setValue("defaultVideoQuality", $("ytf-conf-default-video-quality-sel").value);
		GM_setValue("channelOverrideAutoplayFgTab", $("ytf-conf-channel-override-autoplay-fg-tab").checked);
		GM_setValue("channelDefaultVideoQuality", $("ytf-conf-channel-default-video-quality-sel").value);
		GM_setValue("downloadFromSearch", $("ytf-conf-download-from-search").checked);
		GM_setValue("removeAds", $("ytf-conf-remove-ads").checked);
		GM_setValue("removeDefaultLanguageBox", $("ytf-conf-remove-default-language-box").checked);
		GM_setValue("removeWatermark", $("ytf-conf-remove-watermark").checked);
		GM_setValue("disableAnnotations", $("ytf-conf-disable-annotations").checked);
		GM_setValue("formatsHide3D", $("ytf-conf-formats-hide-3d").checked);
		GM_setValue("formatsHideCutoffQI", $("ytf-conf-formats-hide-cutoff-qi-sel").value);
		GM_setValue("formatsOnlyBest", $("ytf-conf-formats-only-best").checked);
		GM_setValue("playerTheme", $("ytf-conf-player-theme-sel").value);
		GM_setValue("flashQuality", $("ytf-conf-flash-quality-sel").value);
		GM_setValue("flashWMode", $("ytf-conf-flash-wmode-sel").value);

		// Reloads page and script
		window.location.reload();

	}

}

// Registers the configuration menu command
GM_registerMenuCommand("YousableTubeFix Configuration", scriptConfiguration, "Y");

////////////////////////// END OF USER CONFIGURATION //////////////////////////

//////////////////////////// START OF SCRIPT UPDATE ///////////////////////////

// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
function scriptShowUpdateMessage(scriptShowMessage, scriptNewVersion) {

	// Gets the notice box and the script new version date in UTC format
	var messageDiv = $("ytf-script-version-message");
	var scriptNewVersionDate = (new Date(scriptNewVersion)).toUTCString();

	// Shows/creates/hides the update notice
	if (!scriptShowMessage) {
		// Hides the notice if it exists
		if (messageDiv) addClass(messageDiv, "ytf-hidden");
	}
	else {

		// The notice shouldn't be shown/created if the user has chosen to hide it for this session
		if (sessionStorage.getItem("ytfscriptVersionNoticeHide")) return;

		if (messageDiv) {
			// Shows the notice
			removeClass(messageDiv, "ytf-hidden");
		}
		else {

			// Creates the notice
			messageDiv = createNode("div", {id: "ytf-script-version-message", title: "A new YousableTubeFix version is available"},
				{innerHTML: "A new version of YousableTubeFix (" + scriptNewVersionDate + ") is available<br><br>" +
					"<a id='ytf-script-version-message-install' href='" + scriptFileURL + "' title='Install the script update'>Install</a>" +
					"<a href='" + scriptHomepageURL + "' target='_blank' title='Go to YousableTubeFix homepage'>Go to web page</a>" +
					"<a id='ytf-script-version-message-hide' href='javascript:void(null)' title='Hide the notice for this session'>Hide</a>"});
			document.body.appendChild(messageDiv);

			// Adds an event listener to the hide notice link
			$("ytf-script-version-message-hide").addEventListener("click", function(evt) {
				sessionStorage.setItem("ytfscriptVersionNoticeHide", "1"); // Sets a sessionStorage variable to prevent the notice to be shown for this session
				scriptShowUpdateMessage(false, null);
			}, false);

			// Adds an event listener to the install link to hide the notice
			$("ytf-script-version-message-install").addEventListener("click", function(evt) {scriptShowUpdateMessage(false, null);}, false);

		}
	}
}

// Checks if there is a new script version according to the version information in the script meta URL (where the script headers can be downloaded), @ytfversion header
// If the request is successful and there is a new version available, a message to the user is displayed
function scriptCheckVersion() {
	GM_xmlhttpRequest({
		method: "GET",
		url: scriptMetaURL,
		onload: function(evt) {
			if ((evt.readyState === 4) && (evt.status === 200)) {

				// Gets the remote version from the response and makes sure it is a number
				var responseMatch = evt.responseText.match(/@ytfversion\s+(\d+)/);
				var remoteVersion = (responseMatch === null) ? NaN : parseInt(responseMatch[1], 10);
				if (isNaN(remoteVersion)) return;

				// Saves the more recent version according to the server and shows the update notice if the server version is newer
				GM_setValue("scriptLastRemoteVersion", remoteVersion.toString());
				if (remoteVersion > scriptVersion) scriptShowUpdateMessage(true, remoteVersion);

			}
		}
	});
}

// Current script version (release date), last update check and last remote version seen
var scriptVersion = 1392782455046; // 19 Feb 2014

var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);
if (isNaN(scriptLastCheck)) scriptLastCheck = 0;

var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", scriptVersion.toString()), 10);
if (isNaN(scriptLastRemoteVersion)) scriptLastRemoteVersion = scriptVersion;

// URLs related to the script
var scriptFileURL = "http://userscripts.org/scripts/source/13333.user.js";
var scriptMetaURL = "http://userscripts.org/scripts/source/13333.meta.js";
var scriptHomepageURL = "http://userscripts.org/scripts/show/13333";

// Checks for script updates
var scriptTime = (new Date()).getTime();
if (scriptTime - scriptLastCheck >= 86400000) { // 1 day
	// At least a day has passed since the last check. Sends a request to check for a new script version
	GM_setValue("scriptLastCheck", scriptTime.toString());
	scriptCheckVersion();
}
else {
	// If a new version was previously detected the notice will be shown to the user
	// This is to prevent that the notice will only be shown once a day (when an update check is scheduled)
	if (scriptLastRemoteVersion > scriptVersion) {
		scriptShowUpdateMessage(true, scriptLastRemoteVersion);
	}
}

///////////////////////////// END OF SCRIPT UPDATE ////////////////////////////

///////////////////////////// START OF MAIN SCRIPT ////////////////////////////

// Prevents the script from running in a frame/iframe
if (window.self !== window.top) return;

// Actions for all YouTube pages

// Removes the default language dialog box
if (scriptConfig.removeDefaultLanguageBox) delNode("default-language-box");

// Actions for each type of YouTube page
if (ytPath === "/") {

	// Home page

	// Remove the ads and the Chrome promotion
	if (scriptConfig.removeAds) {
		delNodeArray($x("//*[starts-with(@id, 'ad_creative_')]"));
		delNode("homepage-chrome-side-promo");
	}

}
else if (/^\/results(?:\.php)?$/i.test(ytPath)) {

	// Search results page

	// Calls the script function for the search results page
	scriptSearchMain();

}
else if (/^\/watch(?:\.php)?$/i.test(ytPath)) {

	// Video page (watch page)

	// Temporary redirection fix to allow the script to work with YouTube's new ajax mode
	if ((window.location.hash.length > 2) && (window.location.hash.substr(0, 2) === "#!")) {
		window.location.replace(window.location.href.replace("#!", "?"));
		return;
	}

	// Calls the script function for the watch page
	scriptWatchMain();

}
else if (/^\/(?:user|show)\//i.test(ytPath)) {

	// User channel page

	// Calls the script function for the user channel page
	scriptChannelMain();

}
else if (/^\/[^/]+(?:\/)?$/i.test(ytPath)) {

	// Possible "direct" user channel page (www.youtube.com/[UserId])

	// Calls the script function for the user channel page if the player's root node is found
	if ($x1("//div[contains(@class, '" + YT_PLAYER_ROOT_CHANNEL_CLASS + "')]")) scriptChannelMain();

}

return; // Exit function

// Script function for the watch page
function scriptWatchMain() {

	// Declares the watch VideoAdapter variable
	var watchVA;

	// Initializes the VideoAdapter object for the Flash player
	if ($x1("//embed[@id='" + YT_PLAYER_ID + "']")) {

		// Creates a VideoAdapter object for the video. The relevant script configuration settings are passed to the function to be applied
		try {
			watchVA = new VideoAdapter(YT_PLAYER_ID, scriptWatchAPI, YTF_DEFAULT_VIDEO_TITLE, YTF_DEFAULT_VIDEO_USERNAME, false);
			watchVA.initFeatures({defaultVideoQuality: scriptConfig.defaultVideoQuality, autoplayMode: scriptConfig.autoplayMode, overrideAutoplayPlaylists: scriptConfig.overrideAutoplayPlaylists,
				overrideAutoplayFgTab: scriptConfig.overrideAutoplayFgTab, controlsAutohideMode: scriptConfig.controlsAutohideMode, playerTheme: scriptConfig.playerTheme,
				flashQuality: scriptConfig.flashQuality, flashWMode: scriptConfig.flashWMode,	expandVideo: scriptConfig.expandVideo, removeWatermark: scriptConfig.removeWatermark,
				disableAnnotations: scriptConfig.disableAnnotations}, true);
		}
		catch(err) {
			console.log(err.toString());
			return;
		}

	}
	// Initializes the VideoAdapter object for the HML5 player (incomplete support yet)
	// Waits for the player insertion if it isn't in the page yet
	else if ($(YT_PLAYER_DIV_ID)) {

		console.log("HTML5 player support is incomplete yet");

		// Initializes the VideoAdapter object for the HML5 player
		function playerHTML5Insertion() {

			try {
				watchVA = new VideoAdapterHTML5(YT_PLAYER_ID, scriptWatchAPI, YTF_DEFAULT_VIDEO_TITLE, YTF_DEFAULT_VIDEO_USERNAME);
				watchVA.initFeatures({autoplayMode: scriptConfig.autoplayMode, overrideAutoplayPlaylists: scriptConfig.overrideAutoplayPlaylists,	overrideAutoplayFgTab: scriptConfig.overrideAutoplayFgTab});
			}
			catch(err) {
				console.log(err.toString());
				return;
			}

		}

		var playerDiv = $(YT_PLAYER_DIV_ID);

		if ($(YT_PLAYER_ID)) {
			playerHTML5Insertion();
		}
		else {
			playerDiv.addEventListener("DOMNodeInserted", function(evt) {
				if (evt.target.id === YT_PLAYER_ID) {
					playerDiv.removeEventListener("DOMNodeInserted", arguments.callee, false); // The listener isn't needed anymore
					playerHTML5Insertion();
				}
			}, false);
		}

	}
	// No known player has been detected
	else {
		console.log("Player not found or of unknown type");
		return;
	}

	// API callback function. It is called by the VideoAdapter object when the YouTube's API is available for the video
	function scriptWatchAPI() {

		// Shortcut to the current function to store variables as its properties (retaining its value between calls)
		var meSt = arguments.callee;

		//'
		if (!meSt.apiAlreadyCalled) {

			// Only adds the listeners to resize the player if the VideoAdapter type is "Flash" (temporary code till the support for resizing the HTML5 player is ready)
			if (watchVA.VAType === "Flash") {

				// Sets a listener to recalculate and restore the last used video size if the window is resized (some video sizes are calculated from the window size)
				window.addEventListener("resize", function(evt) {
					if (watchVA.isAPIReady) resizePlayer(null, false); // The page shouldn't be scrolled
				}, false);

			}

			// Creates the script main div and its buttons and inserts it in the content panel
			var contentPanel = $(YT_CONTENT_PANEL_ID);
			if (contentPanel) {

				// Creates the script main div
				var mainDiv = createNode("div", {id: "ytf-main-div"});

				// Creates the resize menu div and appends it to the main div
				var mainResizeMenu = createNode("div", {"aria-haspopup": "true", class: YT_MENU_CLASSES + " " + YT_HIDDEN_CLASS, id: "ytf-main-resize-menu", role: "menu"}, null,
					[["click", function(evt) {
						// If a resize link is clicked, resizes the player and scrolls to it
						if (evt.target.nodeName.toUpperCase() === "A") {
							var linkSize = VideoAdapter.valVideoSize(evt.target.textContent);
							if (linkSize !== null) resizePlayer(linkSize, true);
						}
					}, false]]);
				resizeNamedSizes.keys.filter(function(vs) {return (vs !== "default");}).concat("0.25", "0.5", "0.75", "default", "1.25", "1.5", "1.75", "2", "2.25", "2.5").forEach(function(vs) { // The "default" video size is filtered first from the named sizes array to include it between the numeric sizes
					// Creates and appends a resize link for each resize size to the resize menu div
					mainResizeMenu.appendChild(createNode("a", {class: YT_MENU_ITEM_CLASS, href: "javascript:void(0)"}, {textContent: vs}));
				});
				mainDiv.appendChild(mainResizeMenu);

				// Creates the resize button and appends it to the main div
				var mainResizeButton = createDropdownYTButton("ytf-main-resize-button", "Resize", "Resize the video player", "ytf-main-resize-button-content", "ytf-main-resize-menu");
				if (watchVA.VAType !== "Flash") mainResizeButton.disabled = true; // Disables the button if the VideoAdapter type isn't "Flash" (temporary code till the support for resizing the HTML5 player is ready)
				mainDiv.appendChild(mainResizeButton);

				// Creates the download menu div and appends it to the main div
				var mainDownloadMenu = createNode("div", {"aria-haspopup": "true", class: YT_MENU_CLASSES + " " + YT_HIDDEN_CLASS, id: "ytf-main-download-menu", role: "menu"});
				if (watchVA.videoFormats.length !== 0) { // Adds the links to the menu if there is at least one VideoFormat in the VideoAdapter
					var formatsArray = watchVA.videoFormats.values.filter(VideoFormat.prefFilter(scriptConfig.formatsHideCutoffQI, scriptConfig.formatsHide3D)).sort(VideoFormat.qualitySorter()); // The VideoFormat objects are filtered according to the user preferences and sorted in descending order (from highest to lowest quality)
					if ((scriptConfig.formatsOnlyBest) && (formatsArray.length > 1)) formatsArray.length = 1; // Leaves only the VideoFormat with the highest quality (first item of the sorted array) if the user chooses so
					formatsArray.forEach(function(vf) {
						// Creates and appends a download link for each video format to the download menu div
						var videoTitledDUrl = VideoAdapter.getVideoTitledDownloadURL(vf, watchVA.vId, watchVA.title, watchVA.username, scriptConfig.filenameSavePattern);
						mainDownloadMenu.appendChild(createNode("a", {class: YT_MENU_ITEM_CLASS, href: videoTitledDUrl, title: vf.getDataString(YTF_DOWNLOAD_TOOLTIP_DATA_STRING)}, {textContent: vf.getDataString("%d %c %hp")}));
					});
					// Adds an informative notice to the menu if at least one VideoFormat was filtered
					if (formatsArray.length !== watchVA.videoFormats.length) {
						mainDownloadMenu.appendChild(createNode("span", {class: YT_MENU_ITEM_CLASS + " ytf-main-download-info", title: "Some downloads were hidden according to your settings"}, {textContent: (watchVA.videoFormats.length - formatsArray.length) + " additional downloads are available"}));
					}
				}
				else { // Only adds a warning to the menu if there isn't any VideoFormats in the VideoAdapter
					mainDownloadMenu.appendChild(createNode("span", {class: YT_MENU_ITEM_CLASS + " ytf-main-download-warning", title: "No download links were found for this video"}, {textContent: "Download links aren't available"}));
				}
				mainDiv.appendChild(mainDownloadMenu);

				// Creates the download button and appends it to the main div
				var mainDownloadButton = createDropdownYTButton("ytf-main-download-button", "Download", "Download this video", "ytf-main-download-button-content", "ytf-main-download-menu");
				mainDiv.appendChild(mainDownloadButton);

				// Creates the configuration button and appends it to the main div
				var mainConfigureButton = createNode("button", {class: YT_BUTTON_CLASSES + " " + YT_BUTTON_TOOLTIP_CLASS + " " + YT_BUTTON_TOOLTIP_REVERSE_CLASS, id: "ytf-main-configure-button", role: "button", title: "Configure YousableTubeFix", type: "button"}, null,
					[["click", scriptConfiguration, false]]);
				mainConfigureButton.appendChild(createNode("span", {class: YT_BUTTON_CONTENT_CLASS, id: "yt-main-configure-button-content"}, {textContent: "Configure"}));
				mainDiv.appendChild(mainConfigureButton);

				// Inserts the main div as the first child element of the content panel
				contentPanel.insertBefore(mainDiv, contentPanel.firstChild);

			}
			else {
				console.log("Content panel not found");
			}

			//'
			meSt.apiAlreadyCalled = true;

		}

		// Only resizes the player if the VideoAdapter type is "Flash" (temporary code till the support for resizing the HTML5 player is ready)
		if (watchVA.VAType === "Flash") {

			// Sets a listener to resize the video to the default size if the shrink/expand button of the player is pressed (to restore YouTube's original layout)
			var restoreSizeFuncName = getUniqueFunctionName("ytfrestoreSize");
			unsafeWindow[restoreSizeFuncName] = function(isWide) {
				resizePlayer("default", false); // The page shouldn't be scrolled
			}
			watchVA.uwPlayer.addEventListener("SIZE_CLICKED", restoreSizeFuncName);

			// Resizes the player to the chosen video size and scrolls to it (if configured to do so)
			resizePlayer(scriptConfig.videoSize, scriptConfig.scrollToVideo);

		}

	}

	//*
	// Makes all changes necessary to resize the player to the passed sizeValue
	// If doScroll is true it also scrolls the page to put the player into view
	function resizePlayer(sizeValue, doScroll) {

		// Shortcut to the current function to store variables as its properties (retaining its value between calls)
		var meSt = arguments.callee;

		// Gets the player div, the video div (the player div parent)
		var playerDiv = $(YT_PLAYER_DIV_ID), videoDiv = $(YT_VIDEO_DIV_ID);
		if ((!playerDiv) || (!videoDiv)) return;

		//*'
		// Gets the playlist, its bar and its bar left side (if they exists in the page)
		var playlistDiv = $(YT_PLAYLIST_ID);
		var playlistBar = (playlistDiv) ? $x1("./div[contains(@class, '" + YT_PLAYLIST_BAR_CLASS + "')]", playlistDiv) : null;
		var playlistBarLSide = (playlistBar) ? $x1("./div[contains(@class, '" + YT_PLAYLIST_BAR_LEFT_CLASS + "')]", playlistBar) : null;
		var playlistTray = $(YT_PLAYLIST_TRAY_ID);

		//*'
		var guideDiv = $(YT_GUIDE_ID);

		// If the passed video size is null, the current size is "refreshed" (recalculated). If this is the first resize operation, the function returns without doing anything
		if (sizeValue === null) {
			if (typeof meSt.currentSize === "undefined") return;
			sizeValue = meSt.currentSize;
		}

		// Saves the new size value as the current size for future reference
		meSt.currentSize = sizeValue;

		//*'
		// If the passed video size is "default", the function returns after reverting all changes done in previous calls and restoring the player to its default YouTube size
		// The page is also scrolled to the player div (or the playlist bar if it exists) if configured to do so and the resize button is updated
		if (sizeValue === "default") {
			if (playlistBarLSide)	playlistBarLSide.style.width = "";
			//if (playlistTray) playlistTray.style.right = "";
			if (guideDiv) guideDiv.style.top = "";
			playerDiv.style.width = "";
			playerDiv.style.height = "";
			videoDiv.style.paddingLeft = "";
			if (doScroll) scrollToNode((playlistBar) ? playlistBar : playerDiv);
			updateResizeButtonContent();
			return;
		}

		// Makes sure the player is expanded before resizing it
		watchVA.expandPlayer();

		// Initializes variables and gets the viewport size without scrollbars (in Strict mode)
		var newSize = {width: 0, height: 0};
		var viewportSize = {width: document.documentElement.clientWidth, height: document.documentElement.clientHeight};

		// Calculates the new player size for the passed video size
		var resizeValueFunc = resizeNamedSizes.getItem(sizeValue);
		if (typeof resizeValueFunc === "function") {
			// A named video size: its resize function is used to get the new size
			newSize = resizeValueFunc(YT_PLAYER_EXPANDED_SIZE, viewportSize);
		}
		else {
			// A numeric custom size: it is used as a multiplier for the player original dimensions to get the new size
			var sizeValueFloat = parseFloat(sizeValue);
			newSize = {width: YT_PLAYER_EXPANDED_SIZE.width * sizeValueFloat,
								 height: YT_PLAYER_EXPANDED_SIZE.height * sizeValueFloat};
		}

		// The new player size is applied to the player div style (the player will resize too because of its "100%" height and width defined in YouTube's CSS)
		videoDiv.style.paddingLeft = Math.clamp((YT_COLUMN_WIDTH - newSize.width) / 2 + YT_VIDEO_DIV_LPADDING, 0, YT_VIDEO_DIV_LPADDING + YT_COLUMN_WIDTH).toCSS(); // Modifies the original YT_VIDEO_DIV_LPADDING left padding of the video div in YouTube's CSS to center the resized player
		playerDiv.style.width = newSize.width.toCSS();
		playerDiv.style.height = newSize.height.toCSS();
		if (playlistBarLSide) playlistBarLSide.style.width = (newSize.width - YT_PLAYLIST_BAR_RIGHT_WIDTH).toCSS(); //*'
		//if (playlistTray) playlistTray.style.right = getAbsoluteRect(playerDiv).right.toCSS();
		if (guideDiv) guideDiv.style.top = (newSize.width > YT_COLUMN_WIDTH) ? newSize.height.toCSS() : "";

		// The page is scrolled to the player div (or to the playlist bar if it exists in some video sizes) if configured to do so. The resize button is also updated
		if (doScroll) scrollToNode(((playlistBar) && ((sizeValue === "controls") || (sizeValue === "fill"))) ? playlistBar : playerDiv);
		updateResizeButtonContent();

		return; // Exit function

		// Updates the resize button text with the new player size and player dimensions
		// A delay of 250 miliseconds is used to wait for the CSS transition used by the player to complete
		function updateResizeButtonContent() {
			setTimeout(function() {
				var mainResizeButtonContent = $("ytf-main-resize-button-content");
				if (mainResizeButtonContent) mainResizeButtonContent.textContent = sizeValue + " (" + playerDiv.offsetWidth + "x" + playerDiv.offsetHeight + ")";
			}, 250);
		}

	}

	// Removes brand and promoted videos ads
	if (scriptConfig.removeAds) {
		delNode("watch-longform-ad");
		delNode("watch-channel-brand-div");
		delNode("ppv-container");
	}

	// Removes video information section
	if (scriptConfig.removeVideoInformation) delNode("watch-info");

	// Removes actions section ("Like/Don't Like", "Save to", "Share", etc...)
	if (scriptConfig.removeActions) delNode("watch-actions");

	// Removes related videos section
	if (scriptConfig.removeRelatedVideos) delNode("watch7-sidebar");

	// Removes the comments and video responses sections
	var videoDivCommentsView = $("comments-view");
	if (videoDivCommentsView) {

		// Removes the comments section
		if (scriptConfig.removeComments) {
			delNodeArray($x("./*[not(normalize-space(@class)='comments-section')]", videoDivCommentsView)); // Comment share and loading divs
			delNodeArray($x("./div[normalize-space(@class)='comments-section'][*[@class='comment-list' or @class='comments-pagination']]", videoDivCommentsView)); // Comments blocks and pagination controls
		}

		// Removes the video responses section
		if (scriptConfig.removeVideoResponses) {
			delNodeArray($x("./div[normalize-space(@class)='comments-section'][*[@class='video-list']]", videoDivCommentsView)); // Video responses blocks
			videoDivCommentsView.addEventListener("DOMNodeInserted", function(evt) { // Mutation event listener to remove video responses blocks reinserted after going back to the first comments page after visiting another comments page
				delNodeArray($x("descendant-or-self::div[normalize-space(@class)='comments-section'][*[@class='video-list']]", evt.target));
			}, false);
		}

	}

	// Removes header section
	if (scriptConfig.removeHeader) delNode("yt-masthead-container");

	// Removes footer section
	if (scriptConfig.removeFooter) delNode("footer-hh-container");

	// Stops the subscription reminder popup
	if (scriptConfig.removeSubscriptionReminder) setYTConfig("SHOW_SUBSCRIBE_UPSELL", false);

	// Expands the video information section
	if (scriptConfig.expandInfo) {
		var descriptionDiv = $("watch-description");
		if ((descriptionDiv) && (containsClass(descriptionDiv, YT_EXPANDER_COLLAPSED_CLASS))) { // The description should be expanded only when it is collapsed
			var expandButton = $x1(".//div[@id='watch-description-expand']/button", descriptionDiv);
			if (expandButton) setTimeout(function() {fireClickEvent(expandButton);}, 1000); // A delay of 1 second is used to wait for the YouTube event handlers to attach themselves to the button
		}
	}

}

// Script function for the user channel page
function scriptChannelMain() {

	// Tries to get the player's root node
	var playerDiv = $x1("//div[contains(@class, '" + YT_PLAYER_ROOT_CHANNEL_CLASS + "')]");
	if (!playerDiv) {
		console.log("Channel player div not found");
		return;
	}

	// Adds a listener to call channelPlayerInsertion when the player is inserted in the page
	playerDiv.addEventListener("DOMNodeInserted", function(evt) {
		if (evt.target.id === YT_PLAYER_ID) {
			playerDiv.removeEventListener("DOMNodeInserted", arguments.callee, false); // The listener isn't needed anymore
			channelPlayerInsertion(evt.target);
		}
	}, false);

	// Call chanelPlayerInsertion if the player is already in the page
	if ($(YT_PLAYER_ID)) {
		channelPlayerInsertion($(YT_PLAYER_ID));
	}

	return; // Exit function

	// Player insertion function. It is called by the DOMNodeInserted listener when a new video player node is inserted in the page
	function channelPlayerInsertion(playerNode) {

		// Declares the channel VideoAdapter variable
		var channelVA;

		// Initializes the appropriate VideoAdapter object for the inserted player
		switch(playerNode.nodeName.toUpperCase()) {

			// Initializes the VideoAdapter object for the Flash player
			case "EMBED":

				// Creates a VideoAdapter object for the video. The relevant script configuration settings are passed to the function to be applied
				try {
					channelVA = new VideoAdapter(YT_PLAYER_ID, null, YTF_DEFAULT_VIDEO_TITLE, YTF_DEFAULT_VIDEO_USERNAME, false);
					channelVA.initFeatures({defaultVideoQuality: scriptConfig.channelDefaultVideoQuality, autoplayMode: scriptConfig.channelAutoplayMode, overrideAutoplayFgTab: scriptConfig.channelOverrideAutoplayFgTab,
						controlsAutohideMode: scriptConfig.controlsAutohideMode, playerTheme: scriptConfig.playerTheme, flashQuality: scriptConfig.flashQuality, flashWMode: scriptConfig.flashWMode,
						removeWatermark: scriptConfig.removeWatermark, disableAnnotations: scriptConfig.disableAnnotations}, true);
				}
				catch(err) {
					console.log(err.toString());
					return;
				}

				break;

			// Initializes the VideoAdapter object for the HML5 player (incomplete support yet)
			case "DIV":

				console.log("HTML5 player support is incomplete yet");

				try {
					channelVA = new VideoAdapterHTML5(YT_PLAYER_ID, null, YTF_DEFAULT_VIDEO_TITLE, YTF_DEFAULT_VIDEO_USERNAME);
					channelVA.initFeatures({autoplayMode: scriptConfig.channelAutoplayMode, overrideAutoplayFgTab: scriptConfig.channelOverrideAutoplayFgTab});
				}
				catch(err) {
					console.log(err.toString());
					return;
				}

				break;

			// Any other player node is invalid
			default:
				console.log("Invalid player node");
				break;

		}

	}

}

// Script function for the search results page
function scriptSearchMain() {

	// Removes the ads
	if (scriptConfig.removeAds) {
		delNode("search-pva-content");
		delNodeArray($x("//div[contains(@class, 'promoted-videos')]"));
	}

	//'
	if (scriptConfig.downloadFromSearch) {

		var videosDiv = $x("id('search-results')/li/div[not(descendant::ul[@class='playlist-videos'])]");

		videosDiv.forEach(function(videoDiv) {

			var videoLink = $x1(".//a[starts-with(@href, '/watch')][@title]", videoDiv);
			if (!videoLink) return;

			var videoTitle = videoLink.title;
			var videoId = videoLink.href.match(/v=(.+)$/i);
			if (videoId === null) {
				return;
			}
			else {
				videoId = videoId[1];
			}

			var videoChannelLink = $x1(".//a[starts-with(@href, '/user/')]", videoDiv);
			var videoUsername = (videoChannelLink) ? videoChannelLink.textContent : YTF_DEFAULT_VIDEO_USERNAME;

			var videoInfoXhr = new XMLHttpRequest();
			videoInfoXhr.onload = function(evt) {

				if ((this.readyState !== 4) || (this.status !== 200)) return;

				var responseMatch = this.responseText.match(/ytplayer\.config = ({.*});/im);
				if (responseMatch === null) return;

				var swfObj = null, fList = null, fStreamMap = null;
				try {
					swfObj = JSON.parse(responseMatch[1]);
					fList = swfObj.args.fmt_list;
					fStreamMap = swfObj.args.url_encoded_fmt_stream_map;
				}
				catch(err) {}
				if ((typeof fList !== "string") || (fList.length === 0) || (typeof fStreamMap !== "string") || (fStreamMap.length === 0)) return;

				var videoFormats = VideoAdapter.parseURLMapGen(fList, fStreamMap);
				if ((videoFormats === null) || (videoFormats.length === 0)) return;

				var badgeUL = videoDiv.appendChild(createNode("ul", {class: YT_SEARCH_BADGE_UL_CLASS}));

				var videoFormatsArray = videoFormats.values.filter(VideoFormat.prefFilter(scriptConfig.formatsHideCutoffQI, scriptConfig.formatsHide3D)).sort(VideoFormat.qualitySorter());
				if ((scriptConfig.formatsOnlyBest) && (videoFormatsArray.length > 1)) videoFormatsArray.length = 1;
				videoFormatsArray.forEach(function(vf) {
					var videoTitledDUrl = VideoAdapter.getVideoTitledDownloadURL(vf, videoId, videoTitle, videoUsername, scriptConfig.filenameSavePattern);
					var badgeLI = createNode("li");
					badgeLI.appendChild(createNode("a", {class: "yt-badge-std", href: videoTitledDUrl, title: vf.getDataString(YTF_DOWNLOAD_TOOLTIP_DATA_STRING)}, {textContent: vf.getDataString("%l")}));
					badgeUL.appendChild(badgeLI);
				});

			};
			videoInfoXhr.open("GET", ytHost + "/watch?v=" + videoId, true);
			videoInfoXhr.send(null);

		});

	}

}

////////////////////////////// END OF MAIN SCRIPT /////////////////////////////

})();
