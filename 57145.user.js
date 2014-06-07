// ==UserScript==
// @name          YousableTubeFix Supplement
// @namespace     http://userscripts.org/users/103468
// @description   Some personal tweaks to supplement the excellent YousableTubeFix by Mindeye
// @include       http://youtube.tld/*
// @include       http://*.youtube.tld/*
// @author        aoxyjvwdfkbs
// @homepage      http://userscripts.org/scripts/show/57145
// @license       Creative Commons Attribution 3.0 United States; http://creativecommons.org/licenses/by/3.0/us/
// @copyright     2009+, aoxyjvwdfkbs (http://userscripts.org/users/103468)
// @attribution   Mindeye (http://userscripts.org/scripts/show/13333)
// @version       13 Sep 2009
// ==/UserScript==
// =====================================================================================================
// Preface
//  Requires YousableTubeFix by Mindeye: http://userscripts.org/scripts/show/13333
//  This script does not duplicate any of the features of YousableTubeFix; it is merely an extension of
//   function and requires YousableTubeFix to operate.
// Purpose
//  Externalizes some tweaks so I don't have to edit the parent script when it's updated.
//  Notice: all functions are disabled by default; use the configuration menu command to enable them.
// Functions
//  * Remove 970 pixel minimum widths on many pages and expand relevant columns to fill the width of
//     the page on home, user pages, and browse pages. This is really useful for narrow browsers since
//     horizontal scrollbars and multi-column layouts suck.
//   o [known issue: causes layout glitches. These will be fixed eventually.]
//   o [known issue: some glitches present depending on the script order in the "Manage User Scripts"
//      list.]
//   o [known issue: includes options for fixing some of the glitches.]
//  * Delete an ad that YousableTubeFix misses. This ad may have been temporary (I don't see it anymore)
//     but the supporting code for this function is trivial so I will leave it in.
//  * Set the player to wmode:opaque so that css menus can be displayed over it.
//  * Hide the video; show only controls.
//  * Always allows autoplay on playlist pages.
//   o [known issue: this script must be AFTER YousableTubeFix in the "Manage User Scripts" list for
//      this option to work; unfortunately, every time a script is updated it moves to the bottom of
//      the list.]
//   o [known issue: playlists in background tabs will advance to the next video but will not start
//      playing until the tab is active.]
// Notes
//  This script uses a lot of code from http://userscripts.org/scripts/show/13333 which enabled me to
//   rapidly develop it.
//  Most of the unmodified code is in the form of helper functions; modified versions of the
//   configuration menu and updater are used but those do not directly interact with the page.
//  I don't normally use all of the options in this script but I try to make sure nothing conflicts
//   with YousableTubeFix periodically.
//  I will be rewriting all of the borrowed code at some point.
// =====================================================================================================
// BEGIN UPDATE NOTICE HELPER FUNCTIONS modified from YousableTubeFix by Mindeye http://userscripts.org/scripts/show/13333
// Current script version (release date), last update check and last remote version seen
var scriptVersion = 1252900967392; // 13 Sep 2009
var scriptLastCheck = parseInt(GM_getValue("scriptLastCheck", "0"), 10);
if (isNaN(scriptLastCheck)) scriptLastCheck = 0;
var scriptLastRemoteVersion = parseInt(GM_getValue("scriptLastRemoteVersion", scriptVersion.toString()), 10);
if (isNaN(scriptLastRemoteVersion)) scriptLastRemoteVersion = scriptVersion;
// URLs related to the script
var scriptFileURL = "http://userscripts.org/scripts/source/57145.user.js";
var scriptHomepageURL = "http://userscripts.org/scripts/show/57145";
// Shortcut to sessionStorage (saved values will be discarded at the end of the browser session)
var sSt = unsafeWindow.sessionStorage;
// Shows/hides an update notice to the user (according to the boolean parameter scriptShowMessage)
// The scriptNewVersion parameters is used to display the new version number/date in Date.prototype.getTime() format
function scriptShowUpdateMessage(scriptShowMessage, scriptNewVersion) {
	// Gets the notice box and the script new version date in UTC format
	var messageDiv = $("gsscriptVersionMessageTwo");
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
			messageDiv = createNode("div", {id: "gsscriptVersionMessageTwo", title: "A new YousableTubeFix version is available"});
			messageDiv.innerHTML = "A new version of YousableTubeFix Supplement (" + scriptNewVersionDate + ") is available<br><br>" +
				"<a id='gsscriptVersionMessageInstallTwo' href='" + scriptFileURL + "' title='Install the script update'>Install</a>" +
				"<a href='" + scriptHomepageURL + "' target='_blank' title='Go to YousableTubeFix Supplement homepage'>Go to web page</a>" +
				"<a id='gsscriptVersionMessageHideTwo' href='javascript:void(null)' title='Hide the notice for this session'>Hide</a>";
			document.body.appendChild(messageDiv);
			// Adds an event listener to the hide notice link
			$("gsscriptVersionMessageHideTwo").addEventListener("click", function(evt) {
				sSt.gsscriptVersionNoticeHide = "1"; // Sets a sessionStorage variable to prevent the notice to be shown for this session
				scriptShowUpdateMessage(false, null);
			}, false);
			// Adds an event listener to the install link to hide the notice
			$("gsscriptVersionMessageInstallTwo").addEventListener("click", function(evt) {scriptShowUpdateMessage(false, null);}, false);
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
// END UPDATE NOTICE HELPER FUNCTIONS modified from YousableTubeFix by Mindeye http://userscripts.org/scripts/show/13333
// BEGIN CONFIGURATION MENU modified from YousableTubeFix by Mindeye http://userscripts.org/scripts/show/13333
var alternateCSS = GM_getValue("alternateCSS", false);
var fixVideoSize = GM_getValue("fixVideoSize", false);
var fixScrollToVideo = GM_getValue("fixScrollToVideo", false);
var deleteNodes = GM_getValue("deleteNodes", false);
var playlistAutoplay = GM_getValue("playlistAutoplay", false);
var playerWmode = GM_getValue("playerWmode", false);
var hideVideo = GM_getValue("hideVideo", false);
// Configuration function
function configureScript(e) {
	// Gets the layers
	var maskLayer = $("gsmaskLayerTwo");
	var dialogLayer = $("gsdialogLayerTwo");
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
	return;
	// Creates the configuration layers
	// It is a nested function
	function createLayers() {
		// Creates a layer to mask the page during configuration
		maskLayer = createNode("div", {id: "gsmaskLayerTwo", title: "Click here to return to the page"});
		// Creates a layer for the configuration dialog
		dialogLayer = createNode("div", {id: "gsdialogLayerTwo"});
		// Creates the configuration dialog HTML
		dialogLayer.innerHTML = "<div id='gsconfTitleTwo'>YousableTubeFix Supplement Configuration</div>" +
			"<ul>" +
			"<li>Use alternate CSS rules</li>" +
			"<input type='checkbox' id='gsconfalternateCSS'" + (alternateCSS ? " checked='checked'" : "") + ">remove minimum widths and change some layouts.<br>" +
			"<input type='checkbox' id='gsconffixVideoSize'" + (fixVideoSize ? " checked='checked'" : "") + ">if using above css changes, also fix video size.<br>" +
			"<input type='checkbox' id='gsconffixScrollToVideo'" + (fixScrollToVideo ? " checked='checked'" : "") + ">if using above video size change, also fix scroll to video.<br>" +
			"<li>Remove random junk</li>" +
			"<input type='checkbox' id='gsconfdeleteNodes'" + (deleteNodes ? " checked='checked'" : "") + ">Delete an ad that YousableTubeFix misses.<br>" +
			"<li>Playlist-only autoplay</li>" +
			"<input type='checkbox' id='gsconfplaylistAutoplay'" + (playlistAutoplay ? " checked='checked'" : "") + ">when YousableTubeFix is set to \"prevent only autoplay\", playlists will ignore that preference and start playing immediately.<br>" +
			"<li>Change player wmode</li>" +
			"<input type='checkbox' id='gsconfplayerWmode'" + (playerWmode ? " checked='checked'" : "") + ">css menus work over the video player.<br>" +
			"<li>Hide video</li>" +
			"<input type='checkbox' id='gsconfhideVideo'" + (hideVideo ? " checked='checked'" : "") + ">show only video controls." +
			"</li>" +
			"</ul>" +
			"<div id='gsconfButDivTwo'>" +
			"<input type='button' id='gsconfOKButTwo' value='OK' title='Save the current configuration'>" +
			"<input type='button' id='gsconfCancelButTwo' value='Cancel' title='Return to the page without saving'>" +
			"<p>Current date: " + Date.now() + "</p>" +
			"</div>";
		// Appends the layers to the document
		document.body.appendChild(maskLayer);
		document.body.appendChild(dialogLayer);
		// Adds the necessary event listeners
		maskLayer.addEventListener("click", hideLayers, false);
		$("gsconfOKButTwo").addEventListener("click", saveConfiguration, false);
		$("gsconfCancelButTwo").addEventListener("click", hideLayers, false);
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
		// Sets configuration variables
		GM_setValue("alternateCSS", $("gsconfalternateCSS").checked);
		GM_setValue("fixVideoSize", $("gsconffixVideoSize").checked);
		GM_setValue("fixScrollToVideo", $("gsconffixScrollToVideo").checked);
		GM_setValue("deleteNodes", $("gsconfdeleteNodes").checked);
		GM_setValue("playlistAutoplay", $("gsconfplaylistAutoplay").checked);
		GM_setValue("playerWmode", $("gsconfplayerWmode").checked);
		GM_setValue("hideVideo", $("gsconfhideVideo").checked);
		// Reloads page and script
		window.location.reload();
	}
}
// Registers the configuration menu command
GM_registerMenuCommand("YousableTubeFix Supplement Configuration", configureScript, null, null, "S");
// END CONFIGURATION MENU modified from YousableTubeFix by Mindeye http://userscripts.org/scripts/show/13333
// BEGIN HELPER FUNCTIONS unmodified from YousableTubeFix by Mindeye http://userscripts.org/scripts/show/13333
String.prototype.makeImportant = function() { // Adds !important to CSS rules of any type
	var Selector, DeclarationBlock, CssArray = this.match(/([^{]+)({[^{}]+})/);
	if (CssArray === null) { // Inline CSS rule (e.g. "display: none") or scripting rule (e.g. element.style.display = "none")
		Selector = "";
		DeclarationBlock = this; }
	else { // Complete CSS rule (e.g. ".nd {display: none}")
		Selector = CssArray[1];
		DeclarationBlock = CssArray[2]; }
	if (DeclarationBlock.indexOf(":") != -1) {	// Adds !important to each rule
		DeclarationBlock = DeclarationBlock.replace(/[^:;{}]+:[^:;{}]+/g, "$& !important"); }
	else { // No estructure could be recognized, so we'll just add !important
		DeclarationBlock += " !important"; }
	// Remove any !important duplicates
	DeclarationBlock = DeclarationBlock.replace(/(?:\s*!important\s*){2,}/gi, " !important");
	return Selector + DeclarationBlock; };

// Escapes characters with special meaning in a regular expression with a backslash so they can be used in a regular expression with their literal meaning
String.prototype.escapeREChars = function() {
	return this.replace(/([.*+?|(){}[\]^$\\])/g, "\\$1");
}

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
	if (iNode) return iNode.parentNode.removeChild(iNode);
	return null;
}

// Reloads the player by removing it from the DOM tree and inserting it again in the same position
// If the video is substituted by an icon, it won't do anything (a reload isn't necessary)
function reloadPlayer() {
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
// END HELPER FUNCTIONS unmodified from YousableTubeFix by Mindeye http://userscripts.org/scripts/show/13333
// =====================================================================================================
// =====================================================================================================
// BEGIN ORIGINAL CODE

// css for the configuration menu and update notification
[ // Adds styles and classes for the configuration layers and its contents
	"#gsmaskLayerTwo {background-color: black; opacity: 0.5; z-index: 100; " +
		"position: fixed; left: 0px; top: 0px; width: 100%; height: 100%}",
	"#gsdialogLayerTwo {background-color: #EEEEEE; overflow: auto; padding: 5px; z-index: 101; " +
		"outline: black solid thin; position: fixed; left: 30%; top: 7.5%; width: 40%; height: 85%}",
	"#gsdialogLayerTwo > * {margin: 20px 0px}",
	"#gsdialogLayerTwo li {margin: 15px 0px 7px; font-style: italic}",
	"#gsdialogLayerTwo input, #gsdialogLayerTwo select {vertical-align: middle}",
	"#gsconfTitleTwo {cursor: default; font-size: 150%; font-weight: bold; text-align: center}",
	"#gsconfButDivTwo {text-align: center}",
	"#gsconfButDivTwo input {margin: 5px}",
	"#gsdialogLayerTwo ul {list-style-type: disc; padding-left: 40px}", // Reverts the changes to the default UA values from YouTube CSS ones
	// Adds styles for the script "new version" message and its anchors
	"#gsscriptVersionMessageTwo {background-color: #C00040; color: white; outline: black solid thin; overflow: auto; " +
		"padding: 5px; position: fixed; z-index: 99; top: 0px; right: 0px; width: 250px; height: 70px; text-align: center",
	"#gsscriptVersionMessageTwo a {margin: 0px 5px}"
].forEach(function(s) {GM_addStyle(s.makeImportant());});

// alternate css rules mostly concerned with narrow pages
if (alternateCSS) {
	viewportWidth = document.documentElement.clientWidth;
	[ // Initiates an array with CSS styles for the script
		// width stuff
		"div#masthead { width:" + viewportWidth + "px }", // top of page
		"div#watch-this-vid-info { width:" + (viewportWidth - 300) + "px }", // comments
		// remove minimum widths
		"div#footer { width:100% }", // most pages
		"div#masthead-container { width:100% }",
		"div#baseDiv { width: 100% }", // video page
		"div#search-section-header { width:100% }", // search page
		"img#smallMastheadBottom { width:100% }", // user page
		// fix stuff
		"div#baseDiv { padding:0 }", // video page
		"div#watch-vid-title { left:0px; margin:0 }", // title
		"div#watch-player-div { left:0px }", // video player
		"div#gsresizeLinks { left:0px }", // yousabletubefix resize links
		// expand into single column
		"div#homepage-main-content { width:100% }", // homepage
		"div#homepage-side-content { width:100% }",
		"div#profile-side-content { width:100% }", // user pages
		"div#profile-main-content { width:100% }",
		"div#body-column { width:100% }", // browse page
		"table.browse-modifiers-extended ul.yt-menulink-menu { left:-39px }",
	].forEach(function(s) {GM_addStyle(s.makeImportant());}); // Adds the styles from the style array to the page, making them important
}

// hide video and show only video controls
if (hideVideo) [ // Initiates an array with CSS styles for the script
	"embed#movie_player { height:25px }",
].forEach(function(s) {GM_addStyle(s.makeImportant());});

// Removes the falltvpreview ad
if (deleteNodes) delNode("watch-ugc-promo");

// END ORIGINAL CODE
// =====================================================================================================
// =====================================================================================================
// BEGIN UPDATE NOTICE modified from YousableTubeFix by Mindeye http://userscripts.org/scripts/show/13333
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
// END UPDATE NOTICE copied from YousableTubeFix by Mindeye
// BEGIN HELPER FUNCTIONS copied from YousableTubeFix by Mindeye
// Gets the video player (and its unwrapped version), its parent div and its parameters (Id, Tracking Id y Video Format)
var player = $("movie_player");
if (!player) return; // for non-video pages don't run any more of the script
var uwPlayer = player.wrappedJSObject; // unsafeWindow context
// END HELPER FUNCTIONS modified from YousableTubeFix by Mindeye http://userscripts.org/scripts/show/13333
// =====================================================================================================
// =====================================================================================================
// BEGIN ORIGINAL CODE that requires the video player be present

// fix the video player width if it no longer matches the page
if ( alternateCSS && fixVideoSize ) {
	if ( player.clientWidth !== $("baseDiv").clientWidth ) {
		function fireEvent ( obj, evt ) {
			var fireOnThis = obj;
			if ( document.createEvent ) {
				var evObj = document.createEvent ( 'MouseEvents' );
				evObj.initEvent ( evt, true, false );
				fireOnThis.dispatchEvent ( evObj );
			} else if ( document.createEventObject ) {
				fireOnThis.fireEvent ( 'on' + evt );
			}
		}
		fireEvent($("gsresizeLink8"),'click'); // change this to the default video size
	}
}

// for some reason, yousableTubeFix ignores the scrollToVideo preference for resize links
if ( alternateCSS && fixVideoSize && fixScrollToVideo ) window.scrollTo(0, 0);

// Allows autoplay if the playlist is active
if (playlistAutoplay) if (/feature=PlayList/.test(location.href)) {
	deleteFlashVar("jsapicallback", false);
	setFlashVar("autoplay", "1", false);
}

// Allow overlapping html stuff on the flash player
if (playerWmode) player.setAttribute("wmode", "opaque");

// END ORIGINAL CODE
// =====================================================================================================
