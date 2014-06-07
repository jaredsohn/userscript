// ==UserScript==
// @name          YousableTubeFix
// @namespace     http://userscripts.org/scripts/show/86938
// @description   Removes ads and unwanted sections (configurable), allows downloading and resizing videos, changes the default video quality, expands the description and the video size, can prevent autoplay and autobuffering, etc...
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// @version       01 Sep 2010
// ==/UserScript==

/*
Author: Mindeye
Script initially based on ETcelera's YousableTube userscript (http://userscripts.org/scripts/show/86938)
Version: 01 Sep 2010
*/

////////////////////////////// START OF CONSTANTS /////////////////////////////

//'
var YTF_DEFAULT_VIDEO_TITLE = "video";

//'
var YT_CONTENT_WIDTH = 960;

//'
var YT_PLAYER_ID = "movie_player";
var YT_PLAYER_CONTROLBAR_HEIGHT_OLDUI = 25;
var YT_PLAYER_CONTROLBAR_HEIGHT_NEWUI = 35;

//'
var YT_QUICKLIST_ID = "quicklist";

//'
var YT_MENU_CLASS = "yt-uix-button-menu";
var YT_MENU_ITEM_CLASS = "yt-uix-button-menu-item";

//'
var YT_BUTTON_CLASS = "yt-uix-button";
var YT_BUTTON_CONTENT_CLASS = "yt-uix-button-content";
var YT_BUTTON_ARROW_CLASS = "yt-uix-button-arrow";
var YT_BUTTON_ARROW_SRC = "http://s.ytimg.com/yt/img/pixel-v173.gif";

//'
var YT_EXPANDER_COLLAPSED_CLASS = "yt-uix-expander-collapsed";

/////////////////////////////// END OF CONSTANTS //////////////////////////////

////////////////////////// START OF HELPER FUNCTIONS //////////////////////////

// Shortcut to document.getElementById
function $(id) {
	return document.getElementById(id);
}

// Returns a node from its id or a reference to it
function $ref(idRef) {
	return (typeof(idRef) == "string") ? $(idRef) : idRef;
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
	if (!(nodeArray instanceof Array)) return;
	nodeArray.forEach(function(iNode) {
		delNode(iNode);
	});
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

	if (evls instanceof Array) {
		evls.forEach(function(evl) {node.addEventListener.apply(node, evl);});
	}

	return node;

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
	if ((aClass == "") || (/\s/.test(aClass))) return;
	var classList = getClassList(targetNode);
	if ((classList !== null) && (classList.indexOf(aClass) == -1)) {
		classList.push(aClass);
		targetNode.className = classList.join(" ");
	}
}

// Removes the passed CSS class as a class of the passed node, if it is
// If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it does nothing
// These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
function removeClass(targetNode, rClass) {
	if ((rClass == "") || (/\s/.test(rClass))) return;
	var classList = getClassList(targetNode);
	if (classList !== null) {
		var classIndex = classList.indexOf(rClass);
		if (classIndex != -1) {
			classList.splice(classIndex, 1);
			targetNode.className = classList.join(" ");
		}
	}
}

// Returns true if the passed CSS class is a class of the passed node, false otherwise
// If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it returns null
// These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
function containsClass(targetNode, cClass) {
	if ((cClass == "") || (/\s/.test(cClass))) return null;
	var classList = getClassList(targetNode);
	return (classList !== null) ? (classList.indexOf(cClass) != -1) : null;
}

// Toggles the passed CSS as a class of the passed none (adds it if it isn't present, removes it if it is)
// If the node isn't found, or the class name is an empty string or contains spaces (invalid name), it does nothing
// These class functions will be replaced with calls to Element.classList (HTML5) when it gets better support
function toggleClass(targetNode, tClass) {
	if ((tClass == "") || (/\s/.test(tClass))) return;
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

//'
function toggleMenu(menuNode, buttonNode) {

	if ((!menuNode) || (!buttonNode)) return;

	var buttonRect = getAbsoluteRect(buttonNode);
	menuNode.style.left = buttonRect.left.toCSS();
	menuNode.style.top = buttonRect.bottom.toCSS();
	menuNode.style.minWidth = buttonNode.offsetWidth.toCSS();

	var menuItemsCount = Array.filter(menuNode.getElementsByClassName(YT_MENU_ITEM_CLASS), function(el) {
		return (!containsClass(el, "ytf-hidden"));
	}).length;
	if (menuNode.style.MozColumnCount !== undefined) menuNode.style.MozColumnCount = Math.ceil(menuItemsCount / 5).toString();
	if (menuNode.style.MozColumnGap !== undefined) menuNode.style.MozColumnGap = "0px";

	toggleClass(menuNode, "ytf-hidden");

}

// Adds !important to CSS rules of any type
function makeCSSImportant(cssString) {

	var cssSelector, cssDeclarationBlock, cssArray = cssString.match(/([^{]+)({[^{}]+})/);
	if (cssArray === null) {
		// Inline CSS rule (e.g. "display: none") or scripting rule (e.g. element.style.display = "none")
		cssSelector = "";
		cssDeclarationBlock = cssString;
	}
	else {
		// Complete CSS rule (e.g. ".nd {display: none}")
		cssSelector = cssArray[1];
		cssDeclarationBlock = cssArray[2];
	}

	// Adds !important to each rule
	if (cssDeclarationBlock.indexOf(":") != -1) {
		cssDeclarationBlock = cssDeclarationBlock.replace(/[^:;{}]+:[^:;{}]+/g, "$& !important");
	}
	else {
		// No estructure could be recognized, so we'll just add !important
		cssDeclarationBlock += " !important";
	}
	// Remove any !important duplicates
	cssDeclarationBlock = cssDeclarationBlock.replace(/(?:\s*!important\s*){2,}/gi, " !important");

	return cssSelector + cssDeclarationBlock;

}

// Extends the String object with a trim funcion if it's not implemented natively in String.prototype (Javascript 1.8.1 addition)
if (!String.prototype.trim) {
	String.prototype.trim = function() {
		return this.replace(/^\s+|\s+$/g, "");
	};
}

// Escapes characters with special meaning in a regular expression with a backslash so they can be used in a regular expression with their literal meaning
String.prototype.escapeREChars = function() {
	return this.replace(/([.*+?|(){}[\]^$\\])/g, "\\$1");
};

// Transforms a number into a valid CSS dimension (in pixels)
Number.prototype.toCSS = function() {
	return Math.round(this).toString() + "px";
};

//'
Math.clamp = function(numberValue, minValue, maxValue) { // Static method of Math
	return Math.max(minValue, Math.min(maxValue, numberValue));
}

/////////////////////////// END OF HELPER FUNCTIONS ///////////////////////////

/////////////////////// START OF CLASSES AND SINGLETONS ///////////////////////

//'
function VideoFormat(idx, label, qualityIndex, inMapIfAvailable) {
	this.idx = idx;
	this.label = label;
	this.qualityIndex = qualityIndex;
	this.inMapIfAvailable = inMapIfAvailable;
}

//'
var videoFormatsContainer = {length: 0,
														 add: function() {
															 for (var i = 0; i < arguments.length; i++) {
																 if ((arguments[i] instanceof VideoFormat) && (!(this._membersHash.hasOwnProperty(arguments[i].idx)))) {
																	 this._membersHash[arguments[i].idx] = arguments[i];
																	 this.length++;
																 }
															 }
														 },
														 remove: function(formatIdx) {
															 if (this._membersHash.hasOwnProperty(formatIdx)) {
																 var oldFormat = this._membersHash[formatIdx];
																 delete this._membersHash[formatIdx];
																 this.length--;
																 return oldFormat;
															 }
															 else {
																 return null;
															 }
														 },
														 get: function(formatIdx) {
															 return (this._membersHash.hasOwnProperty(formatIdx)) ? this._membersHash[formatIdx] : null;
														 },
														 forEach: function(cbFunc, sortFunc) {
															 if (typeof(cbFunc) != "function") return;
															 var formatsArray = [];
															 for (var memberIdx in this._membersHash) {
																 if (this._membersHash.hasOwnProperty(memberIdx)) formatsArray.push(this._membersHash[memberIdx]);
															 }
															 if (typeof(sortFunc) == "function") formatsArray.sort(sortFunc);
															 formatsArray.forEach(function(vf) {cbFunc(vf);});
														 },
														 _membersHash: {},
														 SORT_ASCENDING: function(vfA, vfB) {return vfA.qualityIndex - vfB.qualityIndex;},
														 SORT_DESCENDING: function(vfA, vfB) {return vfB.qualityIndex - vfA.qualityIndex;}};

//'
videoFormatsContainer.add(new VideoFormat(5, "[FMT05] WMV 226p", 1, true),
													new VideoFormat(18, "[FMT18] WMV 270p", 2, false),
													new VideoFormat(22, "[FMT22] WMV 720p", 5, true),
													new VideoFormat(34, "[FMT34] WMV 360p", 3, true),
													new VideoFormat(35, "[FMT35] WMV 480p", 4, true),
													new VideoFormat(37, "[FMT37] WMV 1080p", 6, true),
													new VideoFormat(38, "[FMT38] WMV Original 1080p+", 7, true));

//'
function YtQuality(value, label, isSupportedOldPlayer) {
	this.value = value;
	this.label = label;
	this.isSupportedOldPlayer = isSupportedOldPlayer;
}

//'
var ytQualities = [new YtQuality("small", "Small (< 360p)", true),
									 new YtQuality("medium", "Medium (360p+)", true),
									 new YtQuality("large", "Large (480p+)", true),
									 new YtQuality("hd720", "HD 720p", true),
									 new YtQuality("hd1080", "HD 1080p", true),
									 new YtQuality("highres", "HD Original (> 1080p)", false)];

// Class to encapsulate the video related functionality
function VideoAdapter(playerId, defaultVideoName) {

	// Gets the video player
	this.player = $(playerId);
	if (!this.player) {
		throw new Error("[VideoAdapter]: Player not found");
	}

	// Gets the video Id
	this.vId = this.getFlashVar("video_id");
	if (this.vId === null) {
		throw new Error("[VideoAdapter]: Video Id not found");
	}

	// Gets the token Id
	this.tId = this.getFlashVar("t");
	if (this.tId === null) {
		throw new Error("[VideoAdapter]: Token Id not found");
	}

	// Gets the video title (a default title is used if it isn't found)
	var videoTitleNode = $x1("id('watch-headline-title')/span[@title]");
	this.title = (videoTitleNode) ? videoTitleNode.title : defaultVideoName;

}
// Function to validate video size input. Returns a valid video size string or null (if input isn't valid)
VideoAdapter.valVideoSize = function(sizeConfig) { // Static method of VideoAdapter

	var sizeValue = String(sizeConfig).toLowerCase().trim();

	if (["default", "controls", "fill", "max", "full"].indexOf(sizeValue) != -1) return sizeValue;
	if (!isNaN(parseFloat(sizeValue))) return Math.abs(parseFloat(sizeValue)).toString();
	return null;

};
// Getter to the unwrapped version of the player if it's available (or the player itself if not)
VideoAdapter.prototype.__defineGetter__("uwPlayer", function() {
	return (this.player.wrappedJSObject) ? this.player.wrappedJSObject : this.player;
});
// Reloads the player
VideoAdapter.prototype.reloadPlayer = function() {
	this.player.src = this.player.src;
};
// Gets a Flash string variable from the player
// Returns null if the variable isn't found
// The function automatically decodes the value (except if dontDecValue is true), but the variable name is used as provided
VideoAdapter.prototype.getFlashVar = function(varName, dontDecValue) {

	// Gets the flashvars from the player
	var flashVars = (this.player.getAttribute("flashvars") || "");

	// Searchs for the varName in the flashvars
	var queryRE = new RegExp("(?:^|&)" + varName.escapeREChars() + "=([^&]*)");
	var queryRet = queryRE.exec(flashVars);

	// Returns the corresponding value or null (if not found)
	return (queryRet === null) ? null : ((dontDecValue) ? queryRet[1] : decodeURIComponent(queryRet[1]));

};
// Sets a Flash string variable to the player
// If doReloadPlayer is true it also reloads the player
// The function automatically encodes the value (except if dontEncValue is true), but the variable name is used as provided
VideoAdapter.prototype.setFlashVar = function(varName, varNewValue, doReloadPlayer, dontEncValue) {

	// Gets varName value now and the flashvars from the player
	var varValue = this.getFlashVar(varName);
	var flashVars = (this.player.getAttribute("flashvars") || "");

	// If varName isn't set, just adds it
	// If varName is set, replaces its value with varNewValue
	if (!dontEncValue) varNewValue = encodeURIComponent(varNewValue);
	if (varValue === null) {
		this.player.setAttribute("flashvars", flashVars + "&" + varName + "=" + varNewValue);
	}
	else {
		var replaceRE = new RegExp("(^|&)" + varName.escapeREChars() + "=[^&]*");
		flashVars = flashVars.replace(replaceRE, "$1" + varName + "=" + varNewValue);
		this.player.setAttribute("flashvars", flashVars);
	}

	// Reloads the player
	if (doReloadPlayer) this.reloadPlayer();

};
// Deletes a Flash string variable from the player
// If doReloadPlayer is true it also reloads the player
// The function doesn't encode variable names, varName is used as provided
VideoAdapter.prototype.deleteFlashVar = function(varName, doReloadPlayer) {

	// Gets varName value now and the flashvars from the player
	var varValue = this.getFlashVar(varName);
	var flashVars = (this.player.getAttribute("flashvars") || "");

	// Deletes varName if it's set
	if (varValue !== null) {
		// Searchs for varName and deletes it
		var replaceRE = new RegExp("(^|&)" + varName.escapeREChars() + "=[^&]*(&?)");
		flashVars = flashVars.replace(replaceRE, lambdaReplacer);
		this.player.setAttribute("flashvars", flashVars);
	}

	// Reloads the player
	if (doReloadPlayer) this.reloadPlayer();

	// Lambda function to remove varName in all scenarios
	function lambdaReplacer(str, p1, p2, soffset, s) {
		return (p1 == "") ? p1 : p2; // p1 ==  "" if (^|&) matches ^ (start of string)
	}

};
// Gets the URL to download the passed video format with the passed file name (the server will use a default file name if none is passed)
// It tries to return a direct link if it's available. If not, it will return a get_video indirect link (this indirect link doesn't support the selection of a file name)
// If overrideURL is passed, it will use that URL to build the direct link instead of extracting it from the player's flashvars (overrideURL == null will force the function to always return a get_video indirect link)
VideoAdapter.prototype.getVideoDownloadURL = function(vFormat, vTitle, overrideURL) {

	var urlDownload = (overrideURL) ? overrideURL : this.getVideoDownloadURLFromMap(vFormat);

	if (urlDownload !== null) {
		return urlDownload + ((vTitle) ? "&title=" + encodeURIComponent(vTitle) : "");
	}
	else {
		return ytHost + "/get_video?video_id=" + this.vId + "&t=" + this.tId + "&fmt=" + vFormat;
	}

};
// Gets the direct URL to download the passed video format from the player's flashvars (fmt_url_map member). If the URL isn't found it returns null
// If overrideMap is passed, the URL will be extracted from it instead of using fmt_url_map's information
VideoAdapter.prototype.getVideoDownloadURLFromMap = function(vFormat, overrideMap) {

	var urlMap = (overrideMap) ? overrideMap : this.getFlashVar("fmt_url_map");
	if (urlMap === null) return null;

	var urlDownload = urlMap.match(new RegExp("(?:,|^)" + vFormat + "\\|([^,]+)(?:,|$)"));
	return (urlDownload === null) ? null : urlDownload[1];

};
// Returns the video save name selected by the user, replacing the dynamic symbols in the user configured pattern with this video's data
VideoAdapter.prototype.getVideoSaveName = function(vFormat) {

	var saveName = scriptConfig.filenameSavePattern;
	saveName = saveName.replace(/\/t/g, this.title);
	saveName = saveName.replace(/\/i/g, this.vId);
	saveName = saveName.replace(/\/f/g, vFormat);

	return saveName;

};
// Asynchronously checks if the passed video format is available
// Calls cbFunc with the passed video format and the result (true, false or null if error) as parameters
// If a server request is needed to check the availability, and is successful, another parameter will be passed to cbFunc with the direct link to download the video format
// Returns true if the request was sent, false otherwise
// It uses an indirect method because of multiple bugs in XMLHttpRequests with redirections (bug 343028, 238144, etc...)
VideoAdapter.prototype.checkVideoFormatAvailability = function(vFormat, cbFunc) {

	// Checks the cbFunc parameter
	if (typeof(cbFunc) != "function") return false;

	// Gets the passed video format object
	var videoFormatObj = videoFormatsContainer.get(vFormat);
	if (videoFormatObj === null) return false;

	// Gets the direct URL to the passed video format from the player's flashvars
	var urlFromMap = this.getVideoDownloadURLFromMap(vFormat);

	// The video format with less quality is always available. If the format is in flashvars then YouTube knows is available
	if ((videoFormatObj.qualityIndex == 1) || (urlFromMap !== null)) {
		cbFunc(vFormat, true);
		return true;
	}

	// If the video format is always in flashvars when is available and it isn't here, then it isn't available
	if ((urlFromMap === null) && (videoFormatObj.inMapIfAvailable == true)) {
		cbFunc(vFormat, false);
		return true;
	}

	// Gets the Watch Video URL of the requested format and downloads it
	// Then checks the swfConfig object in its source code for the fmt_url_map parameter of the would be player
	// YouTube checks the video format availability, and only sends the corresponding link in fmt_url_map if it is available
	var xhrVideo = new XMLHttpRequest(), that = this; // That is used to access "this" from inside xhrVideo's functions
	xhrVideo.open("GET", ytHost + "/watch?v=" + this.vId + "&fmt=" + vFormat, true);
	xhrVideo.onerror = function(evt) {
		cbFunc(vFormat, null); // Error retrieving video availability
	};
	xhrVideo.onload = function(evt) {

		// Checks for errors
		if ((this.readyState != 4) || (this.status !== 200)) {
			cbFunc(vFormat, null); // Error retrieving video availability
			return;
		}

		// Gets the swfConfig object string from the source code
		var responseMatch = this.responseText.match(/^\s*var swfConfig = ({.*});\s*$/im);
		if (responseMatch === null) {
			cbFunc(vFormat, null); // Error retrieving video availability
			return;
		}
		else {
			responseMatch = responseMatch[1];
		}

		// Evals the swfConfig object string to a real object and gets its fmt_url_map member
		var swfObj = eval("(" + responseMatch + ")"), fURLMap = null;
		try {
			fURLMap = swfObj.args.fmt_url_map;
		}
		catch(err) {}
		if ((typeof(fURLMap) != "string") || (fURLMap.length === 0)) {
			cbFunc(vFormat, null); // Error retrieving video availability
			return;
		}

		// Tries to extract the direct link to the format from the fmt_url_map member
		var fURL = that.getVideoDownloadURLFromMap(vFormat, fURLMap);
		if (fURL !== null) {
			cbFunc(vFormat, true, fURL); // Video available, the direct link is passed to the callback function
		}
		else {
			cbFunc(vFormat, false); // Video unavailable
		}

	};
	xhrVideo.send(null);
	return true;

};
// Returns true if the new player is being used, false otherwise
VideoAdapter.prototype.isPlayerNewUI = function() {
	return (/\/watch_as3-[^\/]+\.swf/.test(this.player.src));
};
// Tries to expand the video player container (widening it) calling the corresponding YouTube's function
VideoAdapter.prototype.expandPlayer = function() {
	try {
		unsafeWindow.yt.www.watch.player.onPlayerSizeClicked(true);
	}
	catch(err) {
		GM_log("Error trying to expand the video: " + err.toString());
	}
};
//'
VideoAdapter.prototype.resizePlayer = function(sizeValue, noScrolling) {

	var meSt = arguments.callee;

	var playerDiv = $("watch-player"), videoDiv = $("watch-video");
	if ((!playerDiv) || (!videoDiv)) return;

	var headlineDiv = $("watch-headline") || playerDiv;

	if (sizeValue === null) {
		if (meSt.currentSize === undefined) return;
		sizeValue = meSt.currentSize;
	}

	meSt.currentSize = sizeValue;

	if (sizeValue === "default") {
		playerDiv.style.width = "";
		playerDiv.style.height = "";
		videoDiv.style.width = "";
		scrollToNode(headlineDiv);
		updateResizeButtonContent();
		return;
	}

	this.expandPlayer();

	if (meSt.playerExpandedSize === undefined) meSt.playerExpandedSize = {width: playerDiv.offsetWidth, height: playerDiv.offsetHeight, AR: playerDiv.offsetWidth / playerDiv.offsetHeight};

	var newWidth = 0, newHeight = 0;
	var viewportWidth = document.documentElement.clientWidth, viewportHeight = document.documentElement.clientHeight;

	var quicklistDiv = $(YT_QUICKLIST_ID);
	if (quicklistDiv) viewportHeight = Math.clamp(quicklistDiv.getBoundingClientRect().top, 0, viewportHeight);

	switch(sizeValue) {

		case "controls":
			newWidth = YT_CONTENT_WIDTH;
			newHeight = (this.isPlayerNewUI()) ? YT_PLAYER_CONTROLBAR_HEIGHT_NEWUI : YT_PLAYER_CONTROLBAR_HEIGHT_OLDUI;
			break;

		case "fill":
			newWidth = YT_CONTENT_WIDTH;
			newHeight = newWidth / meSt.playerExpandedSize.AR;
			break;

		case "max":
			var factorR = Math.min(viewportWidth / meSt.playerExpandedSize.width, viewportHeight / meSt.playerExpandedSize.height);
			newWidth = Math.floor(meSt.playerExpandedSize.width * factorR);
			newHeight = Math.floor(meSt.playerExpandedSize.height * factorR);
			break;

		case "full":
			newWidth = viewportWidth;
			newHeight = viewportHeight;
			break;

		default:
			newWidth = meSt.playerExpandedSize.width * sizeValue;
			newHeight = meSt.playerExpandedSize.height * sizeValue;
			break;

	}

	videoDiv.style.width = "100%";
	playerDiv.style.width = newWidth.toCSS();
	playerDiv.style.height = newHeight.toCSS();

	scrollToNode(((sizeValue === "controls") || (sizeValue === "fill")) ? headlineDiv : playerDiv);

	updateResizeButtonContent();

	return;

	function scrollToNode(targetNode) {
		if (noScrolling) return;
		if (targetNode) targetNode.scrollIntoView(true);
	}

	function updateResizeButtonContent() {
		var mainResizeButtonContent = $("ytf-main-resize-button-content");
		if (mainResizeButtonContent) mainResizeButtonContent.textContent = sizeValue + " (" + playerDiv.offsetWidth + "x" + playerDiv.offsetHeight + ")";
	}

};

//////////////////////// END OF CLASSES AND SINGLETONS ////////////////////////

///////////////////////////// START OF CSS STYLES /////////////////////////////

// Adds the CSS styles for the script to the page, making them important
GM_addStyle([

	// Adds a class to hide elements and remove them from the document flow without really deleting them
	".ytf-hidden {display: none}",

	// Adds styles for the main div and its contents
	"#ytf-main-div {margin: 0px auto; padding-top: 5px; width: " + YT_CONTENT_WIDTH.toCSS() + "}",
	"#ytf-main-div > button {margin: 0px 2px}",
	"#ytf-main-div ." + YT_BUTTON_ARROW_CLASS + " {margin-left: 3px}",

	// Adds classes for the downloads links
	".ytf-main-download-link-unchecked {color: gray}",
	".ytf-main-download-link-error {color: purple}",

	// Adds styles for the configuration mask and dialog and their contents
	"#ytf-conf-mask {position: fixed; left: 0px; top: 0px; width: 100%; height: 100%; z-index: 1000; " +
		"background-color: black; opacity: 0.5}",
	"#ytf-conf-dialog {position: fixed; margin: auto; left: 0px; right: 0px; top: 0px; bottom: 0px; width: 475px; height: 580px; z-index: 1001; " +
		"overflow: auto; padding: 10px; color: black; background-color: #EEEEEE; outline: black solid thin}",
	"#ytf-conf-dialog > div {margin: 20px 0px}",
	"#ytf-conf-title {font-size: 150%; font-weight: bold; text-align: center}",
	"#ytf-conf-content ul {list-style-type: disc; padding-left: 40px}", // Reverts the changes to the default UA values from YouTube CSS ones
	"#ytf-conf-content li {margin: 15px 0px 5px}",
	"#ytf-conf-content li > span {font-style: italic}",
	"#ytf-conf-content li > input[type='text'], #ytf-conf-content li > select {margin-left: 10px; max-width: 200px}",
	"#ytf-conf-content input, #ytf-conf-content select {vertical-align: middle}",
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
	- removeBrand --> Removes the channel brand (dropped, the brand ads are always removed and the brand image behind the username is left)
	- removeMoreUserVideos --> Removes the "more videos from [username]" section (dropped, the section is collapsed by default now)
	- removePlaylist --> Removes the playlist section (dropped, the new YouTube's quicklist handles playlists too)
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
	removeDefaultLanguageBox: GM_getValue("removeDefaultLanguageBox", false),
	removeWatermark: GM_getValue("removeWatermark", false),
	disableAnnotations: GM_getValue("disableAnnotations", false),
	expandVideo : GM_getValue("expandVideo", true),
	expandInfo: GM_getValue("expandInfo", true),
	autoplayMode: parseInt(GM_getValue("autoplayMode", 0), 10),
	scrollToVideo: GM_getValue("scrollToVideo", true),
	defaultVideoQuality: GM_getValue("defaultVideoQuality", ""),
	flashQuality: GM_getValue("flashQuality", "")

};

// videoSize should be a valid video size
scriptConfig.videoSize = VideoAdapter.valVideoSize(scriptConfig.videoSize);
if (scriptConfig.videoSize === null) scriptConfig.videoSize = "default";

// autoplayMode should be a number between 0 and 2 (both included)
if ((isNaN(scriptConfig.autoplayMode)) || (scriptConfig.autoplayMode < 0) || (scriptConfig.autoplayMode > 2)) scriptConfig.autoplayMode = 0;

// defaultVideoQuality should be "ytfHighest", "ytfLowest" or a valid YouTube quality
if ((scriptConfig.defaultVideoQuality != "ytfHighest") && (scriptConfig.defaultVideoQuality != "ytfLowest") &&
		(!(ytQualities.some(function(q) {return (q.value == scriptConfig.defaultVideoQuality);})))) scriptConfig.defaultVideoQuality = "";

// Configuration function
function scriptConfiguration(evt) {

	// Hides the player (but doesn't remove it from the document flow) to make sure the config layers are shown above all other elements (plugin content is shown topmost in some browsers)
	if (watchVA.player) watchVA.player.style.visibility = "hidden";

	// Gets the config mask and dialog
	var confMask = $("ytf-conf-mask");
	var confDialog = $("ytf-conf-dialog");

	// Creates the layers if they don't exist and focus the config dialog
	if ((!confMask) || (!confDialog)) {
		createDialog();
	}
	confDialog.focus();

	return; // Exit function

	// Creates the configuration layers
	function createDialog() {

		// Creates the config mask and dialog, with their contents and event listeners
		confMask = createNode("div", {id: "ytf-conf-mask", title: "Click here to return to the page"}, null, [["click", destroyDialog, false]]);
		confDialog = createNode("div", {id: "ytf-conf-dialog"},
			{innerHTML: "<div id='ytf-conf-title'>YousableTubeFix Configuration</div>" +
				"<div id='ytf-conf-content'>" +
				"<ul>" +
				"<li>" +
				"<span>Select the default video size. Enter a floating point number or either \"default\", \"controls\", \"fill\", \"max\" or \"full\":</span>" +
				"<input type='text' id='ytf-conf-video-size' value='" + scriptConfig.videoSize + "'>" +
				"</li>" +
				"<li>" +
				"<span>Pattern for the filename of downloaded files:</span>" +
				"<input type='text' id='ytf-conf-filename-save-pattern' value='" + scriptConfig.filenameSavePattern + "' title='/t is the video title, /i is the video id and /f is the video format'>" +
				"</li>" +
				"<li><span>Remove or disable (use Ctrl+click / Shift+click to select multiple options):</span></li>" +
				"<select id='ytf-conf-remove-disable-sel' multiple='multiple' size='5'>" +
				"<option id='ytf-conf-remove-video-information'" + ((scriptConfig.removeVideoInformation) ? " selected='selected'" : "") + ">- Video information</option>" +
				"<option id='ytf-conf-remove-actions'" + ((scriptConfig.removeActions) ? " selected='selected'" : "") + ">- Actions section</option>" +
				"<option id='ytf-conf-remove-related-videos'" + ((scriptConfig.removeRelatedVideos) ? " selected='selected'" : "") + ">- Related videos section</option>" +
				"<option id='ytf-conf-remove-comments'" + ((scriptConfig.removeComments) ? " selected='selected'" : "") + ">- Comments section</option>" +
				"<option id='ytf-conf-remove-video-responses'" + ((scriptConfig.removeVideoResponses) ? " selected='selected'" : "") + ">- Video responses section</option>" +
				"<option id='ytf-conf-remove-header'" + ((scriptConfig.removeHeader) ? " selected='selected'" : "") + ">- Header section</option>" +
				"<option id='ytf-conf-remove-footer'" + ((scriptConfig.removeFooter) ? " selected='selected'" : "") + ">- Footer section</option>" +
				"<option id='ytf-conf-remove-subscription-reminder'" + ((scriptConfig.removeSubscriptionReminder) ? " selected='selected'" : "") + ">- Subscription reminder popup</option>" +
				"<option id='ytf-conf-remove-default-language-box'" + ((scriptConfig.removeDefaultLanguageBox) ? " selected='selected'" : "") + ">- Default language box</option>" +
				"<option id='ytf-conf-remove-watermark'" + ((scriptConfig.removeWatermark) ? " selected='selected'" : "") + ">- Video watermark</option>" +
				"<option id='ytf-conf-disable-annotations'" + ((scriptConfig.disableAnnotations) ? " selected='selected'" : "") + ">- Video annotations (disable)</option>" +
				"</select>" +
				"<li><span>Automatically expand:</span></li>" +
				"<input type='checkbox' id='ytf-conf-expand-video'" + ((scriptConfig.expandVideo) ? " checked='checked'" : "") + "><label for='ytf-conf-expand-video'>Video</label><br>" +
				"<input type='checkbox' id='ytf-conf-expand-info'" + ((scriptConfig.expandInfo) ? " checked='checked'" : "") + "><label for='ytf-conf-expand-info'>Video information</label><br>" +
				"<li><span>Video autoplay and autobuffering:</span></li>" +
				"<input type='radio' id='ytf-conf-autoplay-prevent-none' name='ytf-conf-autoplay-choice'" + ((scriptConfig.autoplayMode === 0) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-prevent-none'>Don't prevent autoplay and autobuffering</label><br>" +
				"<input type='radio' id='ytf-conf-autoplay-prevent-autoplay' name='ytf-conf-autoplay-choice'" + ((scriptConfig.autoplayMode === 1) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-prevent-autoplay'>Prevent only autoplay</label><br>" +
				"<input type='radio' id='ytf-conf-autoplay-prevent-both' name='ytf-conf-autoplay-choice'" + ((scriptConfig.autoplayMode === 2) ? " checked='checked'" : "") + "><label for='ytf-conf-autoplay-prevent-both'>Prevent both autoplay and autobuffering</label><br>" +
				"<li>" +
				"<input type='checkbox' id='ytf-conf-scroll-to-video'" + ((scriptConfig.scrollToVideo) ? " checked='checked'" : "") + "><label for='ytf-conf-scroll-to-video'>Scroll to the video on page enter</label>" +
				"</li>" +
				"<li>" +
				"<span>Default video quality:</span>" +
				"<select id='ytf-conf-default-video-quality-sel' size='1'>" +
				"<optgroup label='Automatic Quality options'>" +
				"<option id='ytf-conf-default-video-quality-opt-default' value=''" + ((scriptConfig.defaultVideoQuality === "") ? " selected='selected'" : "") + ">YouTube Default</option>" +
				"<option id='ytf-conf-default-video-quality-opt-auto-high' value='ytfHighest'" + ((scriptConfig.defaultVideoQuality === "ytfHighest") ? " selected='selected'" : "") + ">Best Quality available</option>" +
				"<option id='ytf-conf-default-video-quality-opt-auto-low' value='ytfLowest'" + ((scriptConfig.defaultVideoQuality === "ytfLowest") ? " selected='selected'" : "") + ">Fastest Quality available</option>" +
				"</optgroup>" +
				"<optgroup label='Fixed Quality options'>" +
				(function() { // Returns a string with the HTML code of as many option nodes as known YouTube's qualities
					return ytQualities.map(function(q) {
						return "<option id='ytf-conf-default-video-quality-opt-" + q.value + "' value='" + q.value + "'" + ((scriptConfig.defaultVideoQuality === q.value) ? " selected='selected'" : "") + ">" + q.label + "</option>";
					}).join("");
				})() +
				"</optgroup>" +
				"</select>" +
				"</li>" +
				"<li>" +
				"<span>Flash Player Quality:</span>" +
				"<select id='ytf-conf-flash-quality-sel' size='1'>" +
				"<optgroup label='Automatic Quality options'>" +
				"<option id='ytf-conf-flash-quality-opt-default' value=''" + ((scriptConfig.flashQuality === "") ? " selected='selected'" : "") + ">YouTube Default</option>" +
				"<option id='ytf-conf-flash-quality-opt-auto-high' value='autohigh'" + ((scriptConfig.flashQuality === "autohigh") ? " selected='selected'" : "") + ">Automatic, &darr; appearance if low frame rate</option>" +
				"<option id='ytf-conf-flash-quality-opt-auto-low' value='autolow'" + ((scriptConfig.flashQuality === "autolow") ? " selected='selected'" : "") + ">Automatic, &uarr; appearance if high frame rate</option>" +
				"</optgroup>" +
				"<optgroup label='Fixed Quality options'>" +
				"<option id='ytf-conf-flash-quality-opt-best' value='best'" + ((scriptConfig.flashQuality === "best") ? " selected='selected'" : "") + ">Best Quality (High CPU use)</option>" +
				"<option id='ytf-conf-flash-quality-opt-high' value='high'" + ((scriptConfig.flashQuality === "high") ? " selected='selected'" : "") + ">High Quality</option>" +
				"<option id='ytf-conf-flash-quality-opt-medium' value='medium'" + ((scriptConfig.flashQuality === "medium") ? " selected='selected'" : "") + ">Medium Quality</option>" +
				"<option id='ytf-conf-flash-quality-opt-low' value='low'" + ((scriptConfig.flashQuality === "low") ? " selected='selected'" : "") + ">Low Quality (Low CPU use)</option>" +
				"</optgroup>" +
				"</select>" +
				"</li>" +
				"</ul>" +
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

	}

	// Changes the enabled state of all input/select fields of the configuration dialog
	function setDialogInputState(newState) {
		var allInputs = $x(".//input|.//select", confDialog);
		allInputs.forEach(function(i) {i.disabled = !newState;});
	}

	// Exits the configuration by deleting the layers and showing the player
	// It is called by the Cancel button and the confMask event listeners
	function destroyDialog(evt) {
		delNodeArray([confMask, confDialog]);
		if (watchVA.player) watchVA.player.style.visibility = "";
	}

	// Checks and saves the configuration to the configuration variables
	// It is called by the Ok button event listener
	function saveConfiguration() {

		// Disables the input/select fields
		setDialogInputState(false);

		// Sets the default video size if it's valid
		var valvs = VideoAdapter.valVideoSize($("ytf-conf-video-size").value);
		if (valvs === null) {
			window.alert("Invalid default video size");
			setDialogInputState(true); // Re-enables the input/select fields
			$("ytf-conf-video-size").focus();
			return;
		}
		GM_setValue("videoSize", valvs);

		// Sets autoplayMode depending on the state of the relevant radio inputs
		var apMode = 0;
		if ($("ytf-conf-autoplay-prevent-none").checked) {
			apMode = 0;
		}
		else if ($("ytf-conf-autoplay-prevent-autoplay").checked) {
			apMode = 1;
		}
		else if ($("ytf-conf-autoplay-prevent-both").checked) {
			apMode = 2;
		}
		GM_setValue("autoplayMode", apMode);

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
		GM_setValue("removeDefaultLanguageBox", $("ytf-conf-remove-default-language-box").selected);
		GM_setValue("removeWatermark", $("ytf-conf-remove-watermark").selected);
		GM_setValue("disableAnnotations", $("ytf-conf-disable-annotations").selected);
		GM_setValue("expandVideo", $("ytf-conf-expand-video").checked);
		GM_setValue("expandInfo", $("ytf-conf-expand-info").checked);
		GM_setValue("scrollToVideo", $("ytf-conf-scroll-to-video").checked);
		GM_setValue("defaultVideoQuality", $("ytf-conf-default-video-quality-sel").value);
		GM_setValue("flashQuality", $("ytf-conf-flash-quality-sel").value);

		// Reloads page and script
		window.location.reload();

	}

}

// Registers the configuration menu command
GM_registerMenuCommand("YousableTubeFix Configuration", scriptConfiguration, null, null, "Y");

////////////////////////// END OF USER CONFIGURATION //////////////////////////

///////////////////////// START OF SCRIPT UPDATE /////////////////////////

// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
function scriptShowUpdateMessage(scriptShowMessage, scriptNewVersion) {

	// Gets the notice box and the script new version date in UTC format
	var messageDiv = $("ytf-script-version-message");
	var scriptNewVersionDate = (new Date(scriptNewVersion)).toUTCString();

	// Shows/creates/hides the update notice
	if (scriptShowMessage == false) {
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

// Checks if there is a new script version according to the version information in the script homepage
// The version information is in a line in the full description of the script: "<p>#[V:00000000]#</p>" (00000000 is the version number)
// If the request is successful and there is a new version available, a message to the user is displayed
function scriptCheckVersion() {
	GM_xmlhttpRequest({
		method: "GET",
		url: scriptHomepageURL,
		onload: function(evt) {
			if ((evt.readyState == 4) && (evt.status == 200)) {

				// Gets the remote version from the response and makes sure it is a number
				var responseMatch = evt.responseText.match(/<p>#\[V:(\d+)\]#<\/p>/);
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
var scriptVersion = 1283311181425; // 01 Sep 2010

var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);
if (isNaN(scriptLastCheck)) scriptLastCheck = 0;

var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", scriptVersion.toString()), 10);
if (isNaN(scriptLastRemoteVersion)) scriptLastRemoteVersion = scriptVersion;

// URLs related to the script
var scriptFileURL = "http://userscripts.org/scripts/source/13333.user.js";
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

////////////////////////// END OF SCRIPT UPDATE //////////////////////////

////////////////////////// START OF MAIN SCRIPT //////////////////////////

// Gets the YouTube base URL and pathname
var ytHost = window.location.protocol + "//" + window.location.host;
var ytPath = window.location.pathname;

// Actions for all YouTube pages

// Removes the default language dialog box
if (scriptConfig.removeDefaultLanguageBox) delNode("default-language-box");

// Actions for non-video pages
if (ytPath == "/") {

	// Home page

	// Remove the ads and the Chrome promotion
	delNodeArray($x("//div[starts-with(@id, 'ad_creative_')]"));
	delNode("homepage-chrome-side-promo");

	return;

}
else if (/^\/results(?:\.php)?$/i.test(ytPath)) {

	// Search results page

	// Removes the ads
	delNode("search-pva");

	return;

}
else if (!(/^\/watch(?:\.php)?$/i.test(ytPath))) {
	// An unknown non-video page
	return;
}

// This is a YouTube video page

// Temporary redirection fix to allow the script to work with YouTube's new ajax mode
if (window.location.hash.substr(0, 2) == "#!") {
	window.location.replace(window.location.href.replace("#!", "?"));
	return;
}

//'
var watchVA;

//'
scriptMain();

//'
function scriptMain() {

	// Creates a VideoAdapter object for the video
	try {
		watchVA = new VideoAdapter(YT_PLAYER_ID, YTF_DEFAULT_VIDEO_TITLE);
	}
	catch(err) {
		GM_log(err.toString());
		return;
	}

	// Prevents the autoplay, makes sure the API is enabled and makes the player call ytfplayerReady when it's ready (depends on the Main Reload)
	watchVA.setFlashVar("autoplay", "0", false);
	watchVA.setFlashVar("enablejsapi", "1", false);
	watchVA.setFlashVar("jsapicallback", "ytfplayerReady", false);

	// Calls the script's section which doesn't need YouTube's API (pre-Main Reload)
	scriptNoAPIPre();

	// Function to call the original YouTube's API initialization function and the script's code that need the API (only once)
	// It's called by the cued player (paused but not buffering) when the API is ready to use (thanks to the autoplay, enablejsapi and jsapicallback flashvars), after the Main Reload (and after each subsequent player reload)
	var scriptAPIFirstCall = true;
	unsafeWindow.ytfplayerReady = function(playerId) {

		// The default YouTube initialization function is called if it exists
		if (unsafeWindow.onYouTubePlayerReady) unsafeWindow.onYouTubePlayerReady(playerId);

		// Calls the script's section which requires YouTube's API if it hasn't been called before
		if (scriptAPIFirstCall) {
			scriptAPIFirstCall = false;
			scriptAPI();
		}

	};

	// Main Reload
	watchVA.reloadPlayer();

	// Calls the script's section which doesn't need YouTube's API (post-Main Reload)
	scriptNoAPIPost();

}

// Script's section which doesn't need YouTube's API (pre-Main Reload). Its actions depend on the Main Reload to take effect
// It's called by scriptMain and is executed before the Main Reload
function scriptNoAPIPre() {

	// Removes ads code from the player (depends on the Main Reload)
	["ad_module", "ad3_module", "ad_preroll"].forEach(function(v) {
		watchVA.deleteFlashVar(v, false);
	});

	// Removes the video watermark (depends on the Main Reload)
	if (scriptConfig.removeWatermark) watchVA.deleteFlashVar("watermark", false);

	// Disables the video annotations (depends on the Main Reload)
	if (scriptConfig.disableAnnotations) watchVA.setFlashVar("iv_load_policy", "3", false);

	// Changes the Flash player quality attribute (depends on the Main Reload)
	if (scriptConfig.flashQuality != "") {
		watchVA.player.setAttribute("quality", scriptConfig.flashQuality);
	}

	//'
	try {
		unsafeWindow.yt.setConfig("PREFER_LOW_QUALITY", true);
	}
	catch(err) {
		GM_log("Error trying to set PREFER_LOW_QUALITY to true: " + err.toString());
	}

	//'
	var ytQualitiesPlayer = (watchVA.isPlayerNewUI()) ? ytQualities : ytQualities.filter(function(q) {return (q.isSupportedOldPlayer);});
	switch(scriptConfig.defaultVideoQuality) {

		case "":
			break;

		case "ytfHighest":
			watchVA.setFlashVar("vq", ytQualitiesPlayer[ytQualitiesPlayer.length - 1].value, false);
			break;

		case "ytfLowest":
			watchVA.setFlashVar("vq", ytQualitiesPlayer[0].value, false);
			break;

		default:
			watchVA.setFlashVar("vq", scriptConfig.defaultVideoQuality, false);
			break;

	}

}

// Script's section which doesn't need YouTube's API (post-Main Reload). Its actions don't depend on the Main Reload to take effect
// It's called by scriptMain and is executed after the Main Reload
function scriptNoAPIPost() {

	// Brand ads
	delNode("watch-longform-ad");
	delNode("watch-channel-brand-div");

	// Removes video information section
	if (scriptConfig.removeVideoInformation) delNode("watch-info");

	// Removes actions section ("Like/Don't Like", "Save to", "Share", etc...)
	if (scriptConfig.removeActions) delNode("watch-actions");

	// Removes related videos section
	if (scriptConfig.removeRelatedVideos) delNode("watch-related");

	// Removes the comments and video responses sections
	var videoDivDiscussion = $("watch-discussion"), videoDivCommentsView = $("comments-view");
	if ((videoDivDiscussion) && (videoDivCommentsView)) {

		// Removes the comments section
		if (scriptConfig.removeComments) {
			delNodeArray($x("./*[not(@id='comments-view')]", videoDivDiscussion)); // Comment textbox, actions div and others
			delNodeArray($x("./div[@class='comments-section'][*[@class='comment-list' or @class='comments-pagination']]", videoDivCommentsView)); // Comments blocks and pagination controls
		}

		// Removes the video responses section
		if (scriptConfig.removeVideoResponses) {
			delNodeArray($x("./div[@class='comments-section'][*[@class='video-list']]", videoDivCommentsView)); // Video responses blocks
			videoDivCommentsView.addEventListener("DOMNodeInserted", function(evt) { // Mutation event listener to remove video responses blocks reinserted after going back to the first comments page after visiting another comments page
				delNodeArray($x("descendant-or-self::div[@class='comments-section'][*[@class='video-list']]", evt.target));
			}, false);
		}

	}

	// Removes header section
	if (scriptConfig.removeHeader) delNode("masthead-container");

	// Removes footer section
	if (scriptConfig.removeFooter) delNode("footer-container");

	// Stops the subscription reminder popup
	if (scriptConfig.removeSubscriptionReminder) {
		try {
			unsafeWindow.yt.www.watch.watch5.promoteSubscribe = function() {}; // Initial popup
			unsafeWindow.yt.setConfig("SHOW_SUBSCRIBE_UPSELL", false); // Video end popup
		}
		catch(err) {
			GM_log("Error trying to stop the subscription reminder popup: " + err.toString());
		}
	}

	// Expands the video information section
	if (scriptConfig.expandInfo) {
		var descriptionDiv = $("watch-description");
		if ((descriptionDiv) && (containsClass(descriptionDiv, YT_EXPANDER_COLLAPSED_CLASS))) { // The description should be expanded only when it is collapsed
			var expandButton = $x1(".//button", descriptionDiv);
			if (expandButton) fireClickEvent(expandButton);
		}
	}

	//'
	var videoDivContainer = $("watch-video-container");
	if (videoDivContainer) {

		var mainDivContainer = createNode("div", {id: "ytf-main-div-container"});

		var mainDiv = createNode("div", {id: "ytf-main-div"});
		mainDivContainer.appendChild(mainDiv);

		var mainResizeMenu = createNode("div", {class: YT_MENU_CLASS + " ytf-hidden", id: "ytf-main-resize-menu"}, null,
			[["click", function(evt) {
				if (evt.target.nodeName.toUpperCase() == "A") {
					var linkSize = VideoAdapter.valVideoSize(evt.target.textContent);
					if (linkSize !== null) watchVA.resizePlayer(linkSize);
				}
				if (!containsClass(mainResizeMenu, "ytf-hidden")) fireClickEvent(mainResizeButton);
			}, false]]);
		["controls", "fill", "max", "full", "0.25", "0.5", "0.75", "default", "1.25", "1.5", "1.75", "2", "2.25", "2.5"].forEach(function(vs) {
			mainResizeMenu.appendChild(createNode("a", {class: YT_MENU_ITEM_CLASS, href: "javascript:void(0)"}, {textContent: vs}));
		});
		mainDiv.appendChild(mainResizeMenu);

		var mainResizeButton = createNode("button", {class: YT_BUTTON_CLASS, id: "ytf-main-resize-button", title: "Resize the video player", type: "button"}, {disabled: true},
			[["click", function(evt) {
				toggleMenu(mainResizeMenu, mainResizeButton);
			}, false]]);
		mainResizeButton.appendChild(createNode("span", {class: YT_BUTTON_CONTENT_CLASS, id: "ytf-main-resize-button-content"}, {textContent: "Resize"}));
		mainResizeButton.appendChild(createNode("img", {class: YT_BUTTON_ARROW_CLASS, id: "ytf-main-resize-button-arrow", src: YT_BUTTON_ARROW_SRC}));
		mainDiv.appendChild(mainResizeButton);

		var mainDownloadMenu = createNode("div", {class: YT_MENU_CLASS + " ytf-hidden", id: "ytf-main-download-menu"}, null,
			[["click", function(evt) {
				if (!containsClass(mainDownloadMenu, "ytf-hidden")) fireClickEvent(mainDownloadButton);
			}, false]]);
		videoFormatsContainer.forEach(function(vf) {
			mainDownloadMenu.appendChild(createNode("a", {class: YT_MENU_ITEM_CLASS + " ytf-main-download-link-unchecked", 'ytf-video-format': vf.idx, href: watchVA.getVideoDownloadURL(vf.idx, watchVA.getVideoSaveName(vf.idx))}, {textContent: vf.label}));
		}, videoFormatsContainer.SORT_ASCENDING);
		mainDiv.appendChild(mainDownloadMenu);

		var mainDownloadButton = createNode("button", {class: YT_BUTTON_CLASS, id: "ytf-main-download-button", title: "Download this video", type: "button"}, null,
			[["click", function(evt) {
				toggleMenu(mainDownloadMenu, mainDownloadButton);
			}, false]]);
		mainDownloadButton.appendChild(createNode("span", {class: YT_BUTTON_CONTENT_CLASS, id: "ytf-main-download-button-content"}, {textContent: "Download"}));
		mainDownloadButton.appendChild(createNode("img", {class: YT_BUTTON_ARROW_CLASS, id: "ytf-main-download-button-arrow", src: YT_BUTTON_ARROW_SRC}));
		mainDiv.appendChild(mainDownloadButton);

		var mainConfigureButton = createNode("button", {class: YT_BUTTON_CLASS, id: "ytf-main-configure-button", title: "Configure YousableTubeFix", type: "button"}, {textContent: "Configure"},
			[["click", scriptConfiguration, false]]);
		mainDiv.appendChild(mainConfigureButton);

		insertAfter(mainDivContainer, videoDivContainer);

		videoFormatsContainer.forEach(function(vf) {
			watchVA.checkVideoFormatAvailability(vf.idx, function(vFormat, isFormatAvailable, formatNewURL) {

				var downloadLink = $x1("./a[@ytf-video-format='" + vFormat + "']", mainDownloadMenu);
				if (!downloadLink) return;
				removeClass(downloadLink, "ytf-main-download-link-unchecked");

				switch(isFormatAvailable) {

					case true:
						if (formatNewURL) downloadLink.href = watchVA.getVideoDownloadURL(vFormat, watchVA.getVideoSaveName(vFormat), formatNewURL);
						break;

					case false:
						addClass(downloadLink, "ytf-hidden");
						break;

					case null:
						addClass(downloadLink, "ytf-main-download-link-error");
						break;

				}

			});
		});

	}
	else {
		GM_log("videoDivContainer not found");
	}

}

// Script's section which requires YouTube's API
// It's called by ytfplayerReady when the API is ready and is executed after the Main Reload (it's only called once, even if the player is reloaded again)
function scriptAPI() {

	//'
	switch(scriptConfig.autoplayMode) {

		case 0:
			watchVA.uwPlayer.playVideo();
			break;

		case 1:
			var autoplayFirstPlay = true;
			unsafeWindow.ytfautoplayPauseFirstPlay = function(newState) {
				if ((autoplayFirstPlay) && (newState == 1)) {
					watchVA.uwPlayer.seekTo(0, false);
					watchVA.uwPlayer.pauseVideo();
					watchVA.uwPlayer.unMute();
					autoplayFirstPlay = false;
				}
			};
			watchVA.uwPlayer.addEventListener("onStateChange", "ytfautoplayPauseFirstPlay");
			watchVA.uwPlayer.mute();
			watchVA.uwPlayer.playVideo();
			break;

		case 2:
			break;

	}

	// Expands the video
	if (scriptConfig.expandVideo) watchVA.expandPlayer();

	//'
	unsafeWindow.ytfrestoreSize = function(isWide) {
		watchVA.resizePlayer("default", true);
	}
	watchVA.uwPlayer.addEventListener("SIZE_CLICKED", "ytfrestoreSize");

	//'
	function updateResizePlayer(evt) {
		watchVA.resizePlayer(null, true);
	}
	window.addEventListener("resize", updateResizePlayer, false);

	//'
	var quicklistDiv = $(YT_QUICKLIST_ID);
	if (quicklistDiv) {
		quicklistDiv.addEventListener("DOMAttrModified", function(evt) {
			if ((evt.attrName == "class") && (evt.attrChange == evt.MODIFICATION)) updateResizePlayer(evt);
		}, false);
	}

	//'
	watchVA.resizePlayer(scriptConfig.videoSize, !scriptConfig.scrollToVideo);

	//'
	var mainResizeButton = $("ytf-main-resize-button");
	if (mainResizeButton) mainResizeButton.disabled = false;

}

/////////////////////////// END OF MAIN SCRIPT ///////////////////////////