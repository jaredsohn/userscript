// ==UserScript==
// @name          YousableTubeFix Fix
// @namespace     http://userscripts.org/scripts/show/64826
// @description   Removes ads and unwanted sections (configurable), allows downloading and resizing videos, displays all comments on video page, expands the description, can prevent autoplay and autodownload, adds a HD (High Definition) select, etc...
// @include       http://youtube.com/*
// @include       http://*.youtube.com/*
// @version       24 Oct 2009
// ==/UserScript==

/*
Author: Marsiblu
Script initially based on Mindeye's YousableTubeFix userscript (http://userscripts.org/scripts/show/13333)
Version: 13 Mar 2010
*/

////////////////////////// START OF HELPER FUNCTIONS //////////////////////////

// Shortcut to document.getElementById
function $(id) {
	return document.getElementById(id);
}

// Returns a node from its id or a reference to it
function $ref(idRef) {
	return (typeof(idRef) == "string") ? $(idRef) : idRef;
}

// Gets a Flash variable from the player using the GetVariable method
// As the Security Manager may veto the action, errors will be cached (null will be returned if that happens)
function $gfv(flashVar) {
	var retVal;
	try {
		retVal = uwPlayer.GetVariable(flashVar);  // unsafeWindow context
	}
	catch(err) {
		retVal = null;
	}
	return retVal;
}

// Sets a Flash variable to the player using the SetVariable method
// As the Security Manager may veto the action, errors will be cached
function $sfv(flashVar, flashNewValue) {
	try {
		uwPlayer.SetVariable(flashVar, flashNewValue); // unsafeWindow context
	}
	catch(err) {}
}

// Deletes a node from its id or a reference to it
function delNode(targetNode) {
	var iNode = $ref(targetNode);
	if (iNode) return iNode.parentNode.removeChild(iNode);
	return null;
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

// Inserts the specified node as a sibling AFTER the reference element
function insertAfter(newNode, node) {
	return node.parentNode.insertBefore(newNode, node.nextSibling);
}

// Removes all the contents of a node and returns a document fragment with them (or null if the node isn't found)
function removeAllChildren(targetNode) {

	// Checks targetNode
	var iNode = $ref(targetNode);
	if (!iNode) return null;

	// Selects the contents of the node with a range and extracts them from the DOM tree into a document fragment
	var contentsRange = document.createRange();
	contentsRange.selectNodeContents(iNode);
	var contentsFrag = contentsRange.extractContents();
	contentsRange.detach();

	// Returns the document fragment
	return contentsFrag;

}

// Returns the parent node of targetNode (an id of a node or a reference to it)
// Returns null if the node isn't found or it has no parent node
function getParent(targetNode) {
	var iNode = $ref(targetNode);
	if (!iNode) return null;
	return (iNode.parentNode) ? iNode.parentNode : null;
}

// Find the absolute location in pixels for a provided element or id
// Returns an object with .xPos and .yPos properties or null if the element isn't found
function findXY(eltRef) {
	var xPos = 0, yPos = 0, iNode = $ref(eltRef);
	if (!iNode) return null;
	while (iNode) {
		xPos += iNode.offsetLeft;
		yPos += iNode.offsetTop;
		iNode = iNode.offsetParent;
	}
	return {xPos: xPos, yPos: yPos};
}

// Returns true if the video is substituted by an icon
function isVideoIcon() {
	return ($("gssubsIcon") === null) ? false: true;
}

// Returns true is the playerDiv has been moved to its final position (where it can be resized)
function isVideoPositioned() {
	return (playerDiv.previousSibling.id == "watch-vid-title");
}

// Reloads the player by removing it from the DOM tree and inserting it again in the same position
// If the video is substituted by an icon, it won't do anything (a reload isn't necessary)
function reloadPlayer() {
	if (isVideoIcon()) return;
	var playerParent = player.parentNode, playerNextSibling = player.nextSibling;
	playerParent.removeChild(player);
	playerParent.insertBefore(player, playerNextSibling);
}

// Gets a Flash string variable from the player
// Returns null if the variable isn't found
// The function automatically decodes the value (except if dontDecValue is true), but the variable name is used as provided
function getFlashVar(varName, dontDecValue) {

	// Gets the flashvars from the player
	var flashVars = String(player.getAttribute("flashvars"));

	// Searchs for the varName in the flashvars
	var queryRE = new RegExp("(?:^|&)" + varName.escapeREChars() + "=([^&]*)");
	var queryRet = queryRE.exec(flashVars);

	// Returns the corresponding value or null (if not found)
	return (queryRet === null) ? null : ((dontDecValue) ? queryRet[1] : decodeURIComponent(queryRet[1]));

}

// Sets a Flash string variable to the player
// If doReloadPlayer is true it also reloads the player
// The function automatically encodes the value (except if dontEncValue is true), but the variable name is used as provided
function setFlashVar(varName, varNewValue, doReloadPlayer, dontEncValue) {

	// Gets varName value now and the flashvars from the player
	var varValue = getFlashVar(varName);
	var flashVars = String(player.getAttribute("flashvars"));

	// If varName isn't set, just adds it
	// If varName is set, replaces its value with varNewValue
	if (!dontEncValue) varNewValue = encodeURIComponent(varNewValue);
	if (varValue === null) {
		player.setAttribute("flashvars", flashVars + "&" + varName + "=" + varNewValue);
	}
	else {
		var replaceRE = new RegExp("(^|&)" + varName.escapeREChars() + "=[^&]*");
		flashVars = flashVars.replace(replaceRE, "$1" + varName + "=" + varNewValue);
		player.setAttribute("flashvars", flashVars);
	}

	// Reloads the player
	if (doReloadPlayer) reloadPlayer();

}

// Deletes a Flash string variable from the player
// If doReloadPlayer is true it also reloads the player
// The function doesn't encode variable names, varName is used as provided
function deleteFlashVar(varName, doReloadPlayer) {

	// Gets varName value now and the flashvars from the player
	var varValue = getFlashVar(varName);
	var flashVars = String(player.getAttribute("flashvars"));

	// Deletes varName if it's set
	if (varValue !== null) {
		// Searchs for varName and deletes it
		var replaceRE = new RegExp("(^|&)" + varName.escapeREChars() + "=[^&]*(&?)");
		flashVars = flashVars.replace(replaceRE, lambdaReplacer);
		player.setAttribute("flashvars", flashVars);
	}

	// Reloads the player
	if (doReloadPlayer) reloadPlayer();

	// Lambda function to remove varName in all scenarios
	// It is a nested function
	function lambdaReplacer(str, p1, p2, soffset, s) {
		return (p1 == "") ? p1 : p2; // p1 ==  "" if (^|&) matches ^ (start of string)
	}

}

// Fires an event on targetNode (an id of a node or a reference to it)
// Returns null if the node isn't found, otherwise it returns the return value of dispatchEvent
function fireEvent(targetNode, evtType, evtName, evtBubble, evtCancelable) {

	var iNode = $ref(targetNode);
	if (iNode) {
		var evtObj = document.createEvent(evtType);
		evtObj.initEvent(evtName, evtBubble, evtCancelable);
		return iNode.dispatchEvent(evtObj);
	}
	else {
		return null;
	}

}

// Calls fireEvent to fire a click event on targetNode
function fireClickEvent(targetNode) {
	return fireEvent(targetNode, "MouseEvent", "click", true, true);
}

// Calls fireEvent to fire a change event on targetNode
function fireChangeEvent(targetNode) {
	return fireEvent(targetNode, "Event", "change", true, false);
}

// Builds the download video URL from its parameters (videoId, tId y videoFormat)
function getDownloadVideoURL(vId, vTId, vFormat) {
	return ytHost + "/get_video?video_id=" + vId + "&t=" + vTId + ((vFormat == "") ? "" : "&fmt=" + vFormat);
}

// Returns the MIME string of the passed video format (or an empty string if the format is unknown)
function getDownloadVideoMIMEString(vFormat) {
	var vFormatObj = getVideoFormatObj(vFormat);
	return (vFormatObj === null) ? "" : vFormatObj.MIMEString;
}

// Updates the URL Input field according to the videoId and the current video format
function updateURLInputField() {
	var URLInput = $("watch-url-field");
	if (URLInput) URLInput.value = ytHost + "/watch?v=" + videoId + "&fmt=" + videoFormat; // &fmt is always included to force LQ if videoFormat is ""
}

// Returns the object of the video formats array associated with the passed video format (or null is the format is unknown)
function getVideoFormatObj(vFormat) {
	var videoFormatDet = videoFormatsArray.filter(function(vf) {return (vf.idx == vFormat);});
	return (videoFormatDet.length > 0) ? videoFormatDet[0] : null;
}

// Asynchronously checks if a video with the provided parameters is available
// Calls callbackFunc with the video paramaters and an additional one (true, false or null if error) indicating the result
// Returns true if the request was sent, false otherwise
// It uses an indirect method because of multiple bugs in XMLHttpRequests with redirections (bug 343028, 238144, etc...)
function checkVideoAvailability(vId, vTId, vFormat, callbackFunc) {

	// Checks callbackFunc parameter
	if ((!callbackFunc) || (typeof(callbackFunc) != "function")) return false;

	// Low Quality Format availability can't be checked with this method, so it's asummed to be always available
	// If the format is included in the original fmt_map, it is assumed that it's available (as a shortcut)
	if ((vFormat === "") || (checkVideoAvailabilityInFmtMap())) {
		callbackFunc(vId, vTId, vFormat, true);
		return true;
	}

	// Gets the Watch Video URL of the requested format and downloads it
	// Then checks the swfArgs object in its source code for the fmt_map parameter of the would be player
	// YouTube checks the video format availability, and only sends the corresponding fmt_map if it is available
	var vURL = ytHost + "/watch?v=" + vId + "&fmt=" + vFormat;
	var xhrVideo = new XMLHttpRequest();
	xhrVideo.onerror = function(evt) {
		xhrVideo.abort();
		callbackFunc(vId, vTId, vFormat, null); // Error retrieving video availability
	};
	xhrVideo.onload = function(evt) {

		// Checks for errors
		if ((xhrVideo.readyState != 4) || (xhrVideo.status != 200)) {
			callbackFunc(vId, vTId, vFormat, null); // Error retrieving video availability
			return;
		}

		// Gets the SWF_ARGS object string from the source code
		var responseMatch = xhrVideo.responseText.match(/^\s*\'SWF_ARGS\': ({[^}]*}),\s*$/im);
		if (responseMatch === null) {
			callbackFunc(vId, vTId, vFormat, null); // Error retrieving video availability
			return;
		}
		else {
			responseMatch = responseMatch[1];
		}

		// Evals the SWF_ARGS object string to a real object and gets its fmt_map member
		var objArgs = eval("(" + responseMatch + ")");
		var sMap = objArgs.fmt_map || "";
		sMap = decodeURIComponent(sMap); // Decodes sMap, because fmt_map is given encoded by YouTube

		// Tests if the fmt_map correspond to the requested format (that should only happen if the video is available)
		if ((new RegExp("^" + vFormat + "(?:/\\d+){4}(?:,|$)")).test(sMap)) {
			callbackFunc(vId, vTId, vFormat, true); // Video available
		}
		else {
			callbackFunc(vId, vTId, vFormat, false); // Video unavailable
		}

	};
	xhrVideo.open("GET", vURL, true);
	xhrVideo.send(null);
	return true;

	// Returns true if the video format vFormat is included in the original fmt_map of the video, false if otherwise (or if the original fmt_map isn't found)
	// It is a nested function
	function checkVideoAvailabilityInFmtMap() {
		if (oFmtMap === null) return false;
		return ((new RegExp("(?:,|^)" + vFormat + "(?:/\\d+){4}(?:,|$)")).test(oFmtMap));
	}

}

// Returns an array with the Options in the Select element (selNode) with the specified value (or null if none is found)
// selNode can be a Select node id or a reference to it (if selNode doesn't exist or it's not a Select, the function returns null)
// If singleNode is true, it only returns the first Option node found (or null if none)
function selGetOptionsFromValue(selNode, optValue, singleNode) {

	var iNode = $ref(selNode);
	if ((!iNode) || (iNode.nodeName.toUpperCase() != "SELECT")) return null;

	// Gets a filtered array with the elements with the same value as the one requested
	var optsArr = Array.filter(iNode.options, function(opt) {return (opt.value == optValue);});

	if (optsArr.length > 0) {
		return (singleNode) ? optsArr[0] : optsArr;
	}
	else {
		return null; // The array is empty
	}

}

// Makes sure that the selNode select color is the same one as the selected option for esthetic purpose
// selNode can be a Select node id or a reference to it (if selNode doesn't exist, it's not a Select or doesn't have a selected option, the function does nothing)
function selUpdateColor(selNode) {
	var iNode = $ref(selNode);
	if ((!iNode) || (iNode.nodeName.toUpperCase() != "SELECT")) return;
	if (iNode.selectedIndex != -1) iNode.style.color = iNode.options[iNode.selectedIndex].style.color;
}

// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
function scriptShowUpdateMessage(scriptShowMessage, scriptNewVersion) {

	// Gets the notice box and the script new version date in UTC format
	var messageDiv = $("gsscriptVersionMessage");
	var scriptNewVersionDate = (new Date(scriptNewVersion)).toUTCString();

	// Shows/creates/hides the update notice
	if (scriptShowMessage == false) {
		// Hides the notice if it exists
		if (messageDiv) messageDiv.style.display = "none";
	}
	else {

		// The notice shouldn't be shown/created if the user has chosen to hide it for this session
		if (sSt.gsscriptVersionNoticeHide) return;

		if (messageDiv) {
			// Shows the notice
			messageDiv.style.display = "";
		}
		else {

			// Creates the notice
			messageDiv = createNode("div", {id: "gsscriptVersionMessage", title: "A new YousableTubeFix version is available"});
			messageDiv.innerHTML = "A new version of YousableTubeFix (" + scriptNewVersionDate + ") is available<br><br>" +
				"<a id='gsscriptVersionMessageInstall' href='" + scriptFileURL + "' title='Install the script update'>Install</a>" +
				"<a href='" + scriptHomepageURL + "' target='_blank' title='Go to YousableTubeFix homepage'>Go to web page</a>" +
				"<a id='gsscriptVersionMessageHide' href='javascript:void(null)' title='Hide the notice for this session'>Hide</a>";
			document.body.appendChild(messageDiv);

			// Adds an event listener to the hide notice link
			$("gsscriptVersionMessageHide").addEventListener("click", function(evt) {
				sSt.gsscriptVersionNoticeHide = "1"; // Sets a sessionStorage variable to prevent the notice to be shown for this session
				scriptShowUpdateMessage(false, null);
			}, false);

			// Adds an event listener to the install link to hide the notice
			$("gsscriptVersionMessageInstall").addEventListener("click", function(evt) {scriptShowUpdateMessage(false, null);}, false);

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
				var responseMatch = evt.responseText.match(/<p>#\[V:(\d+)]#<\/p>/);
				var remoteVersion = (responseMatch === null) ? NaN : parseInt(responseMatch[1], 10);
				if (isNaN(remoteVersion)) return;

				// Saves the more recent version according to the server and shows the update notice if the server version is newer
				GM_setValue("scriptLastRemoteVersion", remoteVersion.toString());
				if (remoteVersion > scriptVersion) scriptShowUpdateMessage(true, remoteVersion);

			}
		}
	});
}

// Extends the String object with a trim funcion
String.prototype.trim = function() {
	return this.replace(/^\s+|\s+$/g, "");
};

// Adds !important to CSS rules of any type
String.prototype.makeImportant = function() {

	var Selector, DeclarationBlock, CssArray = this.match(/([^{]+)({[^{}]+})/);
	if (CssArray === null) {
		// Inline CSS rule (e.g. "display: none") or scripting rule (e.g. element.style.display = "none")
		Selector = "";
		DeclarationBlock = this;
	}
	else {
		// Complete CSS rule (e.g. ".nd {display: none}")
		Selector = CssArray[1];
		DeclarationBlock = CssArray[2];
	}

	// Adds !important to each rule
	if (DeclarationBlock.indexOf(":") != -1) {
		DeclarationBlock = DeclarationBlock.replace(/[^:;{}]+:[^:;{}]+/g, "$& !important");
	}
	else {
		// No estructure could be recognized, so we'll just add !important
		DeclarationBlock += " !important";
	}
	// Remove any !important duplicates
	DeclarationBlock = DeclarationBlock.replace(/(?:\s*!important\s*){2,}/gi, " !important");

	return Selector + DeclarationBlock;

};

// Escapes characters with special meaning in a regular expression with a backslash so they can be used in a regular expression with their literal meaning
String.prototype.escapeREChars = function() {
	return this.replace(/([.*+?|(){}[\]^$\\])/g, "\\$1");
}

// Transforms a number into a valid CSS dimension (in pixels)
Number.prototype.toCSS = function() {
	return String(Math.round(this)) + "px";
};

// Shortcut to sessionStorage (saved values will be discarded at the end of the browser session)
var sSt = unsafeWindow.sessionStorage;

// Array of the known video formats and its details (index number [idx], name [label/shortlabel], flash variables [vq/fmt_map], type [MIMEString], quality order [QI, higher is better] and if its availability is checked by default [defaultChosen])
// Other properties are added to the array and the video format objects in the user configuration section
var videoFormatsArray = [{idx: "5", label: "226p", shortlabel: "226p", vq: 1, fmt_map: "", MIMEString: "video/x-flv", QI: 1, defaultChosen: true},
												 {idx: "34", label: "360p", shortlabel: "360p", vq: 2, fmt_map: "35/640000/9/0/115", MIMEString: "video/x-flv", QI: 3, defaultChosen: true},
												 {idx: "18", label: "480p", shortlabel: "480p", vq: 2, fmt_map: "18/512000/9/0/115", MIMEString: "video/mp4", QI: 2, defaultChosen: true},
											
	 {idx: "22", label: "720p", shortlabel: "720p", vq: 2, fmt_map: "18/512000/9/0/115", MIMEString: "video/mp4", QI: 2, defaultChosen: true},
												 {idx: "37", label: "1080p", shortlabel: "1080p", vq: 2, fmt_map: "22/2000000/9/0/115", MIMEString: "video/mp4", QI: 4, defaultChosen: true}];

/////////////////////////// END OF HELPER FUNCTIONS ///////////////////////////

///////////////////////////// START OF CSS STYLES /////////////////////////////

// Initiates an array with CSS styles for the script
[

	// Adds a class to set anchors' text decoration
	// Anchors with the class and descendant anchors of elements with the class are affected (text-decoration isn't automatically inherited)
	"a.gsanchors, .gsanchors a {text-decoration: none}",
	"a.gsanchors:hover, .gsanchors a:hover {text-decoration: underline}",

	// Adds classes and a style for the easy-to-use download links (and its parent div)
	"#gsdownloadLinksDiv {border-top: 1px solid #CCCCCC; margin: 0px 5px; padding: 5px; " +
		"color: #666666; font-weight: bold; text-align: center}",
	".gsdownloadLinks {padding: 0px 4px}",
	".gsdownloadLinks:not(:last-child) {border-right: thin dotted black}", // Adds a "separator" on the links' right side, except for the last link
	".gsdownloadLinkDisabled {color: gray; cursor: default}", // Disabled links (format not available)
	".gsdownloadLinkNotChecked {color: teal}", // Not checked links

	// Adds a style for the icon which substitutes the video (if appropriate)
	"#gssubsIcon {margin: 150px auto; display: block; cursor: pointer}",

	// Adds styles for the ajax wrapper div and its contents
	"#gsajaxWrapper {margin: 100px auto; cursor: default; text-align: center}",
	"#gsajaxWrapper * {vertical-align: middle}", // vertical-align isn't automatically inherited
	"#gsloadingIcon {margin: 5px}",
	"#gsprogressMeter {font-variant: small-caps}",
	"#gsabortButton {margin: 5px auto; display: block}",

	// Adds styles and classes for the configuration layers and its contents
	"#gsmaskLayer {background-color: black; opacity: 0.5; z-index: 100; " +
		"position: fixed; left: 0px; top: 0px; width: 100%; height: 100%}",
	"#gsdialogLayer {background-color: #EEEEEE; overflow: auto; padding: 5px; z-index: 101; " +
		"outline: black solid thin; position: fixed; left: 30%; top: 7.5%; width: 40%; height: 85%}",
	"#gsdialogLayer > * {margin: 20px 0px}",
	"#gsdialogLayer li {margin: 15px 0px 7px; font-style: italic}",
	"#gsdialogLayer input, #gsdialogLayer select {vertical-align: middle}",
	"#gsconfTitle {cursor: default; font-size: 150%; font-weight: bold; text-align: center}",
	"#gsconfButDiv {text-align: center}",
	"#gsconfButDiv input {margin: 5px}",
	"#gsdialogLayer ul {list-style-type: disc; padding-left: 40px}", // Reverts the changes to the default UA values from YouTube CSS ones

	// Adds styles for the script "new version" message and its anchors
	"#gsscriptVersionMessage {background-color: #C00040; color: white; outline: black solid thin; overflow: auto; " +
		"padding: 5px; position: fixed; z-index: 99; top: 0px; right: 0px; width: 250px; height: 70px; text-align: center",
	"#gsscriptVersionMessage a {margin: 0px 5px}"

// Adds the styles from the style array to the page, making them important
].forEach(function(s) {GM_addStyle(s.makeImportant());});
////////////////////////////// END OF CSS STYLES //////////////////////////////

///////////////////////// START OF USER CONFIGURATION /////////////////////////

/*
	Use "YousableTubeFix Fix configuration" menu command to configure the script
	The menu is under "Tools" / "Greasemonkey" / "User Script Commands"
*/

/*
	Obsolete configuration variables names, do not use:
	- addCharCounter --> Add character counter feature (dropped, added by YouTube)
	- forceHDMode --> Force format 18 video mode (dropped in favor of the more general defaultVideoFormat)
	- removeQualitySettings --> Remove the quality settings link (dropped, integrated in the player by YouTube)
*/

// Default video player size (a floating point number or either "fill" or "max")
var videoSize = GM_getValue("videoSize", "fill");

// Optional elements removal (either "true" or "false", without quotes)
var removeBrand = GM_getValue("removeBrand", true);
var removeAlsoWatching = GM_getValue("removeAlsoWatching", true);
var removeEmbed = GM_getValue("removeEmbed", false);
var removeURL = GM_getValue("removeURL", false);
var removeRatings = GM_getValue("removeRatings", false);
var removeActions = GM_getValue("removeActions", false);
var removeBuySong = GM_getValue("removeBuySong", false);
var removeComments = GM_getValue("removeComments", false);
var removeStats = GM_getValue("removeStats", false);
var removeVideoResponses = GM_getValue("removeVideoResponses", false);
var removeCharCounter = GM_getValue("removeCharCounter", false);
var removeContentFrom = GM_getValue("removeContentFrom", false);
var removeDonations = GM_getValue("removeDonations", false);
var removeMoreUserVideos = GM_getValue("removeMoreUserVideos", false);
var removePlaylist = GM_getValue("removePlaylist", false);
var removeRelatedVideos = GM_getValue("removeRelatedVideos", false);
var removeHeader = GM_getValue("removeHeader", false);
var removeFooterCopyright = GM_getValue("removeFooterCopyright", false);
var removeRacyNotice = GM_getValue("removeRacyNotice", false);
var removeDefaultLanguageBox = GM_getValue("removeDefaultLanguageBox", false);
var removeAnnotations = GM_getValue("removeAnnotations", false);
var removeCaptions = GM_getValue("removeCaptions", false);

// Automatically expand the video info, hide collapse link
var expandInfo = GM_getValue("expandInfo", true);
var hideCollapse = GM_getValue("hideCollapse", true);

// Substitutes the video with an icon, preventing autoplay and autodownload
var videoToIcon = GM_getValue("videoToIcon", false);

// Prevents only autoplay using the YouTube API
var preventOnlyAutoplay = GM_getValue("preventOnlyAutoplay", false);

// Makes the page size of the comments in the video page bigger (500 comments per page)
var biggerComments = GM_getValue("biggerComments", false);

// Forces the change of the video format
var defaultVideoFormat = GM_getValue("defaultVideoFormat", "0");
var defaultVideoFormatInt = parseInt(defaultVideoFormat, 10); // An integer representation of the default video format (it can be NaN)

// Changes the Flash Player Quality attribute
var flashQuality = GM_getValue("flashQuality", "high");

// Adds easy-to-use download video links
var addEasyDownloadLinks = GM_getValue("addEasyDownloadLinks", true);

// Automatically bypass the age verification page for logged in users
var bypassAgeVerification = GM_getValue("bypassAgeVerification", false);

// Moves and resizes the video to its final position and configured size by default
var moveVideo = GM_getValue("moveVideo", true);

// Scrolls to the video by default on page entry
var scrollToVideo = GM_getValue("scrollToVideo", true);

// Gets the array of the index numbers of the video formats selected by the user, stored in JSON format (e.g. '["18", ""]')
// Those formats (if they are supported) will have its availability checked and will be selectable if the user has chosen to autoselect the video format (automatic quality options)
// The array is sorted according to the QI the user wants each format to have (from highest to lowest)
var userFormats = eval(GM_getValue("userFormats", "null"));
if (!(userFormats instanceof Array)) {
	userFormats = null; // If userFormats isn't an array, nullify it
}
else {
	userFormats = userFormats.filter(function(userIdx) { // Deletes invalid index numbers from userFormats
		if (typeof(userIdx) != "string" || (getVideoFormatObj(userIdx) === null)) return false;
		return true;
	});
}

// Extends the video formats array with properties regarding the user configuration (userFormats array)
videoFormatsArray.userFormatsLength = 0; // Counter of the video formats selected by the user which are supported
videoFormatsArray.forEach(function(vf) { // Adds properties to each video format object

	// isAvailable will be updated by selVideoFormatAvailability or its initialization code (1: available, 0: not available, -1: unknown [request error], -2: not checked)
	vf.isAvailable = null;

	// userChosen indicates if the video format has been selected by the user, userQI holds the QI given to it by the user (higher is better)
	if (userFormats === null) {

		// userFormats is unavailable. The properties get their default values
		vf.userQI = vf.QI;
		vf.userChosen = vf.defaultChosen;

	}
	else {

		// userFormats is available. Tries to find the video format in userFormats
		var userIndex = userFormats.indexOf(vf.idx);
		if (userIndex != -1) {

			// The video format has been selected
			vf.userQI = userFormats.length - userIndex; // userFormats[0] is the highest QI and userFormats[userFormats.length - 1] is QI = 1
			vf.userChosen = true;

		}
		else {

			// The video format hasn't been selected
			vf.userQI = null;
			vf.userChosen = false;

		}

	}

	// Updates the counter if the video format has been selected
	if (vf.userChosen) videoFormatsArray.userFormatsLength++;

});

// Current script version (release date), last update check and last remote version seen
var scriptVersion = 1256395784732; // 24 Oct 2009

var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);
if (isNaN(scriptLastCheck)) scriptLastCheck = 0;

var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", scriptVersion.toString()), 10);
if (isNaN(scriptLastRemoteVersion)) scriptLastRemoteVersion = scriptVersion;

// URLs related to the script
var scriptFileURL = "http://userscripts.org/scripts/source/13333.user.js";
var scriptHomepageURL = "http://userscripts.org/scripts/show/13333";

// Function to validate video size input. Returns a valid videoSize string or null (if input isn't valid)
function valVideoSize(vs) {

	var cs = String(vs).toLowerCase().trim();

	if ((cs === "fill") || (cs === "max") || (cs === "full")) return cs;
	if (!isNaN(parseFloat(cs))) return Math.abs(parseFloat(cs)).toString();
	return null;

}

// Configuration function
function configureScript(e) {

	// Gets the layers
	var maskLayer = $("gsmaskLayer");
	var dialogLayer = $("gsdialogLayer");

	// Checks the layers state
	// Creates the layers if they don't exist or displays them if they are hidden
	if ((maskLayer) && (dialogLayer)) {
		if ((maskLayer.style.display == "none") && (dialogLayer.style.display == "none")) {
			setDialogInputState(true); // Makes sure the input/select fields are enabled
			maskLayer.style.display = "";
			dialogLayer.style.display = "";
		}
		dialogLayer.focus();
	}
	else {
		createLayers();
	}

	return; // Exit function


	// Creates the configuration layers
	// It is a nested function
	function createLayers() {

		// Creates a layer to mask the page during configuration
		maskLayer = createNode("div", {id: "gsmaskLayer", title: "Click here to return to the page"});

		// Creates a layer for the configuration dialog
		dialogLayer = createNode("div", {id: "gsdialogLayer"});

		// Creates the configuration dialog HTML
		dialogLayer.innerHTML = "<div id='gsconfTitle'>YousableTubeFix Fix Configuration</div>" +
			"<ul>" +
			"<li>Select the default video size. Enter a floating point number or either \"fill\", \"max\" or \"full\":</li>" +
			"<input type='text' id='gsconfvideoSize' value='" + videoSize + "'><br>" +
			"<input type='checkbox' id='gsconfmoveVideo'" + (moveVideo ? " checked='checked'" : "") + ">Move and resize the video by default<br>" +
			"<input type='checkbox' id='gsconfscrollToVideo'" + (scrollToVideo ? " checked='checked'" : "") + ">Scroll to the video by default" +
			"<li>Remove (use Ctrl+click / Shift+click to select multiple options):</li>" +
			"<select id='gsconfremoveSel' multiple='multiple' size='5'>" +
			"<option id='gsconfremoveBrand'" + (removeBrand ? " selected='selected'" : "") + ">- Channel brand</option>" +
			"<option id='gsconfremoveAlsoWatching'" + (removeAlsoWatching ? " selected='selected'" : "") + ">- \"Also Watching Now\" section</option>" +
			"<option id='gsconfremoveEmbed'" + (removeEmbed ? " selected='selected'" : "") + ">- Embed section</option>" +
			"<option id='gsconfremoveURL'" + (removeURL ? " selected='selected'" : "") + ">- URL section</option>" +
			"<option id='gsconfremoveRatings'" + (removeRatings ? " selected='selected'" : "") + ">- Ratings section</option>" +
			"<option id='gsconfremoveActions'" + (removeActions ? " selected='selected'" : "") + ">- Actions section</option>" +
			"<option id='gsconfremoveBuySong'" + (removeBuySong ? " selected='selected'" : "") + ">- \"Download this song\" section</option>" +
			"<option id='gsconfremoveStats'" + (removeStats ? " selected='selected'" : "") + ">- Stats section</option>" +
			"<option id='gsconfremoveVideoResponses'" + (removeVideoResponses ? " selected='selected'" : "") + ">- Video responses section</option>" +
			"<option id='gsconfremoveContentFrom'" + (removeContentFrom ? " selected='selected'" : "") + ">- Contains content from... section</option>" +
			"<option id='gsconfremoveDonations'" + (removeDonations ? " selected='selected'" : "") + ">- Donations section</option>" +
			"<option id='gsconfremoveMoreUserVideos'" + (removeMoreUserVideos ? " selected='selected'" : "") + ">- More videos from this user section</option>" +
			"<option id='gsconfremovePlaylist'" + (removePlaylist ? " selected='selected'" : "") + ">- Playlist section</option>" +
			"<option id='gsconfremoveRelatedVideos'" + (removeRelatedVideos ? " selected='selected'" : "") + ">- Related videos section</option>" +
			"<option id='gsconfremoveHeader'" + (removeHeader ? " selected='selected'" : "") + ">- Header section</option>" +
			"<option id='gsconfremoveFooterCopyright'" + (removeFooterCopyright ? " selected='selected'" : "") + ">- Footer and copyright sections</option>" +
			"<option id='gsconfremoveRacyNotice'" + (removeRacyNotice ? " selected='selected'" : "") + ">- Racy video notice</option>" +
			"<option id='gsconfremoveDefaultLanguageBox'" + (removeDefaultLanguageBox ? " selected='selected'" : "") + ">- Default language box</option>" +
			"<option id='gsconfremoveCharCounter'" + (removeCharCounter ? " selected='selected'" : "") + ">- Character counter</option>" +
			"<option id='gsconfremoveAnnotations'" + (removeAnnotations ? " selected='selected'" : "") + ">- Video annotations</option>" +
			"<option id='gsconfremoveCaptions'" + (removeCaptions ? " selected='selected'" : "") + ">- Video captions</option>" +
			"</select>" +
			"<li>Video information:</li>" +
			"<input type='checkbox' id='gsconfexpandInfo'" + (expandInfo ? " checked='checked'" : "") + ">Automatically expanded<br>" +
			"<input type='checkbox' id='gsconfhideCollapse'" + ((hideCollapse && expandInfo) ? " checked='checked'" : "") + ">Hide collapse link" +
			"<li>Comments on the video page:</li>" +
			"<input type='radio' id='gsconfcommentsNormal' name='gsconfcommentsChoice'" + ((!removeComments && !biggerComments) ? " checked='checked'" : "") + ">Normal<br>" +
			"<input type='radio' id='gsconfcommentsBigger' name='gsconfcommentsChoice'" + ((!removeComments && biggerComments) ? " checked='checked'" : "") + ">More comments<br>" +
			"<input type='radio' id='gsconfcommentsNone' name='gsconfcommentsChoice'" + (removeComments ? " checked='checked'" : "") + ">None" +
			"<li>Video autoplay and autodownload:</li>" +
			"<input type='radio' id='gsconfAutoplayDefault' name='gsconfAutoplayChoice'" + ((!videoToIcon && !preventOnlyAutoplay) ? " checked='checked'" : "") + ">Don't prevent autoplay and autodownload<br>" +
			"<input type='radio' id='gsconfpreventOnlyAutoplay' name='gsconfAutoplayChoice'" + ((!videoToIcon && preventOnlyAutoplay) ? " checked='checked'" : "") + ">Prevent only autoplay<br>" +
			"<input type='radio' id='gsconfvideoToIcon' name='gsconfAutoplayChoice'" + (videoToIcon ? " checked='checked'" : "") + ">Prevent both autoplay and autodownload" +
			"<li><input type='checkbox' id='gsconfaddEasyDownloadLinks'" + (addEasyDownloadLinks ? " checked='checked'" : "") + ">Add easy-to-use download links</li>" +
			"<li><input type='checkbox' id='gsconfbypassAgeVerification'" + (bypassAgeVerification ? " checked='checked'" : "") + ">Automatically bypass age verification (logged in users)</li>" +
			"<li>" +
			"Select the default video format: &nbsp;" +
			"<select id='gsconfdefaultVideoFormatSel' size='1'>" +
			"<optgroup label='Automatic Quality options'>" +
			"<option id='gsconfdefaultVideoFormatOptDefault' value='0'" + ((defaultVideoFormat === "0") ? " selected='selected'" : "") + ">YouTube Default</option>" +
			"<option id='gsconfdefaultVideoFormatOptAutoHigh' value='-1'" + ((defaultVideoFormat === "-1") ? " selected='selected'" : "") + ">Best Quality available</option>" +
			"<option id='gsconfdefaultVideoFormatOptAutoLow' value='-2'" + ((defaultVideoFormat === "-2") ? " selected='selected'" : "") + ">Fastest Quality available</option>" +
			"</optgroup>" +
			"<optgroup label='Fixed Quality options'>" +
			(function() { // Returns a string with the HTML code of as many option nodes as known video formats
				return videoFormatsArray.map(function(vf) {
					return "<option id='gsconfdefaultVideoFormatOpt" + vf.idx + "' value='" + vf.idx + "'" + ((defaultVideoFormat === vf.idx) ? " selected='selected'" : "") + ">" + vf.label + "</option>";
				}).join("");
			})() +
			"</optgroup>" +
			"</select>" +
			"</li>" +
			"<li>" +
			"Select the Flash Player Quality: &nbsp;" +
			"<select id='gsconfflashQualitySel' size='1'>" +
			"<option id='gsconfflashQualityOptBest' value='best'" + ((flashQuality === "best") ? " selected='selected'" : "") + ">Best Quality</option>" +
			"<option id='gsconfflashQualityOptHigh' value='high'" + ((flashQuality === "high") ? " selected='selected'" : "") + ">High Quality (YouTube default)</option>" +
			"<option id='gsconfflashQualityOptMedium' value='medium'" + ((flashQuality === "medium") ? " selected='selected'" : "") + ">Medium Quality</option>" +
			"<option id='gsconfflashQualityOptLow' value='low'" + ((flashQuality === "low") ? " selected='selected'" : "") + ">Low Quality (Low CPU use)</option>" +
			"</select>" +
			"</li>" +
			"</ul>" +
			"<div id='gsconfButDiv'>" +
			"<input type='button' id='gsconfOKBut' value='OK' title='Save the current configuration'>" +
			"<input type='button' id='gsconfCancelBut' value='Cancel' title='Return to the page without saving'>" +
			"</div>";

		// Appends the layers to the document
		document.body.appendChild(maskLayer);
		document.body.appendChild(dialogLayer);

		// Adds the necessary event listeners
		maskLayer.addEventListener("click", hideLayers, false);
		$("gsconfexpandInfo").addEventListener("click", chkDependantLogic, false);
		$("gsconfOKBut").addEventListener("click", saveConfiguration, false);
		$("gsconfCancelBut").addEventListener("click", hideLayers, false);

	}

	// Changes the enabled state of all input/select fields of the dialog layer. If newState is undefined or not boolean, it does nothing
	// It is a nested function
	function setDialogInputState(newState) {
		if (typeof(newState) != "boolean") return;
		var allInputs = $x(".//input|.//select", dialogLayer);
		allInputs.forEach(function(i) {i.disabled = !newState;});
	}

	// Implements a master/slave logic to two following sibling checkboxes. The first is the master one and the following is the slave one
	// The slave checkbox is disabled and unchecked when the master one is unchecked
	// It is called by the master checkbox event listener
	// It is a nested function
	function chkDependantLogic(evt) {
		var chkMasterState = evt.target.checked;
		var chkSlave = $x1("following-sibling::input[@type='checkbox']", evt.target);
		if (!chkSlave) return;
		if (chkMasterState === false) chkSlave.checked = false;
		chkSlave.disabled = !chkMasterState;
	}

	// Exits the configuration by hiding the layers
	// It is called by the Cancel button and the maskLayer event listeners
	// It is a nested function
	function hideLayers(evt) {
		dialogLayer.style.display = "none";
		maskLayer.style.display = "none";
	}

	// Checks and saves the configuration to the configuration variables
	// It is called by the Ok button event listener
	// It is a nested function
	function saveConfiguration(evt) {

		// Disables the input/select fields
		setDialogInputState(false);

		// Checks default video size
		var valvs = valVideoSize($("gsconfvideoSize").value);
		if (valvs === null) {
			window.alert("Invalid default video size");
			setDialogInputState(true); // Re-enables the input/select fields
			$("gsconfvideoSize").focus();
			return;
		}
		GM_setValue("videoSize", valvs);

		// Sets other configuration variables
		GM_setValue("moveVideo", $("gsconfmoveVideo").checked);
		GM_setValue("scrollToVideo", $("gsconfscrollToVideo").checked);
		GM_setValue("removeBrand", $("gsconfremoveBrand").selected);
		GM_setValue("removeAlsoWatching", $("gsconfremoveAlsoWatching").selected);
		GM_setValue("removeEmbed", $("gsconfremoveEmbed").selected);
		GM_setValue("removeURL", $("gsconfremoveURL").selected);
		GM_setValue("removeRatings", $("gsconfremoveRatings").selected);
		GM_setValue("removeActions", $("gsconfremoveActions").selected);
		GM_setValue("removeBuySong", $("gsconfremoveBuySong").selected);
		GM_setValue("removeStats", $("gsconfremoveStats").selected);
		GM_setValue("removeVideoResponses", $("gsconfremoveVideoResponses").selected);
		GM_setValue("removeContentFrom", $("gsconfremoveContentFrom").selected);
		GM_setValue("removeDonations", $("gsconfremoveDonations").selected);
		GM_setValue("removeMoreUserVideos", $("gsconfremoveMoreUserVideos").selected);
		GM_setValue("removePlaylist", $("gsconfremovePlaylist").selected);
		GM_setValue("removeRelatedVideos", $("gsconfremoveRelatedVideos").selected);
		GM_setValue("removeHeader", $("gsconfremoveHeader").selected);
		GM_setValue("removeFooterCopyright", $("gsconfremoveFooterCopyright").selected);
		GM_setValue("removeRacyNotice", $("gsconfremoveRacyNotice").selected);
		GM_setValue("removeDefaultLanguageBox", $("gsconfremoveDefaultLanguageBox").selected);
		GM_setValue("removeCharCounter", $("gsconfremoveCharCounter").selected);
		GM_setValue("removeAnnotations", $("gsconfremoveAnnotations").selected);
		GM_setValue("removeCaptions", $("gsconfremoveCaptions").selected);
		GM_setValue("expandInfo", $("gsconfexpandInfo").checked);
		GM_setValue("hideCollapse", ($("gsconfexpandInfo").checked ? $("gsconfhideCollapse").checked : false));
		GM_setValue("biggerComments", $("gsconfcommentsBigger").checked);
		GM_setValue("removeComments", $("gsconfcommentsNone").checked);
		GM_setValue("preventOnlyAutoplay", $("gsconfpreventOnlyAutoplay").checked);
		GM_setValue("videoToIcon", $("gsconfvideoToIcon").checked);
		GM_setValue("addEasyDownloadLinks", $("gsconfaddEasyDownloadLinks").checked);
		GM_setValue("bypassAgeVerification", $("gsconfbypassAgeVerification").checked);
		GM_setValue("defaultVideoFormat", $("gsconfdefaultVideoFormatSel").value);
		GM_setValue("flashQuality", $("gsconfflashQualitySel").value);

		// Reloads page and script
		window.location.reload();

	}

}

// Registers the configuration menu command
GM_registerMenuCommand("YousableTubeFix Fix Configuration", configureScript, null, null, "Y");

////////////////////////// END OF USER CONFIGURATION //////////////////////////

// YouTube Video URL:    http://(Youtube hostname)/watch?v=(videoId)[&fmt=(videoFormat)]
// YouTube Download URL: http://(Youtube hostname)/get_video?video_id=(videoId)&t=(tId)[&fmt=(videoFormat)]

// Gets the YouTube pathname to know which YouTube page is active
var ytPath = window.location.pathname;

// Actions for all YouTube pages

// Removes the Chrome promo ad
delNode("chrome-promo");
delNode($x1("//div[@class='homepage-chrome-promo-content']")); // Chrome ad in the homepage

// Removes the default language dialog box
if (removeDefaultLanguageBox) delNode("default-language-box");

// Actions for non-video pages
if (/^\/results(?:\.php)?/i.test(ytPath)) {

	// Search results page

	// Removes the ads
	delNode("search-pva");

	return;

}
else if (/^\/verify_age(?:\.php)?/i.test(ytPath)) {

	// Age verification page

	// Bypass the age verification page for logged in users by automatically clicking in the "Confirm Birth Date" button
	if (bypassAgeVerification) {
		var inputConfirmAge = $x1("//form//input[@type='submit'][@name='action_confirm']");
		if (inputConfirmAge) fireClickEvent(inputConfirmAge);
	}

	return;

}
else if (!(/^\/watch(?:\.php)?/i.test(ytPath))) {
	// An unknown non-video page
	return;
}

// This is a YouTube video page

// Gets the video player (and its unwrapped version), its parent div and its parameters (Id, Tracking Id y Video Format)
var player = $("movie_player");
if (!player) return;
var uwPlayer = player.wrappedJSObject; // unsafeWindow context
var playerDiv = $("watch-player-div");
if (!playerDiv) return;

var videoId = getFlashVar("video_id");
if (videoId === null) return;
var tId = getFlashVar("t");
if (tId === null) return;

var videoFormat, oFmtMap = getFlashVar("fmt_map"); // Saves the original fmt_map for checkVideoAvailabilityInFmtMap's use
if (oFmtMap !== null) videoFormat = oFmtMap.match(/^(\d+)(?:\/\d+){4}(?:,|$)/);
if ((oFmtMap === null) || (videoFormat === null)) {
	// Video is LQ (its fmt_map isn't set or doesn't match the regex)
	videoFormat = "";
}
else {
	// fmt_map is ok. videoFormat will be set according to the vq parameter (user video quality account preference)
	switch(getFlashVar("vq")) {
		case "":
		case null:
		case "1":
			// vq is empty, doesn't exist or the user has chosen to load always the LQ format. Video is LQ
			videoFormat = "";
			break;
		case "2":
			// The user has chosen to load always the HQ version (or the page was called with an fmt parameter). Video is HQ
			videoFormat = videoFormat[1];
			break;
		case "0":
		case "null":
			// The user is unregistered or has chosen to let the player decides the format based on the bandwidth
			// We'll try to get the chosen vq from the player, but it's unreliable due to a race condition (LQ will be chosen if that fails)
			videoFormat = ($gfv("vq") == "2") ? videoFormat[1] : "";
			break;
		default:
			// vq isn't recognized. Video is LQ
			videoFormat = "";
			break;
	}
}

// Gets the YouTube base URL
var ytHost = window.location.protocol + "//" + window.location.host;

// Gets the vidTitle div
var vidTitle = $("watch-vid-title");
if (!vidTitle) return;

// Gets the node with the video title and adds a download link for the video
var vidTitleNode = $x1(".//h1", vidTitle);
if (vidTitleNode) {

	// Creates the video download link
	var vidTitleLink = createNode("a", {id: "gsvidTitleLink", class: "gsanchors", href: getDownloadVideoURL(videoId, tId, videoFormat),
																			title: "Click here to download the video", type: getDownloadVideoMIMEString(videoFormat)},
																		 {textContent: vidTitleNode.textContent});

/*
	// (Uncomment this block to have the video title as a download link)
	// Removes the content of vidTitleNode and appends the download link to it
	removeAllChildren(vidTitleNode);
	vidTitleNode.appendChild(vidTitleLink);
*/

}

// Updates the URL input field according to the video parameters
updateURLInputField();

// Removes "Promoted videos" ads (and its parent wrapper)
delNode(getParent($("watch-promoted-videos-container")));

// Removes ads and tracking code from the player (depends on the Main Reload)
["ctb", "ctb_xml", "ad_module", "ad_tag", "sdetail"].forEach(function(v) {
	deleteFlashVar(v, false);
});

// Removes "Also Watching Now" section
if (removeAlsoWatching) delNode("watch-active-sharing");

// Removes Ratings section
if (removeRatings) delNode("watch-ratings-views");

// Removes Actions section ("Share", "Favorite", "Playlists" and "Flag")
if (removeActions) delNode("watch-actions-area");

// Removes "Download this song" section
if (removeBuySong) delNode("watch-buy-urls");

// Removes Stats section
if (removeStats) delNode("watch-stats-data-wrapper");

// Removes video responses section
if (removeVideoResponses) delNode(getParent("watch-video-responses-children"));

// Removes comments section
if (removeComments) delNode("watch-comment-panel");

// Removes Channel Brand
if (removeBrand) {
	delNode("watch-channel-brand-cap");
	delNode("watch-channel-brand-div");
}

// Removes "Embed" section
if (removeEmbed) delNode("watch-embed-div");

// Removes URL section
if (removeURL) delNode("watch-url-div");

// Removes content from... section
if (removeContentFrom) delNode("watch-content-badges");

// Removes donations section
if (removeDonations) delNode($x1("//div[@id='watch-video-details']//div[@class='watch-google-checkout']"));

// Removes "more videos from this user" section
if (removeMoreUserVideos) delNode("watch-channel-videos-panel");

// Removes playlist section
if (removePlaylist) delNode("playlist-panel");

// Removes related videos section
if (removeRelatedVideos) delNode("watch-related-videos-panel");

// Removes header section
if (removeHeader) delNode("masthead-container");

// Removes footer and copyright sections
if (removeFooterCopyright) {
	delNode("footer");
	delNode("copyright");
}

// Removes the racy video notice
if (removeRacyNotice) {
	delNode("watch-highlight-racy-box");
}

// Sets the necessary event listeners to remove the character counters when YouTube inserts them (changing the div innerHTML)
// The event listeners aren't removed later because YouTube sometimes changes its innerHTML more than once
if (removeCharCounter) {
	var postCommentDiv1 = $("div_main_comment");
	var postCommentDiv2 = $("div_main_comment2");

	if (postCommentDiv1) postCommentDiv1.addEventListener("DOMNodeInserted", watchCharCounterDiv, false);
	if (postCommentDiv2) postCommentDiv2.addEventListener("DOMNodeInserted", watchCharCounterDiv, false);
}

// Function to dinamically remove the character counters' code from the innerHTML set by YouTube functions
// It is called by postCommentDiv[1/2]s' event listeners
function watchCharCounterDiv(evt) {

	// Only the comment_formmain_comment[1/2] elements will me handled (the forms with the character counters)
	var watchNodeId = evt.target.id;
	if ((!watchNodeId) || (!(/^comment_formmain_comment2?$/.test(watchNodeId)))) return;

	// Gets the textarea and removes the references to the update function from its event listeners
	var watchCharTA = $x1(".//textarea[@name='comment']", evt.target);
	if (watchCharTA) {
		["oninput", "onpaste", "onkeyup"].forEach(function(a) {

			if (!watchCharTA.hasAttribute(a)) return;

			var watchCharTAAttr = watchCharTA.getAttribute(a);
			watchCharTAAttr = watchCharTAAttr.replace(/updateCharCount\([^)]*\);?/gi, ""); // updateCharCount is the YouTube's update function
			if (watchCharTAAttr !== "") {
				watchCharTA.setAttribute(a, watchCharTAAttr); // Updates the event listener
			}
			else {
				watchCharTA.removeAttribute(a); // Removes event listeners that would be empty
			}
		});
	}

	// Removes the character counters' labels
	var watchCharSpan = $x1(".//span[starts-with(@id, 'maxCharLabelmain_comment')]", evt.target);
	var watchCharInput = $x1(".//input[starts-with(@id, 'charCountmain_comment')]", evt.target);
	delNode(watchCharSpan);
	delNode(watchCharInput);

}

// Removes the video annotations (depends on the Main Reload)
if (removeAnnotations) {
	deleteFlashVar("iv_storage_server", false);
	deleteFlashVar("iv_module", false);
}

// Removes the video captions (depends on the Main Reload)
if (removeCaptions) {
	deleteFlashVar("ttsurl", false);
	deleteFlashVar("subtitle_module", false);
}

// Adds easy-to-use download video links to the right column
if (addEasyDownloadLinks) {
	var videoDetailsDiv = $("watch-video-details");
	if (videoDetailsDiv) {

		// Creates the easy-to-use download links and a container div, and then appends the links to the div
		var downloadLinksDiv = createNode("div", {id: "gsdownloadLinksDiv"}, {textContent: "Download as: "});

		videoFormatsArray.forEach(function(vf) {
			var downloadLinkFormat = createNode("a", {id: "gsdownloadLinkFormat" + vf.idx, class: "gsdownloadLinks",
																								href: getDownloadVideoURL(videoId, tId, vf.idx), title: vf.label, type: vf.MIMEString,
																								gsvideoformat: vf.idx}, {textContent: vf.shortlabel});
			downloadLinksDiv.appendChild(downloadLinkFormat);
		});

		// Appends the div to the right column (YouTube layout)
		videoDetailsDiv.appendChild(downloadLinksDiv);

	}
}

// Expands the video information
if (expandInfo) {
	var expandLink = $x1("//div[@id='watch-video-details-toggle']//div[@id='watch-video-details-toggle-less']/a");
	if (expandLink) {
		fireClickEvent(expandLink); // Fires a click event on expandLink
		if (hideCollapse) {
			var collapseLink = $x1("//div[@id='watch-video-details-toggle']//div[@id='watch-video-details-toggle-more']/a");
			delNode(getParent(collapseLink)); // Deletes the "(less information)" link and its parent wrapper
		}
	}
}

// Saves original video dimensions and aspect ratio for resizeVideo's use
var oPlayerData = {width: player.clientWidth, height: player.clientHeight, AR: player.clientWidth / player.clientHeight};

// Saves the x position and width of the positioned playerDiv for resizeVideo's use
// As playerDiv hasn't been positioned yet, it will be calculated using baseDiv (its parent) dimensions
var baseDiv = $("baseDiv"), oPlayerDivData;
if (baseDiv) {

	// Calculates the computed horizontal padding (left and right) of baseDiv
	var baseDivPaddingLeft = parseFloat(window.getComputedStyle(baseDiv, null).getPropertyValue("padding-left"));
	var baseDivPaddingRight = parseFloat(window.getComputedStyle(baseDiv, null).getPropertyValue("padding-right"));

	// Calculates the positioned playerDiv data
	oPlayerDivData = {xPos: findXY(baseDiv).xPos + baseDivPaddingLeft, // x position of baseDiv plus its left padding
										width: baseDiv.clientWidth - (baseDivPaddingLeft + baseDivPaddingRight)}; // clientWidth of baseDiv minus its total horizontal padding

}
else {
	// baseDiv hasn't been found. vidTitle's data will be used instead (but it'll be wrong if vidTitle has lights-out buttons, for example)
	oPlayerDivData = {xPos: findXY(vidTitle).xPos, width: vidTitle.clientWidth};
}

// Stops the video autoplay and autodownload by substituing the player with an icon or using the YouTube API
if (videoToIcon) {
	var subsIcon; // subsIcon is declared here because it's used by both iconizeVideo and restoreVideo
	iconizeVideo();
}
else {
	if (preventOnlyAutoplay) {
		// Initializes the needed variable and sets the player to not autoplay and call gsPlayerReady when the player's API module is ready (depends on the Main Reload)
		var autoplayFailed = 0;
		setFlashVar("enablejsapi", "1", false); // Makes sure that the API is enabled
		setFlashVar("autoplay", "0", false);
		setFlashVar("jsapicallback", "gsPlayerReady", false);
	}
}

// Function to make the player buffer the video
// It is called by the player when its API module is ready (if the corresponding jsapicallback variable is set)
// The player will be in a cued state when this function is called (paused but not buffering) because of the autoplay flash variable
// Although the function is accesible from unsafeWindow, it's executed in the script context
unsafeWindow.gsPlayerReady = function(playerId) {

	// Tries to play and the pause the video, so it buffers it
	// This sometimes fails for unknown reasons, so the error is cached and the player reloaded up to 4 times to try to do it again
	try {
		uwPlayer.playVideo();
		uwPlayer.pauseVideo();
	}
	catch(err) {
		autoplayFailed++;  // Increments the counter by one
		if (autoplayFailed <= 4) {
			reloadPlayer();
		}
		else {
			// Too many failed attempts, the API method will be disabled. The video will be paused (because of the autoplay flash variable), but it won't buffer
			deleteFlashVar("jsapicallback", false);
		}
	}

	// The default YouTube initialization function is called if it exists
	if (unsafeWindow.onYouTubePlayerReady) unsafeWindow.onYouTubePlayerReady(playerId);

};

// Function to substitute the video with an icon
function iconizeVideo() {
	subsIcon = createNode("img", {id: "gssubsIcon", alt: "Video",
																title: "Click here to play the video",
																src: "http://img.youtube.com/vi/" + videoId + "/default.jpg"});
	playerDiv.replaceChild(subsIcon, player); // Replaces the player with the icon
	subsIcon.addEventListener("click", restoreVideo, false); // Adds an event listener to the icon
}

// Function to remove the icon and restore the video
// It is called by subsIcon event listener
function restoreVideo(evt) {
	playerDiv.replaceChild(player, subsIcon);
	resizeVideo(videoSize);
}

// Changes the Flash Player Quality attribute (depends on the Main Reload)
player.setAttribute("quality", flashQuality);

// Moves the player div below the title div (the player is also reloaded [Main Reload])
// If the script shouldn't move the player div by default, the player is only manually reloaded (Main Reload)
if (moveVideo) {
	insertAfter(playerDiv, vidTitle);
}
else {
	reloadPlayer();
}

// Adds video resize links
var linkDiv = createNode("div", {id: "gsresizeLinks", class: "gsanchors"});
linkDiv.innerHTML = "<a id='gsresizeLink0' href='javascript:void(null)'>1x</a> " +
	"- <a id='gsresizeLink1' href='javascript:void(null)'>1.25x</a> " +
	"- <a id='gsresizeLink2' href='javascript:void(null)'>1.5x</a> " +
	"- <a id='gsresizeLink3' href='javascript:void(null)'>1.75x</a> " +
	"- <a id='gsresizeLink4' href='javascript:void(null)'>2x</a> " +
	"- <a id='gsresizeLink5' href='javascript:void(null)'>2.25x</a> " +
	"- <a id='gsresizeLink6' href='javascript:void(null)'>2.5x</a> " +
	"- <a id='gsresizeLink7' href='javascript:void(null)'>fill</a> " +
	"- <a id='gsresizeLink8' href='javascript:void(null)'>max</a> " +
	"- <a id='gsresizeLink9' href='javascript:void(null)'>full</a>";

// Creates the CVF ("change video format") select
linkDiv.appendChild(document.createTextNode(" - Format: "));
var selVideoFormat = createNode("select", {id: "gsselVideoFormat", size: "1", title: "Choose video format"});

// Creates and adds the CVF options to the CVF select
videoFormatsArray.forEach(function(vf) {
	var optVideoFormat = createNode("option", {id: "gsoptVideoFormat" + vf.idx, value: vf.idx}, {textContent: vf.label});
	selVideoFormat.add(optVideoFormat, null);
});

// Chooses the CVF select selected option based on the current video format
var optVideoFormatCurrent = selGetOptionsFromValue(selVideoFormat, videoFormat, true);
if (optVideoFormatCurrent === null) {
	// There isn't any option with a value equal to the current video format. No option is selected
	selVideoFormat.selectedIndex = -1;
}
else {
	// Selects the option with a value equal to the current video format
	optVideoFormatCurrent.selected = true;
}

// Inserts the CVF select into the video resize links div
linkDiv.appendChild(selVideoFormat);

// Inserts the video resize links div after the player div
insertAfter(linkDiv, playerDiv);

linkDiv.addEventListener("click", resizeClick, false); // Adds an event listener to the div for the resize links
selVideoFormat.addEventListener("change", selChangeVideoFormat, false); // Adds an event listener to the CVF select

// Forces a video format by selecting the corresponding CVF option
if (defaultVideoFormatInt > 0) { // 0 and negative values have special meanings. If defaultVideoFormatInt is NaN, the comparison is false
	var optVideoFormatDefault = selGetOptionsFromValue(selVideoFormat, defaultVideoFormat, true);
	if ((optVideoFormatDefault !== null) && (optVideoFormatDefault.selected == false)) {
		// The video format is known and isn't selected. Selects it
		optVideoFormatDefault.selected = true;
		fireChangeEvent(selVideoFormat); // Manual fire of the change event (script changes don't fire it)
	}
}

// Function to change the player and the video download link to the selected video format in the CVF select
// It is called by the CVF select event listener
function selChangeVideoFormat(evt) {

	var selNewValue = evt.target.value;

	// Gets the video format details and updates the player and videoFormat
	var videoFormatDetails = getVideoFormatObj(selNewValue);
	if (videoFormatDetails !== null) {
		setFlashVar("vq", videoFormatDetails.vq, false);
		setFlashVar("fmt_map", videoFormatDetails.fmt_map, true);
		videoFormat = selNewValue;
	}

	// Updates the CVF select color
	selUpdateColor(selVideoFormat);

	// Updates the download video link
	var vidTitleLink = $("gsvidTitleLink");
	if (vidTitleLink) {
		vidTitleLink.href = getDownloadVideoURL(videoId, tId, videoFormat);
		vidTitleLink.type = getDownloadVideoMIMEString(videoFormat);
	}

	// Updates the URL input field
	updateURLInputField();

}

// Resizes the video to default size and scrolls to it (it doesn't scroll if scrollVideo is false)
resizeVideo(videoSize, (!scrollToVideo));

// Function used to resize video and scroll to it
// If dontScroll is true, the page isn't scrolled
function resizeVideo(aSize, dontScroll) {

	var newH, newW;

	// Gets viewport dimensions without scrollbars (in Strict mode)
	var vh = document.documentElement.clientHeight, vw = document.documentElement.clientWidth;

	// If the video is substituted by an icon or isn't positioned for resize, only scroll up/down to get the video title on top
	if ((isVideoIcon()) || (!isVideoPositioned())) {
		scrollToNodeYPos(vidTitle);
		return; // Exit function
	}

	switch(aSize) {

		case "fill":
			// Fills the width available in the parent div, preserving the aspect ratio
			newW = oPlayerDivData.width;
			newH = newW / oPlayerData.AR;
			break;

		case "max":

			// Fills the viewport dimensions completely, preserving the aspect ratio

			// Calculates the resize factor (factorR) as the smallest of the vertical and horizontal ratios
			// This is valid if the original video size is smaller than the viewport (at least in one dimension)
			var factorR = Math.min(vh / oPlayerData.height, vw / oPlayerData.width);

			// Multiplies the original dimensions by the factorR factor, rounded down (the rounding mustn't return a bigger number)
			// The aspect ratio is preserved
			newW = Math.floor(oPlayerData.width * factorR);
			newH = Math.floor(oPlayerData.height * factorR);
			break;

		case "full":
			// Fills the viewport dimensions completely, regardless of the aspect ratio
			newW = vw;
			newH = vh;
			break;

		default:
			// Multiplies the original dimensions by the aSize factor
			newW = oPlayerData.width * aSize;
			newH = oPlayerData.height * aSize;
			break;

	}

	// Resizes the player
	player.style.width = newW.toCSS();
	player.style.height = newH.toCSS();

	// Centers the player, video title and resize links horizontally
	var posOffset = (((vw - newW) / 2) - oPlayerDivData.xPos).toCSS(); // Calculates the offset --> ((Container width - Content width) / 2) - Content Initial Position;
	[playerDiv, vidTitle, linkDiv].forEach(function(n) {
		n.style.position = "relative"; // Enables CSS relative positioning
		n.style.left = posOffset; // Sets the offset
	});

	// Scrolls up/down to get the video title (or the player div if aSize is "max" or "full") on top
	scrollToNodeYPos(((aSize == "max") || (aSize == "full")) ? playerDiv : vidTitle);

	// Scrolls the page to get the passed node on top, but it doesn't do anything if dontScroll is true
	// It is a nested function
	function scrollToNodeYPos(targetNode) {
		if (dontScroll) return;
		var posToScroll = findXY(targetNode);
		if (posToScroll !== null) window.scrollTo(0, posToScroll.yPos);
	}

}

// Funtion used to call resizeVideo with the appropriate aSize parameter
// It is called by the resize links event listener when a click on a child element (or on the div itself) bubbles up to the resize links div
function resizeClick(evt) {

	var linkId = evt.target.id; // Gets the id of the element clicked
	if (!linkId || (evt.target.nodeName.toUpperCase() != "A")) return;  // Only A links with id will be handled
	if (!(/^gsresizeLink[0-9]$/.test(linkId))) return; // Only resize links from 0 to 9 will be handled

	// Tries to get a valid video size from the link text
	var linkSize = valVideoSize(evt.target.textContent);
	if (linkSize === null) return;

	// Resizes the video and scrolls to it. If the playerDiv isn't positioned for resize, it is moved (along with linkDiv)
	if (!isVideoPositioned()) {
		insertAfter(playerDiv, vidTitle);
		insertAfter(linkDiv, playerDiv);
	}
	resizeVideo(linkSize);

}

// Initializes some variables to control the autoselection of a video format according to its availability (if the user has chosen to do it)
// If so, sorts the video formats array by format preference in descending order (the most wanted format will be the first element of the array)
var videoFormatsCheckArray = [], videoFormatAutoSelDone = false;
if ((defaultVideoFormatInt === -1) || (defaultVideoFormatInt === -2)) {
	videoFormatsArray.sort(function(vfA, vfB) {return (defaultVideoFormatInt === -1) ? (vfB.userQI - vfA.userQI) : (vfA.userQI - vfB.userQI);});
}

// Sends requests to get information for each video format availability if it has been selected, in format preference order. That doesn't mean the information will be received in order, but it will be more likely
// If not, it changes the appearence of the CVF option and its corresponding easy-to-use download link
videoFormatsArray.forEach(function(vf) {
	if (vf.userChosen) {
		checkVideoAvailability(videoId, tId, vf.idx, selVideoFormatAvailability);
		videoFormatsCheckArray.push(vf); // Adds the chosen video format to an ancillary video formats array. The array will contain the chosen formats sorted by user preference. This array and the main video formats array will point to the same video format objects
	}
	else {
		var optAvailability = selGetOptionsFromValue(selVideoFormat, vf.idx, true);
		if (optAvailability !== null) {
			optAvailability.style.color = "teal";
			optAvailability.textContent += " (not checked)";
			vf.isAvailable = -2;
		}
		var downloadLinkAvailability = $x1("//div[@id='gsdownloadLinksDiv']/a[@gsvideoformat='" + vf.idx + "']");
		if (downloadLinkAvailability) downloadLinkAvailability.className += " gsdownloadLinkNotChecked";
	}
});
selUpdateColor(selVideoFormat); // Updates the CVF select color

// Function to change the CVF options' appearance to indicate the availability of their formats
// It is called by the checkVideoAvailability function when the request returns
function selVideoFormatAvailability(vId, vTId, vFormat, vAvailabilityRet) {

	// Gets the CVF option and video format object associated with vFormat
	var optAvailability = selGetOptionsFromValue(selVideoFormat, vFormat, true);
	var videoFormatAvailability = getVideoFormatObj(vFormat);

	// Changes the CVF option appearance and updates the availability member of the video format object
	if ((optAvailability !== null) && (videoFormatAvailability !== null)) {
		switch(vAvailabilityRet) {
			case true:
				optAvailability.style.color = "green";
				optAvailability.textContent += " (available)";
				videoFormatAvailability.isAvailable = 1;
				break;
			case false:
				optAvailability.style.color = "red";
				optAvailability.textContent += " (unavailable)";
				videoFormatAvailability.isAvailable = 0;
				break;
			case null:
				optAvailability.style.color = "purple";
				optAvailability.textContent += " (request error)";
				videoFormatAvailability.isAvailable = -1;
				break;
		}

		// Updates the CVF select color
		selUpdateColor(selVideoFormat);

		// If the video format is unavailable, disables the corresponding easy-to-use download link
		if (vAvailabilityRet === false) {
			var downloadLinkAvailability = $x1("//div[@id='gsdownloadLinksDiv']/a[@gsvideoformat='" + vFormat + "']");
			if (downloadLinkAvailability) {
				downloadLinkAvailability.className += " gsdownloadLinkDisabled";
				downloadLinkAvailability.href = "javascript:void(null)";
				downloadLinkAvailability.title = "This video format is unavailable";
			}
		}

		// If the user has chosen to autoselect a video format according to its availability (and that hasn't been done yet), process the returned availability
		if (((defaultVideoFormatInt === -1) || (defaultVideoFormatInt === -2)) && (videoFormatAutoSelDone === false)) {

			// If the format isn't available, deletes it from the ancillary video formats array
			if (vAvailabilityRet !== true) {
				videoFormatsCheckArray = videoFormatsCheckArray.filter(function(vf) {return !(vf.idx == vFormat);});
			}

			// If the ancillary array isn't empty and the most wanted format is available, autoselects it (the availability of less wanted formats doesn't matter)
			if ((videoFormatsCheckArray.length > 0) && (videoFormatsCheckArray[0].isAvailable === 1)) {
				var optQualityAuto = selGetOptionsFromValue(selVideoFormat, videoFormatsCheckArray[0].idx, true); // Gets the CVF option associated with the wanted format
				if ((optQualityAuto !== null) && (optQualityAuto.selected == false)) {
					// The returned option isn't selected. Selects it
					optQualityAuto.selected = true;
					fireChangeEvent(selVideoFormat); // Manual fire of the change event (script changes don't fire it)
					videoFormatAutoSelDone = true; // The autoselection has been done. Activates the flag to stop further processing
				}
			}

		}

	}
}

// Substitutes the original page size of comments in video page (10) for the bigger one used in the view all comments page (500)
// Other page sizes can't be easily used because Youtube ajax page only accepts those values in the pagesize parameter (others seem to default to 10)
if (biggerComments) {

	// Gets the recent comments section and the comments options link
	var recentComments = $("recent_comments");
	var commentsOptionsLink = $x1("id('watch-comment-panel')/h4/a[contains(@onclick, 'action_get_comments_options')]");

	// Gets the comments threshold and the comments filter value from the comments options link's onclick event listener
	// If they aren't found, it will use its default values
	var commentsThreshold = (commentsOptionsLink) ? commentsOptionsLink.getAttribute("onclick").match(/&commentthreshold=(-?\d+)&/i) : null;
	commentsThreshold = (commentsThreshold !== null) ? commentsThreshold[1] : -5;
	var commentsFilter = (commentsOptionsLink) ? commentsOptionsLink.getAttribute("onclick").match(/&commentfilter=(\d)&/) : null;
	commentsFilter = (commentsFilter !== null) ? commentsFilter[1] : 0;

	if (recentComments) {

		// Creates the elements that will indicate that the comments are being loaded
		var loadingIcon = createNode("img", {id: "gsloadingIcon", alt: "Loading...",
																				 src: ytHost + "/img/icn_loading_animated.gif"});
		var progressMeter = createNode("span", {id: "gsprogressMeter"});
		var abortButton = createNode("input", {id: "gsabortButton", title: "Abort the transaction", type: "button", value: "Abort"});
		var ajaxWrapper = createNode("div", {id: "gsajaxWrapper", title: "The comments are being loaded..."});

		// Inserts the contents within the wrapper
		ajaxWrapper.appendChild(loadingIcon);
		ajaxWrapper.appendChild(progressMeter);
		ajaxWrapper.appendChild(abortButton);

		// Removes the original comments and save them into a document fragment
		var recentCommentsFrag = removeAllChildren(recentComments);

		// Inserts the wrapper within the now empty div
		recentComments.appendChild(ajaxWrapper);

		// Adds an event listener to the abort button
		abortButton.addEventListener("click", abortAjax, false);

		// Gets the XML data from Youtube
		// GM_xmlhttpRequest's privileged features aren't necessary and it doesn't support responseXML without using DOMParser
		var xhrComments = new XMLHttpRequest();
		xhrComments.onload = function(evt) {

			// Checks for errors
			if ((xhrComments.readyState != 4) || (xhrComments.status != 200) || (!xhrComments.responseXML)) {
				restoreComments();
				return;
			}

			// The data was received. It is now used to fill the recent comments div
			var xmlData = $x1("//html_content/text()", null, xhrComments.responseXML);
			var xmlReturnCodeNode = $x1("//return_code/text()", null, xhrComments.responseXML);
			var xmlReturnCode = ((xmlReturnCodeNode) && (xmlReturnCodeNode.data)) ? xmlReturnCodeNode.data : null;
			if ((xmlData) && (xmlData.data) && (xmlReturnCode === "0")) {
				recentComments.innerHTML = xmlData.data;
			}
			else {
				restoreComments();
				return;
			}

			// Updates the comments options link event listener and the comments panel expand function (watchToggleCommentPanel) so they won't restore the old page size
			if (commentsOptionsLink) {
				commentsOptionsLink.setAttribute("onclick", commentsOptionsLink.getAttribute("onclick").replace("&page_size=10", "&page_size=500"));
			}
			if (unsafeWindow.watchToggleCommentPanel) {
				unsafeWindow.watchToggleCommentPanel = eval("(" + unsafeWindow.watchToggleCommentPanel.toString().replace("&page_size=10", "&page_size=500") + ")");
			}

		};
		xhrComments.onprogress = function(evt) {
			if ((evt.lengthComputable) && (evt.loaded) && (evt.total)) {
				progressMeter.textContent = Math.round(((evt.loaded / evt.total) * 100)) + "% completed"; // Firefox 3.5+ properties
			}
			else {
				if ((evt.position) && (evt.totalSize)) progressMeter.textContent = Math.round(((evt.position / evt.totalSize) * 100)) + "% completed"; // Firefox 3 and earlier properties
			}
		};
		xhrComments.onerror = function(evt) {
			restoreComments();
		};
		var commentsURL = ytHost + "/watch_ajax?v=" + videoId + "&action_get_comments=1&p=1&commentthreshold=" + commentsThreshold + "&commentfilter=" + commentsFilter + "&page_size=500";
		xhrComments.open("GET", commentsURL, true);
		xhrComments.send(null);

	}

}

// Function to remove the ajax wrapper (with the loading icon, etc...) and restore the original comments
// It is called if the ajax transaction fails or is aborted
function restoreComments() {
	recentComments.replaceChild(recentCommentsFrag, ajaxWrapper);
}

// Function to abort the ajax transaction
// It is called by the ajax abort button event listener
function abortAjax(evt) {
	abortButton.disabled = true;
	if (xhrComments) xhrComments.abort();
	restoreComments();
}

// Checks for script updates
if (Date.now() - scriptLastCheck >= 86400000) { // 1 day
	// At least a day has passed since the last check. Sends a request to check for a new script version
	GM_setValue("scriptLastCheck", Date.now().toString());
	scriptCheckVersion();
}
else {
	// If a new version was previously detected the notice will be shown to the user
	// This is to prevent that the notice will only be shown once a day (when an update check is scheduled)
	if (scriptLastRemoteVersion > scriptVersion) {
		scriptShowUpdateMessage(true, scriptLastRemoteVersion);
	}
}